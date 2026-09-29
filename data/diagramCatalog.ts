import luminous from '@/config/Luminous.json';
import microtek from '@/config/Microtek.json';
import sukam from '@/config/sukam.json';

type DiagramRow = { id: number; faultId?: string; name: string; link: string; usedPins?: string; 'Used Pins'?: string; 'used Pins'?: string };
export type CatalogDiagram = { faultId: string; title: string; link: string; usedPins: string };
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
  'Luminous-Eco-Watt': 'Eco Watt New',
  'Luminous-LB': 'LB 675/875/1075',
  'Luminous-Shakti-Charge': 'Shakti Charge 1150',
};

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
  diagrams: (rows as DiagramRow[]).map(row => ({
    faultId: row.faultId ?? (row.name.toLowerCase().includes('microcontroller') ? 'microcontroller-pin-details' : `${row.id}-${slug(row.name)}`),
    title: row.name.trim(),
    link: row.link,
    usedPins: row.usedPins ?? row['Used Pins'] ?? row['used Pins'] ?? '',
  })),
})));

export function getConfiguredDiagrams(inverterId: string): CatalogDiagram[] {
  const aliases: Record<string, string> = { 'sukam-shark': 'sukam-shark-inverter', 'sukam-shiny': 'sukam-shiny-inverter' };
  const rows = diagramCatalog.find(model => model.id === (aliases[inverterId] ?? inverterId))?.diagrams ?? [];
  // Preserve the MCU sheet available from older Eco Watt+ bookmarks.
  return inverterId === 'LuminousEcoWatt'
    ? [...rows, ...(diagramCatalog.find(model => model.id === 'luminous-eco-watt')?.diagrams ?? [])]
    : rows;
}
