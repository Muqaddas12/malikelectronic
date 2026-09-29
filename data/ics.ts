import catalog from './ic-catalog.json';
import { reviewedIcs } from './ic-reviewed';

export type IcPin = {
  pin: number;
  name: string;
  type: 'Power' | 'Ground' | 'Input' | 'Output' | 'Control' | 'Passive' | 'Input/Output';
  descEn: string;
  descHi: string;
};
export type IcDetail = {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  totalPins: number;
  dipPackageName: string;
  smdPackageName: string;
  simpleSummaryEn: string;
  simpleSummaryHi: string;
  workingPrincipleEn: string;
  workingPrincipleHi: string;
  inverterApplicationEn: string;
  inverterApplicationHi: string;
  testingTipEn: string;
  testingTipHi: string;
  pins: IcPin[];
  verification: 'verified' | 'pending';
  datasheetUrl?: string;
  pinoutNoteEn: string;
  pinoutNoteHi: string;
  diagramLayout: 'dual-row' | 'none';
};

// Retain every searchable part ID. Unreviewed entries must never expose the old
// category-generated pins, package guesses, supply voltages or brand claims.
export const IC_DATABASE: IcDetail[] = catalog.map(({ id, name, category }) => ({
  id, name: id.toUpperCase(), category, aliases: [name], totalPins: 0,
  dipPackageName: '', smdPackageName: '', verification: 'pending', diagramLayout: 'none',
  simpleSummaryEn: 'Reference awaiting manufacturer and package verification.',
  simpleSummaryHi: 'निर्माता और पैकेज के अनुसार जानकारी की पुष्टि बाकी है।',
  workingPrincipleEn: 'The previous generic entry was unreliable. Consult the datasheet for the complete part marking and package.',
  workingPrincipleHi: 'पुरानी सामान्य जानकारी विश्वसनीय नहीं थी। पूरे पार्ट नंबर और पैकेज की डेटाशीट देखें।',
  inverterApplicationEn: 'Board-specific use is not verified; identify the PCB revision and schematic.',
  inverterApplicationHi: 'बोर्ड में उपयोग की पुष्टि नहीं है; PCB रिवीजन और सर्किट देखें।',
  testingTipEn: 'Match the full part number, manufacturer and package before choosing test points. Do not infer supply pins from a similar IC. Check continuity only with power removed and capacitors discharged.',
  testingTipHi: 'टेस्ट पिन चुनने से पहले पूरा पार्ट नंबर, निर्माता और पैकेज मिलाएँ। मिलते-जुलते IC से सप्लाई पिन का अनुमान न लगाएँ। कंटिन्यूटी केवल पावर बंद और कैपेसिटर डिस्चार्ज होने पर जाँचें।',
  pinoutNoteEn: 'Pinout unavailable: the copied pin table has been withdrawn pending verification.',
  pinoutNoteHi: 'पिनआउट उपलब्ध नहीं: कॉपी की गई पिन तालिका पुष्टि तक हटा दी गई है।',
  pins: [],
  ...reviewedIcs.get(id),
}));
