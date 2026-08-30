export interface MicrocontrollerDoc {
  inverterId: string;
  chipName: string;
  title: string;
  subtitle: string;
  pages: any[];
}

export const microcontrollerDocs: Record<string, MicrocontrollerDoc> = {
  'LuminousEcoWatt': {
    inverterId: 'LuminousEcoWatt',
    chipName: 'PIC16F722 (28-Pin)',
    title: 'Luminous Eco Watt+ Microcontroller Pin Details',
    subtitle: 'Complete 28-Pin voltage chart, functions & mode details (Hindi & English)',
    pages: [
      require('@/assets/microcontroller/luminous/luminous_mc_pindetails_page_1.png'),
      require('@/assets/microcontroller/luminous/luminous_mc_pindetails_page_2.png'),
      require('@/assets/microcontroller/luminous/luminous_mc_pindetails_page_3.png'),
    ],
  },

  'microtek-inverter': {
    inverterId: 'microtek-inverter',
    chipName: 'PIC16F72 / EBHB-SGP-V3R3 (28-Pin)',
    title: 'Microtek EB 900 / V4–V7 Microcontroller Pin Details',
    subtitle: 'Complete 28-Pin voltage chart in Mains, UPS & Normal modes with pin functions',
    pages: [
      require('@/assets/diagrams/Microtek-V4-To-V7-Model/Microcontroller.png'),
      require('@/assets/microcontroller/microtek/microtek_mc_pindetails_page_1.png'),
    ],
  },

  'microtek-24x7': {
    inverterId: 'microtek-24x7',
    chipName: 'Microtek 24x7 (20-Pin DIP)',
    title: 'Microtek 24x7 Microcontroller Pin Details',
    subtitle: '20-Pin Non-SMD DIP IC Pin functions and live operating voltages in Backup & Mains modes',
    pages: [
      require('@/assets/diagrams/Microtek-24x7/Microcontroller.png'),
    ],
  },

  'microtek-square-wave': {
    inverterId: 'microtek-square-wave',
    chipName: 'Microtek Square Wave Micro IC (28-Pin)',
    title: 'Microtek Square Wave Micro IC Details (JM1250 / Classic)',
    subtitle: '28-Pin Micro IC voltage guide in Mains & Inverter switching modes with complete pinouts',
    pages: [
      require('@/assets/diagrams/Microtek-Square-wave/Microcontroller.png'),
    ],
  },

  'sukam-shark-inverter': {
    inverterId: 'sukam-shark-inverter',
    chipName: 'Su-Kam Microcontroller (28-Pin)',
    title: 'Su-Kam Shark SMD / DIP Microprocessor Pin Details',
    subtitle: 'Complete 28-Pin voltage chart across Mains & Inverter modes',
    pages: [
      require('@/assets/diagrams/Sukam-Shark-Smd-Dip-Old-Model/Microcontroller.png'),
    ],
  },

  'sukam-shiny-inverter': {
    inverterId: 'sukam-shiny-inverter',
    chipName: 'PIC16F72 (28-Pin)',
    title: 'Su-Kam Shiny Sine Wave Microcontroller Pin Details',
    subtitle: 'Complete 28-Pin live voltages, pinouts, and testing guide for PIC16F72',
    pages: [
      require('@/assets/diagrams/Sukam-Shiny-Sinewave/Microcontroller.png'),
    ],
  },
};

const microcontrollerDocsHi: Record<string, { title: string; subtitle: string }> = {
  'LuminousEcoWatt': {
    title: 'ल्युमिनस इको वाट+ माइक्रोकंट्रोलर पिन विवरण (PIC16F722)',
    subtitle: 'संपूर्ण 28-पिन वोल्टेज चार्ट, पिन कार्य और सभी मोड्स का लाइव विवरण',
  },
  'microtek-inverter': {
    title: 'माइक्रोटेक EB 900 / V4–V7 माइक्रोकंट्रोलर पिन विवरण (PIC16F72)',
    subtitle: 'मेंस, यूपीएस और बैकअप मोड में संपूर्ण 28 पिनों का वोल्टेज चार्ट व पिन कार्य',
  },
  'microtek-24x7': {
    title: 'माइक्रोटेक 24x7 माइक्रोकंट्रोलर 20-पिन विवरण व वोल्टेज गाइड',
    subtitle: '20-पिन नॉन-SMD DIP IC के बैकअप और मेंस मोड के सभी पिन कार्य व लाइव वर्किंग वोल्टेज',
  },
  'microtek-square-wave': {
    title: 'माइक्रोटेक स्क्वायर वेव 28-पिन माइक्रो IC विवरण (JM1250 / Classic)',
    subtitle: '28-पिन माइक्रो IC के मेंस और इन्वर्टर स्विचिंग मोड के सटीक वोल्टेज व कार्य',
  },
  'sukam-shark-inverter': {
    title: 'सु-काम शार्क SMD / DIP 28-पिन माइक्रोप्रोसेसर पिन विवरण',
    subtitle: 'मेंस और इन्वर्टर मोड में सभी 28 पिनों का लाइव वोल्टेज व टेस्टिंग गाइड',
  },
  'sukam-shiny-inverter': {
    title: 'सु-काम शाइनी साइन वेव PIC16F72 28-पिन विवरण व वोल्टेज चार्ट',
    subtitle: 'PIC16F72 28-पिन के सभी लाइव वर्किंग वोल्टेज, पिनआउट व विस्तृत टेस्टिंग गाइड',
  },
};

export function getMicrocontrollerDoc(
  inverterId: string,
  language: string = 'hi',
): MicrocontrollerDoc | undefined {
  const doc = microcontrollerDocs[inverterId];
  if (!doc) return undefined;

  if (language === 'hi' && microcontrollerDocsHi[inverterId]) {
    return {
      ...doc,
      title: microcontrollerDocsHi[inverterId].title,
      subtitle: microcontrollerDocsHi[inverterId].subtitle,
    };
  }

  return doc;
}
