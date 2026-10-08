import { diagramCatalog } from '@/data/diagramCatalog';
import { getFaultsForInverter } from '@/data/inverterfaults';
import { Inverter } from '@/types/inverter';

const existingInverters: Inverter[] = [
  {
    id: 'LuminousEcoWatt',
    brand: 'Luminous',
    brandHi: 'ल्युमिनस (Luminous)',
    model: 'Eco Watt+ 1050 / 700',
    capacity: '700–1050 VA',
    batteryVoltage: '12V',
    type: 'Home UPS / Inverter',
    typeHi: 'होम यूपीएस / इन्वर्टर',
    image: require('@/assets/inverters/LuminousEcoWatt.png'),
    pcbImage: null,
    faults: [
      'low-battery',
      'main-feedback',
      'microcontroller-pin-details',
    ],
  },

  {
    id: 'microtek-inverter',
    brand: 'Microtek',
    brandHi: 'माइक्रोटेक (Microtek)',
    model: 'EB 900 / V4–V7 Series',
    capacity: '700–1400 VA',
    batteryVoltage: '12V',
    type: 'Sine Wave / Digital Inverter',
    typeHi: 'साइन वेव / डिजिटल इन्वर्टर',
    image: require('@/assets/inverters/microtek.png'),
    pcbImage: null,
    faults: [
      'low-battery',
      'microcontroller-pin-details',
    ],
  },

  {
    id: 'microtek-24x7',
    brand: 'Microtek',
    brandHi: 'माइक्रोटेक (Microtek)',
    model: '24x7 HB1125 / Hybrid Series',
    capacity: '700–1125 VA',
    batteryVoltage: '12V',
    type: 'Hybrid Home UPS',
    typeHi: 'हाइब्रिड होम यूपीएस',
    image: require('@/assets/inverters/Microtek-24x7.png'),
    pcbImage: null,
    faults: [
      'microcontroller-pin-details',
    ],
  },

  {
    id: 'microtek-square-wave',
    brand: 'Microtek',
    brandHi: 'माइक्रोटेक (Microtek)',
    model: 'Square Wave (JM1250 / Classic)',
    capacity: '700–1250 VA',
    batteryVoltage: '12V',
    type: 'Square Wave Inverter',
    typeHi: 'स्क्वायर वेव इन्वर्टर',
    image: require('@/assets/inverters/Microtek-Square-wave.png'),
    pcbImage: null,
    faults: [
      'microcontroller-pin-details',
    ],
  },

  {
    id: 'sukam-shark-inverter',
    brand: 'Su-Kam',
    brandHi: 'सु-काम (Su-Kam)',
    model: 'Shark 650 / 850 (SMD & DIP)',
    capacity: '650–1000 VA',
    batteryVoltage: '12V',
    type: 'Square Wave Inverter (SMD & DIP)',
    typeHi: 'स्क्वायर वेव इन्वर्टर (SMD व DIP)',
    image: require('@/assets/inverters/sukam-shark.png'),
    pcbImage: null,
    faults: [
      'dead-vcc',
      'changeover',
      'low-battery',
      'switch-relay',
      'fan-overheating',
      'mosfet-drive',
      'microcontroller-pin-details',
    ],
  },

  {
    id: 'sukam-shiny-inverter',
    brand: 'Su-Kam',
    brandHi: 'सु-काम (Su-Kam)',
    model: 'Shiny Sine Wave Home UPS',
    capacity: '650–1050 VA',
    batteryVoltage: '12V',
    type: 'Pure Sine Wave Inverter',
    typeHi: 'प्योर साइन वेव इन्वर्टर',
    image: require('@/assets/inverters/sukam-shiny.png'),
    pcbImage: null,
    faults: [
      'changeover',
      'microcontroller-pin-details',
    ],
  },

  {
    id: 'livguard-inverter',
    brand: 'Livguard',
    brandHi: 'लिवगार्ड (Livguard)',
    model: 'LG700E / LG900 / LG1100',
    capacity: '700–1600 VA',
    batteryVoltage: '12V',
    type: 'Pure Sine Wave Inverter',
    typeHi: 'प्योर साइन वेव इन्वर्टर',
    image: require('@/assets/inverters/livguard.png'),
    pcbImage: null,
    faults: [],
  },
];
const configuredModelImages: Record<string, Inverter['image']> = {
  'luminous-eco-watt': require('@/assets/inverters/LuminousEcoWattNeo.png'),
  'luminous-lb': require('@/assets/inverters/luminous lb.jpg'),
  'luminous-shakti-charge': require('@/assets/inverters/luminous shakti charge.webp'),
};

// Use rated capacity, never a model number as an assumed VA rating.
// Luminous catalogue, Shakti Charge+ 1150: 900 VA / 12 V.
// https://www.nantech.in/wp-content/uploads/2022/01/Luminous-Inverter-and-Batteries1.pdf
const configuredModelSpecs: Record<string, { capacity: string; batteryVoltage: string }> = {
  // Model-family ratings supplied by the app owner.
  'luminous-eco-watt': { capacity: '700–1050 VA', batteryVoltage: '12V' },
  'luminous-lb': { capacity: '675–1075 VA', batteryVoltage: '12V' },
  'luminous-shakti-charge': { capacity: '900 VA', batteryVoltage: '12V' },
};

// New config groups appear automatically, without inventing electrical ratings.
export const inverters: Inverter[] = [
  ...existingInverters,
  ...diagramCatalog.filter(model => !existingInverters.some(item => item.id === model.id)).map(model => ({
    id: model.id, brand: model.brand, model: model.model,
    capacity: configuredModelSpecs[model.id]?.capacity ?? '—',
    batteryVoltage: configuredModelSpecs[model.id]?.batteryVoltage ?? '—',
    type: 'Inverter', typeHi: 'इन्वर्टर',
    image: configuredModelImages[model.id] ?? null, pcbImage: null, faults: [],
  })),
].map(model => {
  const faults = getFaultsForInverter(model.id);
  return { ...model, faults: faults.map(fault => fault.id), newDiagramsCount: faults.filter(fault => fault.isNew).length };
});
