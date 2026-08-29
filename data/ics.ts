export type IcPin = {
  pin: number;
  name: string;
  type: 'Power' | 'Ground' | 'Input' | 'Output' | 'Control' | 'Passive';
  descEn: string;
  descHi: string;
};

export type IcDetail = {
  id: string;
  name: string;
  aliases: string[];
  category: 'Op-Amp' | 'PWM Driver' | 'MOSFET Driver' | 'Darlington Driver' | 'Optocoupler' | 'Regulator' | 'Microcontroller' | 'Timer' | 'Logic & Switch' | 'Memory & Interface';
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
};

export const IC_DATABASE: IcDetail[] = [
  {
  "id": "lm324",
  "name": "LM324 / LM324N",
  "aliases": [
    "LM324",
    "LM324N",
    "LM324D",
    "GL324"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad Op-Amp IC with 4 independent comparators.",
  "simpleSummaryHi": "क्वाड ऑप-एम्प IC — 4 स्वतंत्र कंपैरेटर।",
  "workingPrincipleEn": "LM324 / LM324N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM324 / LM324N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "lm358",
  "name": "LM358 / LM358P",
  "aliases": [
    "LM358",
    "LM358N",
    "LM358D"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual Op-Amp comparator in compact 8-pin package.",
  "simpleSummaryHi": "ड्यूल ऑप-एम्प IC — 8-पिन में 2 कंपैरेटर।",
  "workingPrincipleEn": "LM358 / LM358P operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM358 / LM358P इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm339",
  "name": "LM339 / LM339N",
  "aliases": [
    "LM339",
    "LM339N",
    "LM339D"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad differential voltage comparator with open-collector outputs.",
  "simpleSummaryHi": "क्वाड वोल्टेज कंपैरेटर IC।",
  "workingPrincipleEn": "LM339 / LM339N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM339 / LM339N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "lm393",
  "name": "LM393 / LM393N",
  "aliases": [
    "LM393",
    "LM393D",
    "LM2903"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual precision voltage comparator with open-collector outputs.",
  "simpleSummaryHi": "ड्यूल वोल्टेज कंपैरेटर IC।",
  "workingPrincipleEn": "LM393 / LM393N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM393 / LM393N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "tl084",
  "name": "TL084 / TL084CN",
  "aliases": [
    "TL084",
    "TL084CD",
    "LF347"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad JFET-input operational amplifier for sine wave filters.",
  "simpleSummaryHi": "क्वाड JFET ऑप-एम्प — साइन वेव फिल्टर।",
  "workingPrincipleEn": "TL084 / TL084CN operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL084 / TL084CN इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "tl082",
  "name": "TL082 / TL082CP",
  "aliases": [
    "TL082",
    "TL082CD",
    "LF353"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual JFET-input high speed operational amplifier.",
  "simpleSummaryHi": "ड्यूल JFET हाई-स्पीड ऑप-एम्प।",
  "workingPrincipleEn": "TL082 / TL082CP operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL082 / TL082CP इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "tl074",
  "name": "TL074 / TL074CN",
  "aliases": [
    "TL074",
    "TL074CD"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Low noise quad JFET-input operational amplifier.",
  "simpleSummaryHi": "लो-नॉइज़ क्वाड JFET ऑप-एम्प।",
  "workingPrincipleEn": "TL074 / TL074CN operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL074 / TL074CN इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "tl072",
  "name": "TL072 / TL072CP",
  "aliases": [
    "TL072",
    "TL072CD"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Low noise dual JFET-input operational amplifier.",
  "simpleSummaryHi": "लो-नॉइज़ ड्यूल JFET ऑप-एम्प।",
  "workingPrincipleEn": "TL072 / TL072CP operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL072 / TL072CP इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "tl064",
  "name": "TL064 / TL064CN",
  "aliases": [
    "TL064",
    "TL064CD"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Low-power quad JFET operational amplifier.",
  "simpleSummaryHi": "लो-पावर क्वाड JFET ऑप-एम्प।",
  "workingPrincipleEn": "TL064 / TL064CN operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL064 / TL064CN इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "tl062",
  "name": "TL062 / TL062CP",
  "aliases": [
    "TL062",
    "TL062CD"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Low-power dual JFET operational amplifier.",
  "simpleSummaryHi": "लो-पावर ड्यूल JFET ऑप-एम्प।",
  "workingPrincipleEn": "TL062 / TL062CP operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL062 / TL062CP इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm311",
  "name": "LM311 / LM311N",
  "aliases": [
    "LM311",
    "LM311P",
    "LM311D"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "High-speed single voltage comparator with strobe input.",
  "simpleSummaryHi": "हाई-स्पीड सिंगल वोल्टेज कंपैरेटर।",
  "workingPrincipleEn": "LM311 / LM311N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM311 / LM311N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "ne5532",
  "name": "NE5532 / NE5532P",
  "aliases": [
    "NE5532",
    "NE5532D",
    "SA5532"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual ultra-low noise high-performance op-amp.",
  "simpleSummaryHi": "ड्यूल अल्ट्रा लो-नॉइज़ ऑप-एम्प।",
  "workingPrincipleEn": "NE5532 / NE5532P operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "NE5532 / NE5532P इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "op07",
  "name": "OP07 / OP07CP",
  "aliases": [
    "OP07",
    "OP07C",
    "OP07D"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Ultra-low offset precision op-amp for shunt sensing.",
  "simpleSummaryHi": "अल्ट्रा-लो ऑफसेट प्रिसिजन ऑप-एम्प।",
  "workingPrincipleEn": "OP07 / OP07CP operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "OP07 / OP07CP इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm741",
  "name": "LM741 / UA741",
  "aliases": [
    "LM741CN",
    "UA741CP"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "General purpose single operational amplifier.",
  "simpleSummaryHi": "जनरल पर्पस सिंगल ऑप-एम्प।",
  "workingPrincipleEn": "LM741 / UA741 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM741 / UA741 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm833",
  "name": "LM833 / LM833N",
  "aliases": [
    "LM833",
    "LM833D"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual high-speed operational amplifier with low distortion.",
  "simpleSummaryHi": "ड्यूल हाई-स्पीड ऑप-एम्प।",
  "workingPrincipleEn": "LM833 / LM833N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM833 / LM833N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm2902",
  "name": "LM2902 / LM2902N",
  "aliases": [
    "LM2902",
    "LM2902D"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Automotive & industrial grade quad op-amp (-40C to +125C).",
  "simpleSummaryHi": "इंडस्ट्रियल ग्रेड क्वाड ऑप-एम्प।",
  "workingPrincipleEn": "LM2902 / LM2902N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM2902 / LM2902N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "lm2904",
  "name": "LM2904 / LM2904N",
  "aliases": [
    "LM2904",
    "LM2904D"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Industrial grade dual operational amplifier.",
  "simpleSummaryHi": "इंडस्ट्रियल ग्रेड ड्यूल ऑप-एम्प।",
  "workingPrincipleEn": "LM2904 / LM2904N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM2904 / LM2904N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "ca3140",
  "name": "CA3140 / CA3140E",
  "aliases": [
    "CA3140",
    "CA3140A"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "BiMOS op-amp with MOSFET input and high impedance.",
  "simpleSummaryHi": "BiMOS ऑप-एम्प — MOSFET इनपुट।",
  "workingPrincipleEn": "CA3140 / CA3140E operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CA3140 / CA3140E इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "mcp6002",
  "name": "MCP6002",
  "aliases": [
    "MCP6002-I/P",
    "MCP6002-I/SN"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual 1MHz rail-to-rail operational amplifier (1.8V to 6V).",
  "simpleSummaryHi": "ड्यूल रेल-टू-रेल 5V ऑप-एम्प।",
  "workingPrincipleEn": "MCP6002 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MCP6002 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "mcp6004",
  "name": "MCP6004",
  "aliases": [
    "MCP6004-I/P",
    "MCP6004-I/SL"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad rail-to-rail op-amp for low voltage digital inverter boards.",
  "simpleSummaryHi": "क्वाड रेल-टू-रेल 5V ऑप-एम्प।",
  "workingPrincipleEn": "MCP6004 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MCP6004 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "njm4558",
  "name": "NJM4558 / RC4558",
  "aliases": [
    "RC4558",
    "MC4558",
    "JRC4558"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Classic dual operational amplifier for analog control boards.",
  "simpleSummaryHi": "क्लासिक ड्यूल ऑप-एम्प IC।",
  "workingPrincipleEn": "NJM4558 / RC4558 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "NJM4558 / RC4558 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm348",
  "name": "LM348 / LM348N",
  "aliases": [
    "LM348",
    "LM348D"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad 741 operational amplifier.",
  "simpleSummaryHi": "क्वाड 741 ऑप-एम्प।",
  "workingPrincipleEn": "LM348 / LM348N operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM348 / LM348N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "lm301",
  "name": "LM301 / LM301A",
  "aliases": [
    "LM301",
    "LM301AN"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "General purpose operational amplifier with offset balance.",
  "simpleSummaryHi": "जनरल पर्पस ऑप-एम्प IC।",
  "workingPrincipleEn": "LM301 / LM301A operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM301 / LM301A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "tlv2372",
  "name": "TLV2372",
  "aliases": [
    "TLV2372IP",
    "TLV2372ID"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "550-µA rail-to-rail dual operational amplifier.",
  "simpleSummaryHi": "रेल-टू-रेल ड्यूल प्रिसिजन ऑप-एम्प।",
  "workingPrincipleEn": "TLV2372 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TLV2372 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "tlc272",
  "name": "TLC272",
  "aliases": [
    "TLC272CP",
    "TLC272CD"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual LinCMOS precision operational amplifier.",
  "simpleSummaryHi": "LinCMOS प्रिसिजन ड्यूल ऑप-एम्प।",
  "workingPrincipleEn": "TLC272 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TLC272 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "tlc274",
  "name": "TLC274",
  "aliases": [
    "TLC274CN",
    "TLC274CD"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad LinCMOS precision operational amplifier.",
  "simpleSummaryHi": "LinCMOS प्रिसिजन क्वाड ऑप-एम्प।",
  "workingPrincipleEn": "TLC274 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TLC274 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "lmv324",
  "name": "LMV324",
  "aliases": [
    "LMV324I",
    "LMV324IDR"
  ],
  "category": "Op-Amp",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Low-voltage rail-to-rail output quad op-amp (2.7V to 5.5V).",
  "simpleSummaryHi": "लो-वोल्टेज रेल-टू-रेल क्वाड ऑप-एम्प।",
  "workingPrincipleEn": "LMV324 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LMV324 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "lmv358",
  "name": "LMV358",
  "aliases": [
    "LMV358IDR",
    "LMV358IP"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Low-voltage rail-to-rail output dual op-amp.",
  "simpleSummaryHi": "लो-वोल्टेज रेल-टू-रेल ड्यूल ऑप-एम्प।",
  "workingPrincipleEn": "LMV358 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LMV358 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm6172",
  "name": "LM6172",
  "aliases": [
    "LM6172IN",
    "LM6172IM"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual high speed, low power, 3000V/µs slew rate op-amp.",
  "simpleSummaryHi": "अल्ट्रा हाई-स्पीड ड्यूल ऑप-एम्प।",
  "workingPrincipleEn": "LM6172 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM6172 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "max913",
  "name": "MAX913",
  "aliases": [
    "MAX913CPA",
    "MAX913CSA"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Single ultra-fast 10ns TTL voltage comparator.",
  "simpleSummaryHi": "10ns अल्ट्रा-फास्ट वोल्टेज कंपैरेटर।",
  "workingPrincipleEn": "MAX913 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MAX913 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "lm321",
  "name": "LM321",
  "aliases": [
    "LM321MF",
    "LM321MFX"
  ],
  "category": "Op-Amp",
  "totalPins": 5,
  "dipPackageName": "TO-220-5",
  "smdPackageName": "TO-263-5 / D2PAK",
  "simpleSummaryEn": "Single general purpose low-power operational amplifier.",
  "simpleSummaryHi": "सिंगल 5-पिन ऑप-एम्प IC।",
  "workingPrincipleEn": "LM321 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM321 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 1",
      "descHi": "ऑप-एम्प 1 (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 1",
      "descHi": "ऑप-एम्प 1 (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Power Supply (+12V)",
      "descHi": "पॉजिटिव 12V सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 2",
      "descHi": "ऑप-एम्प 2 (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 2",
      "descHi": "ऑप-एम्प 2 (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट"
    },
    {
      "pin": 8,
      "name": "3OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 3",
      "descHi": "ऑप-एम्प 3 का आउटपुट"
    },
    {
      "pin": 9,
      "name": "3IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 3",
      "descHi": "ऑप-एम्प 3 (-) इनपुट"
    },
    {
      "pin": 10,
      "name": "3IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 3",
      "descHi": "ऑप-एम्प 3 (+) इनपुट"
    },
    {
      "pin": 11,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 12,
      "name": "4IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) 4",
      "descHi": "ऑप-एम्प 4 (+) इनपुट"
    },
    {
      "pin": 13,
      "name": "4IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) 4",
      "descHi": "ऑप-एम्प 4 (-) इनपुट"
    },
    {
      "pin": 14,
      "name": "4OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 4",
      "descHi": "ऑप-एम्प 4 का आउटपुट"
    }
  ]
},
  {
  "id": "ina128",
  "name": "INA128",
  "aliases": [
    "INA128P",
    "INA128U"
  ],
  "category": "Op-Amp",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Precision low power instrumentation amplifier for shunt sensing.",
  "simpleSummaryHi": "प्रिसिजन इंस्ट्रूमेंटेशन एम्पलीफायर।",
  "workingPrincipleEn": "INA128 operates as a high-reliability Op-Amp in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "INA128 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Op-Amp के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "1OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का आउटपुट सिग्नल"
    },
    {
      "pin": 2,
      "name": "1IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (-) इनपुट"
    },
    {
      "pin": 3,
      "name": "1IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 1",
      "descHi": "ऑप-एम्प 1 का (+) इनपुट"
    },
    {
      "pin": 4,
      "name": "GND / V-",
      "type": "Ground",
      "descEn": "Ground / Negative Power Supply (0V or -12V)",
      "descHi": "ग्राउंड / नेगेटिव सप्लाई"
    },
    {
      "pin": 5,
      "name": "2IN+",
      "type": "Input",
      "descEn": "Non-Inverting Input (+) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (+) इनपुट"
    },
    {
      "pin": 6,
      "name": "2IN-",
      "type": "Input",
      "descEn": "Inverting Input (-) of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का (-) इनपुट"
    },
    {
      "pin": 7,
      "name": "2OUT",
      "type": "Output",
      "descEn": "Output of Op-Amp 2",
      "descHi": "ऑप-एम्प 2 का आउटपुट सिग्नल"
    },
    {
      "pin": 8,
      "name": "VCC / V+",
      "type": "Power",
      "descEn": "Positive Power Supply (+5V to +30V DC)",
      "descHi": "पॉजिटिव सप्लाई पिन (+12V DC)"
    }
  ]
},
  {
  "id": "sg3525",
  "name": "SG3525 / KA3525",
  "aliases": [
    "SG3525A",
    "KA3525A",
    "SG3525N"
  ],
  "category": "PWM Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Push-pull PWM controller for inverter MOSFET switching.",
  "simpleSummaryHi": "पीडब्लूएम (PWM) इन्वर्टर कंट्रोलर।",
  "workingPrincipleEn": "SG3525 / KA3525 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "SG3525 / KA3525 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "sg3524",
  "name": "SG3524",
  "aliases": [
    "SG3524N",
    "SG3524D"
  ],
  "category": "PWM Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Regulating pulse width modulator with push-pull outputs.",
  "simpleSummaryHi": "रेगुलेटिंग पल्स विड्थ मॉड्यूलेटर।",
  "workingPrincipleEn": "SG3524 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "SG3524 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "tl494",
  "name": "TL494 / KA7500",
  "aliases": [
    "TL494CN",
    "KA7500B",
    "DBL494"
  ],
  "category": "PWM Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Standard PWM control circuit with dual error amplifiers.",
  "simpleSummaryHi": "क्लासिक PWM कंट्रोलर IC।",
  "workingPrincipleEn": "TL494 / KA7500 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL494 / KA7500 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "ka7500",
  "name": "KA7500",
  "aliases": [
    "KA7500B",
    "TL494"
  ],
  "category": "PWM Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Direct equivalent to TL494 PWM controller.",
  "simpleSummaryHi": "TL494 का डायरेक्ट समतुल्य।",
  "workingPrincipleEn": "KA7500 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "KA7500 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "uc3842",
  "name": "UC3842 / UC3842B",
  "aliases": [
    "UC3842",
    "KA3842"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Current-mode PWM controller for offline flyback SMPS.",
  "simpleSummaryHi": "करंट-मोड SMPS PWM कंट्रोलर।",
  "workingPrincipleEn": "UC3842 / UC3842B operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UC3842 / UC3842B इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "uc3843",
  "name": "UC3843 / UC3843B",
  "aliases": [
    "UC3843",
    "KA3843"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Current-mode PWM controller (8.4V startup) for DC-DC boost.",
  "simpleSummaryHi": "8.4V लो-स्टार्टअप PWM कंट्रोलर।",
  "workingPrincipleEn": "UC3843 / UC3843B operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UC3843 / UC3843B इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "uc3844",
  "name": "UC3844 / UC3844B",
  "aliases": [
    "UC3844",
    "KA3844"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Current-mode PWM controller with 16V UVLO and 50% duty clamp.",
  "simpleSummaryHi": "50% ड्यूटी लिमिट करंट मोड PWM।",
  "workingPrincipleEn": "UC3844 / UC3844B operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UC3844 / UC3844B इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "uc3845",
  "name": "UC3845 / UC3845B",
  "aliases": [
    "UC3845",
    "KA3845"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Current-mode PWM controller with 8.4V UVLO and 50% duty clamp.",
  "simpleSummaryHi": "8.4V UVLO 50% ड्यूटी PWM।",
  "workingPrincipleEn": "UC3845 / UC3845B operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UC3845 / UC3845B इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "uc3846",
  "name": "UC3846",
  "aliases": [
    "UC3846N",
    "UC3846DW"
  ],
  "category": "PWM Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Current-mode push-pull PWM controller for high power inverters.",
  "simpleSummaryHi": "करंट-मोड पुश-पुल PWM कंट्रोलर।",
  "workingPrincipleEn": "UC3846 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UC3846 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "uc3825",
  "name": "UC3825",
  "aliases": [
    "UC3825N",
    "UC3825DW"
  ],
  "category": "PWM Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "High-speed 1MHz PWM controller for high frequency inverters.",
  "simpleSummaryHi": "1MHz हाई-स्पीड PWM कंट्रोलर।",
  "workingPrincipleEn": "UC3825 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UC3825 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "sg3526",
  "name": "SG3526",
  "aliases": [
    "SG3526N",
    "SG3526DW"
  ],
  "category": "PWM Driver",
  "totalPins": 18,
  "dipPackageName": "DIP-18",
  "smdPackageName": "SOIC-18 / SOP-18",
  "simpleSummaryEn": "Improved regulating pulse width modulator with soft-start.",
  "simpleSummaryHi": "उन्नत पुश-पुल PWM कंट्रोलर।",
  "workingPrincipleEn": "SG3526 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "SG3526 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "viper12a",
  "name": "VIPer12A",
  "aliases": [
    "VIPer12AS",
    "VIPer12ADIP"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Offline SMPS switcher with integrated 730V MOSFET.",
  "simpleSummaryHi": "ऑफ़लाइन 730V SMPS स्विचर।",
  "workingPrincipleEn": "VIPer12A operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "VIPer12A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "viper22a",
  "name": "VIPer22A",
  "aliases": [
    "VIPer22AS",
    "VIPer22ADIP"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "20W offline SMPS switcher with integrated 730V MOSFET.",
  "simpleSummaryHi": "20W SMPS स्विचर चिप।",
  "workingPrincipleEn": "VIPer22A operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "VIPer22A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "tny266",
  "name": "TNY266",
  "aliases": [
    "TNY266P",
    "TNY266G"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "TinySwitch-II 10W offline SMPS switcher.",
  "simpleSummaryHi": "10W स्टैंडबाय SMPS IC।",
  "workingPrincipleEn": "TNY266 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TNY266 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "tny268",
  "name": "TNY268",
  "aliases": [
    "TNY268PN",
    "TNY268GN"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "TinySwitch-II 15W offline switcher with 700V MOSFET.",
  "simpleSummaryHi": "15W स्टैंडबाय SMPS IC।",
  "workingPrincipleEn": "TNY268 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TNY268 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "tny274",
  "name": "TNY274",
  "aliases": [
    "TNY274PN",
    "TNY274GN"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "TinySwitch-III 8.5W offline switcher.",
  "simpleSummaryHi": "TinySwitch-3 8.5W स्विचर।",
  "workingPrincipleEn": "TNY274 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TNY274 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "tny278",
  "name": "TNY278",
  "aliases": [
    "TNY278PN",
    "TNY278GN"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "TinySwitch-III 28W peak offline switcher.",
  "simpleSummaryHi": "28W स्टैंडबाय SMPS IC।",
  "workingPrincipleEn": "TNY278 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TNY278 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "top224",
  "name": "TOP224",
  "aliases": [
    "TOP224P",
    "TOP224Y"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "TOPSwitch-II 30W offline switcher IC.",
  "simpleSummaryHi": "TOPSwitch 30W स्विचर IC।",
  "workingPrincipleEn": "TOP224 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TOP224 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "top247",
  "name": "TOP247",
  "aliases": [
    "TOP247Y",
    "TOP247F"
  ],
  "category": "PWM Driver",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "TOPSwitch-GX high-power offline switcher for battery chargers.",
  "simpleSummaryHi": "हाई-पावर SMPS चार्जर IC।",
  "workingPrincipleEn": "TOP247 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TOP247 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "top258",
  "name": "TOP258",
  "aliases": [
    "TOP258PN",
    "TOP258MG"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "TOPSwitch-HX 48W offline switcher.",
  "simpleSummaryHi": "TOPSwitch-HX 48W IC।",
  "workingPrincipleEn": "TOP258 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TOP258 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "lnk304",
  "name": "LNK304",
  "aliases": [
    "LNK304PN",
    "LNK304GN"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "LinkSwitch-TN non-isolated buck converter switcher (120mA).",
  "simpleSummaryHi": "नॉन-आइसोलेटेड बक कनवर्टर IC।",
  "workingPrincipleEn": "LNK304 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LNK304 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "lnk306",
  "name": "LNK306",
  "aliases": [
    "LNK306PN",
    "LNK306GN"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "LinkSwitch-TN non-isolated buck switcher (225mA).",
  "simpleSummaryHi": "LinkSwitch 225mA बक IC।",
  "workingPrincipleEn": "LNK306 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LNK306 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "ob2263",
  "name": "OB2263",
  "aliases": [
    "OB2263MP",
    "OB2262"
  ],
  "category": "PWM Driver",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "Current-mode PWM controller with low standby power.",
  "simpleSummaryHi": "लो-पावर SMPS PWM कंट्रोलर।",
  "workingPrincipleEn": "OB2263 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "OB2263 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "ob2269",
  "name": "OB2269",
  "aliases": [
    "OB2269CP",
    "OB2269AP"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "High-voltage startup current mode PWM controller.",
  "simpleSummaryHi": "हाई-वोल्टेज SMPS PWM कंट्रोलर।",
  "workingPrincipleEn": "OB2269 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "OB2269 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "cr6842",
  "name": "CR6842",
  "aliases": [
    "CR6842S",
    "CR6842T"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Low cost green-power PWM controller for SMPS cards.",
  "simpleSummaryHi": "ग्रीन-पावर SMPS PWM चिप।",
  "workingPrincipleEn": "CR6842 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CR6842 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "cr6850",
  "name": "CR6850",
  "aliases": [
    "CR6850T",
    "CR6850S"
  ],
  "category": "PWM Driver",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "Ultra-low startup current PWM controller.",
  "simpleSummaryHi": "अल्ट्रा-लो करंट PWM IC।",
  "workingPrincipleEn": "CR6850 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CR6850 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "INV_IN",
      "type": "Input",
      "descEn": "Inverting Error Input (Feedback)",
      "descHi": "एरर एम्पलीफायर फीडबैक"
    },
    {
      "pin": 2,
      "name": "NON_INV",
      "type": "Input",
      "descEn": "Non-Inverting Reference Input",
      "descHi": "रेफरेंस इनपुट"
    },
    {
      "pin": 3,
      "name": "SYNC",
      "type": "Control",
      "descEn": "Clock Synchronization Input",
      "descHi": "क्लॉक सिंक"
    },
    {
      "pin": 4,
      "name": "OSC_OUT",
      "type": "Output",
      "descEn": "Oscillator Output",
      "descHi": "ऑसिलेटर आउटपुट"
    },
    {
      "pin": 5,
      "name": "CT",
      "type": "Passive",
      "descEn": "Timing Capacitor Pin",
      "descHi": "टाइमिंग कैपेसिटर"
    },
    {
      "pin": 6,
      "name": "RT",
      "type": "Passive",
      "descEn": "Timing Resistor Pin",
      "descHi": "टाइमिंग रेजिस्टेंस"
    },
    {
      "pin": 7,
      "name": "DISCHARGE",
      "type": "Control",
      "descEn": "Deadtime Control Resistor Pin",
      "descHi": "डेड-टाइम कंट्रोल"
    },
    {
      "pin": 8,
      "name": "SOFT_START",
      "type": "Control",
      "descEn": "Soft Start Capacitor Pin",
      "descHi": "सॉफ्ट स्टार्ट"
    },
    {
      "pin": 9,
      "name": "COMP",
      "type": "Control",
      "descEn": "Feedback Compensation",
      "descHi": "फीडबैक कंपनसेशन"
    },
    {
      "pin": 10,
      "name": "SHUTDOWN",
      "type": "Control",
      "descEn": "Shutdown Pin (High = Stop PWM)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 11,
      "name": "OUT_A",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output A",
      "descHi": "MOSFET गेट आउटपुट A"
    },
    {
      "pin": 12,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 13,
      "name": "VC",
      "type": "Power",
      "descEn": "Collector Supply (+12V)",
      "descHi": "कलेक्टर सप्लाई (+12V)"
    },
    {
      "pin": 14,
      "name": "OUT_B",
      "type": "Output",
      "descEn": "MOSFET Gate Drive Output B",
      "descHi": "MOSFET गेट आउटपुट B"
    },
    {
      "pin": 15,
      "name": "VCC",
      "type": "Power",
      "descEn": "Main Supply (+12V DC)",
      "descHi": "मेन सप्लाई (+12V)"
    },
    {
      "pin": 16,
      "name": "VREF",
      "type": "Output",
      "descEn": "Internal 5.1V Reference",
      "descHi": "5.1V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "ld7575",
  "name": "LD7575",
  "aliases": [
    "LD7575PS",
    "LD7575PN"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Green-mode PWM controller with high-voltage startup.",
  "simpleSummaryHi": "हाई-वोल्टेज स्टार्ट SMPS IC।",
  "workingPrincipleEn": "LD7575 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LD7575 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "ncp1200",
  "name": "NCP1200",
  "aliases": [
    "NCP1200P60",
    "NCP1200D60"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Current-mode controller for low-power flyback SMPS.",
  "simpleSummaryHi": "करंट-मोड SMPS कंट्रोलर।",
  "workingPrincipleEn": "NCP1200 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "NCP1200 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "ncp1203",
  "name": "NCP1203",
  "aliases": [
    "NCP1203P60",
    "NCP1203D60"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "PWM controller with auto-recovery overload protection.",
  "simpleSummaryHi": "ऑटो-रिकवरी SMPS PWM IC।",
  "workingPrincipleEn": "NCP1203 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "NCP1203 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "mc34063",
  "name": "MC34063",
  "aliases": [
    "MC34063A",
    "MC34063AP"
  ],
  "category": "PWM Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "1.5A peak DC-DC converter (Buck, Boost, Inverting).",
  "simpleSummaryHi": "1.5A DC-DC कनवर्टर IC।",
  "workingPrincipleEn": "MC34063 operates as a high-reliability PWM Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MC34063 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में PWM Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "COMP",
      "type": "Control",
      "descEn": "Error Amplifier Output / Compensation",
      "descHi": "एरर एम्पलीफायर कंपनसेशन"
    },
    {
      "pin": 2,
      "name": "VFB",
      "type": "Input",
      "descEn": "Voltage Feedback Input from Optocoupler",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 3,
      "name": "ISENSE",
      "type": "Input",
      "descEn": "Current Sense Input from Source Shunt",
      "descHi": "करंट सेंस इनपुट"
    },
    {
      "pin": 4,
      "name": "RT/CT",
      "type": "Passive",
      "descEn": "Oscillator Timing Resistor & Capacitor",
      "descHi": "टाइमिंग RC पिन"
    },
    {
      "pin": 5,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 6,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Totem-Pole MOSFET Gate Drive Output",
      "descHi": "MOSFET गेट ड्राइव आउटपुट"
    },
    {
      "pin": 7,
      "name": "VCC",
      "type": "Power",
      "descEn": "DC Power Supply (+12V to +18V DC)",
      "descHi": "सप्लाई वोल्टेज (+12V)"
    },
    {
      "pin": 8,
      "name": "VREF",
      "type": "Output",
      "descEn": "Precision +5.0V Reference Output",
      "descHi": "5.0V रेफरेंस आउटपुट"
    }
  ]
},
  {
  "id": "ir2110",
  "name": "IR2110",
  "aliases": [
    "IR2110PBF",
    "IR2110S",
    "IRS2110"
  ],
  "category": "MOSFET Driver",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "500V High and Low Side Gate Driver for H-Bridge inverters.",
  "simpleSummaryHi": "500V हाई व लो साइड MOSFET ड्राइवर।",
  "workingPrincipleEn": "IR2110 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2110 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "ir2113",
  "name": "IR2113",
  "aliases": [
    "IR2113PBF",
    "IR2113S",
    "IRS2113"
  ],
  "category": "MOSFET Driver",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "600V High and Low Side Gate Driver for high-power sine wave inverters.",
  "simpleSummaryHi": "600V हाई व लो साइड MOSFET ड्राइवर।",
  "workingPrincipleEn": "IR2113 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2113 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "ir2101",
  "name": "IR2101",
  "aliases": [
    "IR2101PBF",
    "IR2101S",
    "IRS2101"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Compact 8-pin high and low side gate driver IC (600V).",
  "simpleSummaryHi": "8-पिन हाई और लो साइड ड्राइवर।",
  "workingPrincipleEn": "IR2101 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2101 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "ir2104",
  "name": "IR2104",
  "aliases": [
    "IR2104PBF",
    "IR2104S",
    "IRS2104"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Half-bridge gate driver with built-in dead-time and shutdown.",
  "simpleSummaryHi": "डेड-टाइम युक्त हाफ-ब्रिज ड्राइवर।",
  "workingPrincipleEn": "IR2104 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2104 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "ir2106",
  "name": "IR2106",
  "aliases": [
    "IR2106PBF",
    "IR2106S"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "High and low side gate driver with matched propagation delays.",
  "simpleSummaryHi": "हाई व लो साइड MOSFET ड्राइवर।",
  "workingPrincipleEn": "IR2106 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2106 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "ir2108",
  "name": "IR2108",
  "aliases": [
    "IR2108PBF",
    "IR2108S"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Half-bridge gate driver with programmable dead-time.",
  "simpleSummaryHi": "एडजस्टेबल डेड-टाइम हाफ-ब्रिज ड्राइवर।",
  "workingPrincipleEn": "IR2108 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2108 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "ir2184",
  "name": "IR2184",
  "aliases": [
    "IR2184PBF",
    "IR2184S",
    "IRS2184"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "1.9A/2.3A high-current half-bridge gate driver for paralleled MOSFETs.",
  "simpleSummaryHi": "1.9A हाई-करंट हाफ-ब्रिज ड्राइवर।",
  "workingPrincipleEn": "IR2184 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2184 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "ir2130",
  "name": "IR2130",
  "aliases": [
    "IR2130PBF",
    "IR2130J"
  ],
  "category": "MOSFET Driver",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "3-Phase Bridge Driver IC for 3-phase sine wave inverters.",
  "simpleSummaryHi": "3-फेज ब्रिज MOSFET/IGBT ड्राइवर।",
  "workingPrincipleEn": "IR2130 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2130 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "ir2136",
  "name": "IR2136",
  "aliases": [
    "IR2136PBF",
    "IR2136J"
  ],
  "category": "MOSFET Driver",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "3-Phase Bridge Driver with overcurrent trip and fault status.",
  "simpleSummaryHi": "3-फेज इन्वर्टर ब्रिज ड्राइवर।",
  "workingPrincipleEn": "IR2136 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IR2136 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "tc4420",
  "name": "TC4420",
  "aliases": [
    "TC4420EPA",
    "TC4420EOA"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "6A high-speed non-inverting MOSFET gate driver.",
  "simpleSummaryHi": "6A हाई-स्पीड MOSFET ड्राइवर।",
  "workingPrincipleEn": "TC4420 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TC4420 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "tc4429",
  "name": "TC4429",
  "aliases": [
    "TC4429EPA",
    "TC4429EOA"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "6A high-speed inverting MOSFET gate driver.",
  "simpleSummaryHi": "6A इनवर्टिंग MOSFET ड्राइवर।",
  "workingPrincipleEn": "TC4429 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TC4429 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "tc4427",
  "name": "TC4427",
  "aliases": [
    "TC4427EPA",
    "MIC4427"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual 1.5A non-inverting MOSFET driver.",
  "simpleSummaryHi": "ड्यूल 1.5A MOSFET गेट ड्राइवर।",
  "workingPrincipleEn": "TC4427 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TC4427 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "tc4428",
  "name": "TC4428",
  "aliases": [
    "TC4428EPA",
    "MIC4428"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual 1.5A (1 inverting + 1 non-inverting) MOSFET driver.",
  "simpleSummaryHi": "ड्यूल 1.5A कॉम्प्लिमेंटरी ड्राइवर।",
  "workingPrincipleEn": "TC4428 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TC4428 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "fan7392",
  "name": "FAN7392",
  "aliases": [
    "FAN7392N",
    "FAN7392MX"
  ],
  "category": "MOSFET Driver",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "3.3A 600V high-current gate driver with noise cancellation.",
  "simpleSummaryHi": "3.3A 600V हाई-करंट गेट ड्राइवर।",
  "workingPrincipleEn": "FAN7392 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "FAN7392 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "fan7380",
  "name": "FAN7380",
  "aliases": [
    "FAN7380MX",
    "FAN7380M"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Half-bridge gate driver with built-in shoot-through protection.",
  "simpleSummaryHi": "हाफ-ब्रिज MOSFET ड्राइवर।",
  "workingPrincipleEn": "FAN7380 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "FAN7380 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "fan7842",
  "name": "FAN7842",
  "aliases": [
    "FAN7842MX",
    "FAN7842N"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "High-voltage half-bridge driver for solar inverters.",
  "simpleSummaryHi": "सोलर इन्वर्टर हाफ-ब्रिज ड्राइवर।",
  "workingPrincipleEn": "FAN7842 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "FAN7842 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "ucc27524",
  "name": "UCC27524",
  "aliases": [
    "UCC27524P",
    "UCC27524D"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Dual 5A high-speed low-side gate driver.",
  "simpleSummaryHi": "ड्यूल 5A हाई-स्पीड लो-साइड ड्राइवर।",
  "workingPrincipleEn": "UCC27524 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UCC27524 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "ucc27511",
  "name": "UCC27511",
  "aliases": [
    "UCC27511DBV"
  ],
  "category": "MOSFET Driver",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "Single 4A/8A peak high-speed gate driver.",
  "simpleSummaryHi": "4A/8A पीक हाई-स्पीड गेट ड्राइवर।",
  "workingPrincipleEn": "UCC27511 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UCC27511 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "ixdd609",
  "name": "IXDD609",
  "aliases": [
    "IXDD609PI",
    "IXDD609SI"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "9A ultra-high current MOSFET/IGBT gate driver.",
  "simpleSummaryHi": "9A अल्ट्रा हाई-करंट गेट ड्राइवर।",
  "workingPrincipleEn": "IXDD609 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IXDD609 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "irs2186",
  "name": "IRS2186",
  "aliases": [
    "IRS2186PBF",
    "IRS2186S"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "600V high and low side gate driver with 4A peak current.",
  "simpleSummaryHi": "4A पीक 600V गेट ड्राइवर।",
  "workingPrincipleEn": "IRS2186 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IRS2186 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "irs21844",
  "name": "IRS21844",
  "aliases": [
    "IRS21844PBF",
    "IRS21844S"
  ],
  "category": "MOSFET Driver",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Half-bridge driver with programmable dead-time control.",
  "simpleSummaryHi": "प्रोग्रामेबल डेड-टाइम हाफ-ब्रिज ड्राइवर।",
  "workingPrincipleEn": "IRS21844 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IRS21844 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "stgap2s",
  "name": "STGAP2S",
  "aliases": [
    "STGAP2SCMTR",
    "STGAP2SICS"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Galvanically isolated 4A gate driver for SiC/IGBT switches.",
  "simpleSummaryHi": "4A गैल्वेनिकली आइसोलेटेड गेट ड्राइवर।",
  "workingPrincipleEn": "STGAP2S operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "STGAP2S इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "mic4420",
  "name": "MIC4420",
  "aliases": [
    "MIC4420YN",
    "MIC4420YM"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "6A non-inverting MOSFET driver.",
  "simpleSummaryHi": "6A नॉन-इनवर्टिंग MOSFET ड्राइवर।",
  "workingPrincipleEn": "MIC4420 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MIC4420 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "mic4429",
  "name": "MIC4429",
  "aliases": [
    "MIC4429YN",
    "MIC4429YM"
  ],
  "category": "MOSFET Driver",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "6A inverting MOSFET driver.",
  "simpleSummaryHi": "6A इनवर्टिंग MOSFET ड्राइवर।",
  "workingPrincipleEn": "MIC4429 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MIC4429 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "सप्लाई (+12V)"
    },
    {
      "pin": 2,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Gate PWM Input from MCU",
      "descHi": "हाई-साइड इनपुट"
    },
    {
      "pin": 3,
      "name": "LIN / SD",
      "type": "Input",
      "descEn": "Low Side Gate PWM / Shutdown Input",
      "descHi": "लो-साइड / शटडाउन इनपुट"
    },
    {
      "pin": 4,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 5,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 6,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return (MOSFET Source)",
      "descHi": "हाई साइड फ्लोटिंग रिटर्न"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Drive Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "VB",
      "type": "Power",
      "descEn": "High Side Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    }
  ]
},
  {
  "id": "max5048",
  "name": "MAX5048",
  "aliases": [
    "MAX5048BAUT"
  ],
  "category": "MOSFET Driver",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "7.6A peak sink/source high-speed MOSFET driver.",
  "simpleSummaryHi": "7.6A पीक हाई-स्पीड ड्राइवर।",
  "workingPrincipleEn": "MAX5048 operates as a high-reliability MOSFET Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MAX5048 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में MOSFET Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "LO",
      "type": "Output",
      "descEn": "Low Side Gate Drive Output",
      "descHi": "लो साइड गेट आउटपुट"
    },
    {
      "pin": 2,
      "name": "COM",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड"
    },
    {
      "pin": 3,
      "name": "VCC",
      "type": "Power",
      "descEn": "Low Side Supply (+12V to +15V)",
      "descHi": "लो साइड सप्लाई"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "VS",
      "type": "Power",
      "descEn": "High Side Floating Return",
      "descHi": "हाई साइड रिटर्न"
    },
    {
      "pin": 6,
      "name": "VB",
      "type": "Power",
      "descEn": "Bootstrap Supply (~14V)",
      "descHi": "बूटस्ट्रैप सप्लाई"
    },
    {
      "pin": 7,
      "name": "HO",
      "type": "Output",
      "descEn": "High Side Gate Output",
      "descHi": "हाई साइड गेट आउटपुट"
    },
    {
      "pin": 8,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 9,
      "name": "VDD",
      "type": "Power",
      "descEn": "Logic Supply (+5V from MCU)",
      "descHi": "लॉजिक सप्लाई (+5V)"
    },
    {
      "pin": 10,
      "name": "HIN",
      "type": "Input",
      "descEn": "High Side Logic Input",
      "descHi": "हाई साइड इनपुट"
    },
    {
      "pin": 11,
      "name": "SD",
      "type": "Control",
      "descEn": "Shutdown Pin (0V = Run, 5V = Off)",
      "descHi": "शटडाउन पिन"
    },
    {
      "pin": 12,
      "name": "LIN",
      "type": "Input",
      "descEn": "Low Side Logic Input",
      "descHi": "लो साइड इनपुट"
    },
    {
      "pin": 13,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Logic Ground (0V)",
      "descHi": "लॉजिक ग्राउंड"
    },
    {
      "pin": 14,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    }
  ]
},
  {
  "id": "uln2003",
  "name": "ULN2003A",
  "aliases": [
    "ULN2003",
    "GM2247D",
    "ULN2003APG"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "7-Channel Darlington array for fan, relay, and buzzer switching.",
  "simpleSummaryHi": "7-चैनल डार्लिंगटन रिले व फैन ड्राइवर।",
  "workingPrincipleEn": "ULN2003A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ULN2003A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "uln2004",
  "name": "ULN2004A",
  "aliases": [
    "ULN2004",
    "ULN2004APG"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "7-Channel Darlington driver for 6V-15V CMOS logic.",
  "simpleSummaryHi": "12V CMOS 7-चैनल रिले ड्राइवर।",
  "workingPrincipleEn": "ULN2004A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ULN2004A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "uln2803",
  "name": "ULN2803A",
  "aliases": [
    "ULN2803",
    "ULN2803APG"
  ],
  "category": "Darlington Driver",
  "totalPins": 18,
  "dipPackageName": "DIP-18",
  "smdPackageName": "SOIC-18 / SOP-18",
  "simpleSummaryEn": "8-Channel Darlington array (500mA per channel).",
  "simpleSummaryHi": "8-चैनल डार्लिंगटन रिले ड्राइवर।",
  "workingPrincipleEn": "ULN2803A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ULN2803A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "uln2804",
  "name": "ULN2804A",
  "aliases": [
    "ULN2804",
    "ULN2804APG"
  ],
  "category": "Darlington Driver",
  "totalPins": 18,
  "dipPackageName": "DIP-18",
  "smdPackageName": "SOIC-18 / SOP-18",
  "simpleSummaryEn": "8-Channel Darlington driver for 6-15V CMOS inputs.",
  "simpleSummaryHi": "8-चैनल CMOS रिले ड्राइवर।",
  "workingPrincipleEn": "ULN2804A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ULN2804A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "mc1413",
  "name": "MC1413",
  "aliases": [
    "MC1413P",
    "MC1413D"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "7-Channel Darlington driver equivalent to ULN2003A.",
  "simpleSummaryHi": "ULN2003A का समतुल्य 7-चैनल ड्राइवर।",
  "workingPrincipleEn": "MC1413 operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MC1413 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "td62003",
  "name": "TD62003A",
  "aliases": [
    "TD62003P",
    "TD62003F"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "7-Channel high-current Darlington sink driver.",
  "simpleSummaryHi": "7-चैनल हाई-करंट सिंक ड्राइवर।",
  "workingPrincipleEn": "TD62003A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TD62003A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "td62083",
  "name": "TD62083A",
  "aliases": [
    "TD62083P",
    "TD62083F"
  ],
  "category": "Darlington Driver",
  "totalPins": 18,
  "dipPackageName": "DIP-18",
  "smdPackageName": "SOIC-18 / SOP-18",
  "simpleSummaryEn": "8-Channel high-current Darlington sink driver.",
  "simpleSummaryHi": "8-चैनल हाई-करंट सिंक ड्राइवर।",
  "workingPrincipleEn": "TD62083A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TD62083A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "udn2981",
  "name": "UDN2981A",
  "aliases": [
    "UDN2981",
    "MIC2981"
  ],
  "category": "Darlington Driver",
  "totalPins": 18,
  "dipPackageName": "DIP-18",
  "smdPackageName": "SOIC-18 / SOP-18",
  "simpleSummaryEn": "8-Channel Source Driver (switches +12V positive rail).",
  "simpleSummaryHi": "8-चैनल सोर्स ड्राइवर (+12V स्विचिंग)।",
  "workingPrincipleEn": "UDN2981A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "UDN2981A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "tpic6c595",
  "name": "TPIC6C595",
  "aliases": [
    "TPIC6C595N",
    "TPIC6C595D"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "8-Bit Serial-in Power Logic D-MOS Sink Driver (350mA).",
  "simpleSummaryHi": "8-बिट सीरियल रिले ड्राइवर IC।",
  "workingPrincipleEn": "TPIC6C595 operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TPIC6C595 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "l293d",
  "name": "L293D",
  "aliases": [
    "L293DNE",
    "L293B"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Quadruple Half-H Driver (600mA per channel) with clamp diodes.",
  "simpleSummaryHi": "क्वाड हाफ-H मोटर व रिले ड्राइवर।",
  "workingPrincipleEn": "L293D operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "L293D इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "l298n",
  "name": "L298N",
  "aliases": [
    "L298",
    "L298HN"
  ],
  "category": "Darlington Driver",
  "totalPins": 15,
  "dipPackageName": "DIP-15",
  "smdPackageName": "SOIC-15 / SOP-15",
  "simpleSummaryEn": "Dual Full-Bridge Driver (2A per channel) for heavy relays & actuators.",
  "simpleSummaryHi": "ड्यूल फुल-ब्रिज 2A ड्राइवर।",
  "workingPrincipleEn": "L298N operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "L298N इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "sn754410",
  "name": "SN754410",
  "aliases": [
    "SN754410NE"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Quadruple Half-H 1A Driver with output clamp diodes.",
  "simpleSummaryHi": "क्वाड 1A हाफ-H ड्राइवर।",
  "workingPrincipleEn": "SN754410 operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "SN754410 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "uln2064",
  "name": "ULN2064B",
  "aliases": [
    "ULN2064"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Quad 1.5A high-current Darlington switch.",
  "simpleSummaryHi": "क्वाड 1.5A हाई-करंट ड्राइवर।",
  "workingPrincipleEn": "ULN2064B operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ULN2064B इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "m54564",
  "name": "M54564P",
  "aliases": [
    "M54564FP"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "7-Channel Darlington sink driver with clamp diodes.",
  "simpleSummaryHi": "7-चैनल डार्लिंगटन सिंक ड्राइवर।",
  "workingPrincipleEn": "M54564P operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "M54564P इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "uln2002",
  "name": "ULN2002A",
  "aliases": [
    "ULN2002"
  ],
  "category": "Darlington Driver",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "7-Channel Darlington driver for 14-25V PMOS inputs.",
  "simpleSummaryHi": "7-चैनल PMOS रिले ड्राइवर।",
  "workingPrincipleEn": "ULN2002A operates as a high-reliability Darlington Driver in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ULN2002A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Darlington Driver के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "moc3021",
  "name": "MOC3021",
  "aliases": [
    "MOC3021M",
    "EL3021",
    "MOC3020"
  ],
  "category": "Optocoupler",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "Random-phase TRIAC driver optocoupler for charging SCR control.",
  "simpleSummaryHi": "चार्जिंग SCR ट्रिगर ऑप्टोकपलर।",
  "workingPrincipleEn": "MOC3021 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MOC3021 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 4,
      "name": "Main Term 1",
      "type": "Output",
      "descEn": "Output Terminal 1",
      "descHi": "आउटपुट टर्मिनल 1"
    },
    {
      "pin": 5,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 6,
      "name": "Main Term 2",
      "type": "Output",
      "descEn": "Output Terminal 2",
      "descHi": "आउटपुट टर्मिनल 2"
    }
  ]
},
  {
  "id": "moc3041",
  "name": "MOC3041",
  "aliases": [
    "MOC3041M",
    "EL3041"
  ],
  "category": "Optocoupler",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "Zero-cross TRIAC driver optocoupler (400V).",
  "simpleSummaryHi": "जीरो-क्रॉस ट्राइक ड्राइवर ऑप्टोकपलर।",
  "workingPrincipleEn": "MOC3041 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MOC3041 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 4,
      "name": "Main Term 1",
      "type": "Output",
      "descEn": "Output Terminal 1",
      "descHi": "आउटपुट टर्मिनल 1"
    },
    {
      "pin": 5,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 6,
      "name": "Main Term 2",
      "type": "Output",
      "descEn": "Output Terminal 2",
      "descHi": "आउटपुट टर्मिनल 2"
    }
  ]
},
  {
  "id": "moc3061",
  "name": "MOC3061",
  "aliases": [
    "MOC3061M",
    "EL3061"
  ],
  "category": "Optocoupler",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "600V Zero-cross TRIAC driver optocoupler for mains changeover.",
  "simpleSummaryHi": "600V जीरो-क्रॉस ट्राइक ड्राइवर।",
  "workingPrincipleEn": "MOC3061 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MOC3061 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 4,
      "name": "Main Term 1",
      "type": "Output",
      "descEn": "Output Terminal 1",
      "descHi": "आउटपुट टर्मिनल 1"
    },
    {
      "pin": 5,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 6,
      "name": "Main Term 2",
      "type": "Output",
      "descEn": "Output Terminal 2",
      "descHi": "आउटपुट टर्मिनल 2"
    }
  ]
},
  {
  "id": "moc3063",
  "name": "MOC3063",
  "aliases": [
    "MOC3063M",
    "EL3063"
  ],
  "category": "Optocoupler",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "Sensitive gate 600V zero-cross TRIAC driver (5mA trigger).",
  "simpleSummaryHi": "5mA सेंसिटिव 600V ट्राइक ड्राइवर।",
  "workingPrincipleEn": "MOC3063 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MOC3063 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 4,
      "name": "Main Term 1",
      "type": "Output",
      "descEn": "Output Terminal 1",
      "descHi": "आउटपुट टर्मिनल 1"
    },
    {
      "pin": 5,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 6,
      "name": "Main Term 2",
      "type": "Output",
      "descEn": "Output Terminal 2",
      "descHi": "आउटपुट टर्मिनल 2"
    }
  ]
},
  {
  "id": "pc817",
  "name": "PC817",
  "aliases": [
    "EL817",
    "LTV-817",
    "PC817C"
  ],
  "category": "Optocoupler",
  "totalPins": 4,
  "dipPackageName": "DIP-4",
  "smdPackageName": "SOIC-4 / SOP-4",
  "simpleSummaryEn": "Standard 4-pin optical isolator for feedback and mains sensing.",
  "simpleSummaryHi": "4-पिन ऑप्टिकल आइसोलेटर।",
  "workingPrincipleEn": "PC817 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PC817 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "Emitter",
      "type": "Output",
      "descEn": "Phototransistor Emitter",
      "descHi": "फोटो-ट्रांजिस्टर एमिटर"
    },
    {
      "pin": 4,
      "name": "Collector",
      "type": "Output",
      "descEn": "Phototransistor Collector",
      "descHi": "फोटो-ट्रांजिस्टर कलेक्टर"
    }
  ]
},
  {
  "id": "ps2501",
  "name": "PS2501",
  "aliases": [
    "PS2501-1",
    "PS2501-4"
  ],
  "category": "Optocoupler",
  "totalPins": 4,
  "dipPackageName": "DIP-4",
  "smdPackageName": "SOIC-4 / SOP-4",
  "simpleSummaryEn": "High isolation voltage (5000Vrms) phototransistor optocoupler.",
  "simpleSummaryHi": "5000V हाई-आइसोलेशन ऑप्टोकपलर।",
  "workingPrincipleEn": "PS2501 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PS2501 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "Emitter",
      "type": "Output",
      "descEn": "Phototransistor Emitter",
      "descHi": "फोटो-ट्रांजिस्टर एमिटर"
    },
    {
      "pin": 4,
      "name": "Collector",
      "type": "Output",
      "descEn": "Phototransistor Collector",
      "descHi": "फोटो-ट्रांजिस्टर कलेक्टर"
    }
  ]
},
  {
  "id": "4n25",
  "name": "4N25",
  "aliases": [
    "4N25M",
    "4N26"
  ],
  "category": "Optocoupler",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "General purpose 6-pin phototransistor optocoupler with base pin.",
  "simpleSummaryHi": "6-पिन जनरल पर्पस ऑप्टोकपलर।",
  "workingPrincipleEn": "4N25 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "4N25 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 4,
      "name": "Main Term 1",
      "type": "Output",
      "descEn": "Output Terminal 1",
      "descHi": "आउटपुट टर्मिनल 1"
    },
    {
      "pin": 5,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 6,
      "name": "Main Term 2",
      "type": "Output",
      "descEn": "Output Terminal 2",
      "descHi": "आउटपुट टर्मिनल 2"
    }
  ]
},
  {
  "id": "4n35",
  "name": "4N35",
  "aliases": [
    "4N35M",
    "4N36",
    "4N37"
  ],
  "category": "Optocoupler",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "High CTR 6-pin phototransistor optocoupler.",
  "simpleSummaryHi": "हाई CTR 6-पिन ऑप्टोकपलर।",
  "workingPrincipleEn": "4N35 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "4N35 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 4,
      "name": "Main Term 1",
      "type": "Output",
      "descEn": "Output Terminal 1",
      "descHi": "आउटपुट टर्मिनल 1"
    },
    {
      "pin": 5,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 6,
      "name": "Main Term 2",
      "type": "Output",
      "descEn": "Output Terminal 2",
      "descHi": "आउटपुट टर्मिनल 2"
    }
  ]
},
  {
  "id": "6n137",
  "name": "6N137",
  "aliases": [
    "6N137S",
    "HCPL-2601"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "10 Mbd high-speed digital logic gate optocoupler.",
  "simpleSummaryHi": "10 Mbps हाई-स्पीड डिजिटल ऑप्टोकपलर।",
  "workingPrincipleEn": "6N137 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "6N137 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "6n136",
  "name": "6N136",
  "aliases": [
    "6N136S",
    "HCPL-4502"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "1 Mbd high-speed photodiode-transistor optocoupler.",
  "simpleSummaryHi": "1 Mbps हाई-स्पीड ऑप्टोकपलर।",
  "workingPrincipleEn": "6N136 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "6N136 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "6n139",
  "name": "6N139",
  "aliases": [
    "6N139S",
    "HCPL-0701"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Low input current (0.5mA) high-gain photodarlington optocoupler.",
  "simpleSummaryHi": "लो-करंट हाई-गेन डार्लिंगटन ऑप्टोकपलर।",
  "workingPrincipleEn": "6N139 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "6N139 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "tlp250",
  "name": "TLP250",
  "aliases": [
    "TLP250H",
    "TLP250F"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "1.5A IGBT / MOSFET direct gate drive optocoupler.",
  "simpleSummaryHi": "1.5A IGBT/MOSFET गेट ड्राइवर।",
  "workingPrincipleEn": "TLP250 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TLP250 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "tlp350",
  "name": "TLP350",
  "aliases": [
    "TLP350H",
    "TLP350F"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "2.5A high-current IGBT gate drive optocoupler.",
  "simpleSummaryHi": "2.5A IGBT गेट ड्राइवर ऑप्टोकपलर।",
  "workingPrincipleEn": "TLP350 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TLP350 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "hcpl3120",
  "name": "HCPL-3120",
  "aliases": [
    "A3120",
    "FOD3120"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "2.5A output current gate drive optocoupler with 15kV/µs CMR.",
  "simpleSummaryHi": "2.5A गेट ड्राइव ऑप्टोकपलर।",
  "workingPrincipleEn": "HCPL-3120 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "HCPL-3120 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "hcpl316j",
  "name": "HCPL-316J",
  "aliases": [
    "ACPL-316J"
  ],
  "category": "Optocoupler",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "2.0A IGBT gate driver with integrated Desat short-circuit protection.",
  "simpleSummaryHi": "डीसैट प्रोटेक्शन युक्त 2A गेट ड्राइवर।",
  "workingPrincipleEn": "HCPL-316J operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "HCPL-316J इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "tlp181",
  "name": "TLP181",
  "aliases": [
    "TLP181GB",
    "TLP281"
  ],
  "category": "Optocoupler",
  "totalPins": 4,
  "dipPackageName": "DIP-4",
  "smdPackageName": "SOIC-4 / SOP-4",
  "simpleSummaryEn": "Miniature flat-lead phototransistor optocoupler for SMD boards.",
  "simpleSummaryHi": "मिनी SMD 4-पिन ऑप्टोकपलर।",
  "workingPrincipleEn": "TLP181 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TLP181 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "Emitter",
      "type": "Output",
      "descEn": "Phototransistor Emitter",
      "descHi": "फोटो-ट्रांजिस्टर एमिटर"
    },
    {
      "pin": 4,
      "name": "Collector",
      "type": "Output",
      "descEn": "Phototransistor Collector",
      "descHi": "फोटो-ट्रांजिस्टर कलेक्टर"
    }
  ]
},
  {
  "id": "tlp521",
  "name": "TLP521",
  "aliases": [
    "TLP521-1",
    "TLP521-4"
  ],
  "category": "Optocoupler",
  "totalPins": 4,
  "dipPackageName": "DIP-4",
  "smdPackageName": "SOIC-4 / SOP-4",
  "simpleSummaryEn": "High voltage phototransistor optocoupler (VCEO=55V).",
  "simpleSummaryHi": "हाई-वोल्टेज 4-पिन ऑप्टोकपलर।",
  "workingPrincipleEn": "TLP521 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TLP521 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "Emitter",
      "type": "Output",
      "descEn": "Phototransistor Emitter",
      "descHi": "फोटो-ट्रांजिस्टर एमिटर"
    },
    {
      "pin": 4,
      "name": "Collector",
      "type": "Output",
      "descEn": "Phototransistor Collector",
      "descHi": "फोटो-ट्रांजिस्टर कलेक्टर"
    }
  ]
},
  {
  "id": "acplc79a",
  "name": "ACPL-C79A",
  "aliases": [
    "ACPL-C790",
    "ACPL-C79B"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Precision optical isolation amplifier for current shunt sensing.",
  "simpleSummaryHi": "प्रिसिजन आइसोलेशन एम्पलीफायर।",
  "workingPrincipleEn": "ACPL-C79A operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ACPL-C79A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "cny17",
  "name": "CNY17",
  "aliases": [
    "CNY17-1",
    "CNY17-2",
    "CNY17-3"
  ],
  "category": "Optocoupler",
  "totalPins": 6,
  "dipPackageName": "DIP-6",
  "smdPackageName": "SOIC-6 / SOP-6",
  "simpleSummaryEn": "High isolation voltage (5000V) phototransistor with base pin.",
  "simpleSummaryHi": "5000V आइसोलेशन 6-पिन ऑप्टोकपलर।",
  "workingPrincipleEn": "CNY17 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CNY17 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "Anode",
      "type": "Input",
      "descEn": "IR LED Anode (+)",
      "descHi": "IR LED एनोड (+)"
    },
    {
      "pin": 2,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "IR LED Cathode (-)",
      "descHi": "IR LED कैथोड (-)"
    },
    {
      "pin": 3,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 4,
      "name": "Main Term 1",
      "type": "Output",
      "descEn": "Output Terminal 1",
      "descHi": "आउटपुट टर्मिनल 1"
    },
    {
      "pin": 5,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 6,
      "name": "Main Term 2",
      "type": "Output",
      "descEn": "Output Terminal 2",
      "descHi": "आउटपुट टर्मिनल 2"
    }
  ]
},
  {
  "id": "il300",
  "name": "IL300",
  "aliases": [
    "IL300-F",
    "IL300-DEFG"
  ],
  "category": "Optocoupler",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Linear optocoupler with dual feedback photodiodes for analog AC sensing.",
  "simpleSummaryHi": "लीनियर एनालॉग ऑप्टोकपलर।",
  "workingPrincipleEn": "IL300 operates as a high-reliability Optocoupler in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "IL300 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Optocoupler के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 2,
      "name": "Anode",
      "type": "Input",
      "descEn": "LED Anode (+)",
      "descHi": "LED एनोड (+)"
    },
    {
      "pin": 3,
      "name": "Cathode",
      "type": "Ground",
      "descEn": "LED Cathode (-)",
      "descHi": "LED कैथोड (-)"
    },
    {
      "pin": 4,
      "name": "NC",
      "type": "Passive",
      "descEn": "No Connection",
      "descHi": "खाली"
    },
    {
      "pin": 5,
      "name": "GND / VEE",
      "type": "Ground",
      "descEn": "Output Ground (0V)",
      "descHi": "आउटपुट ग्राउंड"
    },
    {
      "pin": 6,
      "name": "VO",
      "type": "Output",
      "descEn": "Isolated Gate Drive Output",
      "descHi": "आइसोलेटेड आउटपुट"
    },
    {
      "pin": 7,
      "name": "VO / EN",
      "type": "Control",
      "descEn": "Output / Enable",
      "descHi": "आउटपुट / इनेबल"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "पॉजिटिव सप्लाई"
    }
  ]
},
  {
  "id": "7805",
  "name": "7805",
  "aliases": [
    "LM7805",
    "MC7805",
    "L7805CV",
    "78M05"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Fixed +5V DC 1.5A linear voltage regulator.",
  "simpleSummaryHi": "+5V 1.5A वोल्टेज रेगुलेटर।",
  "workingPrincipleEn": "7805 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7805 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "7812",
  "name": "7812",
  "aliases": [
    "LM7812",
    "MC7812",
    "L7812CV",
    "78M12"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Fixed +12V DC linear voltage regulator for 24V/48V inverters.",
  "simpleSummaryHi": "+12V DC वोल्टेज रेगुलेटर।",
  "workingPrincipleEn": "7812 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7812 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "7815",
  "name": "7815",
  "aliases": [
    "LM7815",
    "L7815CV"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Fixed +15V DC linear voltage regulator for gate driver rails.",
  "simpleSummaryHi": "+15V गेट ड्राइवर सप्लाई रेगुलेटर।",
  "workingPrincipleEn": "7815 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7815 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "7808",
  "name": "7808",
  "aliases": [
    "LM7808",
    "L7808CV"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Fixed +8V DC linear voltage regulator.",
  "simpleSummaryHi": "+8V वोल्टेज रेगुलेटर।",
  "workingPrincipleEn": "7808 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7808 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "7809",
  "name": "7809",
  "aliases": [
    "LM7809",
    "L7809CV"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Fixed +9V DC linear voltage regulator.",
  "simpleSummaryHi": "+9V वोल्टेज रेगुलेटर।",
  "workingPrincipleEn": "7809 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7809 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "7824",
  "name": "7824",
  "aliases": [
    "LM7824",
    "L7824CV"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Fixed +24V DC voltage regulator for 48V industrial inverters.",
  "simpleSummaryHi": "+24V इंडस्ट्रियल रेगुलेटर।",
  "workingPrincipleEn": "7824 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7824 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "7905",
  "name": "7905",
  "aliases": [
    "LM7905",
    "L7905CV"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Negative -5V DC linear voltage regulator for dual-rail op-amps.",
  "simpleSummaryHi": "नेगेटिव -5V वोल्टेज रेगुलेटर।",
  "workingPrincipleEn": "7905 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7905 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "7912",
  "name": "7912",
  "aliases": [
    "LM7912",
    "L7912CV"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Negative -12V DC linear voltage regulator.",
  "simpleSummaryHi": "नेगेटिव -12V वोल्टेज रेगुलेटर।",
  "workingPrincipleEn": "7912 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "7912 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "tl431",
  "name": "TL431",
  "aliases": [
    "TL431A",
    "KA431",
    "LM431",
    "AZ431"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "2.495V precision shunt voltage reference for SMPS feedback.",
  "simpleSummaryHi": "2.5V प्रिसिजन शंट रेफरेंस।",
  "workingPrincipleEn": "TL431 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL431 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "tl432",
  "name": "TL432",
  "aliases": [
    "TL432A",
    "AZ432"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "Precision shunt regulator with alternative SOT-23 pinout.",
  "simpleSummaryHi": "प्रिसिजन शंट रेगुलेटर (अल्ट. पिनआउट)।",
  "workingPrincipleEn": "TL432 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TL432 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "lm317",
  "name": "LM317",
  "aliases": [
    "LM317T",
    "LM317K",
    "LM317M"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "1.25V to 37V 1.5A adjustable positive voltage regulator.",
  "simpleSummaryHi": "1.25V से 37V एडजस्टेबल रेगुलेटर।",
  "workingPrincipleEn": "LM317 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM317 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "lm337",
  "name": "LM337",
  "aliases": [
    "LM337T",
    "LM337K"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "-1.25V to -37V adjustable negative voltage regulator.",
  "simpleSummaryHi": "एडजस्टेबल नेगेटिव रेगुलेटर।",
  "workingPrincipleEn": "LM337 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM337 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "ams1117",
  "name": "AMS1117",
  "aliases": [
    "AMS1117-3.3",
    "AMS1117-5.0",
    "AMS1117-ADJ"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "1A Low Dropout (LDO) regulator (3.3V / 5.0V / ADJ).",
  "simpleSummaryHi": "1A लो ड्रॉपआउट (LDO) रेगुलेटर।",
  "workingPrincipleEn": "AMS1117 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "AMS1117 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "lm1117",
  "name": "LM1117",
  "aliases": [
    "LM1117-3.3",
    "LM1117-5.0",
    "LM1117-ADJ"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "800mA low dropout linear voltage regulator.",
  "simpleSummaryHi": "800mA LDO वोल्टेज रेगुलेटर।",
  "workingPrincipleEn": "LM1117 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM1117 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "lm2576",
  "name": "LM2576",
  "aliases": [
    "LM2576-5.0",
    "LM2576-12",
    "LM2576-ADJ"
  ],
  "category": "Regulator",
  "totalPins": 5,
  "dipPackageName": "TO-220-5",
  "smdPackageName": "TO-263-5 / D2PAK",
  "simpleSummaryEn": "3A 52kHz step-down (buck) switching voltage regulator.",
  "simpleSummaryHi": "3A 52kHz स्टेप-डाउन बक रेगुलेटर।",
  "workingPrincipleEn": "LM2576 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM2576 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VIN",
      "type": "Power",
      "descEn": "DC Input Voltage (+7V to +40V)",
      "descHi": "DC इनपुट वोल्टेज"
    },
    {
      "pin": 2,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Switching Output to Inductor",
      "descHi": "स्विचिंग आउटपुट"
    },
    {
      "pin": 3,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड (0V)"
    },
    {
      "pin": 4,
      "name": "FEEDBACK",
      "type": "Input",
      "descEn": "Voltage Feedback Sense Input",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 5,
      "name": "ON/OFF",
      "type": "Control",
      "descEn": "Enable / Shutdown Control Pin",
      "descHi": "ऑन/ऑफ कंट्रोल पिन"
    }
  ]
},
  {
  "id": "lm2596",
  "name": "LM2596",
  "aliases": [
    "LM2596-5.0",
    "LM2596-12",
    "LM2596-ADJ"
  ],
  "category": "Regulator",
  "totalPins": 5,
  "dipPackageName": "TO-220-5",
  "smdPackageName": "TO-263-5 / D2PAK",
  "simpleSummaryEn": "3A 150kHz high-frequency step-down switching regulator.",
  "simpleSummaryHi": "3A 150kHz बक स्विचिंग रेगुलेटर।",
  "workingPrincipleEn": "LM2596 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "LM2596 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VIN",
      "type": "Power",
      "descEn": "DC Input Voltage (+7V to +40V)",
      "descHi": "DC इनपुट वोल्टेज"
    },
    {
      "pin": 2,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Switching Output to Inductor",
      "descHi": "स्विचिंग आउटपुट"
    },
    {
      "pin": 3,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड (0V)"
    },
    {
      "pin": 4,
      "name": "FEEDBACK",
      "type": "Input",
      "descEn": "Voltage Feedback Sense Input",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 5,
      "name": "ON/OFF",
      "type": "Control",
      "descEn": "Enable / Shutdown Control Pin",
      "descHi": "ऑन/ऑफ कंट्रोल पिन"
    }
  ]
},
  {
  "id": "xl4015",
  "name": "XL4015",
  "aliases": [
    "XL4015E1"
  ],
  "category": "Regulator",
  "totalPins": 5,
  "dipPackageName": "TO-220-5",
  "smdPackageName": "TO-263-5 / D2PAK",
  "simpleSummaryEn": "5A 180kHz high-power DC-DC buck step-down converter.",
  "simpleSummaryHi": "5A 180kHz हाई-पावर बक कनवर्टर।",
  "workingPrincipleEn": "XL4015 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "XL4015 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VIN",
      "type": "Power",
      "descEn": "DC Input Voltage (+7V to +40V)",
      "descHi": "DC इनपुट वोल्टेज"
    },
    {
      "pin": 2,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Switching Output to Inductor",
      "descHi": "स्विचिंग आउटपुट"
    },
    {
      "pin": 3,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड (0V)"
    },
    {
      "pin": 4,
      "name": "FEEDBACK",
      "type": "Input",
      "descEn": "Voltage Feedback Sense Input",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 5,
      "name": "ON/OFF",
      "type": "Control",
      "descEn": "Enable / Shutdown Control Pin",
      "descHi": "ऑन/ऑफ कंट्रोल पिन"
    }
  ]
},
  {
  "id": "xl6009",
  "name": "XL6009",
  "aliases": [
    "XL6009E1"
  ],
  "category": "Regulator",
  "totalPins": 5,
  "dipPackageName": "TO-220-5",
  "smdPackageName": "TO-263-5 / D2PAK",
  "simpleSummaryEn": "4A 400kHz step-up (boost) DC-DC converter.",
  "simpleSummaryHi": "4A 400kHz स्टेप-अप बूस्ट कनवर्टर।",
  "workingPrincipleEn": "XL6009 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "XL6009 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "VIN",
      "type": "Power",
      "descEn": "DC Input Voltage (+7V to +40V)",
      "descHi": "DC इनपुट वोल्टेज"
    },
    {
      "pin": 2,
      "name": "OUTPUT",
      "type": "Output",
      "descEn": "Switching Output to Inductor",
      "descHi": "स्विचिंग आउटपुट"
    },
    {
      "pin": 3,
      "name": "GND",
      "type": "Ground",
      "descEn": "Power Ground (0V)",
      "descHi": "पावर ग्राउंड (0V)"
    },
    {
      "pin": 4,
      "name": "FEEDBACK",
      "type": "Input",
      "descEn": "Voltage Feedback Sense Input",
      "descHi": "वोल्टेज फीडबैक इनपुट"
    },
    {
      "pin": 5,
      "name": "ON/OFF",
      "type": "Control",
      "descEn": "Enable / Shutdown Control Pin",
      "descHi": "ऑन/ऑफ कंट्रोल पिन"
    }
  ]
},
  {
  "id": "78l05",
  "name": "78L05",
  "aliases": [
    "LM78L05",
    "MC78L05AC"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "100mA miniature 5V linear regulator.",
  "simpleSummaryHi": "100mA मिनी 5V रेगुलेटर।",
  "workingPrincipleEn": "78L05 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "78L05 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "78l12",
  "name": "78L12",
  "aliases": [
    "LM78L12",
    "MC78L12AC"
  ],
  "category": "Regulator",
  "totalPins": 3,
  "dipPackageName": "TO-220",
  "smdPackageName": "TO-252 / SOT-223",
  "simpleSummaryEn": "100mA miniature 12V linear regulator.",
  "simpleSummaryHi": "100mA मिनी 12V रेगुलेटर।",
  "workingPrincipleEn": "78L12 operates as a high-reliability Regulator in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "78L12 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Regulator के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN / ADJ",
      "type": "Power",
      "descEn": "DC Input Voltage or Adjust Pin",
      "descHi": "DC इनपुट या एडजस्ट पिन"
    },
    {
      "pin": 2,
      "name": "GND / OUT",
      "type": "Ground",
      "descEn": "Ground (0V) or Regulated Output",
      "descHi": "ग्राउंड या आउटपुट पिन"
    },
    {
      "pin": 3,
      "name": "OUT / IN",
      "type": "Power",
      "descEn": "Regulated Clean DC Output or Input",
      "descHi": "रेगुलेटेड आउटपुट या इनपुट"
    }
  ]
},
  {
  "id": "pic16f72",
  "name": "PIC16F72",
  "aliases": [
    "PIC16F72-I/SP",
    "PIC16F72-I/SO"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "28-Pin RISC Microcontroller — main brain of Microtek & Luminous inverters.",
  "simpleSummaryHi": "28-पिन इन्वर्टर माइक्रोकंट्रोलर चिप।",
  "workingPrincipleEn": "PIC16F72 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC16F72 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "pic16f722",
  "name": "PIC16F722",
  "aliases": [
    "PIC16F722-I/SP",
    "PIC16F722-I/SO"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "28-Pin enhanced flash MCU used in Luminous EcoWatt+ models.",
  "simpleSummaryHi": "ल्युमिनस इकोवाट+ मेन MCU चिप।",
  "workingPrincipleEn": "PIC16F722 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC16F722 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "pic16f73",
  "name": "PIC16F73",
  "aliases": [
    "PIC16F73-I/SP",
    "PIC16F73-I/SO"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "28-Pin flash microcontroller with hardware USART and PWM.",
  "simpleSummaryHi": "28-पिन USART व PWM माइक्रोकंट्रोलर।",
  "workingPrincipleEn": "PIC16F73 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC16F73 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "pic16f74",
  "name": "PIC16F74",
  "aliases": [
    "PIC16F74-I/P",
    "PIC16F74-I/PT"
  ],
  "category": "Microcontroller",
  "totalPins": 40,
  "dipPackageName": "DIP-40",
  "smdPackageName": "SOIC-40 / SOP-40",
  "simpleSummaryEn": "40-Pin microcontroller for large commercial 3-phase inverters.",
  "simpleSummaryHi": "40-पिन कमर्शियल इन्वर्टर MCU।",
  "workingPrincipleEn": "PIC16F74 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC16F74 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "pic16f876a",
  "name": "PIC16F876A",
  "aliases": [
    "PIC16F876A-I/SP",
    "PIC16F876A-I/SO"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "28-Pin 14KB flash microcontroller with 10-bit ADC.",
  "simpleSummaryHi": "28-पिन 10-बिट ADC माइक्रोकंट्रोलर।",
  "workingPrincipleEn": "PIC16F876A operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC16F876A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "pic16f877a",
  "name": "PIC16F877A",
  "aliases": [
    "PIC16F877A-I/P",
    "PIC16F877A-I/PT"
  ],
  "category": "Microcontroller",
  "totalPins": 40,
  "dipPackageName": "DIP-40",
  "smdPackageName": "SOIC-40 / SOP-40",
  "simpleSummaryEn": "40-Pin microcontroller for multi-battery solar PCU systems.",
  "simpleSummaryHi": "40-पिन सोलर PCU माइक्रोकंट्रोलर।",
  "workingPrincipleEn": "PIC16F877A operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC16F877A इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "pic18f2520",
  "name": "PIC18F2520",
  "aliases": [
    "PIC18F2520-I/SP",
    "PIC18F2520-I/SO"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "High-performance 10 MIPS 28-Pin MCU with enhanced PWM.",
  "simpleSummaryHi": "10 MIPS हाई-परफॉर्मेंस MCU।",
  "workingPrincipleEn": "PIC18F2520 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC18F2520 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "pic18f2550",
  "name": "PIC18F2550",
  "aliases": [
    "PIC18F2550-I/SP",
    "PIC18F2550-I/SO"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "28-Pin USB microcontroller with precision PWM for smart inverters.",
  "simpleSummaryHi": "USB इनेबल्ड स्मार्ट इन्वर्टर MCU।",
  "workingPrincipleEn": "PIC18F2550 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC18F2550 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "pic18f4520",
  "name": "PIC18F4520",
  "aliases": [
    "PIC18F4520-I/P",
    "PIC18F4520-I/PT"
  ],
  "category": "Microcontroller",
  "totalPins": 40,
  "dipPackageName": "DIP-40",
  "smdPackageName": "SOIC-40 / SOP-40",
  "simpleSummaryEn": "40-Pin PIC18 MCU for graphic LCD display inverter PCU.",
  "simpleSummaryHi": "40-पिन ग्राफिक्स LCD इन्वर्टर MCU।",
  "workingPrincipleEn": "PIC18F4520 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "PIC18F4520 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "dspic30f2010",
  "name": "dsPIC30F2010",
  "aliases": [
    "dsPIC30F2010-30I/SP",
    "dsPIC30F2010-20I/SO"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "16-Bit Digital Signal Controller with motor/inverter dedicated PWM.",
  "simpleSummaryHi": "16-बिट DSP प्योर साइन वेव कंट्रोलर।",
  "workingPrincipleEn": "dsPIC30F2010 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "dsPIC30F2010 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "dspic30f4011",
  "name": "dsPIC30F4011",
  "aliases": [
    "dsPIC30F4011-30I/P",
    "dsPIC30F4011-30I/PT"
  ],
  "category": "Microcontroller",
  "totalPins": 40,
  "dipPackageName": "DIP-40",
  "smdPackageName": "SOIC-40 / SOP-40",
  "simpleSummaryEn": "High-power 40-Pin DSC for 3kVA to 10kVA solar hybrid inverters.",
  "simpleSummaryHi": "40-पिन 30 MIPS DSP इन्वर्टर कंट्रोलर।",
  "workingPrincipleEn": "dsPIC30F4011 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "dsPIC30F4011 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "dspic33ep",
  "name": "dsPIC33EP32MC202",
  "aliases": [
    "dsPIC33EP32MC202-I/SP"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "70 MIPS 3.3V ultra-fast digital signal controller for grid-tie inverters.",
  "simpleSummaryHi": "70 MIPS 3.3V अल्ट्रा-फास्ट DSP।",
  "workingPrincipleEn": "dsPIC33EP32MC202 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "dsPIC33EP32MC202 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "eg8010",
  "name": "EG8010",
  "aliases": [
    "EGS002",
    "EG8010+IR2110"
  ],
  "category": "Microcontroller",
  "totalPins": 32,
  "dipPackageName": "DIP-32",
  "smdPackageName": "SOIC-32 / SOP-32",
  "simpleSummaryEn": "Dedicated Pure Sine Wave Inverter SPWM Generator IC.",
  "simpleSummaryHi": "प्योर साइन वेव SPWM ASIC जनरेटर।",
  "workingPrincipleEn": "EG8010 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "EG8010 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "stm32f103",
  "name": "STM32F103C8T6",
  "aliases": [
    "STM32F103",
    "BluePill"
  ],
  "category": "Microcontroller",
  "totalPins": 48,
  "dipPackageName": "DIP-48",
  "smdPackageName": "SOIC-48 / SOP-48",
  "simpleSummaryEn": "32-Bit ARM Cortex-M3 72MHz MCU for digital MPPT solar inverters.",
  "simpleSummaryHi": "32-बिट ARM कोर्टेक्स सोलर इन्वर्टर MCU।",
  "workingPrincipleEn": "STM32F103C8T6 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "STM32F103C8T6 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "stm32f030",
  "name": "STM32F030F4P6",
  "aliases": [
    "STM32F030"
  ],
  "category": "Microcontroller",
  "totalPins": 20,
  "dipPackageName": "DIP-20",
  "smdPackageName": "SOIC-20 / SOP-20",
  "simpleSummaryEn": "Low cost 32-bit ARM Cortex-M0 for inverter display & protection.",
  "simpleSummaryHi": "32-बिट ARM M0 डिस्प्ले व प्रोटेक्शन MCU।",
  "workingPrincipleEn": "STM32F030F4P6 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "STM32F030F4P6 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "atmega328p",
  "name": "ATmega328P",
  "aliases": [
    "ATmega328P-PU",
    "Arduino Uno"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "8-Bit AVR Microcontroller with 32KB Flash for DIY sine wave inverters.",
  "simpleSummaryHi": "8-बिट AVR 32KB साइन वेव MCU।",
  "workingPrincipleEn": "ATmega328P operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ATmega328P इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "atmega8",
  "name": "ATmega8",
  "aliases": [
    "ATmega8A",
    "ATmega8A-PU"
  ],
  "category": "Microcontroller",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "8-Bit AVR 8KB flash MCU for low cost inverter cards.",
  "simpleSummaryHi": "8-बिट AVR 8KB इन्वर्टर MCU।",
  "workingPrincipleEn": "ATmega8 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ATmega8 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "MCLR",
      "type": "Control",
      "descEn": "Master Reset Pin (+5V)",
      "descHi": "मास्टर रिसेट (5V)"
    },
    {
      "pin": 2,
      "name": "RA0 / AN0",
      "type": "Input",
      "descEn": "Analog Input 0 (Battery Voltage)",
      "descHi": "एनालॉग इनपुट 0 (बैटरी)"
    },
    {
      "pin": 3,
      "name": "RA1 / AN1",
      "type": "Input",
      "descEn": "Analog Input 1 (Mains Detection)",
      "descHi": "एनालॉग इनपुट 1 (मेंस)"
    },
    {
      "pin": 4,
      "name": "RA2 / AN2",
      "type": "Input",
      "descEn": "Analog Input 2 (Load Current CT)",
      "descHi": "एनालॉग इनपुट 2 (करंट)"
    },
    {
      "pin": 5,
      "name": "RA3 / AN3",
      "type": "Input",
      "descEn": "Analog Input 3 / Reference",
      "descHi": "एनालॉग इनपुट 3"
    },
    {
      "pin": 6,
      "name": "RA4",
      "type": "Control",
      "descEn": "Relay / Fan Control Output",
      "descHi": "रिले / फैन कंट्रोल"
    },
    {
      "pin": 7,
      "name": "RA5 / AN4",
      "type": "Input",
      "descEn": "Analog Input 4",
      "descHi": "एनालॉग इनपुट 4"
    },
    {
      "pin": 8,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 1 (0V)",
      "descHi": "ग्राउंड 1 (0V)"
    },
    {
      "pin": 9,
      "name": "OSC1",
      "type": "Passive",
      "descEn": "Crystal Pin 1",
      "descHi": "क्रिस्टल पिन 1"
    },
    {
      "pin": 10,
      "name": "OSC2",
      "type": "Passive",
      "descEn": "Crystal Pin 2",
      "descHi": "क्रिस्टल पिन 2"
    },
    {
      "pin": 11,
      "name": "RC0",
      "type": "Output",
      "descEn": "Charging LED Drive",
      "descHi": "चार्जिंग LED"
    },
    {
      "pin": 12,
      "name": "RC1",
      "type": "Output",
      "descEn": "Mains LED Drive",
      "descHi": "मेंस LED"
    },
    {
      "pin": 13,
      "name": "RC2",
      "type": "Output",
      "descEn": "Battery Low LED / PWM Out",
      "descHi": "बैटरी लो LED"
    },
    {
      "pin": 14,
      "name": "RC3",
      "type": "Output",
      "descEn": "Overload LED Drive",
      "descHi": "ओवरलोड LED"
    },
    {
      "pin": 15,
      "name": "RC4",
      "type": "Output",
      "descEn": "Inverter Mode LED Drive",
      "descHi": "इन्वर्टर मोड LED"
    },
    {
      "pin": 16,
      "name": "RC5",
      "type": "Output",
      "descEn": "Changeover Relay Drive",
      "descHi": "चेंजओवर रिले"
    },
    {
      "pin": 17,
      "name": "RC6",
      "type": "Control",
      "descEn": "Fan Speed Drive",
      "descHi": "फैन ड्राइव"
    },
    {
      "pin": 18,
      "name": "RC7",
      "type": "Control",
      "descEn": "SCR Charging Trigger Pulse",
      "descHi": "चार्जिंग SCR ट्रिगर"
    },
    {
      "pin": 19,
      "name": "VSS",
      "type": "Ground",
      "descEn": "Ground Pin 2 (0V)",
      "descHi": "ग्राउंड 2 (0V)"
    },
    {
      "pin": 20,
      "name": "VDD",
      "type": "Power",
      "descEn": "Positive Supply (+5V DC from 7805)",
      "descHi": "सप्लाई (+5V DC)"
    },
    {
      "pin": 21,
      "name": "RB0",
      "type": "Input",
      "descEn": "Mains Zero-Crossing Interrupt",
      "descHi": "जीरो-क्रॉसिंग इंटरप्ट"
    },
    {
      "pin": 22,
      "name": "RB1",
      "type": "Output",
      "descEn": "Left MOSFET Bank PWM Drive",
      "descHi": "लेफ्ट MOSFET PWM"
    },
    {
      "pin": 23,
      "name": "RB2",
      "type": "Output",
      "descEn": "Display Ground Switch",
      "descHi": "डिस्प्ले ग्राउंड"
    },
    {
      "pin": 24,
      "name": "RB3",
      "type": "Output",
      "descEn": "Right MOSFET Bank PWM Drive",
      "descHi": "राइट MOSFET PWM"
    },
    {
      "pin": 25,
      "name": "RB4",
      "type": "Output",
      "descEn": "Buzzer Alarm Drive",
      "descHi": "बजर अलार्म"
    },
    {
      "pin": 26,
      "name": "RB5",
      "type": "Control",
      "descEn": "Power Switch Sense",
      "descHi": "पावर स्विच"
    },
    {
      "pin": 27,
      "name": "RB6",
      "type": "Input",
      "descEn": "Overheat Sense Input",
      "descHi": "ओवरहीट सेंस"
    },
    {
      "pin": 28,
      "name": "RB7",
      "type": "Control",
      "descEn": "Program / Control",
      "descHi": "प्रोग्रामिंग"
    }
  ]
},
  {
  "id": "atmega16",
  "name": "ATmega16",
  "aliases": [
    "ATmega16A",
    "ATmega16A-PU"
  ],
  "category": "Microcontroller",
  "totalPins": 40,
  "dipPackageName": "DIP-40",
  "smdPackageName": "SOIC-40 / SOP-40",
  "simpleSummaryEn": "40-Pin AVR microcontroller for multi-relay inverter systems.",
  "simpleSummaryHi": "40-पिन AVR माइक्रोकंट्रोलर।",
  "workingPrincipleEn": "ATmega16 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ATmega16 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "attiny85",
  "name": "ATtiny85",
  "aliases": [
    "ATtiny85-20PU",
    "ATtiny85-20SU"
  ],
  "category": "Microcontroller",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "8-Pin miniature AVR MCU for battery protection & smart alarms.",
  "simpleSummaryHi": "8-पिन मिनी AVR प्रोटेक्शन MCU।",
  "workingPrincipleEn": "ATtiny85 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "ATtiny85 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "dsp56f801",
  "name": "DSP56F801",
  "aliases": [
    "DSP56F801T",
    "DSP56F801FA"
  ],
  "category": "Microcontroller",
  "totalPins": 32,
  "dipPackageName": "DIP-32",
  "smdPackageName": "SOIC-32 / SOP-32",
  "simpleSummaryEn": "16-Bit digital signal processor for online industrial UPS.",
  "simpleSummaryHi": "16-बिट ऑनलाइन यूपीएस DSP।",
  "workingPrincipleEn": "DSP56F801 operates as a high-reliability Microcontroller in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "DSP56F801 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Microcontroller के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "ne555",
  "name": "NE555",
  "aliases": [
    "LM555",
    "SE555",
    "NE555P"
  ],
  "category": "Timer",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "Precision timer and oscillator for buzzer alarms & 50Hz pulses.",
  "simpleSummaryHi": "प्रिसिजन टाइमर व 50Hz ऑसिलेटर।",
  "workingPrincipleEn": "NE555 operates as a high-reliability Timer in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "NE555 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Timer के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "ne556",
  "name": "NE556",
  "aliases": [
    "LM556",
    "NE556N"
  ],
  "category": "Timer",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Dual 555 timer in single 14-pin package.",
  "simpleSummaryHi": "ड्यूल 555 टाइमर IC।",
  "workingPrincipleEn": "NE556 operates as a high-reliability Timer in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "NE556 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Timer के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4047",
  "name": "CD4047",
  "aliases": [
    "CD4047BE",
    "HCF4047BE"
  ],
  "category": "Timer",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Low power multivibrator with complementary 50Hz Q and Q-bar outputs.",
  "simpleSummaryHi": "50Hz कॉम्प्लिमेंटरी ऑसिलेटर IC।",
  "workingPrincipleEn": "CD4047 operates as a high-reliability Timer in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4047 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Timer के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4013",
  "name": "CD4013",
  "aliases": [
    "CD4013BE",
    "HCF4013BE"
  ],
  "category": "Timer",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Dual D-type flip-flop for push button power ON/OFF toggle.",
  "simpleSummaryHi": "ड्यूल D फ्लिप-फ्लॉप (पावर स्विच)।",
  "workingPrincipleEn": "CD4013 operates as a high-reliability Timer in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4013 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Timer के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4017",
  "name": "CD4017",
  "aliases": [
    "CD4017BE",
    "HCF4017BE"
  ],
  "category": "Timer",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "5-Stage Johnson decade counter for sequential relay stepping.",
  "simpleSummaryHi": "डेकेड काउंटर — रिले सीक्वेंसिंग।",
  "workingPrincipleEn": "CD4017 operates as a high-reliability Timer in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4017 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Timer के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4011",
  "name": "CD4011",
  "aliases": [
    "CD4011BE",
    "HCF4011BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad 2-input NAND gate for interlock and logic gating.",
  "simpleSummaryHi": "क्वाड 2-इनपुट NAND गेट।",
  "workingPrincipleEn": "CD4011 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4011 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4001",
  "name": "CD4001",
  "aliases": [
    "CD4001BE",
    "HCF4001BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad 2-input NOR gate for inverter fault latching.",
  "simpleSummaryHi": "क्वाड 2-इनपुट NOR गेट।",
  "workingPrincipleEn": "CD4001 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4001 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4069",
  "name": "CD4069",
  "aliases": [
    "CD4069UBE",
    "HCF4069UBE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Hex inverter (6 NOT gates) for crystal oscillation & buffering.",
  "simpleSummaryHi": "हेक्स इनवर्टर (6 NOT गेट्स)।",
  "workingPrincipleEn": "CD4069 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4069 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4081",
  "name": "CD4081",
  "aliases": [
    "CD4081BE",
    "HCF4081BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad 2-input AND gate for PWM enable gating.",
  "simpleSummaryHi": "क्वाड 2-इनपुट AND गेट।",
  "workingPrincipleEn": "CD4081 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4081 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4071",
  "name": "CD4071",
  "aliases": [
    "CD4071BE",
    "HCF4071BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad 2-input OR gate for combining fault signals.",
  "simpleSummaryHi": "क्वाड 2-इनपुट OR गेट।",
  "workingPrincipleEn": "CD4071 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4071 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd40106",
  "name": "CD40106",
  "aliases": [
    "CD40106BE",
    "HCF40106BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Hex Schmitt trigger inverters for noise-immune waveform shaping.",
  "simpleSummaryHi": "हेक्स श्मिट ट्रिगर इनवर्टर।",
  "workingPrincipleEn": "CD40106 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD40106 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4066",
  "name": "CD4066",
  "aliases": [
    "CD4066BE",
    "HCF4066BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad bilateral analog switch for audio alarm & feedback routing.",
  "simpleSummaryHi": "क्वाड एनालॉग स्विच IC।",
  "workingPrincipleEn": "CD4066 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4066 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4093",
  "name": "CD4093",
  "aliases": [
    "CD4093BE",
    "HCF4093BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad 2-input Schmitt trigger NAND gate for oscillators.",
  "simpleSummaryHi": "श्मिट ट्रिगर NAND गेट।",
  "workingPrincipleEn": "CD4093 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4093 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4027",
  "name": "CD4027",
  "aliases": [
    "CD4027BE",
    "HCF4027BE"
  ],
  "category": "Logic & Switch",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "Dual J-K master-slave flip-flop with set and reset.",
  "simpleSummaryHi": "ड्यूल J-K फ्लिप-फ्लॉप।",
  "workingPrincipleEn": "CD4027 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4027 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "cd4541",
  "name": "CD4541",
  "aliases": [
    "CD4541BE",
    "HCF4541BE"
  ],
  "category": "Timer",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Programmable timer oscillator for extended battery charge time-out.",
  "simpleSummaryHi": "प्रोग्रामेबल टाइमर ऑसिलेटर।",
  "workingPrincipleEn": "CD4541 operates as a high-reliability Timer in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "CD4541 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Timer के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc00",
  "name": "74HC00",
  "aliases": [
    "SN74HC00N",
    "SN74HC00D"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "High-speed CMOS Quad 2-input NAND gate.",
  "simpleSummaryHi": "हाई-स्पीड क्वाड NAND गेट।",
  "workingPrincipleEn": "74HC00 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC00 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc04",
  "name": "74HC04",
  "aliases": [
    "SN74HC04N",
    "SN74HC04D"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "High-speed CMOS Hex Inverter.",
  "simpleSummaryHi": "हाई-स्पीड हेक्स इनवर्टर।",
  "workingPrincipleEn": "74HC04 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC04 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc08",
  "name": "74HC08",
  "aliases": [
    "SN74HC08N",
    "SN74HC08D"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "High-speed CMOS Quad 2-input AND gate.",
  "simpleSummaryHi": "हाई-स्पीड क्वाड AND गेट।",
  "workingPrincipleEn": "74HC08 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC08 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc14",
  "name": "74HC14",
  "aliases": [
    "SN74HC14N",
    "SN74HC14D"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Hex Schmitt-Trigger Inverter with high noise immunity.",
  "simpleSummaryHi": "हेक्स श्मिट-ट्रिगर इनवर्टर।",
  "workingPrincipleEn": "74HC14 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC14 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc32",
  "name": "74HC32",
  "aliases": [
    "SN74HC32N",
    "SN74HC32D"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "High-speed CMOS Quad 2-input OR gate.",
  "simpleSummaryHi": "हाई-स्पीड क्वाड OR गेट।",
  "workingPrincipleEn": "74HC32 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC32 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc74",
  "name": "74HC74",
  "aliases": [
    "SN74HC74N",
    "SN74HC74D"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Dual D-type positive edge-triggered flip-flop.",
  "simpleSummaryHi": "ड्यूल D-टाइप फ्लिप-फ्लॉप।",
  "workingPrincipleEn": "74HC74 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC74 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc138",
  "name": "74HC138",
  "aliases": [
    "SN74HC138N",
    "SN74HC138D"
  ],
  "category": "Logic & Switch",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "3-to-8 line decoder/demultiplexer for display multiplexing.",
  "simpleSummaryHi": "3-से-8 लाइन डिकोडर IC।",
  "workingPrincipleEn": "74HC138 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC138 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc595",
  "name": "74HC595",
  "aliases": [
    "SN74HC595N",
    "SN74HC595D"
  ],
  "category": "Logic & Switch",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "8-Bit serial-in, parallel-out shift register with output latches.",
  "simpleSummaryHi": "8-बिट शिफ्ट रजिस्टर — LED बार ड्राइवर।",
  "workingPrincipleEn": "74HC595 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC595 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc245",
  "name": "74HC245",
  "aliases": [
    "SN74HC245N",
    "SN74HC245DW"
  ],
  "category": "Logic & Switch",
  "totalPins": 20,
  "dipPackageName": "DIP-20",
  "smdPackageName": "SOIC-20 / SOP-20",
  "simpleSummaryEn": "Octal 3-state bus transceiver for communication cards.",
  "simpleSummaryHi": "ऑक्टल बस ट्रांससीवर।",
  "workingPrincipleEn": "74HC245 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC245 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "74hc125",
  "name": "74HC125",
  "aliases": [
    "SN74HC125N",
    "SN74HC125D"
  ],
  "category": "Logic & Switch",
  "totalPins": 14,
  "dipPackageName": "DIP-14",
  "smdPackageName": "SOIC-14 / SOP-14",
  "simpleSummaryEn": "Quad buffer with 3-state outputs.",
  "simpleSummaryHi": "क्वाड 3-स्टेट बफर IC।",
  "workingPrincipleEn": "74HC125 operates as a high-reliability Logic & Switch in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "74HC125 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Logic & Switch के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "IN 1",
      "type": "Input",
      "descEn": "Channel 1 Input",
      "descHi": "चैनल 1 इनपुट"
    },
    {
      "pin": 2,
      "name": "IN 2",
      "type": "Input",
      "descEn": "Channel 2 Input",
      "descHi": "चैनल 2 इनपुट"
    },
    {
      "pin": 3,
      "name": "OUT 1",
      "type": "Output",
      "descEn": "Channel 1 Output",
      "descHi": "चैनल 1 आउटपुट"
    },
    {
      "pin": 4,
      "name": "IN 3",
      "type": "Input",
      "descEn": "Channel 3 Input",
      "descHi": "चैनल 3 इनपुट"
    },
    {
      "pin": 5,
      "name": "IN 4",
      "type": "Input",
      "descEn": "Channel 4 Input",
      "descHi": "चैनल 4 इनपुट"
    },
    {
      "pin": 6,
      "name": "OUT 2",
      "type": "Output",
      "descEn": "Channel 2 Output",
      "descHi": "चैनल 2 आउटपुट"
    },
    {
      "pin": 7,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 8,
      "name": "OUT 3",
      "type": "Output",
      "descEn": "Channel 3 Output",
      "descHi": "चैनल 3 आउटपुट"
    },
    {
      "pin": 9,
      "name": "IN 5",
      "type": "Input",
      "descEn": "Channel 5 Input",
      "descHi": "चैनल 5 इनपुट"
    },
    {
      "pin": 10,
      "name": "IN 6",
      "type": "Input",
      "descEn": "Channel 6 Input",
      "descHi": "चैनल 6 इनपुट"
    },
    {
      "pin": 11,
      "name": "OUT 4",
      "type": "Output",
      "descEn": "Channel 4 Output",
      "descHi": "चैनल 4 आउटपुट"
    },
    {
      "pin": 12,
      "name": "IN 7",
      "type": "Input",
      "descEn": "Channel 7 Input",
      "descHi": "चैनल 7 इनपुट"
    },
    {
      "pin": 13,
      "name": "IN 8",
      "type": "Input",
      "descEn": "Channel 8 Input",
      "descHi": "चैनल 8 इनपुट"
    },
    {
      "pin": 14,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive Supply (+5V to +15V)",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "24c02",
  "name": "24C02",
  "aliases": [
    "AT24C02",
    "24LC02B"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "2Kbit I2C Serial EEPROM for storing calibration & settings.",
  "simpleSummaryHi": "2Kbit I2C सीरियल EEPROM मेमोरी।",
  "workingPrincipleEn": "24C02 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "24C02 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "24c04",
  "name": "24C04",
  "aliases": [
    "AT24C04",
    "24LC04B"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "4Kbit I2C Serial EEPROM memory.",
  "simpleSummaryHi": "4Kbit I2C EEPROM मेमोरी।",
  "workingPrincipleEn": "24C04 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "24C04 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "24c08",
  "name": "24C08",
  "aliases": [
    "AT24C08",
    "24LC08B"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "8Kbit I2C Serial EEPROM memory for fault event logging.",
  "simpleSummaryHi": "8Kbit I2C EEPROM मेमोरी।",
  "workingPrincipleEn": "24C08 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "24C08 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "24c16",
  "name": "24C16",
  "aliases": [
    "AT24C16",
    "24LC16B"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "16Kbit I2C Serial EEPROM memory.",
  "simpleSummaryHi": "16Kbit I2C EEPROM मेमोरी।",
  "workingPrincipleEn": "24C16 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "24C16 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "24c32",
  "name": "24C32",
  "aliases": [
    "AT24C32",
    "24LC32A"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "32Kbit I2C EEPROM memory for solar inverter data logging.",
  "simpleSummaryHi": "32Kbit सोलर डेटा लॉगर मेमोरी।",
  "workingPrincipleEn": "24C32 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "24C32 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "24c64",
  "name": "24C64",
  "aliases": [
    "AT24C64",
    "24LC64"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "64Kbit I2C EEPROM for energy generation recording.",
  "simpleSummaryHi": "64Kbit एनर्जी रिकॉर्डर EEPROM।",
  "workingPrincipleEn": "24C64 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "24C64 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "93c46",
  "name": "93C46",
  "aliases": [
    "AT93C46",
    "93LC46B"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "1Kbit 3-Wire Microwire Serial EEPROM memory.",
  "simpleSummaryHi": "1Kbit 3-वायर माइक्रोपिन EEPROM।",
  "workingPrincipleEn": "93C46 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "93C46 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "93c66",
  "name": "93C66",
  "aliases": [
    "AT93C66",
    "93LC66B"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "4Kbit 3-Wire Microwire Serial EEPROM.",
  "simpleSummaryHi": "4Kbit 3-वायर EEPROM।",
  "workingPrincipleEn": "93C66 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "93C66 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "max232",
  "name": "MAX232",
  "aliases": [
    "MAX232N",
    "MAX232CPE",
    "ST232"
  ],
  "category": "Memory & Interface",
  "totalPins": 16,
  "dipPackageName": "DIP-16",
  "smdPackageName": "SOIC-16 / SOP-16",
  "simpleSummaryEn": "RS-232 Transceiver for PC diagnostic communication.",
  "simpleSummaryHi": "RS-232 पीसी कम्युनिकेशन IC।",
  "workingPrincipleEn": "MAX232 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MAX232 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "C1+",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (+)",
      "descHi": "कैपेसिटर 1 (+)"
    },
    {
      "pin": 2,
      "name": "V+",
      "type": "Power",
      "descEn": "+8.5V charge pump output",
      "descHi": "+8.5V बूस्ट"
    },
    {
      "pin": 3,
      "name": "C1-",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (-)",
      "descHi": "कैपेसिटर 1 (-)"
    },
    {
      "pin": 4,
      "name": "C2+",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (+)",
      "descHi": "कैपेसिटर 2 (+)"
    },
    {
      "pin": 5,
      "name": "C2-",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (-)",
      "descHi": "कैपेसिटर 2 (-)"
    },
    {
      "pin": 6,
      "name": "V-",
      "type": "Power",
      "descEn": "-8.5V charge pump output",
      "descHi": "-8.5V नेगेटिव"
    },
    {
      "pin": 7,
      "name": "T2OUT",
      "type": "Output",
      "descEn": "RS232 Driver 2 Output",
      "descHi": "RS232 आउटपुट 2"
    },
    {
      "pin": 8,
      "name": "R2IN",
      "type": "Input",
      "descEn": "RS232 Receiver 2 Input",
      "descHi": "RS232 इनपुट 2"
    },
    {
      "pin": 9,
      "name": "R2OUT",
      "type": "Output",
      "descEn": "TTL Receiver 2 Output",
      "descHi": "TTL आउटपुट 2"
    },
    {
      "pin": 10,
      "name": "T2IN",
      "type": "Input",
      "descEn": "TTL Driver 2 Input",
      "descHi": "TTL इनपुट 2"
    },
    {
      "pin": 11,
      "name": "T1IN",
      "type": "Input",
      "descEn": "TTL Driver 1 Input (MCU TX)",
      "descHi": "TTL इनपुट 1"
    },
    {
      "pin": 12,
      "name": "R1OUT",
      "type": "Output",
      "descEn": "TTL Receiver 1 Output (MCU RX)",
      "descHi": "TTL आउटपुट 1"
    },
    {
      "pin": 13,
      "name": "R1IN",
      "type": "Input",
      "descEn": "RS232 Receiver 1 Input",
      "descHi": "RS232 इनपुट 1"
    },
    {
      "pin": 14,
      "name": "T1OUT",
      "type": "Output",
      "descEn": "RS232 Driver 1 Output",
      "descHi": "RS232 आउटपुट 1"
    },
    {
      "pin": 15,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 16,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive +5V DC Supply",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "max485",
  "name": "MAX485",
  "aliases": [
    "MAX485CPA",
    "MAX485CSA",
    "ADM485"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "RS-485/RS-422 Transceiver for Modbus solar inverter monitoring.",
  "simpleSummaryHi": "RS-485 मॉडबस सोलर मॉनिटरिंग IC।",
  "workingPrincipleEn": "MAX485 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "MAX485 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "sp3485",
  "name": "SP3485",
  "aliases": [
    "SP3485EN",
    "MAX3485"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "3.3V Low Power RS-485 Transceiver for ARM/DSP solar cards.",
  "simpleSummaryHi": "3.3V RS-485 मॉडबस IC।",
  "workingPrincipleEn": "SP3485 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "SP3485 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "ht1621",
  "name": "HT1621",
  "aliases": [
    "HT1621B",
    "HT1621G"
  ],
  "category": "Memory & Interface",
  "totalPins": 48,
  "dipPackageName": "DIP-48",
  "smdPackageName": "SOIC-48 / SOP-48",
  "simpleSummaryEn": "32x4 LCD Controller/Driver for custom inverter segment displays.",
  "simpleSummaryHi": "32x4 LCD डिस्प्ले ड्राइवर IC।",
  "workingPrincipleEn": "HT1621 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "HT1621 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "C1+",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (+)",
      "descHi": "कैपेसिटर 1 (+)"
    },
    {
      "pin": 2,
      "name": "V+",
      "type": "Power",
      "descEn": "+8.5V charge pump output",
      "descHi": "+8.5V बूस्ट"
    },
    {
      "pin": 3,
      "name": "C1-",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (-)",
      "descHi": "कैपेसिटर 1 (-)"
    },
    {
      "pin": 4,
      "name": "C2+",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (+)",
      "descHi": "कैपेसिटर 2 (+)"
    },
    {
      "pin": 5,
      "name": "C2-",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (-)",
      "descHi": "कैपेसिटर 2 (-)"
    },
    {
      "pin": 6,
      "name": "V-",
      "type": "Power",
      "descEn": "-8.5V charge pump output",
      "descHi": "-8.5V नेगेटिव"
    },
    {
      "pin": 7,
      "name": "T2OUT",
      "type": "Output",
      "descEn": "RS232 Driver 2 Output",
      "descHi": "RS232 आउटपुट 2"
    },
    {
      "pin": 8,
      "name": "R2IN",
      "type": "Input",
      "descEn": "RS232 Receiver 2 Input",
      "descHi": "RS232 इनपुट 2"
    },
    {
      "pin": 9,
      "name": "R2OUT",
      "type": "Output",
      "descEn": "TTL Receiver 2 Output",
      "descHi": "TTL आउटपुट 2"
    },
    {
      "pin": 10,
      "name": "T2IN",
      "type": "Input",
      "descEn": "TTL Driver 2 Input",
      "descHi": "TTL इनपुट 2"
    },
    {
      "pin": 11,
      "name": "T1IN",
      "type": "Input",
      "descEn": "TTL Driver 1 Input (MCU TX)",
      "descHi": "TTL इनपुट 1"
    },
    {
      "pin": 12,
      "name": "R1OUT",
      "type": "Output",
      "descEn": "TTL Receiver 1 Output (MCU RX)",
      "descHi": "TTL आउटपुट 1"
    },
    {
      "pin": 13,
      "name": "R1IN",
      "type": "Input",
      "descEn": "RS232 Receiver 1 Input",
      "descHi": "RS232 इनपुट 1"
    },
    {
      "pin": 14,
      "name": "T1OUT",
      "type": "Output",
      "descEn": "RS232 Driver 1 Output",
      "descHi": "RS232 आउटपुट 1"
    },
    {
      "pin": 15,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 16,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive +5V DC Supply",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "tm1637",
  "name": "TM1637",
  "aliases": [
    "TM1637D",
    "TM1637S"
  ],
  "category": "Memory & Interface",
  "totalPins": 20,
  "dipPackageName": "DIP-20",
  "smdPackageName": "SOIC-20 / SOP-20",
  "simpleSummaryEn": "2-Wire serial 4-digit 7-segment LED display driver with key scan.",
  "simpleSummaryHi": "4-डिजिट 7-सेगमेंट LED डिस्प्ले ड्राइवर।",
  "workingPrincipleEn": "TM1637 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TM1637 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "C1+",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (+)",
      "descHi": "कैपेसिटर 1 (+)"
    },
    {
      "pin": 2,
      "name": "V+",
      "type": "Power",
      "descEn": "+8.5V charge pump output",
      "descHi": "+8.5V बूस्ट"
    },
    {
      "pin": 3,
      "name": "C1-",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (-)",
      "descHi": "कैपेसिटर 1 (-)"
    },
    {
      "pin": 4,
      "name": "C2+",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (+)",
      "descHi": "कैपेसिटर 2 (+)"
    },
    {
      "pin": 5,
      "name": "C2-",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (-)",
      "descHi": "कैपेसिटर 2 (-)"
    },
    {
      "pin": 6,
      "name": "V-",
      "type": "Power",
      "descEn": "-8.5V charge pump output",
      "descHi": "-8.5V नेगेटिव"
    },
    {
      "pin": 7,
      "name": "T2OUT",
      "type": "Output",
      "descEn": "RS232 Driver 2 Output",
      "descHi": "RS232 आउटपुट 2"
    },
    {
      "pin": 8,
      "name": "R2IN",
      "type": "Input",
      "descEn": "RS232 Receiver 2 Input",
      "descHi": "RS232 इनपुट 2"
    },
    {
      "pin": 9,
      "name": "R2OUT",
      "type": "Output",
      "descEn": "TTL Receiver 2 Output",
      "descHi": "TTL आउटपुट 2"
    },
    {
      "pin": 10,
      "name": "T2IN",
      "type": "Input",
      "descEn": "TTL Driver 2 Input",
      "descHi": "TTL इनपुट 2"
    },
    {
      "pin": 11,
      "name": "T1IN",
      "type": "Input",
      "descEn": "TTL Driver 1 Input (MCU TX)",
      "descHi": "TTL इनपुट 1"
    },
    {
      "pin": 12,
      "name": "R1OUT",
      "type": "Output",
      "descEn": "TTL Receiver 1 Output (MCU RX)",
      "descHi": "TTL आउटपुट 1"
    },
    {
      "pin": 13,
      "name": "R1IN",
      "type": "Input",
      "descEn": "RS232 Receiver 1 Input",
      "descHi": "RS232 इनपुट 1"
    },
    {
      "pin": 14,
      "name": "T1OUT",
      "type": "Output",
      "descEn": "RS232 Driver 1 Output",
      "descHi": "RS232 आउटपुट 1"
    },
    {
      "pin": 15,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 16,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive +5V DC Supply",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "tm1638",
  "name": "TM1638",
  "aliases": [
    "TM1638S",
    "TM1638D"
  ],
  "category": "Memory & Interface",
  "totalPins": 28,
  "dipPackageName": "DIP-28",
  "smdPackageName": "SOIC-28 / SOP-28",
  "simpleSummaryEn": "10-Segment 8-Digit LED display driver with keypad scanner.",
  "simpleSummaryHi": "8-डिजिट LED व कीपैड ड्राइवर।",
  "workingPrincipleEn": "TM1638 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "TM1638 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "C1+",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (+)",
      "descHi": "कैपेसिटर 1 (+)"
    },
    {
      "pin": 2,
      "name": "V+",
      "type": "Power",
      "descEn": "+8.5V charge pump output",
      "descHi": "+8.5V बूस्ट"
    },
    {
      "pin": 3,
      "name": "C1-",
      "type": "Passive",
      "descEn": "Charge pump cap 1 (-)",
      "descHi": "कैपेसिटर 1 (-)"
    },
    {
      "pin": 4,
      "name": "C2+",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (+)",
      "descHi": "कैपेसिटर 2 (+)"
    },
    {
      "pin": 5,
      "name": "C2-",
      "type": "Passive",
      "descEn": "Charge pump cap 2 (-)",
      "descHi": "कैपेसिटर 2 (-)"
    },
    {
      "pin": 6,
      "name": "V-",
      "type": "Power",
      "descEn": "-8.5V charge pump output",
      "descHi": "-8.5V नेगेटिव"
    },
    {
      "pin": 7,
      "name": "T2OUT",
      "type": "Output",
      "descEn": "RS232 Driver 2 Output",
      "descHi": "RS232 आउटपुट 2"
    },
    {
      "pin": 8,
      "name": "R2IN",
      "type": "Input",
      "descEn": "RS232 Receiver 2 Input",
      "descHi": "RS232 इनपुट 2"
    },
    {
      "pin": 9,
      "name": "R2OUT",
      "type": "Output",
      "descEn": "TTL Receiver 2 Output",
      "descHi": "TTL आउटपुट 2"
    },
    {
      "pin": 10,
      "name": "T2IN",
      "type": "Input",
      "descEn": "TTL Driver 2 Input",
      "descHi": "TTL इनपुट 2"
    },
    {
      "pin": 11,
      "name": "T1IN",
      "type": "Input",
      "descEn": "TTL Driver 1 Input (MCU TX)",
      "descHi": "TTL इनपुट 1"
    },
    {
      "pin": 12,
      "name": "R1OUT",
      "type": "Output",
      "descEn": "TTL Receiver 1 Output (MCU RX)",
      "descHi": "TTL आउटपुट 1"
    },
    {
      "pin": 13,
      "name": "R1IN",
      "type": "Input",
      "descEn": "RS232 Receiver 1 Input",
      "descHi": "RS232 इनपुट 1"
    },
    {
      "pin": 14,
      "name": "T1OUT",
      "type": "Output",
      "descEn": "RS232 Driver 1 Output",
      "descHi": "RS232 आउटपुट 1"
    },
    {
      "pin": 15,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 16,
      "name": "VCC",
      "type": "Power",
      "descEn": "Positive +5V DC Supply",
      "descHi": "सप्लाई (+5V)"
    }
  ]
},
  {
  "id": "ds1307",
  "name": "DS1307",
  "aliases": [
    "DS1307N",
    "DS1307Z",
    "DS3231"
  ],
  "category": "Memory & Interface",
  "totalPins": 8,
  "dipPackageName": "DIP-8",
  "smdPackageName": "SOIC-8 / SOP-8",
  "simpleSummaryEn": "I2C Real-Time Clock (RTC) for solar inverter time-of-day billing.",
  "simpleSummaryHi": "I2C रियल-टाइम क्लॉक (RTC) IC।",
  "workingPrincipleEn": "DS1307 operates as a high-reliability Memory & Interface in inverter control, sensing, and switching stages with integrated protection.",
  "workingPrincipleHi": "DS1307 इन्वर्टर कंट्रोल, सेंसिंग और स्विचिंग सर्किट में Memory & Interface के रूप में अत्यधिक सटीकता और सुरक्षा के साथ काम करती है।",
  "inverterApplicationEn": "Commonly deployed in Luminous, Microtek, Livguard, Exide, and Su-Kam inverter motherboards.",
  "inverterApplicationHi": "ल्युमिनस, माइक्रोटेक, लिवगार्ड, एक्साइड और सु-काम इन्वर्टर मदरबोर्ड्स में व्यापक उपयोग।",
  "testingTipEn": "Measure VCC/VDD pin for expected DC operating voltage and test output pins with multimeter or oscilloscope.",
  "testingTipHi": "मल्टीमीटर से VCC/VDD पिन पर वोल्टेज नापें और आउटपुट पिनों पर सिग्नल व ग्राउंड कंटिन्यूटी चेक करें।",
  "pins": [
    {
      "pin": 1,
      "name": "A0 / CS",
      "type": "Control",
      "descEn": "Address 0 / Chip Select",
      "descHi": "एड्रेस 0 / चिप सेलेक्ट"
    },
    {
      "pin": 2,
      "name": "A1 / RO",
      "type": "Control",
      "descEn": "Address 1 / Receiver Out",
      "descHi": "एड्रेस 1 / रिसीवर आउट"
    },
    {
      "pin": 3,
      "name": "A2 / RE",
      "type": "Control",
      "descEn": "Address 2 / Receiver Enable",
      "descHi": "एड्रेस 2 / इनेबल"
    },
    {
      "pin": 4,
      "name": "GND",
      "type": "Ground",
      "descEn": "Ground Pin (0V)",
      "descHi": "ग्राउंड (0V)"
    },
    {
      "pin": 5,
      "name": "SDA / A",
      "type": "Control",
      "descEn": "I2C Serial Data / RS485 A Line",
      "descHi": "सीरियल डेटा / RS485 A"
    },
    {
      "pin": 6,
      "name": "SCL / B",
      "type": "Control",
      "descEn": "I2C Serial Clock / RS485 B Line",
      "descHi": "सीरियल क्लॉक / RS485 B"
    },
    {
      "pin": 7,
      "name": "WP / DI",
      "type": "Control",
      "descEn": "Write Protect / Driver In",
      "descHi": "राइट प्रोटेक्ट"
    },
    {
      "pin": 8,
      "name": "VCC",
      "type": "Power",
      "descEn": "Power Supply (+5V DC)",
      "descHi": "पावर सप्लाई (+5V)"
    }
  ]
},
];
