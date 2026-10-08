import luminous from '@/config/Luminous.json';
import microtek from '@/config/Microtek.json';
import sukam from '@/config/sukam.json';

type DiagramRow = { pcbRevision?: string; source?: string; verifiedAt?: string; id: number; faultId?: string; name: string; link: string; isNew?: boolean; usedPins?: string; 'Used Pins'?: string; 'used Pins'?: string };
export type CatalogDiagram = { pcbRevision?: string; source?: string; verifiedAt?: string; faultId: string; title: string; link: string; usedPins: string; isNew?: boolean };
export type CatalogModel = { id: string; brand: string; model: string; diagrams: CatalogDiagram[] };

const existingIds: Record<string, string> = {
  'Luminous-Eco-Watt-Plus': 'LuminousEcoWatt',
  'microtek-eb-semi-sine-wave': 'microtek-inverter',
  'microtek-eb-square-wave': 'microtek-square-wave',
  'microtek-24x7-Non-Smd': 'microtek-24x7',
  'sukam-shark': 'sukam-shark-inverter',
  'sukam-shiny': 'sukam-shiny-inverter',
};
const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const modelNames: Record<string, string> = {
  'Luminous-Eco-Watt': 'Eco Watt Neo',
  'Luminous-LB': 'LB 675/875/1075',
  'Luminous-Shakti-Charge': 'Shakti Charge 1150',
};

export function parseDiagramRows(rows: unknown): CatalogDiagram[] {
  if (!Array.isArray(rows)) return [];
  const seen = new Set<string>();
  return rows.flatMap((row: unknown) => {
    if (!row || typeof row !== 'object') return [];
    const item = row as Partial<DiagramRow>;
    if (typeof item.name !== 'string' || !item.name.trim() || typeof item.link !== 'string' || !item.link.trim()) return [];
    const explicitId = typeof item.faultId === 'string' ? item.faultId.trim() : '';
    if (!explicitId && !Number.isSafeInteger(item.id)) return [];
    const faultId = explicitId || (item.name.toLowerCase().includes('microcontroller') ? 'microcontroller-pin-details' : `${item.id}-${slug(item.name)}`);
    if (seen.has(faultId)) return [];
    seen.add(faultId);
    const pins = item.usedPins ?? item['Used Pins'] ?? item['used Pins'];
    return [{ pcbRevision: typeof item.pcbRevision === 'string' ? item.pcbRevision : undefined, source: typeof item.source === 'string' ? item.source : undefined, verifiedAt: typeof item.verifiedAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt) ? item.verifiedAt : undefined, faultId, title: item.name.trim(), link: item.link.trim(),
      isNew: typeof item.isNew === 'boolean' ? item.isNew : undefined,
      usedPins: typeof pins === 'string' ? pins : '' }];
  });
}

// Every configured group becomes a model and every row becomes a visible sheet.
// Explicit fault IDs keep links stable when rows are inserted or reordered.
export const diagramCatalog: CatalogModel[] = [
  { brand: 'Luminous', groups: luminous },
  { brand: 'Microtek', groups: microtek },
  { brand: 'Su-Kam', groups: sukam },
].flatMap(({ brand, groups }) => Object.entries(groups).map(([key, rows]) => ({
  id: existingIds[key] ?? slug(key),
  brand,
  model: modelNames[key] ?? key.replace(/^(Luminous|microtek|sukam)-/i, '').replace(/-/g, ' '),
  diagrams: parseDiagramRows(rows),
})));

export function getConfiguredDiagrams(inverterId: string): CatalogDiagram[] {
  const aliases: Record<string, string> = { 'sukam-shark': 'sukam-shark-inverter', 'sukam-shiny': 'sukam-shiny-inverter' };
  const rows = diagramCatalog.find(model => model.id === (aliases[inverterId] ?? inverterId))?.diagrams ?? [];
  // Preserve the MCU sheet available from older Eco Watt+ bookmarks.
  return inverterId === 'LuminousEcoWatt'
    ? [...rows, ...(diagramCatalog.find(model => model.id === 'luminous-eco-watt')?.diagrams ?? [])]
    : rows;
}
