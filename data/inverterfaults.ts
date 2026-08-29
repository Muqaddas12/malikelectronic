import { InverterFaultDetail } from '@/types/faultDetail';

// ─────────────────────────────────────────────────────────────────────────────
// Per-inverter fault map:  inverterFaultsMap[inverterId][faultId]
// ─────────────────────────────────────────────────────────────────────────────

export const inverterFaultsMap: Record<
  string,
  Record<string, InverterFaultDetail>
> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // LUMINOUS ECO WATT+
  // ═══════════════════════════════════════════════════════════════════════════
  'LuminousEcoWatt': {

    'low-battery': {
      id: 'low-battery',
      title: 'Battery Low / Overcharge',
      subtitle:
        'Luminous Eco Watt mein battery low ya overcharge problem battery voltage sensing circuit ke R24 resistor ki wajah se ho sakti hai.',
      icon: '🔋',
      severity: 'high',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Inverter battery low dikha raha hai jabki battery voltage normal hai',
        'Inverter battery ko overcharge kar raha hai',
        'Battery ka pani jaldi sukh raha hai',
        'Battery charging voltage normal limit se zyada ho rahi hai',
        'Battery low aur overcharge indication galat aa sakta hai',
        'Inverter battery voltage ko correctly sense nahi kar pa raha hai',
      ],

      basicChecks: [
        'Sabse pehle battery terminal voltage multimeter se check karein',
        'Battery terminals aur connecting wires loose ya corroded na hon',
        'PCB par R24 resistor ki value check karein',
        'PCB par R16 resistor ko check karein',
        'R31 resistor ki value check karein',
        'C13 capacitor par short ya leakage check karein',
        'C16 capacitor par short ya leakage check karein',
        'PCB tracks mein crack, burn ya dry soldering check karein',
      ],

      technicalExplanation: {
        title: 'Battery Voltage Sensing Circuit',
        explanation:
          'Is circuit ka kaam battery voltage ko sense karke microcontroller PIC16F722 tak safe voltage level mein pahunchana hai. Microcontroller isi sensed voltage ke basis par battery low, normal charging aur overcharge condition ko identify karta hai.',
        components: [
          {
            component: 'R24',
            function:
              'Battery voltage sensing circuit ka main input resistor hai. Battery voltage ko sensing circuit ke liye suitable level par reduce karta hai.',
            value12V: '9.1kΩ',
            value24V: '22kΩ',
            important: '12V PCB aur 24V PCB mein R24 ki value same nahi hoti.',
          },
          {
            component: 'R16',
            function:
              'Sensing voltage ko PIC16F722 ke input tak limit/filter karne mein help karta hai.',
            value: '1kΩ',
          },
          {
            component: 'R31',
            function:
              'Voltage divider/sensing network ka lower resistor hai aur sensed voltage ko ground ki taraf establish karta hai.',
            value: '3.3kΩ',
          },
          {
            component: 'C13',
            function:
              'Sensed voltage ko filter/stabilize karne ke liye use hota hai.',
            value: '1µF / 47V',
          },
          {
            component: 'C16',
            function:
              'R31 ke parallel filtering/stabilization mein help karta hai.',
            value: 'Image mein clearly specified nahi',
          },
          {
            component: 'PIC16F722',
            function:
              'Sensed battery voltage ko read karke inverter ke charging aur battery-status control mein use karta hai.',
            package: '28-pin',
          },
        ],
      },

      resistorValues: {
        title: 'R24 Resistor Value — 12V vs 24V PCB',
        explanation:
          'R24 ki value inverter ke battery system voltage ke according select hoti hai.',
        values: [
          {
            pcb: '12V PCB',
            r24: '9.1kΩ',
            marking: '9.1k',
            reason:
              '12V battery voltage ko sensing circuit ke suitable voltage level tak reduce karne ke liye.',
          },
          {
            pcb: '24V PCB',
            r24: '22kΩ',
            marking: '22k',
            reason:
              '24V battery voltage higher hone ke karan sensing input ko suitable range mein rakhne ke liye higher resistance use hota hai.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'R24 wrong value',
          explanation:
            'Agar 12V PCB mein 9.1kΩ ki jagah 22kΩ ya koi doosri value laga di gayi hai, to PIC ko battery voltage incorrect sense ho sakta hai.',
        },
        {
          cause: 'R24 resistor open',
          explanation:
            'R24 open hone par battery sensing voltage microcontroller tak correctly nahi pahunch sakta.',
        },
        {
          cause: 'R24 resistor value changed',
          explanation:
            'Heat ya component damage ki wajah se resistor ki actual resistance change ho sakti hai, jisse voltage sensing inaccurate ho sakti hai.',
        },
        {
          cause: 'R16 damaged',
          explanation:
            'R16 sensing signal ko controller side par affect karta hai. Iske open/incorrect value hone se sensing problem aa sakti hai.',
        },
        {
          cause: 'R31 damaged',
          explanation:
            'R31 sensing network ka ground-side resistor hai. Iski value change hone par sensing voltage incorrect ho sakti hai.',
        },
        {
          cause: 'Capacitor leakage or short',
          explanation:
            'C13 ya C16 mein leakage/short hone par sensing voltage unstable ya incorrect ho sakti hai.',
        },
        {
          cause: 'Dry soldering',
          explanation:
            'R24, R16, R31 ya capacitor ke solder joints weak hone par intermittent battery sensing problem aa sakti hai.',
        },
        {
          cause: 'PCB track problem',
          explanation:
            'Battery sensing line mein broken/burnt PCB track hone par controller ko correct voltage signal nahi milega.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Battery Voltage Check',
          explanation:
            'Multimeter se directly battery terminals par voltage measure karein. Pehle confirm karein ki actual battery voltage normal hai.',
        },
        {
          step: 2,
          title: 'R24 Identify Karein',
          explanation:
            'PCB par R24 resistor locate karein. PCB 12V system hai ya 24V system, pehle confirm karein.',
        },
        {
          step: 3,
          title: 'R24 Value Check',
          explanation:
            '12V PCB mein R24 approximately 9.1kΩ aur 24V PCB mein approximately 22kΩ hona chahiye.',
        },
        {
          step: 4,
          title: 'R16 Check',
          explanation:
            'R16 ko power-off condition mein multimeter se resistance mode par check karein. Value 1kΩ hai.',
        },
        {
          step: 5,
          title: 'R31 Check',
          explanation: 'R31 ko check karein. Value 3.3kΩ honi chahiye.',
        },
        {
          step: 6,
          title: 'Capacitors Check',
          explanation:
            'C13 aur C16 mein short/leakage ya physical damage check karein. C13 value: 1µF/47V.',
        },
        {
          step: 7,
          title: 'Soldering aur Track Check',
          explanation:
            'R24 se sensing circuit aur PIC16F722 tak jaane wali PCB tracks aur solder joints ko inspect karein.',
        },
        {
          step: 8,
          title: 'Correct Component Replace Karein',
          explanation:
            'Agar R24 wrong value, open ya damaged hai to correct value ka resistor replace karein. 12V aur 24V PCB ki R24 value interchange na karein.',
        },
      ],

      circuitFlow:
        'Battery Voltage → R24 → Sensing Node → R16 → PIC16F722',

      importantNote:
        'R24 ki value battery system voltage ke according honi chahiye. 12V PCB mein 9.1kΩ aur 24V PCB mein 22kΩ use hota hai. Wrong resistor value lagane se battery voltage sensing incorrect ho sakti hai.',

      diagnosis:
        'Agar actual battery voltage normal hai lekin inverter battery low ya overcharge show kar raha hai, to battery sensing/feedback circuit check karein — especially R24, R16, R31, C13, C16 aur unki PCB tracks/soldering.',
    },

    'overload': {
      id: 'overload',
      title: 'Overload Protection',
      subtitle:
        'Inverter par connected load ki power inverter ki rated capacity se zyada ho gayi hai, jisse protection circuit trip kar gaya hai.',
      icon: '⚡',
      severity: 'high',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Inverter overload LED jal rahi hai ya beep sound aa raha hai',
        'Inverter output band ho jata hai aur mains se switch nahi kar raha',
        'Load lagane ke baad turant protection trip ho jata hai',
        'Output voltage drop ho rahi hai load ke saath',
      ],

      basicChecks: [
        'Connected appliances ki total wattage calculate karein',
        'Inverter ki rated VA capacity check karein (700VA = ~560W effective)',
        'Koi bhi faulty appliance short circuit to nahi kar raha',
        'Output wiring mein short circuit check karein',
        'Current sensing resistor Rs check karein',
        'Overload comparator IC ka output check karein',
      ],

      technicalExplanation: {
        title: 'Overload Sensing Circuit',
        explanation:
          'Output current ko ek low-value shunt resistor (Rs) se sense kiya jata hai. Jab current ek set threshold se zyada hoti hai, comparator circuit PIC ko signal deta hai jo output disable kar deta hai.',
        components: [
          {
            component: 'Rs (Shunt Resistor)',
            function: 'Output current sense karne ke liye use hota hai.',
            value: '0.1Ω / 5W',
          },
          {
            component: 'Comparator IC',
            function:
              'Sensed current voltage ko reference se compare karke overload detect karta hai.',
          },
          {
            component: 'PIC16F722',
            function: 'Overload signal par output MOSFETs disable karta hai.',
            package: '28-pin',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Load zyada hai',
          explanation: 'Connected appliances ki total wattage inverter se zyada hai.',
        },
        {
          cause: 'Faulty appliance',
          explanation: 'Koi appliance internally short circuit ho gaya hai jisse current surge ho raha hai.',
        },
        {
          cause: 'Output wiring short',
          explanation: 'Output socket ya wiring mein short circuit hai.',
        },
        {
          cause: 'Shunt resistor damaged',
          explanation: 'Rs burnt/open hone se false overload detection ho sakti hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Load Disconnect Karein',
          explanation: 'Sabse pehle sab appliances disconnect karein aur inverter reset karein.',
        },
        {
          step: 2,
          title: 'Load Calculate Karein',
          explanation: 'Ek ek karke appliances lagaein aur total wattage inverter capacity se kam rakhein.',
        },
        {
          step: 3,
          title: 'Faulty Appliance Check Karein',
          explanation: 'Har appliance ko alag alag check karein — agar ek se overload aaye to woh appliance faulty hai.',
        },
        {
          step: 4,
          title: 'PCB Check Karein',
          explanation: 'Agar bina load ke bhi overload show ho to shunt resistor aur comparator circuit check karein.',
        },
      ],

      importantNote:
        'Inverter 700VA hai to maximum effective load ~560W rakhein. Zyada load se MOSFET aur transformer damage ho sakte hain.',

      diagnosis:
        'Agar load hata kar inverter normal chale to overload problem hai. Agar bina load ke bhi overload aaye to PCB fault hai.',
    },

    'battery-dead': {
      id: 'battery-dead',
      title: 'Battery Dead / Not Charging',
      subtitle:
        'Battery bilkul discharge ho gayi hai ya charge nahi le rahi — charging circuit ya battery cells mein problem ho sakti hai.',
      icon: '💀',
      severity: 'critical',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Battery voltage 10.5V se neeche aa gayi hai (12V system)',
        'Inverter charg karne ke bawajood backup nahi de raha',
        'Battery gurgling/bulging ya excess heat generate kar rahi hai',
        'Charging current zero ya bahut kam hai',
        'Battery indicator humesha low show kar raha hai',
      ],

      basicChecks: [
        'Battery OCV (Open Circuit Voltage) multimeter se check karein',
        'Charger output voltage check karein (13.8V – 14.4V hona chahiye)',
        'Charging fuse check karein',
        'Charging MOSFET/transistor check karein',
        'Battery cells individually check karein',
        'Electrolyte level check karein',
      ],

      technicalExplanation: {
        title: 'Charging Circuit',
        explanation:
          'Mains AC ko transformer step-down karta hai, phir rectifier circuit DC mein convert karta hai. PWM controller charging current regulate karta hai aur PIC16F722 charging cut-off control karta hai.',
        components: [
          {
            component: 'Charging Transformer',
            function: 'Mains 230V ko step-down karke charging voltage produce karta hai.',
          },
          {
            component: 'Rectifier Diodes',
            function: 'AC ko DC mein convert karta hai.',
          },
          {
            component: 'Charging MOSFET',
            function: 'PWM signal ke zariye charging current control karta hai.',
          },
          {
            component: 'PIC16F722',
            function: 'Charging level monitor karke cut-off decide karta hai.',
            package: '28-pin',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Battery cells sulfated',
          explanation: 'Long discharge ke baad battery plates sulfate ho jaate hain jo charge nahi lete.',
        },
        {
          cause: 'Charging circuit fault',
          explanation: 'Charging MOSFET, transformer ya rectifier diode mein fault.',
        },
        {
          cause: 'Fuse blown',
          explanation: 'Charging line ka fuse burn ho gaya hai.',
        },
        {
          cause: 'Battery age',
          explanation: 'Battery 3-5 saal se zyada purani hai aur capacity khatam ho gayi hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Battery Voltage Measure Karein',
          explanation: 'Multimeter se OCV check karein. 12V battery: 12V+ = good, 10.5V = deeply discharged, below 10V = likely dead.',
        },
        {
          step: 2,
          title: 'Charger Output Check Karein',
          explanation: 'Battery terminals par charging voltage check karein. 13.8V–14.4V hona chahiye.',
        },
        {
          step: 3,
          title: 'Fuse Check Karein',
          explanation: 'Charging path ka fuse multimeter se continuity check karein.',
        },
        {
          step: 4,
          title: 'Deep Discharge Recovery Try Karein',
          explanation: 'External charger se slow charge (C/10 rate) try karein. Agar 12 ghante baad bhi 10.5V se neeche ho to battery replace karein.',
        },
        {
          step: 5,
          title: 'Battery Replace Karein',
          explanation: 'Agar battery recover na ho to same AH rating ki nai battery lagaein.',
        },
      ],

      importantNote: 'Battery 10V se neeche jaane par cell damage ho jata hai. Inverter ko 10.5V cut-off se neeche use nahi karna chahiye.',

      diagnosis: 'OCV 12V se zyada ho aur charging nahi ho rahi to charging circuit fault hai. OCV 10V se kam ho to battery dead hai.',
    },

    'mosfet': {
      id: 'mosfet',
      title: 'MOSFET Failure',
      subtitle:
        'Output MOSFETs burn/short ho gaye hain — inverter output nahi de raha ya high current draw kar raha hai.',
      icon: '🔥',
      severity: 'critical',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Inverter se koi output nahi aa raha',
        'Battery se abnormally high current draw ho rahi hai',
        'MOSFETs physically hot ya burnt hain',
        'Inverter chalu karte hi fuse blow ho jata hai',
        'Burning smell aa rahi hai',
      ],

      basicChecks: [
        'MOSFET ke Gate-Source, Drain-Source resistance check karein (power off)',
        'MOSFET physically inspect karein — burn marks, crack, etc.',
        'Gate drive circuit check karein',
        'Driver IC (IR2110 ya similar) check karein',
        'Gate resistors check karein',
        'Fuse aur wiring short check karein',
      ],

      technicalExplanation: {
        title: 'H-Bridge MOSFET Output Stage',
        explanation:
          'Luminous Eco Watt mein 4 MOSFETs H-bridge configuration mein hote hain jo battery DC ko 50Hz square/modified sine wave mein convert karte hain. Gate drive IC alternately upper aur lower MOSFETs ko switch karta hai.',
        components: [
          {
            component: 'IRF3205 / IRF1405',
            function: 'Main output switching MOSFETs — high current, low Rds(on).',
            value: 'Vds: 55V, Id: 110A',
          },
          {
            component: 'Gate Driver IC',
            function: 'PIC se PWM signal leke MOSFET gates ko drive karta hai.',
          },
          {
            component: 'Gate Resistors (Rg)',
            function: 'Switching speed control karke EMI aur oscillation reduce karta hai.',
            value: '10Ω – 22Ω',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Overload ya short circuit',
          explanation: 'Excessive current se MOSFET overheat/burn ho gaya.',
        },
        {
          cause: 'Gate drive fault',
          explanation: 'Both MOSFETs ek saath ON ho gaye (shoot-through) jisse damage hua.',
        },
        {
          cause: 'Poor heat sinking',
          explanation: 'Heat sink se proper thermal contact nahi tha, MOSFET overheat ho gaya.',
        },
        {
          cause: 'Old age',
          explanation: 'Years of use ke baad MOSFET degrade ho gaya.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Power OFF Karein',
          explanation: 'Battery aur mains dono disconnect karein. Capacitors discharge ho jaane dein (30 seconds wait).',
        },
        {
          step: 2,
          title: 'MOSFET Test Karein',
          explanation: 'Multimeter diode mode par: D-S junction ~0.4-0.6V forward drop hona chahiye. Agar 0V ho to MOSFET short hai, agar OL ho to open hai.',
        },
        {
          step: 3,
          title: 'All MOSFETs Check Karein',
          explanation: 'Ek MOSFET short hone par doosre bhi damage ho sakte hain — sab test karein.',
        },
        {
          step: 4,
          title: 'Gate Drive Check Karein',
          explanation: 'Gate driver IC aur gate resistors check karein — damage ke signs dekhein.',
        },
        {
          step: 5,
          title: 'Replace Karein',
          explanation: 'Damaged MOSFETs ko same part number se replace karein. Heat sink compound (thermal paste) naya lagaein.',
        },
      ],

      importantNote: 'MOSFET replace karte waqt heatsink ko achhe se clean karein aur fresh thermal paste lagaein. All MOSFETs ek saath replace karna better hai.',

      diagnosis: 'Power-off state mein MOSFET Drain-Source short (0 ohm) = failed. Gate-Source short bhi failure indicate karta hai.',
    },

    'relay': {
      id: 'relay',
      title: 'Relay Problem',
      subtitle:
        'Mains-to-battery changeover relay properly switch nahi kar rahi — inverter mains se battery par ya vapas switch nahi hota.',
      icon: '🔌',
      severity: 'medium',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Power cut ke baad inverter battery par switch nahi karta',
        'Mains aane par inverter mains par wapas nahi aata',
        'Relay clicking sound baar baar aa rahi hai',
        'Output intermittent hai ya relay chatter ho rahi hai',
      ],

      basicChecks: [
        'Relay coil resistance check karein (multimeter)',
        'Relay coil ko 12V supply deke contacts check karein',
        'Relay drive transistor check karein',
        'Relay coil voltage check karein operation ke waqt',
        'Relay contacts clean ya corroded hain check karein',
        'Freewheeling diode check karein relay coil ke parallel',
      ],

      technicalExplanation: {
        title: 'Changeover Relay Circuit',
        explanation:
          'Ek main relay mains aur inverter output ke beech switch karta hai. PIC16F722 relay drive transistor ko control karta hai jab mains fail ya restore ho.',
        components: [
          {
            component: 'Main Relay',
            function: 'Mains se battery (inverter) par changeover karta hai.',
            value: '12V coil, 30A contacts',
          },
          {
            component: 'Drive Transistor',
            function: 'PIC signal se relay coil energize karta hai.',
          },
          {
            component: 'Freewheeling Diode',
            function: 'Relay coil ke back-EMF se transistor protect karta hai.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Relay coil open',
          explanation: 'Relay coil break ho gayi hai, energize nahi ho sakti.',
        },
        {
          cause: 'Contacts welded',
          explanation: 'High current arcing se relay contacts weld ho gaye hain.',
        },
        {
          cause: 'Drive transistor fault',
          explanation: 'Transistor fail ho gaya hai, relay coil ko current nahi milta.',
        },
        {
          cause: 'Insufficient coil voltage',
          explanation: 'Supply voltage kam hone se relay properly operate nahi karta.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Relay Coil Resistance Check',
          explanation: 'Multimeter se relay coil resistance check karein. Typical 12V relay: 200-400Ω. OL = open coil.',
        },
        {
          step: 2,
          title: 'Relay Drive Voltage Check',
          explanation: 'Relay coil terminals par voltage check karein — 12V hona chahiye jab energized ho.',
        },
        {
          step: 3,
          title: 'Drive Transistor Test',
          explanation: 'Transistor B-E, B-C junction check karein multimeter diode mode par.',
        },
        {
          step: 4,
          title: 'Relay Replace Karein',
          explanation: 'Same spec relay lagaein — coil voltage aur contact current rating same honi chahiye.',
        },
      ],

      importantNote: 'Relay replace karte waqt same coil voltage aur contact rating wali relay use karein. Freewheeling diode ka direction check karein.',

      diagnosis: 'Relay coil OL (infinite resistance) = coil open, replace karein. 0 Ω = shorted. Contacts stuck = replace.',
    },

    'switch': {
      id: 'switch',
      title: 'ON/OFF Switch Problem',
      subtitle:
        'Inverter ka power switch faulty hai — inverter on ya off nahi ho raha properly.',
      icon: '🔘',
      severity: 'low',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Switch dabane par inverter on nahi hota',
        'Inverter apne aap on/off ho raha hai',
        'Switch loose ho gaya hai ya mechanical damage hai',
        'Switch me spark ya burning smell',
      ],

      basicChecks: [
        'Switch continuity multimeter se check karein',
        'Switch terminals ke solder joints check karein',
        'Switch ke wires loose ya broken hain check karein',
        'PCB par switch mounting check karein',
      ],

      technicalExplanation: {
        title: 'Power Switch Circuit',
        explanation: 'Main ON/OFF switch battery positive ya negative line mein series mein hota hai ya control circuit mein connected hota hai.',
        components: [
          {
            component: 'Power Switch',
            function: 'Inverter ko on/off karta hai.',
            value: 'Rated 10A/250V minimum',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Switch contacts worn',
          explanation: 'Switch ke internal contacts wear out ho gaye hain.',
        },
        {
          cause: 'Loose wiring',
          explanation: 'Switch ke terminals se wire loose ho gayi hai.',
        },
        {
          cause: 'Mechanical damage',
          explanation: 'Switch ka plastic body crack ho gaya hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Switch Continuity Check',
          explanation: 'Multimeter continuity mode par switch test karein — ON position mein beep hona chahiye.',
        },
        {
          step: 2,
          title: 'Wiring Check',
          explanation: 'Switch ke dono terminals ki wiring tight aur properly soldered hai check karein.',
        },
        {
          step: 3,
          title: 'Replace Karein',
          explanation: 'Same rating ka naya switch lagaein.',
        },
      ],

      importantNote: 'Switch replace karte waqt current rating inverter ke fuse rating se zyada honi chahiye.',
      diagnosis: 'Switch open circuit (no continuity in ON position) = replace karein.',
    },

    'fuse': {
      id: 'fuse',
      title: 'Fuse Blown',
      subtitle:
        'Inverter ka main fuse blow ho gaya hai — output nahi aa raha ya battery charging nahi ho rahi.',
      icon: '💥',
      severity: 'medium',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Inverter bilkul on nahi ho raha',
        'Battery se koi current nahi ja rahi',
        'Fuse physically burnt ya wire open ho gayi hai',
        'Fuse replace karte hi wapas blow ho jati hai',
      ],

      basicChecks: [
        'Fuse continuity check karein',
        'Correct rating ka fuse lagaein',
        'Short circuit check karein fuse blow hone ki wajah',
        'MOSFETs aur wiring check karein agar fuse baar baar blow ho',
      ],

      technicalExplanation: {
        title: 'Fuse Protection Circuit',
        explanation: 'Main fuse battery positive line mein series mein hai jo short circuit ya overcurrent se inverter protect karta hai.',
        components: [
          {
            component: 'Main Fuse',
            function: 'Battery to inverter circuit protect karta hai.',
            value: '30A – 40A blade fuse (model dependent)',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Short circuit',
          explanation: 'Output ya internal wiring mein short circuit se excess current ne fuse blow kiya.',
        },
        {
          cause: 'MOSFET failure',
          explanation: 'Shorted MOSFET ne fuse blow kiya.',
        },
        {
          cause: 'Wrong rating fuse',
          explanation: 'Pehle se kam rating ka fuse laga tha jo normal current par blow ho gaya.',
        },
        {
          cause: 'Overload',
          explanation: 'Prolonged overload se fuse heat up ho gaya.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Fuse Inspect Karein',
          explanation: 'Fuse wire visually check karein — burnt ya open hai to replace karein.',
        },
        {
          step: 2,
          title: 'Short Circuit Find Karein',
          explanation: 'MOSFETs, wiring, aur output check karein short ke liye. Bina fix kiye naya fuse mat lagaein.',
        },
        {
          step: 3,
          title: 'Correct Fuse Lagaein',
          explanation: 'Manufacturer specified rating ka fuse lagaein — Luminous Eco Watt 700VA mein typically 30A.',
        },
      ],

      importantNote: 'Fuse baar baar blow ho to iska matlab underlying fault hai. Higher rating ka fuse kabhi mat lagaein — yeh protection ko disable kar deta hai aur serious damage ho sakta hai.',
      diagnosis: 'Fuse blow = short circuit ya overcurrent. Root cause find karo pehle, phir replace karo.',
    },

    'charging': {
      id: 'charging',
      title: 'Charging Problem',
      subtitle:
        'Battery theek se charge nahi ho rahi ya charging band ho gayi hai — charging circuit mein fault hai.',
      icon: '🔌',
      severity: 'high',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Mains par hone ke bawajood battery charge nahi ho rahi',
        'Charging current zero ya bahut kam hai',
        'Battery voltage mains par bhi nahi badhti',
        'Charging indicator off hai',
      ],

      basicChecks: [
        'Charger transformer secondary voltage check karein',
        'Rectifier diodes check karein',
        'Charging MOSFET ya transistor check karein',
        'PWM controller IC check karein',
        'Charging sense resistor check karein',
        'PIC16F722 charging output pin voltage check karein',
      ],

      technicalExplanation: {
        title: 'Battery Charging Circuit',
        explanation: 'Mains AC ko charging transformer step-down karta hai. Rectifier diodes DC convert karte hain. PWM IC current regulate karta hai aur PIC charging control karta hai.',
        components: [
          {
            component: 'Charging Transformer',
            function: 'Step-down: 230V AC to ~17V AC',
          },
          {
            component: 'Rectifier Bridge',
            function: 'AC to DC: Output ~15V DC',
          },
          {
            component: 'Charging MOSFET/Transistor',
            function: 'Current flow on/off switching karta hai.',
          },
          {
            component: 'PWM Controller',
            function: 'Charging current regulate karta hai.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Rectifier diode open',
          explanation: 'Diode fail hone se DC voltage nahi banti.',
        },
        {
          cause: 'Charging MOSFET failed',
          explanation: 'Current path blocked hai.',
        },
        {
          cause: 'Fuse blown',
          explanation: 'Charging line ka fuse open hai.',
        },
        {
          cause: 'PWM controller fault',
          explanation: 'Charging PWM signal nahi aa raha.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Mains Input Check',
          explanation: 'Mains 230V input confirm karein.',
        },
        {
          step: 2,
          title: 'Transformer Secondary Check',
          explanation: 'Transformer secondary AC voltage check karein (~17V AC).',
        },
        {
          step: 3,
          title: 'Rectifier Output Check',
          explanation: 'Rectifier ke baad DC voltage check karein (~15V DC).',
        },
        {
          step: 4,
          title: 'Charging Path Check',
          explanation: 'MOSFET, fuse, aur connections check karein.',
        },
        {
          step: 5,
          title: 'Faulty Component Replace',
          explanation: 'Failed component identify karke replace karein.',
        },
      ],

      importantNote: 'Charging circuit mains se directly connected hota hai. Proper insulation aur safety ke saath kaam karein.',
      diagnosis: 'Transformer secondary ok, rectifier output 0V = diode fault. Rectifier ok, battery voltage nahi badh rahi = MOSFET/PWM fault.',
    },

    'short-circuit': {
      id: 'short-circuit',
      title: 'Short Circuit Protection',
      subtitle: 'Output par short circuit detect hua hai — protection circuit ne output band kar diya.',
      icon: '⚠️',
      severity: 'critical',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Inverter output turant band ho gaya',
        'Short circuit LED jal rahi hai ya alarm sound aa raha hai',
        'Connected wire ya appliance burn ho gaya',
        'Fuse blow ho gaya',
      ],

      basicChecks: [
        'Output wiring mein short circuit visually check karein',
        'All appliances disconnect karein aur output check karein',
        'Socket aur wiring short check karein',
        'MOSFETs check karein — damaged to nahi',
      ],

      technicalExplanation: {
        title: 'Short Circuit Protection',
        explanation: 'Current sensing circuit output short detect karta hai. PIC16F722 immediately MOSFETs disable kar deta hai aur alarm trigger karta hai.',
        components: [
          {
            component: 'Current Sense Resistor',
            function: 'Output current measure karta hai.',
            value: '0.05Ω – 0.1Ω',
          },
          {
            component: 'Comparator',
            function: 'Overcurrent threshold cross hone par PIC ko signal deta hai.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Wiring short',
          explanation: 'Output hot aur neutral wires directly touch ho gaye.',
        },
        {
          cause: 'Appliance short',
          explanation: 'Connected appliance internally short circuit ho gaya.',
        },
        {
          cause: 'PCB tracking short',
          explanation: 'PCB par solder bridge ya conducting debris.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Sab Disconnect Karein',
          explanation: 'Sabhi appliances aur wiring disconnect karein.',
        },
        {
          step: 2,
          title: 'Output Resistance Check',
          explanation: 'Inverter output terminals par resistance check karein — infinite hona chahiye (no load).',
        },
        {
          step: 3,
          title: 'Short Locate Karein',
          explanation: 'Wiring, socket, aur appliances ek ek check karein.',
        },
        {
          step: 4,
          title: 'Fix Karein aur Reset',
          explanation: 'Short fix karne ke baad inverter reset karein.',
        },
      ],

      importantNote: 'Short circuit se MOSFET, fuse, aur wiring damage ho sakti hai. Source fix kiye bina reset mat karein.',
      diagnosis: 'Load hata kar bhi short show ho to PCB internal fault ya MOSFET short hai.',
    },

    'overheating': {
      id: 'overheating',
      title: 'Overheating Problem',
      subtitle: 'Inverter ya components bahut zyada garam ho rahe hain — cooling ya load problem ho sakta hai.',
      icon: '🌡️',
      severity: 'high',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Inverter ka case abnormally hot hai',
        'Inverter thermal protection se shut down ho gaya',
        'MOSFETs ya transformer hot hain',
        'Burning smell aa rahi hai',
        'Inverter thodi der baad automatically band ho jata hai',
      ],

      basicChecks: [
        'Fan working hai ya nahi (agar fan hai)',
        'Ventilation holes blocked to nahi',
        'Load inverter capacity ke andar hai',
        'Heatsink thermal paste fresh hai',
        'Thermal sensor/thermistor check karein',
        'Ambient temperature check karein',
      ],

      technicalExplanation: {
        title: 'Thermal Protection Circuit',
        explanation: 'NTC thermistor ya temperature sensor PCB par mounted hai. PIC16F722 temperature monitor karta hai aur threshold cross hone par output disable karta hai.',
        components: [
          {
            component: 'NTC Thermistor',
            function: 'Temperature sense karke PIC ko signal deta hai.',
            value: '10kΩ @ 25°C',
          },
          {
            component: 'Heatsink',
            function: 'MOSFET se heat dissipate karta hai.',
          },
          {
            component: 'Cooling Fan (if present)',
            function: 'Active cooling provide karta hai.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Fan failure',
          explanation: 'Cooling fan band ho gayi hai.',
        },
        {
          cause: 'Blocked ventilation',
          explanation: 'Inverter ke andar ya bahar dust/debris se airflow block hai.',
        },
        {
          cause: 'Excessive load',
          explanation: 'Continuous high load se excess heat generate ho rahi hai.',
        },
        {
          cause: 'Dried thermal paste',
          explanation: 'Heatsink compound dry ho gayi hai — thermal resistance badh gayi.',
        },
        {
          cause: 'Faulty thermistor',
          explanation: 'False temperature reading se premature shutdown.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Inverter Clean Karein',
          explanation: 'Compressed air se dust clean karein — ventilation holes aur heatsink.',
        },
        {
          step: 2,
          title: 'Fan Check Karein',
          explanation: 'Fan manually spin karein — stiff ho to bearing worn hai. 12V supply deke test karein.',
        },
        {
          step: 3,
          title: 'Thermal Paste Replace Karein',
          explanation: 'Old thermal paste clean karke fresh compound lagaein.',
        },
        {
          step: 4,
          title: 'Load Reduce Karein',
          explanation: 'Total load inverter rated capacity ke 80% se kam rakhein.',
        },
        {
          step: 5,
          title: 'Thermistor Check',
          explanation: 'NTC thermistor resistance check karein — 25°C par ~10kΩ. Significantly different ho to replace.',
        },
      ],

      importantNote: 'Inverter ko enclosed space ya direct sunlight mein mat rakhein. Minimum 6 inch clearance sabhi sides se honi chahiye.',
      diagnosis: 'Fan not spinning + hot = fan replace. Clean + normal load mein bhi overheat = thermal paste ya thermistor fault.',
    },

    'no-output': {
      id: 'no-output',
      title: 'No Output',
      subtitle: 'Inverter on hai lekin output voltage nahi aa rahi — multiple possible faults hain.',
      icon: '🚫',
      severity: 'critical',
      diagramImage: require('@/assets/pcb/LuminousEcoWattPcb.png'),

      symptoms: [
        'Inverter on indicator jal raha hai lekin load nahi chalta',
        'Output socket par koi voltage nahi hai',
        'Inverter battery se draw kar raha hai lekin output zero',
      ],

      basicChecks: [
        'Output voltage multimeter se check karein',
        'Relay changeover check karein',
        'MOSFETs check karein',
        'Output transformer check karein',
        'PIC output PWM signals check karein',
        'Gate drive IC check karein',
      ],

      technicalExplanation: {
        title: 'Output Stage',
        explanation: 'MOSFET H-bridge DC ko AC waveform mein convert karta hai. Transformer step-up karta hai battery voltage se 230V output tak. Relay output socket se connect karta hai.',
        components: [
          {
            component: 'H-Bridge MOSFETs',
            function: 'DC to AC switching.',
          },
          {
            component: 'Output Transformer',
            function: 'Step-up voltage to 230V.',
          },
          {
            component: 'Output Relay',
            function: 'Output socket se connect/disconnect karta hai.',
          },
          {
            component: 'PIC16F722',
            function: 'PWM signals generate karta hai.',
            package: '28-pin',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'MOSFET failed',
          explanation: 'Output switching stage dead.',
        },
        {
          cause: 'Output relay failed',
          explanation: 'Relay contacts stuck open.',
        },
        {
          cause: 'Transformer fault',
          explanation: 'Winding open ya short.',
        },
        {
          cause: 'PIC not generating PWM',
          explanation: 'Microcontroller fault.',
        },
        {
          cause: 'Gate driver failed',
          explanation: 'MOSFETs ko drive signal nahi mil raha.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Output Voltage Check',
          explanation: 'Multimeter AC mode par output socket check karein.',
        },
        {
          step: 2,
          title: 'Relay Check',
          explanation: 'Relay contacts continuity check karein.',
        },
        {
          step: 3,
          title: 'Transformer Primary Voltage',
          explanation: 'Transformer primary (MOSFET side) par switching voltage check karein oscilloscope/multimeter AC.',
        },
        {
          step: 4,
          title: 'MOSFETs Check',
          explanation: 'All MOSFETs individually test karein.',
        },
        {
          step: 5,
          title: 'Gate Drive Signals',
          explanation: 'Gate drive IC output oscilloscope se check karein.',
        },
      ],

      importantNote: 'No-output diagnosis mein systematic approach zaruri hai. Ek component ek baar check karein.',
      diagnosis: 'Relay ok + MOSFETs ok + transformer primary voltage ok lekin no output = transformer secondary fault.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MICROTEK HOME UPS
  // ═══════════════════════════════════════════════════════════════════════════
  'microtek-inverter': {

    'low-battery': {
      id: 'low-battery',
      title: 'Battery Low / Overcharge',
      subtitle:
        'Microtek Home UPS mein battery voltage sensing circuit mein fault hai jisse galat battery status indicate ho raha hai.',
      icon: '🔋',
      severity: 'high',

      symptoms: [
        'Battery low indicator ghalat waqt jal raha hai',
        'Inverter battery ko overcharge kar raha hai',
        'Battery pani jaldi khatam ho raha hai',
        'Battery voltage normal hone ke bawajood low show ho raha hai',
      ],

      basicChecks: [
        'Battery terminal voltage multimeter se check karein',
        'Charging voltage measure karein (14V se zyada nahi hona chahiye)',
        'Voltage sensing divider resistors check karein',
        'Microcontroller sensing pin voltage check karein',
        'PCB tracks mein dry solder check karein',
      ],

      technicalExplanation: {
        title: 'Battery Sensing Circuit — Microtek',
        explanation:
          'Microtek mein ek voltage divider network battery voltage ko microcontroller ke ADC input ke liye scale karta hai. Yeh resistors tolerant hone chahiye.',
        components: [
          {
            component: 'Ra (Upper Divider)',
            function: 'Battery voltage ko scale down karta hai.',
            value: '100kΩ (typical)',
          },
          {
            component: 'Rb (Lower Divider)',
            function: 'ADC reference set karta hai.',
            value: '10kΩ (typical)',
          },
          {
            component: 'MCU (STC/PIC)',
            function: 'Sensed voltage se battery level calculate karta hai.',
          },
          {
            component: 'Filter Capacitor',
            function: 'Noise remove karta hai sensing line se.',
            value: '0.1µF',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Voltage divider resistor changed value',
          explanation: 'Heat ya aging ki wajah se resistor value drift ho gayi.',
        },
        {
          cause: 'Filter capacitor leaky',
          explanation: 'Sensing voltage unstable ho gayi hai.',
        },
        {
          cause: 'Bad battery connection',
          explanation: 'Loose terminal se voltage drop aur wrong sensing.',
        },
        {
          cause: 'MCU calibration off',
          explanation: 'Factory calibration data corrupt ho gayi.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Battery Voltage Check',
          explanation: 'Directly battery terminals par multimeter se voltage measure karein.',
        },
        {
          step: 2,
          title: 'Sensing Resistors Check',
          explanation: 'Power off karke Ra aur Rb resistors ki resistance measure karein.',
        },
        {
          step: 3,
          title: 'MCU Input Check',
          explanation: 'MCU ADC pin par voltage check karein aur calculate karein ki yeh correct hai ya nahi.',
        },
        {
          step: 4,
          title: 'Connections Tighten',
          explanation: 'Battery terminals aur PCB connections tight karein.',
        },
        {
          step: 5,
          title: 'Faulty Components Replace',
          explanation: 'Drift hue resistors ya leaky capacitor replace karein.',
        },
      ],

      importantNote: 'Microtek models mein voltage sensing circuit location different ho sakta hai. PCB diagram carefully dekh ke components identify karein.',
      diagnosis: 'Actual battery voltage aur displayed voltage mein farq = sensing circuit fault. Charging voltage 14.4V se zyada = overcharge protection fault.',
    },

    'overload': {
      id: 'overload',
      title: 'Overload Protection',
      subtitle: 'Microtek mein connected load ki power capacity se zyada ho gayi hai.',
      icon: '⚡',
      severity: 'high',

      symptoms: [
        'Overload LED jal rahi hai',
        'Inverter output band ho gaya',
        'Buzzer alarm aa raha hai',
        'Load add karne par turant protection trip',
      ],

      basicChecks: [
        'Total connected load wattage calculate karein (< 1120W for 1400VA)',
        'Faulty appliance short to nahi',
        'Output wiring short circuit check karein',
        'Current sense resistor check karein',
      ],

      technicalExplanation: {
        title: 'Overload Detection — Microtek 1400VA',
        explanation: 'Output current shunt se sense hota hai. When current exceeds ~6A (1400VA rated), MCU output disable karta hai.',
        components: [
          {
            component: 'Current Shunt',
            function: 'Output current measure karta hai.',
            value: '0.05Ω / 5W',
          },
          {
            component: 'Op-Amp',
            function: 'Shunt voltage amplify karta hai.',
          },
          {
            component: 'MCU',
            function: 'Threshold compare karke output disable karta hai.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Excessive load',
          explanation: 'Total wattage 1400VA (~1120W) se zyada hai.',
        },
        {
          cause: 'Faulty appliance',
          explanation: 'Internally shorted appliance current surge deta hai.',
        },
        {
          cause: 'Shunt resistor fault',
          explanation: 'Wrong resistance se false overload detection.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Load Disconnect',
          explanation: 'Sab appliances disconnect karein.',
        },
        {
          step: 2,
          title: 'Individual Appliance Test',
          explanation: 'Ek ek appliance lagao aur check karo kaun overload karta hai.',
        },
        {
          step: 3,
          title: 'PCB Check',
          explanation: 'Bina load bhi overload show ho to shunt resistor aur op-amp check karein.',
        },
      ],

      importantNote: 'Microtek 1400VA maximum 1120W effective load support karta hai. AC motor loads (pumps) start mein 3x current draw karte hain.',
      diagnosis: 'Load hatane par normal ho jaye = load problem. Load hatane par bhi overload = PCB fault.',
    },

    'battery-dead': {
      id: 'battery-dead',
      title: 'Battery Dead / Not Charging',
      subtitle: 'Microtek inverter battery charge nahi kar raha ya battery completely dead ho gayi hai.',
      icon: '💀',
      severity: 'critical',

      symptoms: [
        'Inverter mains par sahi chalta hai lekin battery backup nahi hai',
        'Battery voltage continuously girti ja rahi hai',
        'Charging indicator off hai mains par bhi',
      ],

      basicChecks: [
        'Battery OCV check (12V system: 12.0V+ = charged)',
        'Charger output voltage (13.8V–14.4V)',
        'Charging fuse check',
        'Charging transistor/MOSFET check',
        'Battery terminals clean hain',
      ],

      technicalExplanation: {
        title: 'Microtek Charging Circuit',
        explanation: 'Transformer step-down → rectifier → filter capacitor → charging regulator → battery. PWM duty cycle se charging current control hota hai.',
        components: [
          {
            component: 'Charging Transformer',
            function: 'AC step-down.',
          },
          {
            component: 'Bridge Rectifier',
            function: 'AC to DC.',
          },
          {
            component: 'Charging Regulator IC',
            function: 'Constant current/voltage charging control.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Charging circuit fault',
          explanation: 'Rectifier, fuse, ya regulator fail ho gaya.',
        },
        {
          cause: 'Battery cells dead',
          explanation: 'Battery capacity finish ho gayi hai — replace karo.',
        },
        {
          cause: 'Bad connections',
          explanation: 'Battery terminals corroded ya loose hain.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Battery OCV',
          explanation: '12V se zyada = ok. 10V se kam = dead battery.',
        },
        {
          step: 2,
          title: 'Charger Output Check',
          explanation: 'Battery terminals par DC voltage measure karein — 13.8–14.4V hona chahiye.',
        },
        {
          step: 3,
          title: 'Fuse Check',
          explanation: 'Charging fuse continuity check.',
        },
        {
          step: 4,
          title: 'Replace',
          explanation: 'Dead battery ya faulty charging component replace karein.',
        },
      ],

      importantNote: 'Battery regularly discharge na hone dein 10.5V se neeche. Yeh life significantly reduce karta hai.',
      diagnosis: 'Charging voltage ok + battery OCV nahi badh rahi = battery dead. Charging voltage zero = charging circuit fault.',
    },

    'mosfet': {
      id: 'mosfet',
      title: 'MOSFET Failure',
      subtitle: 'Microtek ke output MOSFETs fail ho gaye hain — output nahi aa raha.',
      icon: '🔥',
      severity: 'critical',

      symptoms: [
        'Inverter output zero hai',
        'Battery se abnormal current draw',
        'MOSFETs hot ya burnt hain',
        'Fuse baar baar blow hota hai',
      ],

      basicChecks: [
        'MOSFETs diode test (power off)',
        'Gate drive IC check',
        'Gate resistors check',
        'Transformer primary winding continuity',
      ],

      technicalExplanation: {
        title: 'Microtek MOSFET Output Stage',
        explanation: 'Push-pull ya H-bridge configuration mein MOSFETs battery DC ko 50Hz AC mein convert karte hain.',
        components: [
          {
            component: 'Output MOSFETs',
            function: 'DC to AC switching.',
            value: 'IRF3205 or equivalent',
          },
          {
            component: 'Gate Driver',
            function: 'MOSFET switching signals.',
          },
          {
            component: 'Snubber',
            function: 'Voltage spikes suppress karta hai.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Overcurrent / short',
          explanation: 'Excess current se MOSFET burned.',
        },
        {
          cause: 'Gate driver fault',
          explanation: 'Shoot-through se both MOSFETs simultaneously ON.',
        },
        {
          cause: 'Poor heatsinking',
          explanation: 'Thermal failure.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Safety',
          explanation: 'Battery aur mains disconnect. 30 sec wait for capacitor discharge.',
        },
        {
          step: 2,
          title: 'MOSFET Test',
          explanation: 'Multimeter diode mode: D-S forward voltage ~0.5V. 0V = short, OL = open.',
        },
        {
          step: 3,
          title: 'All MOSFETs Test',
          explanation: 'Ek fail hone par adjacent bhi test karein.',
        },
        {
          step: 4,
          title: 'Gate Drive Check',
          explanation: 'Gate driver IC check karein.',
        },
        {
          step: 5,
          title: 'Replace',
          explanation: 'Same spec MOSFET lagaein with fresh thermal paste.',
        },
      ],

      importantNote: 'Microtek 1400VA mein typically IRF3205 ya similar MOSFETs use hote hain. Always same spec replace karein.',
      diagnosis: 'MOSFET short = D-S or G-S continuity (0Ω). Replace all in the set.',
    },

    'relay': {
      id: 'relay',
      title: 'Relay Problem',
      subtitle: 'Changeover relay properly operate nahi kar rahi hai.',
      icon: '🔌',
      severity: 'medium',

      symptoms: [
        'Power cut par switch nahi hota battery par',
        'Relay chatter sound aa rahi hai',
        'Output intermittent hai',
      ],

      basicChecks: [
        'Relay coil resistance check',
        'Relay contact continuity check',
        'Drive transistor check',
        'Coil voltage check (12V)',
      ],

      technicalExplanation: {
        title: 'Relay Changeover',
        explanation: 'MCU drive transistor ko control karta hai jo relay coil energize karta hai. Contacts mains ya inverter output ko load se connect karte hain.',
        components: [
          {
            component: 'Main Relay',
            function: 'Changeover switch.',
            value: '12V / 30A',
          },
          {
            component: 'NPN Transistor',
            function: 'Relay driver.',
          },
          {
            component: 'Flyback Diode',
            function: 'Back-EMF protection.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Coil open',
          explanation: 'Relay energize nahi hoti.',
        },
        {
          cause: 'Contacts burned',
          explanation: 'High current arcing.',
        },
        {
          cause: 'Driver transistor fail',
          explanation: 'Coil current path blocked.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Coil Resistance',
          explanation: 'Multimeter: 200-400Ω expected. OL = open coil.',
        },
        {
          step: 2,
          title: 'Drive Voltage',
          explanation: 'Coil terminals par 12V check karein operation mein.',
        },
        {
          step: 3,
          title: 'Replace',
          explanation: 'Same spec relay aur/ya drive transistor replace karein.',
        },
      ],

      importantNote: 'Relay contacts 30A rated honi chahiye output current handle karne ke liye.',
      diagnosis: 'Coil ok + no click = transistor fault. Coil OL = relay replace.',
    },

    'switch': {
      id: 'switch',
      title: 'ON/OFF Switch Problem',
      subtitle: 'Power switch faulty hai.',
      icon: '🔘',
      severity: 'low',

      symptoms: [
        'Switch press karne par on nahi hota',
        'Intermittent operation',
        'Switch physically damaged',
      ],

      basicChecks: [
        'Switch continuity test',
        'Terminal connections check',
        'Switch mechanical operation',
      ],

      technicalExplanation: {
        title: 'Power Switch',
        explanation: 'Main power switch battery positive ya control circuit mein series mein connected hota hai.',
        components: [
          {
            component: 'Power Switch',
            function: 'Inverter on/off karta hai.',
            value: '10A/250V minimum',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Contact wear',
          explanation: 'Internal contacts worn.',
        },
        {
          cause: 'Loose wiring',
          explanation: 'Terminal loose hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Continuity Test',
          explanation: 'ON position mein continuity honi chahiye.',
        },
        {
          step: 2,
          title: 'Replace',
          explanation: 'Same rating switch lagaein.',
        },
      ],

      importantNote: 'High current rated switch use karein.',
      diagnosis: 'No continuity in ON = replace.',
    },

    'fuse': {
      id: 'fuse',
      title: 'Fuse Blown',
      subtitle: 'Main fuse blow ho gayi hai — inverter completely dead hai.',
      icon: '💥',
      severity: 'medium',

      symptoms: [
        'Inverter bilkul dead hai',
        'Battery se koi current nahi',
        'Fuse wire open hai',
      ],

      basicChecks: [
        'Fuse continuity',
        'Short circuit cause find karein',
        'Correct rating confirm karein',
      ],

      technicalExplanation: {
        title: 'Fuse Protection',
        explanation: 'Main fuse battery positive line mein overcurrent se protect karta hai.',
        components: [
          {
            component: 'Main Fuse',
            function: 'Overcurrent protection.',
            value: '40A blade fuse (Microtek 1400VA)',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Short circuit',
          explanation: 'Internal ya external short.',
        },
        {
          cause: 'MOSFET short',
          explanation: 'Failed MOSFET ne fuse blow kiya.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Cause Find Karein',
          explanation: 'Short circuit ya MOSFET failure check karein.',
        },
        {
          step: 2,
          title: 'Fix Cause',
          explanation: 'Root cause fix karo.',
        },
        {
          step: 3,
          title: 'Correct Fuse Lagaein',
          explanation: '40A fuse lagaein — higher rating kabhi mat lagaein.',
        },
      ],

      importantNote: 'Fuse baar baar blow hona = underlying fault. Higher fuse mat lagaein.',
      diagnosis: 'Fuse open = short ya overcurrent. Find and fix first.',
    },

    'charging': {
      id: 'charging',
      title: 'Charging Problem',
      subtitle: 'Battery charging nahi ho rahi Microtek inverter mein.',
      icon: '🔌',
      severity: 'high',

      symptoms: [
        'Mains par battery charge nahi hoti',
        'Charging indicator off',
        'Battery voltage steady ya gir rahi hai',
      ],

      basicChecks: [
        'Transformer secondary voltage',
        'Rectifier output',
        'Charging regulator check',
        'Charging fuse',
      ],

      technicalExplanation: {
        title: 'Charging Circuit — Microtek',
        explanation: 'Dedicated charging transformer secondary → rectifier → filter → regulator → battery.',
        components: [
          {
            component: 'Charging Transformer',
            function: 'Step-down AC.',
          },
          {
            component: 'Rectifier',
            function: 'AC to DC.',
          },
          {
            component: 'Regulator',
            function: 'Current/voltage control.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Fuse blown',
          explanation: 'Charging path interrupted.',
        },
        {
          cause: 'Rectifier diode open',
          explanation: 'No DC output.',
        },
        {
          cause: 'Regulator fault',
          explanation: 'No regulated charging.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Fuse Check',
          explanation: 'Charging fuse continuity.',
        },
        {
          step: 2,
          title: 'Transformer Secondary',
          explanation: 'AC voltage at secondary.',
        },
        {
          step: 3,
          title: 'Rectifier Output',
          explanation: 'DC voltage after rectifier.',
        },
        {
          step: 4,
          title: 'Fix Component',
          explanation: 'Faulty component replace.',
        },
      ],

      importantNote: 'Charging circuit mains se connected hai — safety precautions zaruri hain.',
      diagnosis: 'Systematic check: fuse → transformer → rectifier → regulator.',
    },

    'short-circuit': {
      id: 'short-circuit',
      title: 'Short Circuit Protection',
      subtitle: 'Output short circuit detect hui — protection trip ho gayi.',
      icon: '⚠️',
      severity: 'critical',

      symptoms: [
        'Output turant band',
        'Short circuit alarm',
        'Fuse blown',
      ],

      basicChecks: [
        'Output wiring short check',
        'Appliances disconnect karein',
        'MOSFETs check karein',
      ],

      technicalExplanation: {
        title: 'Short Circuit Protection',
        explanation: 'Current sensor overcurrent detect karta hai aur MCU immediately output disable karta hai.',
        components: [
          {
            component: 'Current Sensor',
            function: 'Output current monitor.',
          },
          {
            component: 'Protection Logic',
            function: 'Instant shutdown on fault.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Wiring short',
          explanation: 'Hot aur neutral connected.',
        },
        {
          cause: 'Appliance short',
          explanation: 'Internal appliance short.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Disconnect All',
          explanation: 'Remove all loads.',
        },
        {
          step: 2,
          title: 'Output Resistance',
          explanation: 'Infinite resistance expected (no load).',
        },
        {
          step: 3,
          title: 'Find Short',
          explanation: 'Check wiring, sockets, appliances.',
        },
        {
          step: 4,
          title: 'Reset',
          explanation: 'Fix short, then reset inverter.',
        },
      ],

      importantNote: 'Source identify aur fix kiye bina reset mat karein.',
      diagnosis: 'No load mein bhi short = internal PCB fault.',
    },

    'overheating': {
      id: 'overheating',
      title: 'Overheating Problem',
      subtitle: 'Inverter thermal protection se shut down ho raha hai.',
      icon: '🌡️',
      severity: 'high',

      symptoms: [
        'Inverter garam hone par band hota hai',
        'MOSFETs hot',
        'Burning smell',
      ],

      basicChecks: [
        'Ventilation clear hai',
        'Fan check (agar hai)',
        'Thermal paste fresh hai',
        'Load within limits',
      ],

      technicalExplanation: {
        title: 'Thermal Protection',
        explanation: 'Thermistor temperature sense karta hai aur MCU threshold par output disable karta hai.',
        components: [
          {
            component: 'NTC Thermistor',
            function: 'Temperature sensing.',
            value: '10kΩ @ 25°C',
          },
          {
            component: 'Heatsink',
            function: 'Heat dissipation.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Blocked ventilation',
          explanation: 'Dust/debris blocked airflow.',
        },
        {
          cause: 'Excessive load',
          explanation: 'Continuous high current.',
        },
        {
          cause: 'Dry thermal paste',
          explanation: 'Poor heat transfer.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Clean',
          explanation: 'Dust remove karein.',
        },
        {
          step: 2,
          title: 'Thermal Paste',
          explanation: 'Fresh compound lagaein.',
        },
        {
          step: 3,
          title: 'Reduce Load',
          explanation: 'Total load kam karein.',
        },
        {
          step: 4,
          title: 'Thermistor Check',
          explanation: '25°C par ~10kΩ expected.',
        },
      ],

      importantNote: 'Enclosed space mein mat rakhein. 6 inch clearance minimum.',
      diagnosis: 'Clean + normal load mein bhi overheating = thermal paste ya thermistor.',
    },

    'no-output': {
      id: 'no-output',
      title: 'No Output',
      subtitle: 'Microtek inverter on hai lekin output nahi aa rahi.',
      icon: '🚫',
      severity: 'critical',

      symptoms: [
        'Output socket par zero voltage',
        'Inverter battery se draw kar raha hai',
        'Load nahi chal raha',
      ],

      basicChecks: [
        'Output voltage multimeter',
        'Relay contacts',
        'MOSFETs',
        'Gate drive signals',
        'Transformer',
      ],

      technicalExplanation: {
        title: 'Output Stage',
        explanation: 'MOSFET switching → transformer step-up → relay → output socket.',
        components: [
          {
            component: 'MOSFETs',
            function: 'DC to AC.',
          },
          {
            component: 'Transformer',
            function: 'Voltage step-up to 230V.',
          },
          {
            component: 'Relay',
            function: 'Output connection.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'MOSFET failed',
          explanation: 'No switching.',
        },
        {
          cause: 'Relay stuck open',
          explanation: 'No connection to output.',
        },
        {
          cause: 'Transformer fault',
          explanation: 'No step-up.',
        },
        {
          cause: 'No PWM from MCU',
          explanation: 'MCU fault.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Output Voltage',
          explanation: 'AC measurement at socket.',
        },
        {
          step: 2,
          title: 'Relay Test',
          explanation: 'Contact continuity.',
        },
        {
          step: 3,
          title: 'Transformer Primary',
          explanation: 'AC switching at primary.',
        },
        {
          step: 4,
          title: 'MOSFETs',
          explanation: 'Diode test each MOSFET.',
        },
        {
          step: 5,
          title: 'Replace Fault',
          explanation: 'Replace identified failed component.',
        },
      ],

      importantNote: 'Systematic diagnosis — one step at a time.',
      diagnosis: 'Transformer primary switching ok + secondary zero = transformer fault.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVGUARD PURE SINE WAVE
  // ═══════════════════════════════════════════════════════════════════════════
  'livguard-inverter': {

    'low-battery': {
      id: 'low-battery',
      title: 'Battery Low / Overcharge',
      subtitle: 'Livguard Pure Sine Wave inverter mein battery sensing galat readings de raha hai.',
      icon: '🔋',
      severity: 'high',

      symptoms: [
        'Battery low indication galat waqt',
        'Overcharge — pani zyada khatam ho raha hai',
        'Backup time kam ho gaya hai',
        'Battery warm ho rahi hai charge mein',
      ],

      basicChecks: [
        'Battery OCV check karein',
        'Charging voltage measure karein (max 14.4V for 12V battery)',
        'Sensing voltage divider resistors check',
        'DSP/microcontroller sensing input check',
        'BMS (Battery Management) signals check',
      ],

      technicalExplanation: {
        title: 'Battery Sensing — Livguard DSP-based',
        explanation: 'Livguard Pure Sine Wave mein advanced DSP controller battery management karta hai. Precision voltage divider network battery voltage accurately measure karta hai.',
        components: [
          {
            component: 'Precision Voltage Divider',
            function: 'Battery voltage to safe ADC level.',
            value: 'R1: 100kΩ 1%, R2: 10kΩ 1%',
          },
          {
            component: 'DSP Controller',
            function: 'Advanced battery management algorithm.',
          },
          {
            component: 'Reference Voltage IC',
            function: 'Accurate ADC reference.',
            value: '5V precision reference',
          },
          {
            component: 'Isolation Optocoupler',
            function: 'Galvanic isolation for sensing.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Precision resistor drifted',
          explanation: 'High temperature se 1% tolerance resistor drift ho gaya.',
        },
        {
          cause: 'Reference voltage fault',
          explanation: 'ADC reference inaccurate ho gayi.',
        },
        {
          cause: 'Optocoupler degraded',
          explanation: 'CTR (Current Transfer Ratio) decrease se sensing error.',
        },
        {
          cause: 'Battery age',
          explanation: 'Old battery mein internal resistance badh gayi, sensing off.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Battery Voltage Confirm',
          explanation: 'Accurate multimeter se OCV measure karein.',
        },
        {
          step: 2,
          title: 'Charging Voltage Check',
          explanation: 'Terminals par charging voltage measure karein — max 14.4V.',
        },
        {
          step: 3,
          title: 'Sensing Network Inspect',
          explanation: '1% precision resistors ki value verify karein.',
        },
        {
          step: 4,
          title: 'Reference IC Check',
          explanation: 'Reference voltage output measure karein — 5.0V exact hona chahiye.',
        },
        {
          step: 5,
          title: 'Replace Faulty Component',
          explanation: 'Drifted resistors ya faulty reference IC replace karein.',
        },
      ],

      importantNote: 'Livguard Pure Sine Wave mein precision components use hote hain. Replace karte waqt exactly same specification ke components use karein.',
      diagnosis: 'Charging voltage 14.4V se zyada = overcharge circuit fault. Actual voltage aur display mein farq = sensing resistor drift.',
    },

    'overload': {
      id: 'overload',
      title: 'Overload Protection',
      subtitle: 'Livguard 1600VA mein connected load zyada hai.',
      icon: '⚡',
      severity: 'high',

      symptoms: [
        'Overload alarm',
        'Output cut off',
        'Load add karne par immediate trip',
      ],

      basicChecks: [
        'Total load < 1280W (1600VA × 0.8)',
        'Motor loads ka start current consider karein',
        'Output wiring short',
        'Current sense circuit',
      ],

      technicalExplanation: {
        title: 'Overload Protection — 1600VA',
        explanation: 'DSP real-time current monitoring karta hai. 1600VA = max ~7A output. Threshold cross hone par immediate shutdown.',
        components: [
          {
            component: 'Hall Effect Current Sensor',
            function: 'Non-contact accurate current measurement.',
          },
          {
            component: 'DSP Controller',
            function: 'Real-time protection logic.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Load zyada hai',
          explanation: '1280W se zyada continuous load.',
        },
        {
          cause: 'Motor inrush current',
          explanation: 'AC motors 3-5x starting current draw karte hain.',
        },
        {
          cause: 'Current sensor fault',
          explanation: 'False overcurrent reading.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Load Calculate',
          explanation: 'All appliance wattage sum karein — 1280W se kam rakhein.',
        },
        {
          step: 2,
          title: 'Staggered Start',
          explanation: 'Heavy loads ek saath start mat karein.',
        },
        {
          step: 3,
          title: 'Sensor Check',
          explanation: 'Bina load bhi overload = current sensor fault.',
        },
      ],

      importantNote: 'Pure sine wave inverters motor loads ke saath better performance dete hain but inrush current ka dhyan zarur rakhein.',
      diagnosis: 'Load within limits + still overload = current sensor calibration fault.',
    },

    'battery-dead': {
      id: 'battery-dead',
      title: 'Battery Dead / Not Charging',
      subtitle: 'Livguard inverter battery charge nahi kar raha.',
      icon: '💀',
      severity: 'critical',

      symptoms: [
        'No backup on power cut',
        'Battery indicator always low',
        'Charging current zero',
      ],

      basicChecks: [
        'Battery OCV',
        'Charger output voltage',
        'Charging fuse',
        'Charging IGBT/MOSFET',
        'BMS connector',
      ],

      technicalExplanation: {
        title: 'Livguard Charging System',
        explanation: 'Advanced 3-stage charging (bulk, absorption, float) with DSP control. Smart battery management extends battery life.',
        components: [
          {
            component: 'Charging IGBT',
            function: 'High efficiency charging switching.',
          },
          {
            component: 'DSP',
            function: '3-stage charge profile management.',
          },
          {
            component: 'Current Transformer',
            function: 'Charging current measurement.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'IGBT failure',
          explanation: 'Charging path blocked.',
        },
        {
          cause: 'BMS connector loose',
          explanation: 'Communication failure.',
        },
        {
          cause: 'DSP fault',
          explanation: 'Charging algorithm not running.',
        },
        {
          cause: 'Battery dead',
          explanation: 'Battery beyond recovery.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Battery OCV',
          explanation: 'Measure — 12V+ = ok, 10V- = dead.',
        },
        {
          step: 2,
          title: 'Charger Output',
          explanation: '13.8–14.4V DC at battery terminals.',
        },
        {
          step: 3,
          title: 'IGBT Check',
          explanation: 'Diode test on charging IGBT.',
        },
        {
          step: 4,
          title: 'BMS Connector',
          explanation: 'All pins seated properly.',
        },
        {
          step: 5,
          title: 'Replace',
          explanation: 'Dead battery ya faulty IGBT replace karein.',
        },
      ],

      importantNote: 'Livguard smart charging system battery over-discharge se protect karta hai. Battery 10.5V se neeche na gire.',
      diagnosis: 'IGBT test failure = charging fault. BMS error code check karein agar LCD display hai.',
    },

    'mosfet': {
      id: 'mosfet',
      title: 'MOSFET / IGBT Failure',
      subtitle: 'Livguard Pure Sine Wave ke output switching devices fail ho gaye.',
      icon: '🔥',
      severity: 'critical',

      symptoms: [
        'No output',
        'High battery current draw',
        'Devices physically burnt',
        'Fuse blow',
      ],

      basicChecks: [
        'IGBT/MOSFET diode test',
        'Gate driver IC',
        'Snubber circuit',
        'Dead-time control',
      ],

      technicalExplanation: {
        title: 'Pure Sine Wave Output Stage',
        explanation: 'Livguard uses SPWM (Sinusoidal PWM) with IGBTs or MOSFETs to generate true sine wave output. Dead-time circuit prevents shoot-through.',
        components: [
          {
            component: 'Output IGBTs/MOSFETs',
            function: 'SPWM sine wave generation.',
            value: 'IGBT: IRG4PC40 or similar',
          },
          {
            component: 'Dead-Time Controller',
            function: 'Prevents simultaneous conduction.',
          },
          {
            component: 'SPWM Gate Driver',
            function: 'Drives gates with sine-modulated PWM.',
          },
          {
            component: 'LC Output Filter',
            function: 'PWM to smooth sine wave.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Shoot-through',
          explanation: 'Dead-time failure se both devices ON simultaneously.',
        },
        {
          cause: 'Load short circuit',
          explanation: 'Excessive current damaged devices.',
        },
        {
          cause: 'Gate driver fault',
          explanation: 'Improper drive signal.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Safety First',
          explanation: 'Disconnect battery + mains. Wait 1 minute for capacitor discharge.',
        },
        {
          step: 2,
          title: 'IGBT Test',
          explanation: 'Diode mode: C-E junction ~0.7V. 0V = short.',
        },
        {
          step: 3,
          title: 'Dead-Time Check',
          explanation: 'Gate drive waveforms check karein — overlap nahi hona chahiye.',
        },
        {
          step: 4,
          title: 'Replace',
          explanation: 'Matched pair IGBTs replace karein. Fresh thermal compound.',
        },
      ],

      importantNote: 'Pure sine wave inverters mein IGBT replacement ke baad output waveform verify karein oscilloscope se.',
      diagnosis: 'IGBT short = C-E 0Ω. Dead-time overlap = gate driver fault.',
    },

    'relay': {
      id: 'relay',
      title: 'Relay Problem',
      subtitle: 'Livguard ka changeover relay faulty hai.',
      icon: '🔌',
      severity: 'medium',

      symptoms: [
        'No changeover on power cut',
        'Relay chatter',
        'Intermittent output',
      ],

      basicChecks: [
        'Relay coil resistance',
        'Contact continuity',
        'Drive circuit check',
        'Relay coil voltage',
      ],

      technicalExplanation: {
        title: 'Relay System — Livguard',
        explanation: 'Livguard mein multiple relays ho sakte hain — main bypass relay aur output relay. DSP relay timing control karta hai.',
        components: [
          {
            component: 'Bypass Relay',
            function: 'Mains to output direct connection.',
            value: '12V / 30A',
          },
          {
            component: 'Output Relay',
            function: 'Inverter output to socket.',
          },
          {
            component: 'Relay Driver',
            function: 'DSP signal amplification.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Coil open',
          explanation: 'Relay winding break.',
        },
        {
          cause: 'Contact arc damage',
          explanation: 'Repeated switching ne contacts damage kiye.',
        },
        {
          cause: 'Driver circuit fault',
          explanation: 'Insufficient relay drive current.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Coil Resistance',
          explanation: '200-400Ω expected. OL = open.',
        },
        {
          step: 2,
          title: 'Contact Test',
          explanation: 'Energized state mein contact continuity check.',
        },
        {
          step: 3,
          title: 'Driver Check',
          explanation: 'Drive transistor/MOSFET test.',
        },
        {
          step: 4,
          title: 'Replace',
          explanation: 'Same spec relay lagaein.',
        },
      ],

      importantNote: 'Livguard mein relay timing DSP se controlled hai. Relay replace ke baad changeover timing verify karein.',
      diagnosis: 'Coil OL = relay replace. Coil ok + no click = driver fault.',
    },

    'switch': {
      id: 'switch',
      title: 'ON/OFF Switch Problem',
      subtitle: 'Power switch faulty hai.',
      icon: '🔘',
      severity: 'low',

      symptoms: ['Inverter on nahi hota', 'Intermittent', 'Switch loose'],

      basicChecks: [
        'Switch continuity',
        'Wire connections',
        'Physical damage',
      ],

      technicalExplanation: {
        title: 'Power Switch',
        explanation: 'Main switch control circuit mein connected hai.',
        components: [
          {
            component: 'Power Switch',
            function: 'On/Off control.',
            value: '10A/250V',
          },
        ],
      },

      possibleCauses: [
        { cause: 'Contact worn', explanation: 'Internal contacts fail.' },
        { cause: 'Loose wiring', explanation: 'Terminal disconnected.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Continuity Test', explanation: 'ON = continuity.' },
        { step: 2, title: 'Replace', explanation: 'Same rating switch.' },
      ],

      importantNote: 'Correct current rating switch use karein.',
      diagnosis: 'No continuity in ON = replace.',
    },

    'fuse': {
      id: 'fuse',
      title: 'Fuse Blown',
      subtitle: 'Main fuse blown — inverter dead.',
      icon: '💥',
      severity: 'medium',

      symptoms: ['Inverter completely dead', 'No current', 'Fuse visually open'],

      basicChecks: [
        'Fuse continuity',
        'Find short cause',
        'Correct rating',
      ],

      technicalExplanation: {
        title: 'Fuse Protection',
        explanation: 'Main battery fuse overcurrent protect karta hai.',
        components: [
          {
            component: 'Main Fuse',
            function: 'Battery line protection.',
            value: '40-50A (Livguard 1600VA)',
          },
        ],
      },

      possibleCauses: [
        { cause: 'Short circuit', explanation: 'Internal/external short.' },
        { cause: 'IGBT short', explanation: 'Failed device.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Find Cause', explanation: 'Check for short/IGBT fail.' },
        { step: 2, title: 'Fix', explanation: 'Repair root cause.' },
        { step: 3, title: 'Correct Fuse', explanation: '40-50A fuse replace.' },
      ],

      importantNote: 'Never increase fuse rating.',
      diagnosis: 'Fuse open = find and fix cause first.',
    },

    'charging': {
      id: 'charging',
      title: 'Charging Problem',
      subtitle: 'Livguard battery charging fault.',
      icon: '🔌',
      severity: 'high',

      symptoms: [
        'Battery not charging on mains',
        'No charging current',
        'Charging indicator off',
      ],

      basicChecks: [
        'Transformer secondary',
        'Rectifier output',
        'IGBT charging circuit',
        'DSP charging signals',
      ],

      technicalExplanation: {
        title: 'Smart Charging — Livguard',
        explanation: 'DSP-controlled 3-stage charging for maximum battery life.',
        components: [
          {
            component: 'Charging IGBT',
            function: 'High-frequency switching for efficient charging.',
          },
          {
            component: 'DSP',
            function: 'Charge profile control.',
          },
          {
            component: 'Current Transformer',
            function: 'Charging current feedback.',
          },
        ],
      },

      possibleCauses: [
        { cause: 'IGBT failed', explanation: 'Charging path blocked.' },
        { cause: 'DSP fault', explanation: 'No charge profile output.' },
        { cause: 'Fuse open', explanation: 'Path interrupted.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Fuse Check', explanation: 'Charging fuse continuity.' },
        { step: 2, title: 'Transformer', explanation: 'Secondary AC voltage.' },
        { step: 3, title: 'Rectifier', explanation: 'DC output voltage.' },
        { step: 4, title: 'IGBT Test', explanation: 'Diode test.' },
        { step: 5, title: 'Replace', explanation: 'Faulty component.' },
      ],

      importantNote: 'Livguard smart charging — only use manufacturer approved batteries for best performance.',
      diagnosis: 'Systematic check: mains → transformer → rectifier → IGBT → battery.',
    },

    'short-circuit': {
      id: 'short-circuit',
      title: 'Short Circuit Protection',
      subtitle: 'Output short detected.',
      icon: '⚠️',
      severity: 'critical',

      symptoms: ['Immediate output cutoff', 'Alarm', 'Fuse blown'],

      basicChecks: [
        'Disconnect all loads',
        'Output resistance check',
        'Find short location',
      ],

      technicalExplanation: {
        title: 'Short Circuit Protection',
        explanation: 'Advanced DSP protection with sub-millisecond response.',
        components: [
          { component: 'Hall Sensor', function: 'Current measurement.' },
          { component: 'DSP', function: 'Instant shutdown.' },
        ],
      },

      possibleCauses: [
        { cause: 'Wiring short', explanation: 'Hot-neutral direct contact.' },
        { cause: 'Appliance short', explanation: 'Internal component failure.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Remove Loads', explanation: 'Disconnect everything.' },
        { step: 2, title: 'Test Output', explanation: 'Infinite resistance expected.' },
        { step: 3, title: 'Find Short', explanation: 'Check each wire/appliance.' },
        { step: 4, title: 'Fix and Reset', explanation: 'Repair then restart.' },
      ],

      importantNote: 'Find cause before reset.',
      diagnosis: 'No load + short = internal PCB fault.',
    },

    'overheating': {
      id: 'overheating',
      title: 'Overheating',
      subtitle: 'Thermal protection triggered.',
      icon: '🌡️',
      severity: 'high',

      symptoms: ['Shutdown when hot', 'IGBT hot', 'Burning smell'],

      basicChecks: ['Fan working', 'Ventilation clear', 'Thermal paste', 'Load within limits'],

      technicalExplanation: {
        title: 'Thermal Management — Livguard',
        explanation: 'Multiple temperature sensors monitor IGBT and transformer temperature. Fan speed control maintains optimal temperature.',
        components: [
          { component: 'Temperature Sensors', function: 'Multiple point monitoring.' },
          { component: 'Fan Controller', function: 'Variable speed cooling.' },
          { component: 'Heatsink', function: 'IGBT heat dissipation.' },
        ],
      },

      possibleCauses: [
        { cause: 'Fan failure', explanation: 'Cooling stopped.' },
        { cause: 'Blocked airflow', explanation: 'Dust accumulation.' },
        { cause: 'Dry thermal paste', explanation: 'Poor heat transfer.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Clean Dust', explanation: 'Compressed air clean.' },
        { step: 2, title: 'Fan Test', explanation: '12V supply to fan — check RPM.' },
        { step: 3, title: 'Thermal Paste', explanation: 'Replace on all IGBTs.' },
        { step: 4, title: 'Reduce Load', explanation: 'Keep within 80% rated.' },
      ],

      importantNote: 'Adequate ventilation is critical for Pure Sine Wave inverters due to higher switching losses.',
      diagnosis: 'Fan ok + clean + normal load + still hot = thermal sensor or IGBT degraded.',
    },

    'fan': {
      id: 'fan',
      title: 'Cooling Fan Failure',
      subtitle: 'Cooling fan band ho gayi hai ya properly kaam nahi kar rahi.',
      icon: '💨',
      severity: 'medium',

      symptoms: [
        'Fan sound nahi aa rahi',
        'Inverter jaldi overheat ho raha hai',
        'Fan physically stuck ya slow',
        'Inverter thermal protection se shut down ho raha hai',
      ],

      basicChecks: [
        'Fan physically spin karta hai',
        'Fan connector loose to nahi',
        'Fan 12V supply check karein',
        'Fan controller IC check karein',
        'Fan bearing worn to nahi',
      ],

      technicalExplanation: {
        title: 'Cooling Fan Circuit',
        explanation: 'Fan 12V DC supply se chalta hai. Fan controller temperature ke hisaab se fan speed adjust karta hai.',
        components: [
          {
            component: 'DC Fan',
            function: 'Active cooling.',
            value: '12V DC, 0.2-0.5A',
          },
          {
            component: 'Fan Controller',
            function: 'Temperature-based speed control.',
          },
          {
            component: 'Thermistor',
            function: 'Temperature feedback.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Fan bearing worn',
          explanation: 'Mechanical failure — fan seized.',
        },
        {
          cause: 'Fan winding open',
          explanation: 'Electrical failure — no current.',
        },
        {
          cause: 'Connector loose',
          explanation: 'No power to fan.',
        },
        {
          cause: 'Fan controller fault',
          explanation: 'Fan not receiving drive signal.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Visual Check',
          explanation: 'Fan ko hath se spin karein — stiff ya stuck ho to bearing fail hai.',
        },
        {
          step: 2,
          title: 'Voltage Check',
          explanation: 'Fan connector par 12V DC check karein.',
        },
        {
          step: 3,
          title: 'Direct Test',
          explanation: 'Fan ko directly 12V supply deke test karein — agar chale to controller fault hai.',
        },
        {
          step: 4,
          title: 'Replace',
          explanation: 'Same spec replacement fan lagaein.',
        },
      ],

      importantNote: 'Fan replacement mein same voltage (12V) aur similar airflow rating ka fan use karein. Wrong direction fan mat lagaein.',
      diagnosis: 'Fan direct power par chale = controller fault. Fan direct power par bhi na chale = fan replace.',
    },

    'no-output': {
      id: 'no-output',
      title: 'No Output',
      subtitle: 'Livguard inverter on hai lekin output nahi.',
      icon: '🚫',
      severity: 'critical',

      symptoms: [
        'Zero output voltage',
        'Battery current being drawn',
        'No sine wave output',
      ],

      basicChecks: [
        'Output voltage',
        'Relay contacts',
        'IGBT/MOSFET check',
        'LC filter',
        'DSP PWM output',
      ],

      technicalExplanation: {
        title: 'Pure Sine Output Stage',
        explanation: 'SPWM → IGBT bridge → LC filter → transformer → relay → output.',
        components: [
          { component: 'IGBT Bridge', function: 'SPWM switching.' },
          { component: 'LC Filter', function: 'Smooth sine wave output.' },
          { component: 'Transformer', function: 'Voltage step-up.' },
          { component: 'Output Relay', function: 'Socket connection.' },
        ],
      },

      possibleCauses: [
        { cause: 'IGBT failed', explanation: 'No switching.' },
        { cause: 'LC filter fault', explanation: 'Filter capacitor shorted.' },
        { cause: 'Relay stuck open', explanation: 'No output path.' },
        { cause: 'DSP not generating SPWM', explanation: 'Controller fault.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Output Voltage', explanation: 'AC meter at socket.' },
        { step: 2, title: 'Relay', explanation: 'Contact continuity.' },
        { step: 3, title: 'LC Filter', explanation: 'Capacitor shorts check.' },
        { step: 4, title: 'IGBT', explanation: 'Diode test.' },
        { step: 5, title: 'DSP Signals', explanation: 'Oscilloscope SPWM check.' },
      ],

      importantNote: 'Pure Sine Wave troubleshooting requires oscilloscope for proper diagnosis of SPWM signals.',
      diagnosis: 'SPWM present at IGBT gate + no output = IGBT or output circuit fault.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERIC HOME INVERTER
  // ═══════════════════════════════════════════════════════════════════════════
  'generic-inverter': {

    'low-battery': {
      id: 'low-battery',
      title: 'Battery Low / Overcharge',
      subtitle: 'Generic inverter mein battery sensing circuit mein problem hai.',
      icon: '🔋',
      severity: 'high',

      symptoms: [
        'Battery low galat time par show ho raha hai',
        'Overcharge — battery overheating',
        'Backup time unexpected hai',
      ],

      basicChecks: [
        'Battery voltage multimeter se check',
        'Sensing resistors check',
        'Microcontroller input voltage',
        'Charging voltage (max 14.4V for 12V)',
      ],

      technicalExplanation: {
        title: 'Generic Battery Sensing',
        explanation: 'Generic inverters mein simple voltage divider network battery voltage sense karta hai. Budget components ki wajah se drift zyada hoti hai.',
        components: [
          {
            component: 'Voltage Divider R1',
            function: 'Upper sensing resistor.',
            value: '47kΩ – 100kΩ',
          },
          {
            component: 'Voltage Divider R2',
            function: 'Lower sensing resistor.',
            value: '4.7kΩ – 10kΩ',
          },
          {
            component: 'Filter Cap',
            function: 'Noise filtering.',
            value: '0.1µF',
          },
          {
            component: 'MCU',
            function: 'Battery level calculation.',
          },
        ],
      },

      possibleCauses: [
        { cause: 'Resistor value drifted', explanation: 'Budget resistors tolerate poor hoti hain.' },
        { cause: 'Loose connection', explanation: 'Battery terminal loose.' },
        { cause: 'Filter capacitor leaky', explanation: 'Sensing unstable.' },
        { cause: 'Wrong MCU calibration', explanation: 'Factory setting off.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Battery Voltage', explanation: 'Direct OCV measurement.' },
        { step: 2, title: 'Sensing Resistors', explanation: 'Measure R1, R2 resistance.' },
        { step: 3, title: 'MCU Input', explanation: 'Voltage at ADC pin.' },
        { step: 4, title: 'Replace Drifted', explanation: 'Replace out-of-spec resistors.' },
      ],

      importantNote: 'Generic inverters mein sensing calibration manual adjustment se ho sakta hai agar trim pot hai.',
      diagnosis: 'Battery normal + display wrong = sensing resistor drift. Charging > 14.4V = overcharge circuit.',
    },

    'overload': {
      id: 'overload',
      title: 'Overload Protection',
      subtitle: 'Generic inverter par zyada load lag gaya hai.',
      icon: '⚡',
      severity: 'high',

      symptoms: [
        'Overload indicator',
        'Output band',
        'Buzzer alarm',
      ],

      basicChecks: [
        'Total load within VA rating',
        'No faulty appliance',
        'Output wiring short',
        'Shunt resistor correct value',
      ],

      technicalExplanation: {
        title: 'Overload Detection — Generic',
        explanation: 'Shunt resistor output current sense karta hai. Comparator threshold cross hone par MCU output disable karta hai.',
        components: [
          { component: 'Shunt Resistor', function: 'Current sensing.', value: '0.1Ω / 5W' },
          { component: 'Comparator', function: 'Threshold detection.' },
          { component: 'MCU', function: 'Output control.' },
        ],
      },

      possibleCauses: [
        { cause: 'Excessive load', explanation: 'VA rating exceeded.' },
        { cause: 'Short circuit', explanation: 'Wiring fault.' },
        { cause: 'Shunt fault', explanation: 'False reading.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Remove All Loads', explanation: 'Start fresh.' },
        { step: 2, title: 'Add One By One', explanation: 'Find overloading appliance.' },
        { step: 3, title: 'PCB Check', explanation: 'If no load = PCB fault.' },
      ],

      importantNote: 'Generic inverters ka VA rating 60-70% efficient hota hai. 600VA = only ~360-420W effective.',
      diagnosis: 'Load within rating + overload = shunt or comparator fault.',
    },

    'battery-dead': {
      id: 'battery-dead',
      title: 'Battery Dead / Not Charging',
      subtitle: 'Generic inverter battery charge nahi kar raha.',
      icon: '💀',
      severity: 'critical',

      symptoms: ['No backup', 'Battery voltage low', 'Charging indicator off'],

      basicChecks: ['Battery OCV', 'Charger output', 'Fuse', 'Charging transistor'],

      technicalExplanation: {
        title: 'Generic Charging Circuit',
        explanation: 'Simple linear or PWM charging. Transformer → rectifier → filter → charging transistor → battery.',
        components: [
          { component: 'Charging Transformer', function: 'Step-down AC.' },
          { component: 'Rectifier', function: 'AC to DC.' },
          { component: 'Charging Transistor', function: 'Current control.' },
        ],
      },

      possibleCauses: [
        { cause: 'Battery dead', explanation: 'Cells exhausted.' },
        { cause: 'Charging circuit fault', explanation: 'Component failure.' },
        { cause: 'Fuse blown', explanation: 'Path interrupted.' },
      ],

      repairProcedure: [
        { step: 1, title: 'OCV Check', explanation: '12V+ = ok, 10V- = dead.' },
        { step: 2, title: 'Charger Output', explanation: '13.8-14.4V at battery.' },
        { step: 3, title: 'Trace Fault', explanation: 'Check fuse, rectifier, transistor.' },
        { step: 4, title: 'Replace', explanation: 'Battery or faulty component.' },
      ],

      importantNote: 'Generic inverter batteries typically last 2-3 years. Regular maintenance extends life.',
      diagnosis: 'Charger ok + battery not holding = battery dead.',
    },

    'mosfet': {
      id: 'mosfet',
      title: 'MOSFET Failure',
      subtitle: 'Generic inverter MOSFETs fail ho gaye.',
      icon: '🔥',
      severity: 'critical',

      symptoms: ['No output', 'High current draw', 'Burnt MOSFETs', 'Fuse blown'],

      basicChecks: ['MOSFET diode test', 'Gate driver', 'Gate resistors', 'Wiring'],

      technicalExplanation: {
        title: 'Generic MOSFET Stage',
        explanation: 'Push-pull ya H-bridge switching. Budget MOSFETs prone to failure under high load or poor heatsinking.',
        components: [
          { component: 'MOSFETs', function: 'DC to AC switching.', value: 'IRF3205 or budget equivalent' },
          { component: 'Gate Driver', function: 'Drive signal.' },
          { component: 'Heatsink', function: 'Heat dissipation.' },
        ],
      },

      possibleCauses: [
        { cause: 'Overload', explanation: 'Current exceeded rating.' },
        { cause: 'Poor heatsinking', explanation: 'Thermal failure.' },
        { cause: 'Gate driver fault', explanation: 'Shoot-through.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Safety', explanation: 'Disconnect all power.' },
        { step: 2, title: 'MOSFET Test', explanation: 'Diode test each.' },
        { step: 3, title: 'Gate Check', explanation: 'Driver IC.' },
        { step: 4, title: 'Replace', explanation: 'Quality replacement MOSFET with thermal paste.' },
      ],

      importantNote: 'Generic inverter mein quality MOSFET lagaein — budget alternatives jaldi fail ho sakte hain.',
      diagnosis: 'D-S short = MOSFET failed. Check all in H-bridge.',
    },

    'relay': {
      id: 'relay',
      title: 'Relay Problem',
      subtitle: 'Changeover relay faulty hai.',
      icon: '🔌',
      severity: 'medium',

      symptoms: ['No changeover', 'Chatter sound', 'Intermittent output'],

      basicChecks: ['Coil resistance', 'Contact continuity', 'Drive circuit', 'Supply voltage'],

      technicalExplanation: {
        title: 'Relay Circuit',
        explanation: 'Simple NPN transistor relay driver. MCU output → transistor base → relay coil.',
        components: [
          { component: 'Relay', function: 'Changeover switch.', value: '12V / 30A' },
          { component: 'NPN Transistor', function: 'Driver.' },
          { component: 'Diode', function: 'Back-EMF protection.' },
        ],
      },

      possibleCauses: [
        { cause: 'Coil open', explanation: 'Relay wound break.' },
        { cause: 'Contacts arc damaged', explanation: 'Burned contacts.' },
        { cause: 'Driver transistor fail', explanation: 'No coil current.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Coil Test', explanation: '200-400Ω expected.' },
        { step: 2, title: 'Voltage Check', explanation: '12V at coil when energized.' },
        { step: 3, title: 'Transistor Test', explanation: 'Diode test B-E, B-C.' },
        { step: 4, title: 'Replace', explanation: 'Relay and/or transistor.' },
      ],

      importantNote: 'Same spec relay use karein. Flyback diode direction verify karein.',
      diagnosis: 'Coil OL = replace relay. Coil ok + no click = driver fault.',
    },

    'switch': {
      id: 'switch',
      title: 'ON/OFF Switch Problem',
      subtitle: 'Power switch faulty hai.',
      icon: '🔘',
      severity: 'low',

      symptoms: ['No power on', 'Intermittent', 'Physical damage'],

      basicChecks: ['Continuity test', 'Wire connections', 'Physical inspection'],

      technicalExplanation: {
        title: 'Power Switch',
        explanation: 'Main switch battery line ya control mein series connected.',
        components: [
          { component: 'Switch', function: 'On/off control.', value: '10A/250V' },
        ],
      },

      possibleCauses: [
        { cause: 'Contact wear', explanation: 'Internal failure.' },
        { cause: 'Loose wire', explanation: 'Disconnected terminal.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Test', explanation: 'Continuity in ON position.' },
        { step: 2, title: 'Replace', explanation: 'Correct rating switch.' },
      ],

      importantNote: 'Use adequate current rating switch.',
      diagnosis: 'No continuity ON = replace.',
    },

    'fuse': {
      id: 'fuse',
      title: 'Fuse Blown',
      subtitle: 'Main fuse blown.',
      icon: '💥',
      severity: 'medium',

      symptoms: ['Inverter dead', 'No battery current', 'Open fuse wire'],

      basicChecks: ['Fuse continuity', 'Find short', 'Correct rating'],

      technicalExplanation: {
        title: 'Fuse Protection',
        explanation: 'Battery positive fuse — overcurrent protection.',
        components: [
          { component: 'Main Fuse', function: 'Overcurrent protection.', value: '20-40A depending on model' },
        ],
      },

      possibleCauses: [
        { cause: 'Short circuit', explanation: 'Internal/external.' },
        { cause: 'MOSFET short', explanation: 'Failed device.' },
        { cause: 'Wrong rating', explanation: 'Undersized fuse.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Find Cause', explanation: 'Short or MOSFET.' },
        { step: 2, title: 'Fix Root Cause', explanation: 'Repair before replacement.' },
        { step: 3, title: 'Replace Fuse', explanation: 'Correct ampere rating.' },
      ],

      importantNote: 'Never increase fuse rating beyond spec.',
      diagnosis: 'Fuse open = find underlying fault.',
    },

    'charging': {
      id: 'charging',
      title: 'Charging Problem',
      subtitle: 'Battery charging fault in generic inverter.',
      icon: '🔌',
      severity: 'high',

      symptoms: ['Battery not charging', 'Zero charging current', 'Charging indicator off'],

      basicChecks: ['Transformer secondary', 'Rectifier', 'Charging transistor', 'Fuse'],

      technicalExplanation: {
        title: 'Generic Charging',
        explanation: 'Simple transformer → rectifier → filter → transistor charging circuit.',
        components: [
          { component: 'Transformer', function: 'AC step-down.' },
          { component: 'Rectifier', function: 'AC to DC.' },
          { component: 'Charging Transistor', function: 'Current regulation.' },
        ],
      },

      possibleCauses: [
        { cause: 'Fuse open', explanation: 'Path blocked.' },
        { cause: 'Rectifier fail', explanation: 'No DC.' },
        { cause: 'Transistor fail', explanation: 'No current flow.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Mains', explanation: 'Confirm mains input.' },
        { step: 2, title: 'Transformer', explanation: 'Secondary voltage.' },
        { step: 3, title: 'Rectifier', explanation: 'DC output.' },
        { step: 4, title: 'Transistor', explanation: 'Collector-emitter test.' },
        { step: 5, title: 'Replace', explanation: 'Faulty component.' },
      ],

      importantNote: 'Mains-connected circuit — safety first. Discharge capacitors before touching.',
      diagnosis: 'Sequential check from input to output.',
    },

    'short-circuit': {
      id: 'short-circuit',
      title: 'Short Circuit Protection',
      subtitle: 'Output short detected — protection activated.',
      icon: '⚠️',
      severity: 'critical',

      symptoms: ['Output off', 'Alarm', 'Fuse blown possibly'],

      basicChecks: ['Disconnect loads', 'Output resistance', 'Wiring check'],

      technicalExplanation: {
        title: 'Short Protection',
        explanation: 'Current sense → comparator → MCU → output disable.',
        components: [
          { component: 'Shunt Resistor', function: 'Current sensing.' },
          { component: 'Comparator', function: 'Threshold detection.' },
          { component: 'MCU', function: 'Shutdown.' },
        ],
      },

      possibleCauses: [
        { cause: 'Output wiring short', explanation: 'Direct fault.' },
        { cause: 'Appliance short', explanation: 'Connected device.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Remove Loads', explanation: 'All disconnected.' },
        { step: 2, title: 'Output Resistance', explanation: 'Infinite = ok.' },
        { step: 3, title: 'Find Short', explanation: 'Test each circuit.' },
        { step: 4, title: 'Reset', explanation: 'After fix.' },
      ],

      importantNote: 'Repair source before reset.',
      diagnosis: 'No load + short resistance = internal fault.',
    },

    'overheating': {
      id: 'overheating',
      title: 'Overheating',
      subtitle: 'Generic inverter overheat ho raha hai.',
      icon: '🌡️',
      severity: 'high',

      symptoms: ['Hot to touch', 'Thermal shutdown', 'Burning smell'],

      basicChecks: ['Ventilation clear', 'Load within rating', 'Thermal paste', 'Ambient temperature'],

      technicalExplanation: {
        title: 'Thermal Management',
        explanation: 'Thermistor temperature sense karta hai. MCU/comparator shutdown circuit trigger karta hai.',
        components: [
          { component: 'NTC Thermistor', function: 'Temperature sensing.', value: '10kΩ @ 25°C' },
          { component: 'Heatsink', function: 'Heat removal.' },
        ],
      },

      possibleCauses: [
        { cause: 'Blocked vents', explanation: 'No airflow.' },
        { cause: 'No cooling', explanation: 'No fan model.' },
        { cause: 'Excessive load', explanation: 'Continuous overload.' },
        { cause: 'Dry thermal paste', explanation: 'Poor heat transfer.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Clean', explanation: 'Remove dust from vents.' },
        { step: 2, title: 'Thermal Paste', explanation: 'Replace on MOSFETs.' },
        { step: 3, title: 'Reduce Load', explanation: 'Stay under 70% rated.' },
        { step: 4, title: 'Ventilation', explanation: 'Ensure 6-inch clearance.' },
      ],

      importantNote: 'Generic inverters have minimal thermal protection — extra caution needed.',
      diagnosis: 'Clean + normal load + still hot = thermal paste or thermistor.',
    },

    'transformer': {
      id: 'transformer',
      title: 'Transformer Problem',
      subtitle: 'Main output transformer mein fault hai — humming, no output, ya overheating.',
      icon: '🔧',
      severity: 'critical',

      symptoms: [
        'Loud humming ya buzzing sound',
        'No output voltage',
        'Transformer physically very hot',
        'Burning smell from transformer',
        'Output voltage significantly low',
      ],

      basicChecks: [
        'Primary winding continuity (power OFF)',
        'Secondary winding continuity',
        'Winding-to-core insulation check',
        'Primary/secondary voltage ratio check',
        'Physical inspection — burnt windings, oil leakage',
      ],

      technicalExplanation: {
        title: 'Output Transformer — Generic Inverter',
        explanation: 'Generic inverter mein center-tap transformer use hota hai. Battery DC → MOSFET switching → primary winding → secondary → 230V output. Transformer ka step-up ratio important hai.',
        components: [
          {
            component: 'Primary Winding',
            function: 'Battery voltage input. Center-tap push-pull configuration.',
            value: '12V center-tap (6V + 6V)',
          },
          {
            component: 'Secondary Winding',
            function: 'Step-up to 230V AC output.',
            value: '230V / 50Hz',
          },
          {
            component: 'Core (E-I laminations)',
            function: 'Magnetic flux path. Quality determines efficiency.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Primary winding short turn',
          explanation: 'Adjacent wire turns ek saath short ho gaye hain — high current draw, heat, humming.',
        },
        {
          cause: 'Secondary winding open',
          explanation: 'Wire break ho gayi — no output.',
        },
        {
          cause: 'Insulation breakdown',
          explanation: 'Primary-secondary ya winding-to-core short — dangerous.',
        },
        {
          cause: 'Core saturation',
          explanation: 'Wrong frequency ya excessive current se core saturate ho gaya.',
        },
        {
          cause: 'Loose laminations',
          explanation: 'Core laminations loose — excessive humming.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Safety Disconnect',
          explanation: 'Battery aur mains dono disconnect karein. Transformer kaafi time tak hot rehta hai — thanda hone dein.',
        },
        {
          step: 2,
          title: 'Visual Inspection',
          explanation: 'Burnt insulation, melted wire, visible damage dekhin.',
        },
        {
          step: 3,
          title: 'Winding Continuity Check',
          explanation: 'Multimeter se primary aur secondary windings ki continuity check karein. OL = open winding.',
        },
        {
          step: 4,
          title: 'Insulation Check',
          explanation: 'Primary to secondary, winding to core resistance check karein — should be mega-ohms.',
        },
        {
          step: 5,
          title: 'Transformer Replace',
          explanation: 'Damaged transformer same VA rating se replace karein. Rewinding specialist se karaein ya complete unit replace karein.',
        },
      ],

      importantNote: 'Transformer rewinding specialized work hai — untrained persons attempt nahi karein. Galat winding inverter aur battery ko damage kar sakti hai.',
      circuitFlow: 'Battery → MOSFETs → Primary Winding → Magnetic Core → Secondary Winding → 230V Output',
      diagnosis: 'Primary open = no input to transformer. Secondary open = no output. Inter-winding short = excessive current, heat, possible danger.',
    },

    'pcb': {
      id: 'pcb',
      title: 'PCB Track / Board Problem',
      subtitle: 'Printed Circuit Board mein physical damage, corrosion, ya track break hai.',
      icon: '📋',
      severity: 'high',

      symptoms: [
        'Intermittent operation ya random shutdown',
        'Specific circuit section kaam nahi kar raha',
        'Visible burnt tracks ya components',
        'Corrosion ya moisture damage visible hai',
        'Multiple components fail ho rahe hain',
      ],

      basicChecks: [
        'Visual inspection under bright light',
        'Burnt or discolored areas check karein',
        'Solder joints check karein — dry solder, cold joint',
        'PCB tracks continuity check karein',
        'Component mounting check karein',
        'Moisture ya water damage check karein',
      ],

      technicalExplanation: {
        title: 'PCB Fault Analysis',
        explanation: 'PCB tracks copper conductors hain jo components ko connect karti hain. Track break, corrosion, ya dry solder se circuit incomplete ho jata hai aur inverter properly kaam nahi karta.',
        components: [
          {
            component: 'PCB Tracks',
            function: 'Electrical connections between components.',
          },
          {
            component: 'Solder Joints',
            function: 'Component to track mechanical and electrical connection.',
          },
          {
            component: 'Via Holes',
            function: 'Layer-to-layer connections in multilayer PCB.',
          },
          {
            component: 'Ground Plane',
            function: 'Common reference aur EMI shielding.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Track burnt',
          explanation: 'Overcurrent se copper track burn ho gayi — circuit incomplete.',
        },
        {
          cause: 'Dry/cold solder joint',
          explanation: 'Poor soldering se intermittent connection — common in older PCBs.',
        },
        {
          cause: 'Corrosion',
          explanation: 'Humidity ya chemical exposure se tracks corrode ho gayi hain.',
        },
        {
          cause: 'Physical crack',
          explanation: 'Mechanical stress ya drop se PCB mein crack aa gayi.',
        },
        {
          cause: 'Solder bridge',
          explanation: 'Adjacent tracks excess solder se short ho gayi hain.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Visual Inspection',
          explanation: 'Magnifying glass ya bright light se PCB carefully inspect karein. Burnt area, discoloration, corrosion check karein.',
        },
        {
          step: 2,
          title: 'Track Continuity',
          explanation: 'Multimeter continuity mode se suspected tracks check karein. Break points locate karein.',
        },
        {
          step: 3,
          title: 'Dry Solder Rework',
          explanation: 'Solder iron se all joints reflow karein jo dull ya grainy lagein.',
        },
        {
          step: 4,
          title: 'Track Repair',
          explanation: 'Broken track ko scrape karein, jumper wire se bridge karein, ya conductive silver paint use karein.',
        },
        {
          step: 5,
          title: 'Corrosion Treatment',
          explanation: 'Corrosion clean karein IPA (isopropyl alcohol) se. PCB conformal coating lagaein protection ke liye.',
        },
        {
          step: 6,
          title: 'Solder Bridge Remove',
          explanation: 'Desoldering braid (wick) se extra solder absorb karein.',
        },
      ],

      importantNote: 'PCB repair karte waqt ESD (electrostatic discharge) precautions zaruri hain — anti-static wrist strap use karein. High voltage areas se door rahein.',
      diagnosis: 'Track continuity fail = track break ya corrosion. Multiple random faults = moisture damage. Component repeatedly fail = track shorted.',
    },

    'fan': {
      id: 'fan',
      title: 'Cooling Fan Failure',
      subtitle: 'Generic inverter ka cooling fan kaam nahi kar raha.',
      icon: '💨',
      severity: 'medium',

      symptoms: [
        'Fan sound nahi aa rahi',
        'Inverter jaldi garam hota hai',
        'Fan slow chal raha hai',
        'Bearing noise aa rahi hai',
      ],

      basicChecks: [
        'Fan manually spin karo',
        '12V supply to fan connector check',
        'Fan connector loose to nahi',
        'Fan motor winding continuity',
      ],

      technicalExplanation: {
        title: 'Cooling Fan Circuit',
        explanation: 'DC fan 12V supply par chalta hai. Temperature-based control ya always-on configuration.',
        components: [
          {
            component: 'DC Fan',
            function: 'Cooling airflow.',
            value: '12V / 0.2A typical',
          },
          {
            component: 'Fan Power Circuit',
            function: '12V supply to fan.',
          },
        ],
      },

      possibleCauses: [
        { cause: 'Bearing seized', explanation: 'Fan physically stuck.' },
        { cause: 'Winding open', explanation: 'Electrical failure.' },
        { cause: 'No supply', explanation: 'Power circuit fault.' },
        { cause: 'Connector loose', explanation: 'No connection.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Physical Check', explanation: 'Try to spin fan by hand.' },
        { step: 2, title: 'Power Check', explanation: '12V at fan connector.' },
        { step: 3, title: 'Direct Test', explanation: 'Connect fan to 12V direct.' },
        { step: 4, title: 'Replace', explanation: 'Same spec fan.' },
      ],

      importantNote: 'Correct airflow direction maintain karein. Fan usually blows air outward from heatsink.',
      diagnosis: 'Direct 12V + no spin = fan dead. Direct 12V + spins = circuit fault.',
    },

    'no-output': {
      id: 'no-output',
      title: 'No Output',
      subtitle: 'Generic inverter on hai lekin output nahi.',
      icon: '🚫',
      severity: 'critical',

      symptoms: ['Zero output voltage', 'Battery draining', 'Load not working'],

      basicChecks: ['Output voltage', 'Relay', 'MOSFETs', 'Transformer', 'Fuse'],

      technicalExplanation: {
        title: 'Output Chain',
        explanation: 'Battery → Fuse → MOSFETs → Transformer → Relay → Output socket.',
        components: [
          { component: 'MOSFETs', function: 'DC to AC switching.' },
          { component: 'Transformer', function: 'Step-up to 230V.' },
          { component: 'Relay', function: 'Output connection.' },
          { component: 'Fuse', function: 'Protection.' },
        ],
      },

      possibleCauses: [
        { cause: 'Fuse blown', explanation: 'Complete circuit break.' },
        { cause: 'MOSFET failed', explanation: 'No switching.' },
        { cause: 'Transformer fault', explanation: 'No step-up.' },
        { cause: 'Relay open', explanation: 'No socket connection.' },
        { cause: 'PCB track open', explanation: 'Broken circuit path.' },
      ],

      repairProcedure: [
        { step: 1, title: 'Fuse Check', explanation: 'Start here — simplest.' },
        { step: 2, title: 'Battery Voltage', explanation: 'Sufficient battery?' },
        { step: 3, title: 'Output Voltage', explanation: 'AC meter at socket.' },
        { step: 4, title: 'Relay', explanation: 'Contact test.' },
        { step: 5, title: 'Transformer', explanation: 'Primary and secondary windings.' },
        { step: 6, title: 'MOSFETs', explanation: 'Diode test each device.' },
      ],

      importantNote: 'Start from the simplest possible fault (fuse, relay) before tackling complex circuits.',
      diagnosis: 'Systematic from power input to output. First fault found = likely cause.',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get all faults for a given inverter as an array (for list rendering).
 */
export function getFaultsForInverter(
  inverterId: string,
): InverterFaultDetail[] {
  const map = inverterFaultsMap[inverterId];
  if (!map) return [];
  return Object.values(map);
}

/**
 * Get a single fault by inverter + fault ID.
 */
export function getInverterFault(
  inverterId: string,
  faultId: string,
): InverterFaultDetail | undefined {
  return inverterFaultsMap[inverterId]?.[faultId];
} 