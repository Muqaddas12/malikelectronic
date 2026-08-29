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
    chipName: 'PIC16F72 (28-Pin)',
    title: 'Microtek EB 900 / V4–V7 Microcontroller Pin Details',
    subtitle: 'Complete 28-Pin voltage chart in Mains, UPS & Normal modes with pin functions',
    pages: [
      require('@/assets/microcontroller/microtek/microtek_mc_pindetails_page_1.png'),
    ],
  },
};

export function getMicrocontrollerDoc(inverterId: string): MicrocontrollerDoc | undefined {
  return microcontrollerDocs[inverterId];
}

