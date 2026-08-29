import { Inverter } from '@/types/inverter';

export const inverters: Inverter[] = [
  {
    id: 'LuminousEcoWatt',
    brand: 'Luminous',
    model: 'Eco Watt+ 1050 / 700',
    capacity: '700–1050 VA',
    batteryVoltage: '12V',
    type: 'Home UPS / Inverter',
    image: require('@/assets/inverters/LuminousEcoWatt.png'),
    pcbImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),
    faults: [
      'fan',
    ],
  },

  {
    id: 'microtek-inverter',
    brand: 'Microtek',
    model: 'Home UPS (V4–V7 Models)',
    capacity: '700–1400 VA',
    batteryVoltage: '12V',
    type: 'Digital Inverter',
    image: require('@/assets/inverters/microtek.png'),
    pcbImage: null,
    faults: [
      'fan',
      'relay',
      'no-output',
    ],
  },

  {
    id: 'livguard-inverter',
    brand: 'Livguard',
    model: 'LG700E / LG900 / LG1100',
    capacity: '700–1600 VA',
    batteryVoltage: '12V',
    type: 'Pure Sine Wave Inverter',
    image: require('@/assets/inverters/livguard.png'),
    pcbImage: null,
    faults: [
      'low-battery',
      'charging',
    ],
  },
];