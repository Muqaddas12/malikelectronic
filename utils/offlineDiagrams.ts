import * as FS from 'expo-file-system/legacy';
import { Image, Platform } from 'react-native';
import { useEffect, useSyncExternalStore } from 'react';
import { getConfiguredDiagrams } from '@/data/diagramCatalog';
import { formatDriveImageUrl } from '@/data/diagrams';

type Entry = { remote: string; uri: string; size: number };
let entries: Record<string, Entry> = {};
let loaded: Promise<void> | undefined;
let busy = false;
let snapshot = { entries, busy, progress: '' };
const listeners = new Set<() => void>();
const root = () => `${FS.documentDirectory}diagrams-v1/`;
const manifest = () => `${root()}index.json`;
const keyFor = (model: string, fault: string) => `${encodeURIComponent(model)}--${encodeURIComponent(fault)}`;
function emit(progress = '') { snapshot = { entries, busy, progress }; listeners.forEach(fn => fn()); }
const persist = () => FS.writeAsStringAsync(manifest(), JSON.stringify(entries));
async function initialize() {
  if (Platform.OS === 'web') return;
  await FS.makeDirectoryAsync(root(), { intermediates: true });
  const index = await FS.getInfoAsync(manifest());
  if (index.exists) {
    const saved = JSON.parse(await FS.readAsStringAsync(manifest()));
    for (const [key, value] of Object.entries(saved)) {
      const v = value as Entry;
      // Rebuild the sandbox path, which may change after an iOS update/restore.
      if (!v || typeof v.remote !== 'string' || typeof v.size !== 'number' || !/^[\w%.-]+--[\w%.-]+$/.test(key)) continue;
      const uri = `${root()}${key}.img`;
      if ((await FS.getInfoAsync(uri)).exists) entries[key] = { ...v, uri };
    }
  }
  emit();
}
export const loadOffline = () => loaded ??= initialize().catch(() => { emit(); });
export function useOffline() {
  useEffect(() => { void loadOffline(); }, []);
  return useSyncExternalStore(fn => { listeners.add(fn); return () => { listeners.delete(fn); }; }, () => snapshot, () => snapshot);
}
export function offlineSource(model: string, fault: string, fallback: any) {
  const found = entries[keyFor(model, fault)];
  const row = getConfiguredDiagrams(model).find(r => r.faultId === fault);
  return found && row && found.remote === formatDriveImageUrl(row.link) ? { uri: found.uri } : fallback;
}
export async function downloadModel(model: string) {
  if (Platform.OS === 'web') throw new Error('Offline downloads are available in the Android/iOS app.');
  await loadOffline();
  if (busy) throw new Error('Another download is in progress.');
  busy = true;
  const rows = getConfiguredDiagrams(model);
  let failed = 0;
  try {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const key = keyFor(model, row.faultId);
      const remote = formatDriveImageUrl(row.link);
      emit(`${i + 1} / ${rows.length}`);
      const uri = `${root()}${key}.img`;
      if (entries[key]?.remote === remote && (await FS.getInfoAsync(uri)).exists) continue;
      const temporary = `${uri}.partial`;
      try {
        const task = FS.createDownloadResumable(remote, temporary);
        const timeout = setTimeout(() => { void task.cancelAsync().catch(() => {}); }, 60000);
        let result;
        try { result = await task.downloadAsync(); } finally { clearTimeout(timeout); }
        if (!result || result.status !== 200) throw new Error('Download failed');
        await new Promise<void>((resolve, reject) => Image.getSize(temporary, () => resolve(), reject));
        const info = await FS.getInfoAsync(temporary);
        if (!info.exists || info.size === 0) throw new Error('Empty image');
        await FS.deleteAsync(uri, { idempotent: true });
        await FS.moveAsync({ from: temporary, to: uri });
        entries = { ...entries, [key]: { uri, remote, size: info.size } };
        await persist();
      } catch {
        failed++;
        await FS.deleteAsync(temporary, { idempotent: true }).catch(() => {});
      }
    }
  } finally { busy = false; emit(); }
  return { total: rows.length, failed };
}
export async function removeModel(model: string) {
  await loadOffline();
  if (busy) throw new Error('Wait for the current download to finish.');
  const prefix = `${encodeURIComponent(model)}--`;
  for (const key of Object.keys(entries).filter(k => k.startsWith(prefix))) {
    await FS.deleteAsync(`${root()}${key}.img`, { idempotent: true });
    const next = { ...entries }; delete next[key]; entries = next;
  }
  await persist(); emit();
}
export function offlineCount(model: string) {
  return getConfiguredDiagrams(model).filter(row => entries[keyFor(model, row.faultId)]?.remote === formatDriveImageUrl(row.link)).length;
}
