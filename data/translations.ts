import { Language } from '@/context/LanguageContext';

type TranslationMap = Record<string, string>;
type Translations = Record<Language, TranslationMap>;

export const t: Translations = {
  en: {
    // App chrome
    appName: 'MaliK Electronic',
    appTagline: 'Inverter Troubleshooter',
    appDescription:
      'Select your inverter model to find faults, symptoms and troubleshooting information.',

    // Navigation & Sidebar
    homepage: 'Homepage',
    tools: 'Electronics Tools',
    toolsSubtitle: 'Resistor Calculators & IC Pinout Guide',
    support: 'Support & Help',
    supportModalTitle: 'Technical Support & Help',
    supportModalDesc:
      'For inverter repair assistance, spare parts, and PCB troubleshooting queries, contact MaliK Electronic.',
    phone: 'Phone / Call',
    whatsapp: 'WhatsApp Support',
    address: 'Shop Address',
    addressText: 'MaliK Electronic Repair & Spares, Main Market',
    phoneNum: '+91 98765 43210',

    // Home screen
    selectInverter: 'Select Inverter',
    modelsAvailable: 'models available',
    searchModelOrBrand: 'Search model or brand...',
    noInverterFound: 'No inverter found',
    tryAnotherBrand: 'Try another brand or model name.',
    capacity: 'Capacity',
    battery: 'Battery',
    troubleshootingTopics: 'troubleshooting topics',

    // Inverter detail screen
    troubleshooting: 'Troubleshooting',
    selectProblem: 'fault(s) available — tap to view details.',
    searchFault: 'Search fault...',
    noFaultFound: 'No fault found',
    back: '‹ Back',
    tapToTroubleshoot: 'Tap to troubleshoot →',

    // Fault detail screen
    pcbDiagram: '🔍 Circuit Diagram',
    diagramCaption: 'Tap image to view in full screen',
    tapToZoom: '🔍 Tap to view large diagram',
    closeImage: '✕ Close',
    zoomHint: 'Pinch or scroll to inspect circuit traces & component values',
    noDiagramTitle: 'No Diagram Available',
    noDiagramText: 'Circuit diagram for this fault is not available yet.',
    symptoms: 'Symptoms',
    basicChecks: 'Basic Checks',
    possibleCauses: 'Possible Causes',
    repairProcedure: 'Repair Procedure',
    circuitFlow: 'Circuit Flow',
    componentsTable: 'Component & Technical Specifications',
    resistorValues: 'Resistor Values Table',
    importantNote: '📌 Important Note',
    diagnosisSummary: '🩺 Diagnosis Summary',
    faultNotFound: 'Fault not found',
    inverterNotFound: 'Inverter not found',
    highRisk: 'HIGH RISK',
    criticalRisk: 'CRITICAL RISK',
    mediumRisk: 'MEDIUM RISK',
    lowRisk: 'LOW RISK',
    component: 'Component',
    function: 'Function',
    value: 'Value',
    pcbType: 'PCB Type',

    // Calculators
    smdTitle: 'SMD Resistor Calculator',
    smdSubtitle: '3-Digit, 4-Digit & EIA-96 SMD Code Decoder',
    dipTitle: 'DIP Color Code Calculator',
    dipSubtitle: '4-Band & 5-Band Through-Hole Resistor Decoder',
    enterSmdCode: 'Enter SMD Code',
    smdPlaceholder: 'e.g. 103, 472, 1001, 5601, 4R7, 01C',
    calculate: 'Calculate Value',
    clear: 'Clear',
    calculatedResistance: 'Calculated Resistance',
    standardValue: 'Standard Value',
    codeFormat: 'Code Format',
    multiplierVal: 'Multiplier',
    band1: '1st Band (Digit 1)',
    band2: '2nd Band (Digit 2)',
    band3: '3rd Band (Digit 3)',
    multiplierBand: 'Multiplier Band',
    toleranceBand: 'Tolerance Band',
    selectColor: 'Select color band',
    quickExamples: 'Popular SMD Codes in Inverters',

    // IC Guide
    icGuideTitle: 'IC Pinout & Working Guide',
    icGuideSubtitle: 'Popular Inverter & Electronic ICs (SMD & DIP Packages)',
    icListTitle: 'Inverter IC Directory',
    icListSubtitle: 'Browse 200+ Inverter & Power Electronics ICs. Tap any IC to inspect pinout & working principle.',
    totalIcsAvailable: 'ICs available',
    viewIcDetails: 'View Pinout & Working →',
    backToIcsList: '‹ Back to IC List',
    searchIc: 'Search IC name (e.g. LM324, SG3525, ULN2003)...',
    noIcFound: 'No IC found matching your search',
    pinNumber: 'Pin No.',
    pinName: 'Pin Name',
    pinFunction: 'Pin Function & Description',
    workingTitle: 'Working Principle (In Simple Words)',
    inverterApplication: 'Inverter & PCB Application',
    testingTitle: 'Multimeter Testing & Key Voltages',
    dipPackage: 'DIP Package (Through-Hole)',
    smdPackage: 'SMD Package (SOIC / SOP)',

    // Microcontroller PDF & Details
    microcontrollerPinDetails: 'Microcontroller Pin Details (PDF)',
    viewPinDetails: 'View Complete 28-Pin Voltages & Chart →',
    microcontrollerSubtitle: 'Inspect all pin numbers, voltages, signals & working functions',
    page: 'Page',

    // Calculators & Tools Extras
    bands4: '4-Band Resistor',
    bands5: '5-Band Resistor',
    tolerance: 'Tolerance',
    pinDetails: 'Pin Details',
    open: 'Open →',
    bothDipSmd: 'DIP & SMD Combined',
    dipOnly: 'DIP Only',
    smdOnly: 'SMD Only',
    equivalents: 'Equivalents',
    aliases: 'Aliases / Direct equivalents',
    modelsAndFaults: 'Inverter Models & Faults',
    customerAndTechHelp: 'Customer & Technical Help',
    inverterRepairCompanion: 'MaliK Electronic Repair Companion',
    pin: 'Pin',
    name: 'Name',
    type: 'Type',
    all: 'All',

    // Sidebar
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    version: 'Version 1.0.0',
    sidebarTitle: 'MaliK Electronic',
    sidebarSubtitle: 'Inverter Repair Guide & Tools',
    settings: 'Settings',
    close: 'Close',
  },

  hi: {
    // App chrome
    appName: 'मालिक इलेक्ट्रॉनिक',
    appTagline: 'इन्वर्टर ट्रबलशूटर',
    appDescription:
      'अपना इन्वर्टर मॉडल चुनें — खराबी, लक्षण और मरम्मत की जानकारी पाएं।',

    // Navigation & Sidebar
    homepage: 'होम पेज (Home)',
    tools: 'इलेक्ट्रॉनिक्स टूल्स (Tools)',
    toolsSubtitle: 'रेजिस्टेंस कैलकुलेटर और IC गाइड',
    support: 'सहायता और संपर्क (Support)',
    supportModalTitle: 'तकनीकी सहायता और संपर्क',
    supportModalDesc:
      'इन्वर्टर रिपेयर, पार्ट्स और तकनीकी जानकारी के लिए मालिक इलेक्ट्रॉनिक से संपर्क करें।',
    phone: 'फोन कॉल',
    whatsapp: 'व्हाट्सएप सपोर्ट',
    address: 'दुकान का पता',
    addressText: 'मालिक इलेक्ट्रॉनिक रिपेयर और स्पेयर पार्ट्स, मेन मार्केट',
    phoneNum: '+91 98765 43210',

    // Home screen
    selectInverter: 'इन्वर्टर चुनें',
    modelsAvailable: 'मॉडल उपलब्ध हैं',
    searchModelOrBrand: 'मॉडल या ब्रांड खोजें...',
    noInverterFound: 'कोई इन्वर्टर नहीं मिला',
    tryAnotherBrand: 'कोई दूसरा ब्रांड या मॉडल नाम आज़माएं।',
    capacity: 'क्षमता',
    battery: 'बैटरी',
    troubleshootingTopics: 'समस्या निवारण विषय',

    // Inverter detail screen
    troubleshooting: 'समस्या निवारण',
    selectProblem: 'खराबी उपलब्ध — विवरण देखने के लिए टैप करें।',
    searchFault: 'खराबी खोजें...',
    noFaultFound: 'कोई खराबी नहीं मिली',
    back: '‹ वापस',
    tapToTroubleshoot: 'सुधारने के लिए टैप करें →',

    // Fault detail screen
    pcbDiagram: '🔍 सर्किट डायग्राम',
    diagramCaption: 'बड़ी स्क्रीन में देखने के लिए इमेज पर टैप करें',
    tapToZoom: '🔍 बड़ा डायग्राम देखने के लिए टैप करें',
    closeImage: '✕ बंद करें',
    zoomHint: 'सर्किट ट्रैक्स और कंपोनेंट वैल्यू देखने के लिए ज़ूम करें',
    noDiagramTitle: 'डायग्राम उपलब्ध नहीं',
    noDiagramText: 'इस खराबी का सर्किट डायग्राम अभी उपलब्ध नहीं है।',
    symptoms: 'लक्षण (Symptoms)',
    basicChecks: 'बुनियादी जांच (Basic Checks)',
    possibleCauses: 'संभावित कारण (Possible Causes)',
    repairProcedure: 'मरम्मत प्रक्रिया (Repair Procedure)',
    circuitFlow: 'सर्किट फ्लो (Circuit Flow)',
    componentsTable: 'कंपोनेंट और तकनीकी विवरण',
    resistorValues: 'रेजिस्टेंस वैल्यू टेबल',
    importantNote: '📌 महत्वपूर्ण नोट',
    diagnosisSummary: '🩺 निदान सारांश (Diagnosis)',
    faultNotFound: 'खराबी नहीं मिली',
    inverterNotFound: 'इन्वर्टर नहीं मिला',
    highRisk: 'उच्च जोखिम',
    criticalRisk: 'गंभीर जोखिम',
    mediumRisk: 'मध्यम जोखिम',
    lowRisk: 'कम जोखिम',
    component: 'कंपोनेंट',
    function: 'कार्य',
    value: 'मान / वैल्यू',
    pcbType: 'पीसीबी प्रकार',

    // Calculators
    smdTitle: 'SMD रेजिस्टेंस कैलकुलेटर',
    smdSubtitle: '3-डिजिट, 4-डिजिट और EIA-96 SMD कोड डिकोडर',
    dipTitle: 'DIP कलर कोड कैलकुलेटर',
    dipSubtitle: '4-बैंड और 5-बैंड रेजिस्टेंस डिकोडर',
    enterSmdCode: 'SMD कोड दर्ज करें',
    smdPlaceholder: 'उदा. 103, 472, 1001, 5601, 4R7, 01C',
    calculate: 'मान निकालें',
    clear: 'साफ करें',
    calculatedResistance: 'निकाला गया रेजिस्टेंस मान',
    standardValue: 'मानक मान',
    codeFormat: 'कोड प्रारूप',
    multiplierVal: 'मल्टीप्लायर',
    band1: 'पहला बैंड (डिजिट 1)',
    band2: 'दूसरा बैंड (डिजिट 2)',
    band3: 'तीसरा बैंड (डिजिट 3)',
    multiplierBand: 'मल्टीप्लायर बैंड',
    toleranceBand: 'टॉलरेंस बैंड',
    selectColor: 'रंग बैंड चुनें',
    quickExamples: 'इन्वर्टर में इस्तेमाल होने वाले मुख्य SMD कोड्स',

    // IC Guide
    icGuideTitle: 'IC पिनआउट और कार्यप्रणाली गाइड',
    icGuideSubtitle: 'इन्वर्टर और इलेक्ट्रॉनिक मुख्य ICs (SMD और DIP पैकेज)',
    icListTitle: 'इन्वर्टर IC डायरेक्टरी',
    icListSubtitle: '200+ इन्वर्टर और पावर इलेक्ट्रॉनिक्स ICs उपलब्ध हैं। पिनआउट और कार्यप्रणाली देखने के लिए किसी भी IC पर टैप करें।',
    totalIcsAvailable: 'ICs उपलब्ध हैं',
    viewIcDetails: 'पिनआउट व कार्यप्रणाली देखें →',
    backToIcsList: '‹ IC सूची पर वापस जाएं',
    searchIc: 'IC नाम खोजें (उदा. LM324, SG3525, ULN2003)...',
    noIcFound: 'इस नाम से कोई IC नहीं मिली',
    pinNumber: 'पिन नंबर',
    pinName: 'पिन नाम',
    pinFunction: 'पिन कार्य और सरल विवरण',
    workingTitle: 'कार्यप्रणाली (सरल शब्दों में समझें)',
    inverterApplication: 'इन्वर्टर सर्किट में उपयोग',
    testingTitle: 'मल्टीमीटर टेस्टिंग व वोल्टेज जांच',
    dipPackage: 'DIP पैकेज (Through-Hole)',
    smdPackage: 'SMD पैकेज (SOIC / SOP)',

    // Microcontroller PDF & Details
    microcontrollerPinDetails: 'माइक्रोकंट्रोलर पिन विवरण (PDF)',
    viewPinDetails: 'सभी 28 पिनों का वोल्टेज व चार्ट देखें →',
    microcontrollerSubtitle: 'सभी पिन नंबर, वोल्टेज, सिग्नल्स और कार्यप्रणाली देखें',
    page: 'पेज',

    // Calculators & Tools Extras
    bands4: '4-बैंड रेजिस्टेंस',
    bands5: '5-बैंड रेजिस्टेंस',
    tolerance: 'टॉलरेंस (सहनशीलता)',
    pinDetails: 'पिन विवरण',
    open: 'खोलें →',
    bothDipSmd: 'DIP व SMD कंबाइंड',
    dipOnly: 'केवल DIP',
    smdOnly: 'केवल SMD',
    equivalents: 'समतुल्य (Equivalents)',
    aliases: 'अन्य नाम व सीधे विकल्प',
    modelsAndFaults: 'इन्वर्टर मॉडल और फॉल्ट्स',
    customerAndTechHelp: 'ग्राहक व तकनीकी सहायता',
    inverterRepairCompanion: 'मालिक इलेक्ट्रॉनिक रिपेयर गाइड',
    pin: 'पिन',
    name: 'नाम',
    type: 'प्रकार',
    all: 'सभी (All)',

    // Sidebar
    language: 'भाषा (Language)',
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    version: 'संस्करण 1.0.0',
    sidebarTitle: 'मालिक इलेक्ट्रॉनिक',
    sidebarSubtitle: 'इन्वर्टर मरम्मत गाइड और टूल्स',
    settings: 'सेटिंग्स',
    close: 'बंद करें',
  },
};

/**
 * Helper to get a translated string.
 * Usage: tr(language, 'appName')
 */
export function tr(lang: Language, key: string): string {
  return t[lang]?.[key] ?? t['en'][key] ?? key;
}
