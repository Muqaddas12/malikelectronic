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

    // Inverter detail screen
    troubleshooting: 'Troubleshooting',
    selectProblem: 'fault(s) available — tap to view details.',
    searchFault: 'Search fault...',
    noFaultFound: 'No fault found',
    back: '‹ Back',
    tapToTroubleshoot: 'Tap to troubleshoot →',

    // Fault detail screen
    safetyFirst: '⚠ Safety First',
    safetyText:
      'Disconnect mains and battery before opening the inverter. Work on high-voltage circuits only if properly trained and equipped.',
    pcbDiagram: '🔍 Circuit Diagram',
    diagramCaption: 'Refer highlighted circuit area for this fault diagnosis',
    noDiagramTitle: 'No Diagram Available',
    noDiagramText: 'Circuit diagram for this fault is not available yet.',
    symptoms: 'Symptoms',
    basicChecks: 'Basic Checks',
    possibleCauses: 'Possible Causes',
    repairProcedure: 'Repair Procedure',
    circuitFlow: 'Circuit Flow',
    importantNote: '📌 Important Note',
    diagnosisSummary: '🩺 Diagnosis Summary',
    faultNotFound: 'Fault not found',
    inverterNotFound: 'Inverter not found',
    highRisk: 'HIGH RISK',
    criticalRisk: 'CRITICAL RISK',
    mediumRisk: 'MEDIUM RISK',
    lowRisk: 'LOW RISK',

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

    // Inverter detail screen
    troubleshooting: 'समस्या निवारण',
    selectProblem: 'खराबी उपलब्ध — विवरण देखने के लिए टैप करें।',
    searchFault: 'खराबी खोजें...',
    noFaultFound: 'कोई खराबी नहीं मिली',
    back: '‹ वापस',
    tapToTroubleshoot: 'सुधारने के लिए टैप करें →',

    // Fault detail screen
    safetyFirst: '⚠ पहले सुरक्षा',
    safetyText:
      'इन्वर्टर खोलने से पहले मेन और बैटरी दोनों disconnect करें। हाई-वोल्टेज सर्किट पर केवल trained व्यक्ति ही काम करें।',
    pcbDiagram: '🔍 सर्किट डायग्राम',
    diagramCaption: 'इस खराबी की जांच के लिए highlighted सर्किट area देखें',
    noDiagramTitle: 'डायग्राम उपलब्ध नहीं',
    noDiagramText: 'इस खराबी का सर्किट डायग्राम अभी उपलब्ध नहीं है।',
    symptoms: 'लक्षण',
    basicChecks: 'बुनियादी जांच',
    possibleCauses: 'संभावित कारण',
    repairProcedure: 'मरम्मत प्रक्रिया',
    circuitFlow: 'सर्किट फ्लो',
    importantNote: '📌 महत्वपूर्ण नोट',
    diagnosisSummary: '🩺 निदान सारांश',
    faultNotFound: 'खराबी नहीं मिली',
    inverterNotFound: 'इन्वर्टर नहीं मिला',
    highRisk: 'उच्च जोखिम',
    criticalRisk: 'गंभीर जोखिम',
    mediumRisk: 'मध्यम जोखिम',
    lowRisk: 'कम जोखिम',

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
