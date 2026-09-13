export interface DiagramUpdate {
  id: string;
  inverterId: string;
  inverterName: string;
  inverterModel: string;
  faultId: string;
  title: string;
  titleHi: string;
  usedPins?: string;
  type: 'NEW' | 'UPDATED';
  description: string;
  descriptionHi: string;
  date: string;
}

/**
 * Current release update version identifier.
 */
export const LATEST_UPDATE_VERSION = '2026.09.2';

/**
 * Registry of newly added and updated circuit diagrams.
 */
export const DIAGRAM_UPDATES: DiagramUpdate[] = [
  {
    id: 'sukam-shark-mosfet-drive',
    inverterId: 'sukam-shark-inverter',
    inverterName: 'Su-Kam',
    inverterModel: 'Shark 650 / 850 (SMD & DIP)',
    faultId: 'mosfet-drive',
    title: 'Mosfet Blast | Drive Problem',
    titleHi: 'मॉस्फेट ब्लास्ट | ड्राइव समस्या',
    usedPins: '27, 28',
    type: 'NEW',
    description: 'Microcontroller Pin 27 & 28 gate drive circuit with driver transistors & gate pulse diagnosis.',
    descriptionHi: 'पिन 27 व 28 गेट ड्राइव सिग्नल, ड्राइवर ट्रांजिस्टर और मॉस्फेट ब्लास्ट रिपेयर गाइड।',
    date: 'New',
  },
  {
    id: 'luminous-ecowatt-mc',
    inverterId: 'LuminousEcoWatt',
    inverterName: 'Luminous',
    inverterModel: 'Eco Watt+ 1050 / 700',
    faultId: 'microcontroller-pin-details',
    title: 'Microcontroller 28-Pin Details & Voltages',
    titleHi: 'माइक्रोकंट्रोलर 28-पिन विवरण व वोल्टेज गाइड',
    usedPins: '1–28',
    type: 'NEW',
    description: 'PIC16F722 complete 28-pin operating voltages across Mains & Inverter modes.',
    descriptionHi: 'ल्युमिनस इको वाट PIC16F722 28-पिन ऑपरेटिंग वोल्टेज और पिनआउट टेस्टिंग गाइड।',
    date: 'New',
  },
  {
    id: 'sukam-shark-changeover',
    inverterId: 'sukam-shark-inverter',
    inverterName: 'Su-Kam',
    inverterModel: 'Shark 650 / 850 (SMD & DIP)',
    faultId: 'changeover',
    title: 'Change Over | Zero Cross Sense | Main Feedback',
    titleHi: 'चेंज ओवर | ज़ीरो क्रॉस सेंस | मेन फीडबैक',
    usedPins: '2, 22, 18',
    type: 'UPDATED',
    description: 'Updated high-definition schematic for Mains changeover and zero-crossing detection.',
    descriptionHi: 'चेंजओवर, ज़ीरो क्रॉस सेंसिंग और मेन फीडबैक का अपडेटेड HD सर्किट डायग्राम।',
    date: 'Updated',
  },
  {
    id: 'sukam-shark-low-battery',
    inverterId: 'sukam-shark-inverter',
    inverterName: 'Su-Kam',
    inverterModel: 'Shark 650 / 850 (SMD & DIP)',
    faultId: 'low-battery',
    title: 'Battery Low | OverCharge | Not Charging | Low Back UP',
    titleHi: 'बैटरी लो | ओवरचार्ज | चार्जिंग समस्या | कम बैकअप',
    usedPins: '3',
    type: 'UPDATED',
    description: 'Updated Pin 3 battery voltage sensing and charging cutoff circuit diagram.',
    descriptionHi: 'पिन 3 बैटरी वोल्टेज सेंसिंग और कट-ऑफ सर्किट का अपडेटेड डायग्राम।',
    date: 'Updated',
  },
  {
    id: 'sukam-shark-switch-relay',
    inverterId: 'sukam-shark-inverter',
    inverterName: 'Su-Kam',
    inverterModel: 'Shark 650 / 850 (SMD & DIP)',
    faultId: 'switch-relay',
    title: 'Switch Not Working | Charging Light Blinking | Relay',
    titleHi: 'स्विच काम न करना | चार्जिंग लाइट ब्लिंकिंग | रिले',
    usedPins: '6, 11, 23',
    type: 'UPDATED',
    description: 'Updated schematic for power switch, relay driver and charging indicator circuitry.',
    descriptionHi: 'पॉवर स्विच, रिले ड्राइवर और चार्जिंग इंडिकेशन का नया डायग्राम।',
    date: 'Updated',
  },
  {
    id: 'sukam-shark-fan',
    inverterId: 'sukam-shark-inverter',
    inverterName: 'Su-Kam',
    inverterModel: 'Shark 650 / 850 (SMD & DIP)',
    faultId: 'fan-overheating',
    title: 'Fan | Buzzer | Heat Sensor | Inverter OverHeating',
    titleHi: 'फैन | बजर | हीट सेंसर | ओवरहीटिंग समस्या',
    usedPins: '7, 17, 24',
    type: 'UPDATED',
    description: 'Updated schematic for thermal protection, fan driver transistor and alarm buzzer.',
    descriptionHi: 'थर्मल प्रोटेक्शन, फैन ड्राइवर ट्रांजिस्टर और अलार्म बजर अपडेटेड डायग्राम।',
    date: 'Updated',
  },
];

/**
 * Checks if a specific fault diagram is newly added in this update.
 */
export function isDiagramNew(inverterId: string, faultId: string): boolean {
  return DIAGRAM_UPDATES.some(
    (u) => u.inverterId === inverterId && u.faultId === faultId && u.type === 'NEW',
  );
}

/**
 * Checks if a specific fault diagram is updated in this update.
 */
export function isDiagramUpdated(inverterId: string, faultId: string): boolean {
  return DIAGRAM_UPDATES.some(
    (u) => u.inverterId === inverterId && u.faultId === faultId && u.type === 'UPDATED',
  );
}

/**
 * Gets the update metadata for a specific diagram if present.
 */
export function getDiagramUpdate(
  inverterId: string,
  faultId: string,
): DiagramUpdate | undefined {
  return DIAGRAM_UPDATES.find(
    (u) => u.inverterId === inverterId && u.faultId === faultId,
  );
}

