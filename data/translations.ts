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

    // Sidebar
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    version: 'Version 1.0.0',
    sidebarTitle: 'MaliK Electronic',
    sidebarSubtitle: 'Inverter Repair Guide',
    settings: 'Settings',
    close: 'Close',
  },

  hi: {
    // App chrome
    appName: 'मालिक इलेक्ट्रॉनिक',
    appTagline: 'इन्वर्टर ट्रबलशूटर',
    appDescription:
      'अपना इन्वर्टर मॉडल चुनें — खराबी, लक्षण और मरम्मत की जानकारी पाएं।',

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

    // Sidebar
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी (Hindi)',
    version: 'संस्करण 1.0.0',
    sidebarTitle: 'मालिक इलेक्ट्रॉनिक',
    sidebarSubtitle: 'इन्वर्टर मरम्मत गाइड',
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
