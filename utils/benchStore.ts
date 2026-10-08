import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useSyncExternalStore } from 'react';

export type SavedItem = { id: string; title: string; route: string };
export type RepairJob = { id: string; model: string; readings: string; components: string; outcome: string; checks: string[]; updated: string };
type BenchState = { favorites: SavedItem[]; recent: SavedItem[]; calculations: string[]; jobs: RepairJob[] };
const empty: BenchState = { favorites: [], recent: [], calculations: [], jobs: [] };
let state = empty;
let ready: Promise<void> | undefined;
let writes = Promise.resolve();
const listeners = new Set<() => void>();
const key = 'bench.library.v1';
const emit = () => listeners.forEach(listener => listener());
const item = (v: any): v is SavedItem => v && typeof v.id === 'string' && typeof v.title === 'string' && typeof v.route === 'string' && v.route.startsWith('/');
export function loadBench() {
  return ready ??= AsyncStorage.getItem(key).then(raw => {
    if (!raw) return;
    const data = JSON.parse(raw);
    state = {
      favorites: Array.isArray(data.favorites) ? data.favorites.filter(item) : [],
      recent: Array.isArray(data.recent) ? data.recent.filter(item).slice(0, 30) : [],
      calculations: Array.isArray(data.calculations) ? data.calculations.filter((v: unknown) => typeof v === 'string').slice(0, 20) : [],
      jobs: Array.isArray(data.jobs) ? data.jobs.filter((v: any) => v && ['id', 'model', 'readings', 'components', 'outcome', 'updated'].every(k => typeof v[k] === 'string') && Array.isArray(v.checks) && v.checks.every((c: unknown) => typeof c === 'string')) : [],
    };
    emit();
  }).catch(() => { /* Keep the app usable if storage cannot be read. */ });
}
async function update(change: (previous: BenchState) => BenchState) {
  await loadBench();
  const next = change(state);
  state = next;
  emit();
  const save = writes.catch(() => {}).then(() => AsyncStorage.setItem(key, JSON.stringify(next)));
  writes = save;
  await save;
}
export const toggleFavorite = (value: SavedItem) => update(s => ({ ...s, favorites: s.favorites.some(i => i.id === value.id) ? s.favorites.filter(i => i.id !== value.id) : [value, ...s.favorites] }));
export const recordRecent = (value: SavedItem) => update(s => ({ ...s, recent: [value, ...s.recent.filter(i => i.id !== value.id)].slice(0, 30) }));
export const saveCalculation = (value: string) => update(s => ({ ...s, calculations: [value, ...s.calculations.filter(v => v !== value)].slice(0, 20) }));
export const saveJob = (job: RepairJob) => update(s => ({ ...s, jobs: [job, ...s.jobs.filter(v => v.id !== job.id)] }));
export const deleteJob = (id: string) => update(s => ({ ...s, jobs: s.jobs.filter(v => v.id !== id) }));
export function useBench() {
  useEffect(() => { void loadBench(); }, []);
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => state, () => empty);
}
