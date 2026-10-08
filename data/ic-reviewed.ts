import type { IcDetail, IcPin } from './ics';

type Definition = {
  ids: string[];
  source: string;
  category: string;
  packages: [string, string];
  pins: string;
  summary: [string, string];
  working: [string, string];
  layout?: 'dual-row' | 'none';
  note?: [string, string];
};
const ti = (part: string) => `https://www.ti.com/lit/ds/symlink/${part}.pdf`;
const dual = '1OUT 1IN- 1IN+ V- 2IN+ 2IN- 2OUT V+';
const quad = '1OUT 1IN- 1IN+ V+ 2IN+ 2IN- 2OUT 3OUT 3IN- 3IN+ V- 4IN+ 4IN- 4OUT';
const opWorking: [string, string] = ['Amplifies the input voltage difference. External feedback sets the gain; common-mode and output swing limits depend on the exact part.', 'इनपुट वोल्टेज का अंतर बढ़ाता है। बाहरी फीडबैक गेन तय करता है; इनपुट और आउटपुट की सीमा पूरे पार्ट नंबर पर निर्भर है।'];
const comparatorWorking: [string, string] = ['Compares input voltages. An open-collector output sinks current for low; an external pull-up establishes high.', 'इनपुट वोल्टेज की तुलना करता है। ओपन-कलेक्टर आउटपुट लो पर करंट खींचता है; हाई के लिए बाहरी पुल-अप चाहिए।'];
const timing: [string, string] = ['The timing capacitor, comparators and latch generate a delay or oscillation. Nominal thresholds are one-third and two-thirds of the supply.', 'टाइमिंग कैपेसिटर, कंपैरेटर और लैच विलंब या दोलन बनाते हैं। सामान्य थ्रेशोल्ड सप्लाई के एक-तिहाई और दो-तिहाई हैं।'];

// Each definition is scoped to the manufacturer and packages in its source.
// Never derive a pinout from category or assume similar numbers are substitutes.
const definitions: Definition[] = [
  { ids: ['cd4013'], source: ti('cd4013b'), category: 'Logic & Switch', packages: ['PDIP-14 (N)', 'SOIC-14 (D)'], pins: 'Q1 /Q1 CLOCK1 RESET1 D1 SET1 VSS SET2 D2 RESET2 CLOCK2 /Q2 Q2 VDD', summary: ['Two independent D-type flip-flops (TI CD4013B).', 'दो स्वतंत्र D-टाइप फ्लिप-फ्लॉप (TI CD4013B)।'], working: ['A rising clock edge transfers D to Q. SET and RESET are asynchronous, active-high inputs. Check the truth table before wiring both controls.', 'क्लॉक के बढ़ते किनारे पर D का मान Q पर आता है। SET और RESET हाई-सक्रिय हैं और क्लॉक से स्वतंत्र हैं। दोनों कंट्रोल जोड़ने से पहले ट्रुथ टेबल देखें।'] },
  { ids: ['cd4047'], source: ti('cd4047b'), category: 'Timer', packages: ['PDIP-14 (N)', 'SOIC-14 (D)'], pins: 'CT RT RC_COMMON /ASTABLE ASTABLE -TRIGGER VSS +TRIGGER EXT_RESET Q /Q RETRIGGER OSC_OUT VDD', summary: ['Monostable/astable multivibrator (TI CD4047B).', 'मोनोस्टेबल/अस्टेबल मल्टीवाइब्रेटर (TI CD4047B)।'], working: ['External resistance and capacitance set timing. In astable mode Q and its complement have half the oscillator output frequency; the oscillator output is a separate pin.', 'बाहरी रेजिस्टेंस और कैपेसिटेंस समय तय करते हैं। अस्टेबल मोड में Q और उसके उल्टे आउटपुट की फ्रीक्वेंसी ऑसिलेटर की आधी है; ऑसिलेटर आउटपुट अलग पिन पर है।'] },
  ...[
    { ids: ['lm324', 'lm2902'], source: 'lm324', count: 4 },
    { ids: ['lm358', 'lm2904'], source: 'lm358', count: 2 },
    { ids: ['tl072'], source: 'tl072', count: 2 },
    { ids: ['tl074'], source: 'tl072', count: 4 },
    { ids: ['tl082'], source: 'tl082', count: 2 },
    { ids: ['tl084'], source: 'tl082', count: 4 },
    { ids: ['lm833'], source: 'lm833', count: 2 },
    { ids: ['lm348'], source: 'lm348', count: 4 },
  ].map(({ ids, source, count }): Definition => ({ ids, source: ti(source), category: 'Op-Amp', packages: count === 4 ? ['PDIP-14', 'SOIC-14'] : ['PDIP-8', 'SOIC-8'], pins: count === 4 ? quad : dual, summary: [`${count} operational amplifiers.`, `${count} ऑपरेशनल एम्प्लीफायर।`], working: opWorking })),
  { ids: ['lm339'], source: ti('lm339'), category: 'Comparator', packages: ['PDIP-14', 'SOIC-14'], pins: '2OUT 1OUT VCC 1IN- 1IN+ 2IN- 2IN+ 3IN- 3IN+ 4IN- 4IN+ GND 4OUT 3OUT', summary: ['Quad open-collector comparator.', 'चार ओपन-कलेक्टर कंपैरेटर।'], working: comparatorWorking },
  { ids: ['lm393'], source: ti('lm393'), category: 'Comparator', packages: ['PDIP-8', 'SOIC-8'], pins: '1OUT 1IN- 1IN+ GND 2IN+ 2IN- 2OUT VCC', summary: ['Dual open-collector comparator.', 'दो ओपन-कलेक्टर कंपैरेटर।'], working: comparatorWorking },
  { ids: ['lm311'], source: ti('lm311'), category: 'Comparator', packages: ['PDIP-8', 'SOIC-8'], pins: 'EMIT_OUT 1IN+ 1IN- V- BALANCE BAL/STRB COL_OUT V+', summary: ['Single comparator with separate collector and emitter.', 'अलग कलेक्टर और एमिटर वाला सिंगल कंपैरेटर।'], working: comparatorWorking },
  { ids: ['lm741'], source: ti('lm741'), category: 'Op-Amp', packages: ['PDIP-8', ''], pins: 'OFFSET_NULL 1IN- 1IN+ V- OFFSET_NULL 1OUT V+ NC', summary: ['Single operational amplifier with offset adjustment.', 'ऑफसेट एडजस्टमेंट वाला सिंगल ऑप-एम्प।'], working: opWorking },
  { ids: ['lm321'], source: ti('lm321'), category: 'Op-Amp', packages: ['', 'SOT-23-5 (DBV)'], pins: '1IN+ V- 1IN- 1OUT V+', summary: ['Single operational amplifier in SOT-23-5.', 'SOT-23-5 में सिंगल ऑप-एम्प।'], working: opWorking, layout: 'none' },
  { ids: ['tl494'], source: ti('tl494'), category: 'PWM Driver', packages: ['PDIP-16', 'SOIC-16'], pins: '1IN+ 1IN- FEEDBACK DTC CT RT GND C1 E1 E2 C2 VCC OUTPUT_CTRL REF 2IN- 2IN+', summary: ['PWM controller with two error amplifiers.', 'दो एरर एम्प्लीफायर वाला PWM कंट्रोलर।'], working: ['Oscillator timing, feedback and dead-time control determine pulse width.', 'ऑसिलेटर, फीडबैक और डेड-टाइम कंट्रोल पल्स चौड़ाई तय करते हैं।'] },
  { ids: ['sg3524'], source: ti('sg3524'), category: 'PWM Driver', packages: ['PDIP-16', 'SOIC-16'], pins: '1IN- 1IN+ OSC_OUT CL+ CL- RT CT GND COMP SHUTDOWN EMIT1 COL1 COL2 EMIT2 VCC REF', summary: ['PWM controller with separate output collectors and emitters.', 'अलग आउटपुट कलेक्टर और एमिटर वाला PWM कंट्रोलर।'], working: ['The oscillator and error amplifier drive two output transistors. Current-limit inputs and shutdown can inhibit switching.', 'ऑसिलेटर और एरर एम्प्लीफायर दो आउटपुट ट्रांजिस्टर चलाते हैं। करंट लिमिट और शटडाउन स्विचिंग रोक सकते हैं।'] },
  { ids: ['sg3525'], source: 'https://www.st.com/resource/en/datasheet/sg3525.pdf', category: 'PWM Driver', packages: ['DIP-16', 'SO-16'], pins: '1IN- 1IN+ SYNC OSC_OUT CT RT DISCHARGE SOFT_START COMP SHUTDOWN OUT_A GND VC OUT_B VCC VREF', summary: ['SG3525A push-pull PWM controller with soft start.', 'सॉफ्ट स्टार्ट वाला SG3525A पुश-पुल PWM कंट्रोलर।'], working: ['An oscillator and error amplifier control alternating totem-pole outputs; soft start ramps pulse width. VREF is nominally 5.1 V.', 'ऑसिलेटर और एरर एम्प्लीफायर बारी-बारी आउटपुट चलाते हैं; सॉफ्ट स्टार्ट पल्स चौड़ाई धीरे बढ़ाता है। VREF सामान्यतः 5.1 V है।'] },
  { ids: ['uc3842', 'uc3843', 'uc3844', 'uc3845'], source: ti('uc3842'), category: 'PWM Driver', packages: ['PDIP-8', 'SOIC-8'], pins: 'COMP VFB ISENSE RT/CT GND OUTPUT VCC VREF', summary: ['Current-mode PWM controller; thresholds differ by part.', 'करंट-मोड PWM कंट्रोलर; थ्रेशोल्ड पार्ट के अनुसार अलग हैं।'], working: ['UC3842/43 allow up to 100% duty; UC3844/45 limit duty to 50%. Startup/shutdown are typically 16/10 V for 42/44 and 8.4/7.6 V for 43/45. Check the full part before substitution.', 'UC3842/43 में अधिकतम 100% और UC3844/45 में 50% ड्यूटी है। 42/44 का स्टार्ट/स्टॉप सामान्यतः 16/10 V और 43/45 का 8.4/7.6 V है। बदलने से पहले पूरा पार्ट जाँचें।'] },
  { ids: ['ne555'], source: ti('ne555'), category: 'Timer', packages: ['PDIP-8', 'SOIC-8'], pins: 'GND TRIG OUT RESET CONT THRES DISCH VCC', summary: ['Single timer.', 'सिंगल टाइमर।'], working: timing },
  { ids: ['ne556'], source: ti('ne556'), category: 'Timer', packages: ['PDIP-14', 'SOIC-14'], pins: '1DISCH 1THRES 1CONT 1RESET 1OUT 1TRIG GND 2TRIG 2OUT 2RESET 2CONT 2THRES 2DISCH VCC', summary: ['Two independent timers sharing a supply.', 'एक सप्लाई पर दो स्वतंत्र टाइमर।'], working: timing },
];

for (const channels of [7, 8]) definitions.push({
  ids: channels === 7 ? ['uln2002', 'uln2003', 'uln2004'] : ['uln2803', 'uln2804'],
  source: channels === 7 ? 'https://www.st.com/resource/en/datasheet/uln2001.pdf' : 'https://www.st.com/resource/en/datasheet/uln2803a.pdf',
  category: 'Darlington Driver', packages: channels === 7 ? ['PDIP-16', 'SOIC-16'] : ['DIP-18', ''],
  pins: [...Array.from({ length: channels }, (_, i) => `${i + 1}B`), 'GND', 'COM', ...Array.from({ length: channels }, (_, i) => `${channels - i}C`)].join(' '),
  summary: [`${channels}-channel Darlington current-sink array.`, `${channels}-चैनल डार्लिंगटन करंट-सिंक एरे।`],
  working: ['A high input enables its paired low-side sink. COM joins clamp-diode cathodes; it is not logic VCC. Input resistor networks differ by part number.', 'हाई इनपुट संबंधित लो-साइड आउटपुट चालू करता है। COM क्लैम्प डायोड के कैथोड जोड़ता है; यह लॉजिक VCC नहीं है। इनपुट रेजिस्टर पार्ट के अनुसार अलग हैं।'],
});
for (const [id, volts] of [['7805', 5], ['7812', 12], ['7815', 15], ['7905', -5], ['7912', -12]] as const) definitions.push({
  ids: [id], source: ti(volts > 0 ? 'lm340' : 'lm79'), category: 'Regulator', packages: ['TO-220 (3 leads)', ''], layout: 'none', pins: volts > 0 ? 'IN GND OUT' : 'GND IN OUT',
  summary: [`Fixed ${volts} V linear regulator (TI LM${id}).`, `निश्चित ${volts} V लिनियर रेगुलेटर (TI LM${id})।`],
  working: ['Regulates a DC rail. Input headroom, capacitors and heat dissipation must meet the datasheet requirements.', 'DC सप्लाई रेगुलेट करता है। इनपुट अंतर, कैपेसिटर और ताप निकासी डेटाशीट के अनुसार रखें।'],
});
definitions.push(
  { ids: ['lm317'], source: ti('lm317'), category: 'Regulator', packages: ['TO-220 (3 leads)', ''], layout: 'none', pins: 'ADJ OUT IN', summary: ['Adjustable positive linear regulator.', 'एडजस्टेबल पॉजिटिव लिनियर रेगुलेटर।'], working: ['Maintains approximately 1.25 V between OUT and ADJ; an external divider sets the output.', 'OUT और ADJ के बीच लगभग 1.25 V रखता है; बाहरी डिवाइडर आउटपुट तय करता है।'] },
  { ids: ['lm337'], source: ti('lm337'), category: 'Regulator', packages: ['TO-220 (3 leads)', ''], layout: 'none', pins: 'ADJ IN OUT', summary: ['Adjustable negative linear regulator.', 'एडजस्टेबल नेगेटिव लिनियर रेगुलेटर।'], working: ['An external adjustment divider sets the negative output voltage.', 'बाहरी एडजस्टमेंट डिवाइडर नेगेटिव आउटपुट वोल्टेज तय करता है।'] },
  { ids: ['lm1117'], source: ti('lm1117'), category: 'Regulator', packages: ['', 'SOT-223 (3 leads + tab)'], layout: 'none', pins: 'ADJ/GND OUT IN', summary: ['Low-dropout regulator; fixed and adjustable variants.', 'लो-ड्रॉपआउट रेगुलेटर; निश्चित और एडजस्टेबल वेरिएंट।'], working: ['Pin 1 is ADJ on adjustable parts and GND on fixed-voltage parts. The tab is connected to OUT.', 'एडजस्टेबल में पिन 1 ADJ और निश्चित वोल्टेज पार्ट में GND है। टैब OUT से जुड़ा है।'] },
  ...['lm2576', 'lm2596'].map((id): Definition => ({ ids: [id], source: ti(id), category: 'Regulator', packages: ['TO-220 (5 leads)', 'TO-263 (5 leads)'], layout: 'none', pins: 'IN SW_OUT GND FEEDBACK ON/OFF', summary: ['Step-down switching regulator.', 'स्टेप-डाउन स्विचिंग रेगुलेटर।'], working: ['The switch output drives an external inductor circuit; it is not the filtered DC output.', 'स्विच आउटपुट बाहरी इंडक्टर सर्किट चलाता है; यह फिल्टर किया हुआ DC आउटपुट नहीं है।'] })),
  { ids: ['mc34063'], source: ti('mc34063a'), category: 'PWM Driver', packages: ['PDIP-8', 'SOIC-8'], pins: 'SW_COL SW_EMIT CT GND COMP_IN- VCC IPK DR_COL', summary: ['MC34063A buck, boost or inverting converter controller.', 'MC34063A बक, बूस्ट या इनवर्टिंग कन्वर्टर कंट्रोलर।'], working: ['An internal switch, oscillator and current limit operate an external inductor circuit.', 'आंतरिक स्विच, ऑसिलेटर और करंट लिमिट बाहरी इंडक्टर सर्किट चलाते हैं।'] },
  { ids: ['ucc27524'], source: ti('ucc27524'), category: 'MOSFET Driver', packages: ['', 'SOIC-8 (D)'], pins: 'ENA INA GND INB OUTB VDD OUTA ENB', summary: ['Dual non-inverting low-side gate driver.', 'ड्यूल नॉन-इनवर्टिंग लो-साइड गेट ड्राइवर।'], working: ['Separate enable inputs control two ground-referenced gate outputs. This is not a floating high-side driver.', 'अलग इनेबल इनपुट दो ग्राउंड-संदर्भित गेट आउटपुट नियंत्रित करते हैं। यह फ्लोटिंग हाई-साइड ड्राइवर नहीं है।'] },
  { ids: ['4n25'], source: 'https://www.vishay.com/docs/83725/4n25.pdf', category: 'Optocoupler', packages: ['DIP-6', ''], pins: 'ANODE CATHODE NC EMITTER COLLECTOR BASE', summary: ['Phototransistor optocoupler with accessible base.', 'बेस पिन वाला फोटोट्रांजिस्टर ऑप्टोकपलर।'], working: ['LED light drives an isolated NPN phototransistor. This is not a triac-output optocoupler.', 'LED का प्रकाश अलग NPN फोटोट्रांजिस्टर चलाता है। यह ट्रायक आउटपुट ऑप्टोकपलर नहीं है।'] },
  { ids: ['max485'], source: 'https://www.analog.com/media/en/technical-documentation/data-sheets/MAX1487-MAX491.pdf', category: 'Memory & Interface', packages: ['DIP-8', 'SO-8'], pins: 'RO /RE DE DI GND A B VCC', summary: ['5 V half-duplex RS-485 transceiver.', '5 V हाफ-डुप्लेक्स RS-485 ट्रांसीवर।'], working: ['Converts logic data to and from the differential A/B bus. DE and active-low RE control transmit and receive.', 'लॉजिक डेटा और डिफरेंशियल A/B बस के बीच रूपांतरण करता है। DE और लो-सक्रिय RE ट्रांसमिट और रिसीव नियंत्रित करते हैं।'], note: ['DIP/SO-8 only. The µMAX package has different pin numbers.', 'केवल DIP/SO-8। µMAX पैकेज में पिन नंबर अलग हैं।'] },
);

const cdQuad = '1A 1B 1Y 2Y 2A 2B GND 3A 3B 3Y 4Y 4A 4B VDD';
const hcQuad = '1A 1B 1Y 2A 2B 2Y GND 3Y 3A 3B 4Y 4A 4B VCC';
const hex = '1A 1Y 2A 2Y 3A 3Y GND 4Y 4A 5Y 5A 6Y 6A VCC';
for (const [id, source, kind, family] of [
  ['cd4011', 'cd4011b', 'NAND', 'cd'], ['cd4001', 'cd4001b', 'NOR', 'cd'],
  ['cd4081', 'cd4081b', 'AND', 'cd'], ['cd4071', 'cd4071b', 'OR', 'cd'], ['cd4093', 'cd4093b', 'Schmitt NAND', 'cd'],
  ['74hc00', 'sn74hc00', 'NAND', 'hc'], ['74hc08', 'sn74hc08', 'AND', 'hc'], ['74hc32', 'sn74hc32', 'OR', 'hc'],
  ['cd4069', 'cd4069ub', 'NOT', 'hex'], ['cd40106', 'cd40106b', 'Schmitt NOT', 'hex'],
  ['74hc04', 'sn74hc04', 'NOT', 'hex'], ['74hc14', 'sn74hc14', 'Schmitt NOT', 'hex'],
]) definitions.push({ ids: [id], source: ti(source), category: 'Logic & Switch', packages: ['PDIP-14', 'SOIC-14'], pins: family === 'cd' ? cdQuad : family === 'hc' ? hcQuad : hex,
  summary: [`${family === 'hex' ? 'Six' : 'Four'} ${kind} gates (${source.toUpperCase()}).`, `${family === 'hex' ? 'छह' : 'चार'} ${kind} गेट (${source.toUpperCase()})।`],
  working: [`Performs ${kind} logic. Supply and logic thresholds depend on the family; CD4000 and 74HC are not general substitutes.`, `${kind} लॉजिक करता है। सप्लाई और लॉजिक स्तर फैमिली पर निर्भर हैं; CD4000 और 74HC सीधे एक-दूसरे के विकल्प नहीं हैं।`],
});

type Description = [IcPin['type'], string, string];
const descriptions: Record<string, Description> = {
  'V-': ['Power', 'Negative supply; ground only in single-supply circuits.', 'नेगेटिव सप्लाई; सिंगल-सप्लाई सर्किट में ही ग्राउंड।'],
  GND: ['Ground', 'Supply return.', 'सप्लाई रिटर्न।'],
  NC: ['Passive', 'No internal connection.', 'अंदर कोई कनेक्शन नहीं।'],
  COM: ['Passive', 'Clamp-diode cathodes; connect to load supply when using clamps.', 'क्लैम्प डायोड कैथोड; क्लैम्प उपयोग में लोड सप्लाई से जोड़ें।'],
  EMIT_OUT: ['Output', 'Output transistor emitter, not the negative supply.', 'आउटपुट ट्रांजिस्टर एमिटर, नेगेटिव सप्लाई नहीं।'],
  COL_OUT: ['Output', 'Output collector; requires a pull-up.', 'आउटपुट कलेक्टर; पुल-अप चाहिए।'],
  BALANCE: ['Control', 'Offset balance terminal.', 'ऑफसेट बैलेंस टर्मिनल।'],
  'BAL/STRB': ['Control', 'Balance and strobe control.', 'बैलेंस और स्ट्रोब कंट्रोल।'],
  OFFSET_NULL: ['Control', 'Offset adjustment terminal.', 'ऑफसेट एडजस्टमेंट टर्मिनल।'],
  CT: ['Passive', 'Timing capacitor connection.', 'टाइमिंग कैपेसिटर कनेक्शन।'],
  RT: ['Passive', 'Timing resistor connection.', 'टाइमिंग रेजिस्टर कनेक्शन।'],
  'RT/CT': ['Passive', 'Timing resistor and capacitor connection.', 'टाइमिंग रेजिस्टर और कैपेसिटर कनेक्शन।'],
  DTC: ['Input', 'Dead-time control.', 'डेड-टाइम कंट्रोल।'],
  FEEDBACK: ['Input', 'Voltage feedback control.', 'वोल्टेज फीडबैक कंट्रोल।'],
  OUTPUT_CTRL: ['Control', 'Selects parallel or push-pull operation.', 'पैरेलल या पुश-पुल मोड चुनता है।'],
  COMP: ['Control', 'Error-amplifier compensation.', 'एरर एम्प्लीफायर कम्पेन्सेशन।'],
  VFB: ['Input', 'Voltage feedback input.', 'वोल्टेज फीडबैक इनपुट।'],
  ISENSE: ['Input', 'Switch current-sense input.', 'स्विच करंट-सेंस इनपुट।'],
  SYNC: ['Input', 'External synchronization.', 'बाहरी सिंक्रोनाइजेशन।'],
  OSC_OUT: ['Output', 'Oscillator output.', 'ऑसिलेटर आउटपुट।'],
  'CL+': ['Input', 'Positive current-limit input.', 'पॉजिटिव करंट-लिमिट इनपुट।'],
  'CL-': ['Input', 'Negative current-limit input.', 'नेगेटिव करंट-लिमिट इनपुट।'],
  DISCHARGE: ['Passive', 'Timing capacitor discharge connection.', 'टाइमिंग कैपेसिटर डिस्चार्ज कनेक्शन।'],
  SOFT_START: ['Control', 'Soft-start capacitor connection.', 'सॉफ्ट-स्टार्ट कैपेसिटर कनेक्शन।'],
  SHUTDOWN: ['Input', 'High level inhibits outputs.', 'हाई स्तर आउटपुट रोकता है।'],
  DISCH: ['Output', 'Timing capacitor discharge output.', 'टाइमिंग कैपेसिटर डिस्चार्ज आउटपुट।'],
  THRES: ['Input', 'Upper timing threshold input.', 'ऊपरी टाइमिंग थ्रेशोल्ड इनपुट।'],
  TRIG: ['Input', 'Lower timing threshold trigger.', 'निचले टाइमिंग थ्रेशोल्ड का ट्रिगर।'],
  RESET: ['Input', 'Active-low reset.', 'लो स्तर पर रीसेट।'],
  CONT: ['Control', 'Comparator threshold control voltage.', 'कंपैरेटर थ्रेशोल्ड कंट्रोल वोल्टेज।'],
  IN: ['Power', 'Regulator input supply.', 'रेगुलेटर इनपुट सप्लाई।'],
  ADJ: ['Control', 'Output adjustment feedback.', 'आउटपुट एडजस्टमेंट फीडबैक।'],
  'ADJ/GND': ['Control', 'ADJ on adjustable parts; GND on fixed-voltage parts.', 'एडजस्टेबल में ADJ; निश्चित वोल्टेज पार्ट में GND।'],
  SW_OUT: ['Output', 'Switch node to inductor and catch diode.', 'इंडक्टर और डायोड के लिए स्विचिंग नोड।'],
  'ON/OFF': ['Input', 'High shuts down; low enables.', 'हाई पर बंद; लो पर चालू।'],
  SW_COL: ['Input/Output', 'Internal switch collector.', 'आंतरिक स्विच कलेक्टर।'],
  SW_EMIT: ['Output', 'Internal switch emitter.', 'आंतरिक स्विच एमिटर।'],
  'COMP_IN-': ['Input', 'Inverting voltage-feedback input.', 'इनवर्टिंग वोल्टेज-फीडबैक इनपुट।'],
  IPK: ['Input', 'Peak current-sense input.', 'पीक करंट-सेंस इनपुट।'],
  DR_COL: ['Input/Output', 'Driver transistor collector.', 'ड्राइवर ट्रांजिस्टर कलेक्टर।'],
  ANODE: ['Input', 'LED anode; use current limiting.', 'LED एनोड; करंट लिमिट लगाएँ।'],
  CATHODE: ['Input', 'LED cathode.', 'LED कैथोड।'],
  EMITTER: ['Output', 'Phototransistor emitter.', 'फोटोट्रांजिस्टर एमिटर।'],
  COLLECTOR: ['Output', 'Phototransistor collector.', 'फोटोट्रांजिस्टर कलेक्टर।'],
  BASE: ['Control', 'Phototransistor base.', 'फोटोट्रांजिस्टर बेस।'],
  RO: ['Output', 'Receiver logic output.', 'रिसीवर लॉजिक आउटपुट।'],
  '/RE': ['Input', 'Receiver enable, active low.', 'रिसीवर इनेबल, लो-सक्रिय।'],
  DE: ['Input', 'Driver enable, active high.', 'ड्राइवर इनेबल, हाई-सक्रिय।'],
  DI: ['Input', 'Driver logic input.', 'ड्राइवर लॉजिक इनपुट।'],
  A: ['Input/Output', 'Non-inverting bus terminal.', 'नॉन-इनवर्टिंग बस टर्मिनल।'],
  B: ['Input/Output', 'Inverting bus terminal.', 'इनवर्टिंग बस टर्मिनल।'],
};

function describe(name: string, category: string): Description {
  if (name === 'VSS') return ['Ground', 'Negative supply / ground reference.', 'नेगेटिव सप्लाई / ग्राउंड संदर्भ।'];
  if (/^\/?Q[12]?$/.test(name)) return ['Output', name.startsWith('/') ? 'Complementary logic output.' : 'Logic output.', name.startsWith('/') ? 'उल्टा लॉजिक आउटपुट।' : 'लॉजिक आउटपुट।'];
  if (/^CLOCK[12]$/.test(name)) return ['Input', 'Rising-edge clock input.', 'बढ़ते किनारे वाला क्लॉक इनपुट।'];
  if (/^(RESET[12]|EXT_RESET)$/.test(name)) return ['Input', 'Asynchronous active-high reset.', 'क्लॉक से स्वतंत्र हाई-सक्रिय रीसेट।'];
  if (/^SET[12]$/.test(name)) return ['Input', 'Asynchronous active-high set.', 'क्लॉक से स्वतंत्र हाई-सक्रिय सेट।'];
  if (/^D[12]$/.test(name)) return ['Input', 'Flip-flop data input.', 'फ्लिप-फ्लॉप डेटा इनपुट।'];
  if (name === 'RC_COMMON') return ['Passive', 'Common connection for timing resistor and capacitor.', 'टाइमिंग रेजिस्टर और कैपेसिटर का कॉमन कनेक्शन।'];
  if (name === '/ASTABLE' || name === 'ASTABLE') return ['Input', name.startsWith('/') ? 'Low enables astable operation.' : 'High enables astable operation.', name.startsWith('/') ? 'लो पर अस्टेबल मोड चालू।' : 'हाई पर अस्टेबल मोड चालू।'];
  if (name === '-TRIGGER' || name === '+TRIGGER' || name === 'RETRIGGER') return ['Input', 'Timing trigger; follow the datasheet mode connections.', 'टाइमिंग ट्रिगर; डेटाशीट के मोड कनेक्शन देखें।'];
  if (descriptions[name]) return descriptions[name];
  if (/^V(CC|DD|C|\+)$/.test(name)) return ['Power', 'Positive supply; check exact part limits.', 'पॉजिटिव सप्लाई; पूरे पार्ट की सीमा देखें।'];
  if (/^(VREF|REF)$/.test(name)) return ['Output', 'Reference voltage output (not a supply input).', 'रेफरेंस वोल्टेज आउटपुट (सप्लाई इनपुट नहीं)।'];
  if (/^\dIN[+-]$/.test(name)) return ['Input', `${name.endsWith('+') ? 'Non-inverting' : 'Inverting'} input, channel ${name[0]}.`, `चैनल ${name[0]} का ${name.endsWith('+') ? 'नॉन-इनवर्टिंग' : 'इनवर्टिंग'} इनपुट।`];
  if (category === 'Timer' && /^\d/.test(name)) return describe(name.slice(1), category);
  if (/^(OUT|OUTPUT|OUT_[AB]|OUT[AB]|\dOUT)$/.test(name)) return ['Output', category === 'Comparator' ? 'Open-collector output; requires a pull-up.' : 'Circuit output.', category === 'Comparator' ? 'ओपन-कलेक्टर आउटपुट; पुल-अप चाहिए।' : 'सर्किट आउटपुट।'];
  if (/^(C[12]|COL[12])$/.test(name)) return ['Output', 'Output stage C / collector terminal.', 'आउटपुट स्टेज C / कलेक्टर टर्मिनल।'];
  if (/^(E[12]|EMIT[12])$/.test(name)) return ['Output', 'Output stage E / emitter terminal.', 'आउटपुट स्टेज E / एमिटर टर्मिनल।'];
  if (/^EN[AB]$/.test(name)) return ['Input', 'Channel enable; low disables.', 'चैनल इनेबल; लो पर बंद।'];
  if (/^IN[AB]$/.test(name)) return ['Input', 'Channel logic input.', 'चैनल लॉजिक इनपुट।'];
  if (/^\d[AB]$/.test(name)) return ['Input', `Channel ${name[0]} input.`, `चैनल ${name[0]} इनपुट।`];
  if (/^\dC$/.test(name)) return ['Output', `Channel ${name[0]} open-collector sink.`, `चैनल ${name[0]} ओपन-कलेक्टर सिंक।`];
  if (/^\dY$/.test(name)) return ['Output', `Gate ${name[0]} output.`, `गेट ${name[0]} आउटपुट।`];
  throw new Error(`Missing reviewed pin description: ${name}`);
}

export const reviewedIcs = new Map<string, Partial<IcDetail>>();
for (const spec of definitions) {
  const pins = spec.pins.split(' ').map((name, index): IcPin => {
    const [type, descEn, descHi] = describe(name, spec.category);
    return { pin: index + 1, name, type, descEn, descHi };
  });
  for (const id of spec.ids) {
    if (reviewedIcs.has(id)) throw new Error(`Duplicate reviewed IC: ${id}`);
    reviewedIcs.set(id, {
      verification: 'verified', datasheetUrl: spec.source, category: spec.category,
      totalPins: pins.length, pins, dipPackageName: spec.packages[0], smdPackageName: spec.packages[1],
      diagramLayout: spec.layout ?? 'dual-row', simpleSummaryEn: spec.summary[0], simpleSummaryHi: spec.summary[1],
      workingPrincipleEn: spec.working[0], workingPrincipleHi: spec.working[1],
      pinoutNoteEn: spec.note?.[0] ?? 'Only the listed packages are covered. Identify pin 1 using the manufacturer drawing; other packages can differ.',
      pinoutNoteHi: spec.note?.[1] ?? 'केवल दिए गए पैकेज पर लागू। पिन 1 के लिए निर्माता का चित्र देखें; अन्य पैकेज अलग हो सकते हैं।',
    });
  }
}
