import { getDiagramImage } from '@/data/diagrams';
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

    'fan': {
      id: 'fan',
      title: 'Cooling Fan Problem',
      subtitle:
        'Luminous Eco Watt mein fan na chalna ya continuously chalna PIC16F722 ke Pin 6/17 aur ULN2003A driver circuit ki wajah se hota hai.',
      icon: '🌀',
      severity: 'medium',

      symptoms: [
        'Fan bilkul nahi chal raha jab inverter load par hai ya charge ho raha hai',
        'Inverter thodi der chalne ke baad overheat hokar shut down ho jata hai',
        'Fan continuous maximum speed par chal raha hai (thanda hone par bhi)',
        'Fan se ajeeb buzzing/humming aawaz aa rahi hai',
      ],

      basicChecks: [
        'Fan Jack par 12V DC multimeter se check karein',
        'Fan ko directly external 12V supply dekar test karein',
        'PIC16F722 ke Pin 6 aur Pin 17 par logic voltages check karein',
        'ULN2003A (GM2247D) ke Pin 5, 6, 11, 12 check karein',
        'R126 (1001 / 1kΩ), R114, R66 (1001), R46 (1001) resistors check karein',
        'D8 flyback diode aur C45 (63V 10µF) capacitor check karein',
        '5050 voltage regulator ke 5V pin se aane wali track check karein',
      ],

      technicalExplanation: {
        title: 'Luminous Fan Drive Circuit (Pin 6 & Pin 17 Diagram)',
        explanation:
          'Microcontroller PIC16F722 ke Pin 6 se fan control PWM trigger signal generate hota hai jo R126 (1kΩ / 1001) ke through ULN2003A (GM2247D Darlington driver) ke Pin 5 aur 6 par jata hai. ULN2003A ke output Pin 11 aur 12 Fan Jack ke negative (-) terminal ko ground switch karte hain. Positive common line R114, D8 diode aur C45 (63V 10µF) capacitor ke through Fan Jack ke positive (+) terminal ko power deti hai. Pin 17 par 5050 regulator ke 5V rail se R66 (1001) aur R46 (1001) ke through sensing line aati hai.',
        components: [
          {
            component: 'PIC16F722',
            function: 'Pin 6 se fan ON/OFF PWM trigger signal aur Pin 17 monitoring signal deta hai.',
            package: '28-pin Microcontroller',
          },
          {
            component: 'ULN2003A / GM2247D',
            function: 'Darlington transistor array IC. Pins 5,6 input hain aur Pins 11,12 fan jack negative terminal ko ground se switch karte hain.',
            value: '7-channel NPN Array',
          },
          {
            component: 'R126',
            function: 'PIC16F722 Pin 6 se ULN2003A input ke beech current limiting resistor.',
            value: '1kΩ (Marking: 1001)',
          },
          {
            component: 'R114',
            function: 'Positive common line se fan positive supply connection resistor.',
            value: 'Pull-up / Supply path',
          },
          {
            component: 'D8',
            function: 'Flyback protection diode — fan motor ke inductive kickback ko ground par clamp karta hai.',
            value: 'Diode',
          },
          {
            component: 'C45',
            function: 'Fan jack ke parallel filter capacitor motor electrical noise suppress karta hai.',
            value: '10µF / 63V',
          },
          {
            component: 'R66 & R46',
            function: '5050 IC ki 5V line se Pin 17 microcontroller sensing divider network.',
            value: '1kΩ each (Marking: 1001)',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'ULN2003A (GM2247D) IC damaged',
          explanation: 'Driver IC internal transistor open ya short hone par fan run nahi karta ya non-stop chalta hai.',
        },
        {
          cause: 'R126 (1kΩ / 1001) open ya burn',
          explanation: 'R126 kharab hone par PIC Pin 6 ka trigger pulse ULN2003A tak nahi pahunch pata.',
        },
        {
          cause: 'D8 diode short',
          explanation: 'D8 diode short hone se fan positive supply ground se short ho jati hai.',
        },
        {
          cause: 'C45 (63V 10µF) capacitor short ya dry',
          explanation: 'C45 short hone par fan jack par 12V supply collapse ho jati hai.',
        },
        {
          cause: 'PIC16F722 Pin 6 logic output failure',
          explanation: 'Microcontroller output port damage hone par fan start trigger nahi hota.',
        },
        {
          cause: 'Fan motor jam ya wire disconnected',
          explanation: 'Cooling fan motor bearing jam ya connector wire cut.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Fan Motor Physical & Direct Test',
          explanation: 'Fan jack nikaal kar external 12V DC battery se test karein. Agar fan nahi chala to fan motor replace karein.',
        },
        {
          step: 2,
          title: 'Fan Jack Terminal Voltages',
          explanation: 'Inverter on karke fan jack par multimeter DC voltage measure karein. Positive terminal par 12V milna chahiye.',
        },
        {
          step: 3,
          title: 'ULN2003A Pin 5/6 & 11/12 Test',
          explanation: 'PIC Pin 6 se aane wala signal Pin 5/6 par check karein (~3.3V-5V logic high). Pin 11/12 par low 0V switch hona chahiye.',
        },
        {
          step: 4,
          title: 'R126 & D8 Diode Test',
          explanation: 'R126 (1kΩ / 1001) resistance check karein aur D8 diode mode par continuity check karein.',
        },
        {
          step: 5,
          title: '5050 5V Rail & Pin 17 Network',
          explanation: '5050 regulator se 5V rail aur R66/R46 (1001) resistors ki value confirm karein.',
        },
      ],

      circuitFlow: 'PIC16F722 (Pin 6) ➔ R126 (1001 / 1kΩ) ➔ ULN2003A (Pin 5/6 In ➔ Pin 11/12 Out) ➔ Fan Jack (-) ➔ [Fan Motor] ➔ Positive Common Line (via R114, D8, C45 63V10µF)',
      importantNote: 'Fan band rehne se MOSFETs kuch hi minute mein overheat hokar blast ho sakte hain. Fan driver circuit ka repair high priority par karein.',
      diagnosis: 'Agar PIC Pin 6 par pulse aa rahi hai lekin Fan Jack par voltage nahi to ULN2003A ya R126 kharab hai. Agar PIC Pin 6 output zero hai to MCU temperature sensing circuit check karein.',
    },

    'low-battery': {
      id: 'low-battery',
      title: 'Battery Low / Overcharge',
      subtitle:
        'Luminous Eco Watt mein battery low ya overcharge problem battery voltage sensing circuit ke R24 resistor ki wajah se ho sakti hai.',
      icon: '🔋',
      severity: 'high',
      
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

    'main-feedback': {
      id: 'main-feedback',
      title: 'Main Feedback (mFB) / Pin 5 Sensing Fault',
      subtitle:
        'Luminous Eco Watt mein Mains Feedback sensing signal mFB terminal, D8 (M7 diode), R32 (7.5kΩ), R39 (2.4kΩ), C19 (0.1µF), R18 (1kΩ) se hokar PIC16F722 ke Pin 5 par jata hai.',
      icon: '⚡',
      severity: 'high',

      symptoms: [
        'Mains connect hone par bhi inverter mains sense nahi kar raha ya charging start nahi ho rahi',
        'Inverter bar-bar mains connect aur disconnect kar raha hai (mFB hunting problem)',
        'Mains aane par display LED hunt/flicker kar rahi hai',
        'PIC16F722 ke Pin 5 par feedback voltage missing ya drop hai',
      ],

      basicChecks: [
        'mFB connector terminal par multimeter se AC input feedback check karein',
        'D8 (M7 SMD diode) diode mode par test karein',
        'R32 resistor (Marking: 7501 = 7.5kΩ) resistance check karein',
        'R39 resistor (Marking: 2401 = 2.4kΩ) resistance check karein',
        'C19 (0.1µF) aur C12 filter capacitors par short ya leakage check karein',
        'R18 resistor (Marking: 1001 = 1kΩ) check karein',
        'PIC16F722 ke Pin 5 par DC sensing voltage measure karein',
      ],

      technicalExplanation: {
        title: 'Luminous Eco Watt Main Feedback (mFB) Pin 5 Circuit Diagram',
        explanation:
          'mFB terminal se aane wala AC feedback signal D8 (M7 diode) ke through rectify hokar R32 (7501 = 7.5kΩ) par jata hai. Uske baad R39 (2401 = 2.4kΩ) aur C19 (0.1µF) parallel ground divider network voltage ko safe level mein convert karta hai. C12 filter capacitor ke baad R18 (1001 = 1kΩ) ke through yeh signal PIC16F722 microcontroller ke Pin 5 par ADC sensing input banta hai.',
        components: [
          {
            component: 'D8 (M7)',
            function: 'mFB AC signal half-wave rectification diode.',
            value: 'M7 (1N4007 SMD)',
          },
          {
            component: 'R32',
            function: 'Main feedback upper sensing voltage dropper resistor.',
            value: '7.5kΩ (Marking: 7501)',
          },
          {
            component: 'R39 & C19',
            function: 'Ground divider network and high-frequency spike filter.',
            value: 'R39: 2.4kΩ (2401), C19: 0.1µF',
          },
          {
            component: 'C12',
            function: 'DC smoothing filter capacitor to ground.',
            value: 'SMD Filter Capacitor',
          },
          {
            component: 'R18',
            function: 'PIC16F722 Pin 5 input buffer/current limiting resistor.',
            value: '1kΩ (Marking: 1001)',
          },
          {
            component: 'PIC16F722',
            function: 'Pin 5 par mFB signal read karke mains synchronization aur inverter/mains status control karta hai.',
            package: '28-Pin Microcontroller',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'D8 (M7) diode open ya short',
          explanation: 'Diode open hone par mFB signal Pin 5 tak nahi pahunchta aur inverter mains sense nahi karta.',
        },
        {
          cause: 'R32 (7501 / 7.5kΩ) open ya value drift',
          explanation: 'R32 open hone se Pin 5 par 0V milti hai.',
        },
        {
          cause: 'R39 (2401 / 2.4kΩ) ya C19 short',
          explanation: 'Signal ground se short hone par false mains cutoff hota hai.',
        },
        {
          cause: 'R18 (1001 / 1kΩ) open',
          explanation: 'MCU Pin 5 ADC input disconnect ho jata hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'mFB Terminal & D8 Diode Test',
          explanation: 'mFB connector par AC sense check karein aur D8 (M7) diode ka forward drop (~0.6V) measure karein.',
        },
        {
          step: 2,
          title: 'R32 (7.5kΩ) & R39 (2.4kΩ) Resistors Check',
          explanation: 'Resistance mode par R32 (7501 = 7.5kΩ) aur R39 (2401 = 2.4kΩ) ki exact value confirm karein.',
        },
        {
          step: 3,
          title: 'C19 & C12 Capacitors Test',
          explanation: 'Capacitor leakage ya short check karein.',
        },
        {
          step: 4,
          title: 'R18 (1kΩ) & PIC Pin 5 Voltage Measure',
          explanation: 'R18 (1001) test karein aur PIC16F722 Pin 5 par DC sensing voltage measure karein.',
        },
      ],

      circuitFlow:
        'mFB Connector ➔ D8 (M7) ➔ R32 (7501 / 7.5kΩ) ➔ R39 (2401 / 2.4kΩ) || C19 (0.1µF) ➔ C12 Filter ➔ R18 (1001 / 1kΩ) ➔ PIC16F722 (Pin 5)',

      importantNote:
        'R32 (7.5kΩ) aur R39 (2.4kΩ) ki value bilkul accurate honi chahiye. Inme 5% se zyada drift hone par inverter mains mode mein hunting shuru kar deta hai.',

      diagnosis:
        'Agar mFB par AC signal hai lekin PIC Pin 5 par voltage 0V hai to D8, R32 (7501), R39 (2401) ya R18 (1001) open/damaged hai.',
    },

    'relay': {
      id: 'relay',
      title: 'Changeover & Mains Sensing Fault (Pin 1 & Pin 7)',
      subtitle:
        'Luminous Eco Watt mein mains detection aur changeover TV31B02 transformer, D1-D4 (M7) bridge, Q32 (1F) aur Q7 (1F) se hokar PIC16F722 ke Pin 1 aur Pin 7 se control hota hai.',
      icon: '🔌',
      severity: 'high',
      
      symptoms: [
        'Power cut hone par inverter battery backup par switch nahi hota',
        'Mains line aane par inverter mains mode par wapas nahi aata (Changeover failure)',
        'Changeover relay continuously chattering ya click-click karti hai',
        'PIC16F722 ke Pin 1 ya Pin 7 par switching voltage missing hai',
      ],

      basicChecks: [
        'Mains L, N input line par R10 (100kΩ) aur R11 (100kΩ) resistors check karein',
        'TV31B02 transformer primary aur secondary (R43 10kΩ) check karein',
        'D1, D2, D3, D4 (M7 SMD) bridge rectifier diodes check karein',
        'R22 (27kΩ) aur 3.9kΩ pull-down resistors check karein',
        'Q32 (1F NPN transistor) aur R5 (22kΩ), R119 (22kΩ) check karein',
        'Q7 (1F NPN transistor), R1 (10kΩ), R14 (10kΩ), C51 check karein',
        'Pin 1 line par R34 (10kΩ), R131 (1kΩ) aur Pin 7 line par R4 (10kΩ), R19 (10kΩ) check karein',
      ],

      technicalExplanation: {
        title: 'Luminous Changeover & Mains Sensing Circuit (Pin 1 & Pin 7 Diagram)',
        explanation:
          'AC Input (L, N) se R10 (100kΩ) aur R11 (100kΩ) ke through TV31B02 sense transformer ko AC drive milti hai (secondary par R43 10kΩ). Iske baad D1, D2, D3, D4 (M7) bridge rectifier se rectified DC banti hai. Circuit do parts mein divide hota hai: 1) R5 (22kΩ) se Q32 (1F NPN) transistor drive hota hai jo R119 (22kΩ) ke sath ground reference switch karta hai. 2) R1 (10kΩ) aur R14 (10kΩ) + C51 se Q7 (1F NPN) transistor drive hota hai. Q7 Collector R34 (10kΩ) aur R131 (1kΩ) ke through Pin 1 se connected hai aur Emitter R4 (10kΩ) aur R19 (10kΩ) ke through Pin 7 se connected hai.',
        components: [
          {
            component: 'TV31B02',
            function: 'AC Mains line isolation & sensing transformer.',
            value: 'Sense Transformer',
          },
          {
            component: 'R10 & R11',
            function: 'Mains high-voltage AC current limiting resistors.',
            value: '100kΩ each (Marking: 1003)',
          },
          {
            component: 'D1, D2, D3, D4 (M7)',
            function: 'Full wave bridge rectifier diodes.',
            value: 'M7 (1N4007 SMD)',
          },
          {
            component: 'Q32 & Q7 (1F)',
            function: 'Mains detection & changeover driver NPN SMD transistors.',
            value: 'NPN Transistor (1F)',
          },
          {
            component: 'R5, R119, R22',
            function: 'Q32 drive and divider resistors.',
            value: 'R5: 22kΩ, R119: 22kΩ, R22: 27kΩ',
          },
          {
            component: 'R1, R14, R34, R131',
            function: 'Q7 drive and Pin 1 sensing line network.',
            value: 'R1: 10kΩ, R14: 10kΩ, R34: 10kΩ, R131: 1kΩ',
          },
          {
            component: 'R4 & R19',
            function: 'Pin 7 changeover trigger sensing network.',
            value: '10kΩ each',
          },
          {
            component: 'PIC16F722',
            function: 'Pin 1 (Reset/Sync) aur Pin 7 (Changeover Sense) se mains status monitor karke changeover relay switch karta hai.',
            package: '28-Pin Microcontroller',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'R10 ya R11 (100kΩ) open',
          explanation: 'Mains transformer TV31B02 tak AC voltage nahi pahunchti, jisse inverter mains sense nahi karta.',
        },
        {
          cause: 'D1-D4 bridge rectifier diode short / open',
          explanation: 'Bridge fail hone se Q32/Q7 transistor ko DC trigger pulse nahi milti.',
        },
        {
          cause: 'Q7 ya Q32 (1F) transistor damaged',
          explanation: 'Transistor kharab hone se Pin 1 aur Pin 7 par changeover signal pass nahi hota.',
        },
        {
          cause: 'R131 (1kΩ) ya R19 (10kΩ) open',
          explanation: 'Microcontroller pins tak voltage nahi pahunchti.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'R10 & R11 Mains Resistors Test',
          explanation: 'Power OFF karke R10 aur R11 (100kΩ each) ki resistance multimeter se check karein.',
        },
        {
          step: 2,
          title: 'TV31B02 & D1-D4 Bridge Diodes Test',
          explanation: 'TV31B02 secondary par AC voltage aur D1-D4 M7 diodes ka diode drop (~0.6V) measure karein.',
        },
        {
          step: 3,
          title: 'Q32 & Q7 (1F) Transistors Test',
          explanation: 'Multimeter diode mode par Q32 aur Q7 ka Base-Emitter aur Base-Collector drop check karein.',
        },
        {
          step: 4,
          title: 'Pin 1 & Pin 7 Voltage Verification',
          explanation: 'Mains ON hone par Pin 1 (via R131 1kΩ) aur Pin 7 (via R19 10kΩ) par transition observe karein.',
        },
      ],

      circuitFlow:
        'AC Line (L, N) ➔ R10, R11 (100kΩ) ➔ TV31B02 ➔ D1-D4 (M7 Bridge) ➔ Q32 (1F) / Q7 (1F) ➔ Pin 1 (via R34/R131) & Pin 7 (via R4/R19) ➔ PIC16F722 Changeover Logic',

      importantNote:
        'TV31B02 transformer ke input resistors (R10, R11 100kΩ) high-voltage spike se aksar open ho jaate hain. Changeover issue mein pehle inhi ko check karein.',

      diagnosis:
        'Agar mains present hai lekin TV31B02 ke input par AC nahi to R10/R11 open hain. Agar TV31B02 secondary par AC hai lekin Pin 1/Pin 7 par logic nahi to D1-D4 ya Q7/Q32 (1F) kharab hai.',
    },

    'overload': {
      id: 'overload',
      title: 'Overload Protection',
      subtitle:
        'Inverter par connected load ki power inverter ki rated capacity se zyada ho gayi hai, jisse protection circuit trip kar gaya hai.',
      icon: '⚡',
      severity: 'high',
      
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

    'switch': {
      id: 'switch',
      title: 'ON/OFF Switch Problem',
      subtitle:
        'Inverter ka power switch faulty hai — inverter on ya off nahi ho raha properly.',
      icon: '🔘',
      severity: 'low',
      
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

    'fan': {
      id: 'fan',
      title: 'Fan / Overheating Control Problem',
      subtitle: 'Microtek V4 to V7 model mein fan na chalna ya overheating issue LM324 op-amp heat sensor circuit aur BD139 (Q15) drive transistor se relate karta hai.',
      icon: '🌀',
      severity: 'high',

      symptoms: [
        'Fan bilkul nahi ghum raha jab heatsink garam ho chuka hai',
        'Inverter kuch hi minute load chalne par Overheat hokar shut down ho jata hai',
        'Fan continuously full speed par chalta rehta hai (normal temperature par bhi)',
        'Heat sensor disconnect hone par fan status abnormal rehta hai',
      ],

      basicChecks: [
        'Heat Sensor connector par voltages measure karein (Normal: 3.14V, Overheat: >0.74V)',
        'LM324 op-amp IC ke Pin 1-7 aur Pin 8-14 voltages check karein',
        'PIC16F72 ke Pin 17 aur Pin 27 par feedback voltages check karein (Normal: 0.79V, Overheat: >3.14V)',
        'BD139 (Q15) power transistor check karein',
        'R79 (2201 / 2.2kΩ), R35 (1001 / 1kΩ), R1 (5101 / 5.1kΩ), R9 (8200 / 820Ω), R11 (5101 / 5.1kΩ), R26 (5601 / 5.6kΩ) resistors check karein',
        'D7 (4148) aur D20 diodes check karein',
        'Fan Jack par DC voltage check karein',
      ],

      technicalExplanation: {
        title: 'Microtek Fan & Heat Sensor Circuit (LM324 + BD139 Diagram)',
        explanation:
          'Microtek V4-V7 mein heatsink temperature monitor karne ke liye Heat Sensor (NTC) LM324 quad op-amp ke Comparator Pin 5 aur Pin 6 se connected hota hai. Heat sensor line R1 (5101 / 5.1kΩ) ke through positive common line se pull-up hoti hai (Normal temperature par 3.14V, Overheat hone par >0.74V). LM324 output Pin 7 se signal R35 (1001 / 1kΩ) ke through PIC16F72 ke Pin 27 par jata hai (Normal: 0.79V, Overheat: >3.14V). R9 (8200), R11 (5101) aur D7 (4148) reference create karte hain. Microcontroller Pin 17 se R79 (2201 / 2.2kΩ) ke through BD139 (Q15) NPN power transistor ke Base par pulse bhej kar Fan Jack ko ground switch karta hai. D20 diode fan motor ke protection ke liye laga hai.',
        components: [
          {
            component: 'LM324',
            function: 'Quad Op-Amp IC — Heat Sensor analog voltage ko reference se compare karke PIC ko overheat signal deta hai.',
            package: '14-pin DIP / SOIC',
          },
          {
            component: 'BD139 (Q15)',
            function: 'Medium Power NPN Transistor — Fan Jack ke negative terminal ko ground se switch karta hai.',
            value: 'BD139 (TO-126)',
          },
          {
            component: 'PIC16F72',
            function: 'Pin 27 se overheat sensing padhta hai aur Pin 17 se fan drive control pulse generate karta hai.',
            package: '28-pin DIP',
          },
          {
            component: 'Heat Sensor (NTC)',
            function: 'Heatsink temperature sense karta hai. Normal: 3.14V, Overheat condition: >0.74V drop.',
            value: 'Thermistor Sensor',
          },
          {
            component: 'R79',
            function: 'PIC16F72 Pin 17 se BD139 (Q15) Base drive resistor.',
            value: '2.2kΩ (Marking: 2201)',
          },
          {
            component: 'R35',
            function: 'LM324 Pin 7 output se PIC16F72 Pin 27 feedback resistor.',
            value: '1kΩ (Marking: 1001)',
          },
          {
            component: 'R1 & R11',
            function: 'Heat sensor pull-up aur LM324 biasing resistors.',
            value: '5.1kΩ each (Marking: 5101)',
          },
          {
            component: 'R9 & R26',
            function: 'LM324 reference divider network resistors.',
            value: 'R9: 820Ω (8200), R26: 5.6kΩ (5601)',
          },
          {
            component: 'D7 & D20',
            function: 'D7: 1N4148 reference diode, D20: Fan motor flyback protection diode.',
            value: '1N4148 / Switching Diode',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'BD139 (Q15) transistor open / short',
          explanation: 'Q15 open hone par fan start nahi hota; short hone par fan continuously full speed par chalta rehta hai.',
        },
        {
          cause: 'LM324 op-amp IC faulty',
          explanation: 'LM324 internal comparator damage hone par wrong temperature readings MCU tak pahunchti hain.',
        },
        {
          cause: 'Heat Sensor open ya disconnected',
          explanation: 'Sensor wire break hone par inverter false overheat trip kar sakta hai.',
        },
        {
          cause: 'R79 (2201) ya R35 (1001) open',
          explanation: 'Base drive resistor burn hone par BD139 trigger nahi hota.',
        },
        {
          cause: 'D20 diode short',
          explanation: 'D20 short hone par 12V supply ground se short hokar BD139 ko damage kar deti hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'BD139 (Q15) Transistor Test',
          explanation: 'Multimeter diode mode par BD139 ka Base-Collector aur Base-Emitter junction check karein (~0.65V drop).',
        },
        {
          step: 2,
          title: 'Heat Sensor Voltage Test',
          explanation: 'Heat Sensor pin par normal temperature par ~3.14V check karein. Agar 0V ya 5V hai to sensor/R1 check karein.',
        },
        {
          step: 3,
          title: 'LM324 Output & PIC Pin 27 Voltage',
          explanation: 'LM324 Pin 7 aur PIC Pin 27 par voltage measure karein (Normal: ~0.79V, Overheat: >3.14V).',
        },
        {
          step: 4,
          title: 'PIC Pin 17 Fan Trigger Signal',
          explanation: 'Microcontroller Pin 17 par fan ON hone ke time logic HIGH pulse verify karein.',
        },
        {
          step: 5,
          title: 'R79 (2201), R35 (1001), D20 Diode Verify',
          explanation: 'Resistors aur D20 protection diode test karein.',
        },
      ],

      circuitFlow: 'Heat Sensor ➔ R1 (5101) ➔ LM324 (Pins 5,6 In ➔ Pin 7 Out) ➔ R35 (1001) ➔ PIC16F72 (Pin 27 Sense) | PIC16F72 (Pin 17 Out) ➔ R79 (2201) ➔ BD139 Q15 (Base) ➔ Fan Jack (-) ➔ Fan Motor (via D20)',
      importantNote: 'BD139 replace karte waqt uska heatsink tab properly isolate karein agar PCB requirement ho.',
      diagnosis: 'Agar PIC Pin 17 par high voltage aa rahi hai lekin Fan nahi chal raha to BD139 (Q15) ya R79 kharab hai.',
    },

    'microcontroller-pin-details': {
      id: 'microcontroller-pin-details',
      title: 'Microtek EB 900 Sine Wave Microcontroller 28-Pin Details',
      subtitle:
        'Microtek EB 900 Sine Wave Inverter (EBHB-SGP-V3R3) complete 28-Pin operating voltages across Mains Mode and Inverter Mode with dedicated pin functions.',
      icon: '🎛️',
      severity: 'high',

      symptoms: [
        'Inverter completely dead hai ya display par koi response nahi',
        'Mains mode se Inverter mode switching fail',
        'Charging current control nahi ho raha ya gate pulse missing hai',
        'Switching outputs (Pins 12, 22, 23, 24) abnormal hain',
      ],

      basicChecks: [
        'Pin 20 (+5V VCC Supply) aur Pin 8, Pin 19 (Ground) check karein',
        'Pin 1 (Master Clear / Reset: 5.0V Mains / 5.0V Inv) check karein',
        'Pin 9 & 10 Crystal Oscillator voltages (Pin 9: 2.15V, Pin 10: 1.84V–1.92V) verify karein',
        'Pin 2 (Feedback Sense: 1.5V Mains / 2.6V Inv) check karein',
        'Pin 5 (Battery Level Sense: 3.9V Mains / 3.3V Inv) check karein',
        'Pin 4 (Mains Sense: 1.5V Mains / 0V Inv) & Pin 28 (Mains Sense: 3.2V Mains / 5.0V Inv) check karein',
        'Switching Gate Pulses: Pin 12 & 23 (High Side: 0V Mains / 2.87V Inv), Pin 22 & 24 (Low Side: 0.67V Mains / 2.05V Inv) check karein',
      ],

      technicalExplanation: {
        title: 'Microtek EB 900 / V4–V7 Pin Details (EBHB-SGP-V3R3)',
        explanation:
          'Microtek EB 900 Pure Sine Wave model mein 28-pin microcontroller sabhi critical functions monitor aur drive karta hai. Yahan sabhi 28 pins ke exact operating voltages (Mains Mode aur Inverter Mode) listed hain:',
        components: [
          { component: 'Pin 1: MASTER CLEAR / RESET', function: 'MCU Master Reset pin', value: '5.0V (5.0V)' },
          { component: 'Pin 2: FEED BACK SENSE', function: 'AC output feedback sensing', value: '1.5V (2.6V)' },
          { component: 'Pin 3: CHARGING CURRENT SENSE', function: 'Current sensing during charging', value: '0.8V (0.4V)' },
          { component: 'Pin 4: MAINS SENSE INPUT', function: 'Mains line presence sense', value: '1.5V (0.0V)' },
          { component: 'Pin 5: BATTERY LEVEL SENSE', function: 'Battery voltage sensing line', value: '3.9V (3.3V)' },
          { component: 'Pin 6: RELAY-3 DRIVE OUTPUT', function: 'Output phase relay control', value: '0.0V (4.9V)' },
          { component: 'Pin 7: OVERLOAD SENSE INPUT', function: 'Load overcurrent monitoring', value: '0.0V (0.0V)' },
          { component: 'Pin 8: GROUND PIN', function: 'Circuit Ground', value: '0.0V (0.0V)' },
          { component: 'Pin 9: CRYSTAL OSCILLATOR PIN-1', function: 'Clock oscillator input 1', value: '2.15V (2.15V)' },
          { component: 'Pin 10: CRYSTAL OSCILLATOR PIN-2', function: 'Clock oscillator input 2', value: '1.84V (1.92V)' },
          { component: 'Pin 11: CHARGING INDICATOR', function: 'Charging LED output drive', value: '4.6V–0.0V (0.0V)' },
          { component: 'Pin 12: SWITCHING HIGH SIDE "B"', function: 'High side B MOSFET gate drive', value: '0.0V (2.87V)' },
          { component: 'Pin 13: MAINS INDICATOR OUTPUT', function: 'Mains present LED drive', value: '4.7V (0.0V)' },
          { component: 'Pin 14: BATTERY LOW INDICATOR', function: 'Low battery warning LED drive', value: '0.0V (0.0V)' },
          { component: 'Pin 15: OVERLOAD INDICATOR', function: 'Overload warning LED drive', value: '0.0V (0.0V)' },
          { component: 'Pin 16: RELAY-1 DRIVE OUTPUT', function: 'Charging & 200V/140V changeover relay drive', value: '4.92V (0.0V)' },
          { component: 'Pin 17: FAN DRIVE OUTPUT', function: 'Cooling fan trigger control', value: '0.0V (0.0V)' },
          { component: 'Pin 18: UPS / NORMAL MODE SELECTOR', function: 'Mode selection switch input', value: '5.0V Mains (5.0V UPS / 0V Normal)' },
          { component: 'Pin 19: GROUND PIN', function: 'Circuit Ground', value: '0.0V (0.0V)' },
          { component: 'Pin 20: +5V SUPPLY PIN (VCC)', function: 'Main regulated +5V power supply', value: '5.0V (5.0V)' },
          { component: 'Pin 21: OVERLOAD / SHORT CIRCUIT', function: 'Fast short circuit protection input', value: '5.0V (5.0V)' },
          { component: 'Pin 22: SWITCHING LOW SIDE "B"', function: 'Low side B MOSFET gate drive', value: '0.67V (2.04V)' },
          { component: 'Pin 23: SWITCHING HIGH SIDE "A"', function: 'High side A MOSFET gate drive', value: '0.0V (2.87V)' },
          { component: 'Pin 24: SWITCHING LOW SIDE "A"', function: 'Low side A MOSFET gate drive', value: '0.67V (2.05V)' },
          { component: 'Pin 25: BUZZER DRIVE OUTPUT', function: 'Alarm buzzer trigger', value: '0.0V (0.0V)' },
          { component: 'Pin 26: ON / OFF SWITCH (SW)', function: 'Front panel power switch sensing', value: '5.0V (5.0V)' },
          { component: 'Pin 27: TEMPERATURE SENSE', function: 'Heat sensor comparator input (LM324)', value: '0.73V (0.73V)' },
          { component: 'Pin 28: MAINS SENSE INPUT', function: 'Mains AC zero-cross / presence sense', value: '3.2V (5.0V)' },
        ],
      },

      possibleCauses: [
        {
          cause: 'Pin 20 (+5V) missing ya drop',
          explanation: '7805 regulator ya filter capacitor damage hone se microcontroller on nahi hota.',
        },
        {
          cause: 'Pin 9/10 Crystal fail',
          explanation: 'Crystal dead hone par clock pulse band ho jati hai aur MOSFET switching signal nahi banta.',
        },
        {
          cause: 'Pin 1 Reset voltage drop (<4.8V)',
          explanation: 'Microcontroller continuous reset mode mein chala jata hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'VCC (+5V) & Reset Test',
          explanation: 'Pin 20 par 5.0V aur Pin 1 par 5.0V confirm karein.',
        },
        {
          step: 2,
          title: 'Crystal Oscillator Check',
          explanation: 'Pin 9 (2.15V) aur Pin 10 (1.84V–1.92V) par clock signal verify karein.',
        },
        {
          step: 3,
          title: 'Switching Gate Drive Test',
          explanation: 'Inverter mode mein Pin 12 & 23 (2.87V) aur Pin 22 & 24 (2.05V) measure karein.',
        },
        {
          step: 4,
          title: 'Mains Sensing & Relay Test',
          explanation: 'Mains on karne par Pin 4 (1.5V), Pin 28 (3.2V) aur Pin 16 Relay drive (4.92V) check karein.',
        },
      ],

      circuitFlow:
        'Mains Sense (Pins 4, 28) + Battery Sense (Pin 5) ➔ Microcontroller (PIC16F72 5V/Crystal) ➔ Gate Drives (Pins 12, 22, 23, 24) ➔ Relays (Pins 6, 16) ➔ Display/Buzzer (Pins 11-15, 25)',
      importantNote:
        'Voltages Mains Mode (Inverter Mode) format mein diye gaye hain. Testing ke waqt common ground terminal se multimeter probe connect karein.',
      diagnosis:
        'VCC 5V + Crystal OK hone par agar switching pins (12, 22, 23, 24) par 2.0V–2.87V nahi aa rahi to MCU IC ya driving circuit badlein.',
    },

    'low-battery': {
      id: 'low-battery',
      title: 'Battery Low & Overcharge Voltage Sensing (Pin 5)',
      subtitle:
        'Microtek EB 900 / V4–V7 series mein battery voltage sensing line: +12V (D18 Anode) ➔ D18 Diode (12V Pass) ➔ R56 (51kΩ) ➔ Sensing Node (3.36V, divider via R34 20kΩ to GND) ➔ R36 (1kΩ) ➔ PIC16F72 Pin 5.',
      icon: '🔋',
      severity: 'high',

      symptoms: [
        'Battery full charge hone ke bawajood inverter par Battery Low alarm / LED activate ho jati hai',
        'Inverter battery ko overcharge karta hai (cutoff threshold miss hone par)',
        'Pin 5 par expected sensing voltage (3.36V DC) ki jagah abnormal voltage aati hai',
        'Battery line connect karne par inverter falsely shutdown ho jata hai',
      ],

      basicChecks: [
        '+12V Battery line par D18 diode ke Anode aur Cathode voltages check karein (12V)',
        'R56 (51kΩ) resistor ki resistance measure karein',
        'R34 (20kΩ to Ground) resistor ki resistance measure karein',
        'R56 aur R34 ke junction node par exactly 3.36V DC voltage measure karein',
        'R36 (1kΩ) series resistor check karein jo Microcontroller ke Pin 5 tak jata hai',
        'Microcontroller Pin 5 par voltage confirm karein (Normal: 3.36V DC / 3.9V Mains, 3.3V Backup)',
      ],

      technicalExplanation: {
        title: 'Microtek EB 900 Battery Sensing Circuit (Pin 5 Diagram)',
        explanation:
          'Microtek EB 900 Sine Wave aur V4–V7 series mein battery voltage monitoring D18 diode ke through positive 12V supply se shuru hoti hai. D18 diode 12V DC pass karta hai, jo R56 (51kΩ) aur R34 (20kΩ) ke precision voltage divider network mein feed hoti hai. Voltage divider ka output formula Vout = 12V × 20k / (51k + 20k) ≈ 3.36V calculate hota hai. Yeh 3.36V DC node R36 (1kΩ) series resistor ke through Microcontroller PIC16F72 ke Pin 5 (Battery Level Sense Pin) tak pahunchti hai jisse microcontroller battery charging status aur low battery threshold accurately monitor karta hai.',
        components: [
          {
            component: 'D18 Diode',
            function: '12V Battery positive pass diode.',
            value: '12V DC Pass',
          },
          {
            component: 'R56 (51kΩ)',
            function: 'Upper voltage divider resistor (12V se 3.36V node drop).',
            value: '51kΩ Resistor',
          },
          {
            component: 'R34 (20kΩ)',
            function: 'Lower voltage divider resistor to Ground.',
            value: '20kΩ to GND',
          },
          {
            component: 'R36 (1kΩ)',
            function: 'Series protection resistor to Microcontroller Pin 5.',
            value: '1kΩ Resistor',
          },
          {
            component: 'PIC16F72 Pin 5',
            function: 'Battery Level Sense Input Pin on Microcontroller.',
            value: 'Pin 5 (ADC Input)',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'R56 (51kΩ) resistor value drift / open',
          explanation: 'R56 value badhne se node voltage 3.36V se gir jati hai jisse inverter false Battery Low indicate karta hai.',
        },
        {
          cause: 'R34 (20kΩ) resistor short / leaky to ground',
          explanation: 'R34 short hone par Pin 5 par 0V milti hai aur inverter low battery shutdown kar deta hai.',
        },
        {
          cause: 'D18 diode open ya dry solder',
          explanation: 'D18 open hone par sensing line par 12V positive supply cut ho jati hai.',
        },
        {
          cause: 'R36 (1kΩ) series resistor open',
          explanation: 'Signal MCU ke Pin 5 tak nahi pahunchta.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'D18 Diode Voltage Test',
          explanation: 'Multimeter DC mode par D18 ke Cathode par +12V DC confirm karein.',
        },
        {
          step: 2,
          title: 'Divider Node Voltage (3.36V) Check',
          explanation: 'R56 aur R34 ke beech wale node par probe lagakar 3.36V DC measure karein.',
        },
        {
          step: 3,
          title: 'R36 & PIC Pin 5 Voltage Measure',
          explanation: 'Microcontroller ke Pin 5 par direct 3.36V DC verify karein.',
        },
        {
          step: 4,
          title: 'Resistors Replace Karein',
          explanation: 'Agar node par wrong voltage hai to R56 (51kΩ) ya R34 (20kΩ) ko precision 1% resistor se replace karein.',
        },
      ],

      circuitFlow:
        '+12V (D18 Anode) ➔ D18 Diode (12V Pass) ➔ R56 (51kΩ) ➔ Sensing Node (3.36V, R34 20kΩ to GND) ➔ R36 (1kΩ) ➔ PIC16F72 Pin 5',
      importantNote:
        'Voltage Divider formula: Vout = 12V × 20k / (51k + 20k) ≈ 3.36V. Resistor replace karte waqt accurate 1% tolerance resistors hi use karein.',
      diagnosis:
        'Battery 12V hone par agar Pin 5 par 3.36V nahi aa rahi to R56 (51kΩ), R34 (20kΩ) ya D18 diode faulty hai.',
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
      title: 'Relay Changeover Problem',
      subtitle: 'Microtek V4 to V7 models mein mains se inverter ya inverter se mains changeover failure PIC16F72 ke Pin 6 / Pin 16 aur Relay-1 / Relay-3 circuit se relate karta hai.',
      icon: '🔌',
      severity: 'high',

      symptoms: [
        'Mains aane par bhi inverter mode se switch nahi hota',
        'Mains jane par output cutoff ho jata hai (changeover failure)',
        'Relay se continuous buzzing ya chatter ki aawaz aati hai',
        'Output socket par intermittent / chhatakti hui voltage aati hai',
        'CN7 connector par 200V / 140V changeover line switch nahi hoti',
      ],

      basicChecks: [
        'PIC16F72 ke Pin 6 aur Pin 16 par switching control voltages measure karein',
        'R78 (2201 / 2.2kΩ) aur Q12 (1F NPN transistor) ko check karein',
        'R89 (2201), R87 (2201), R88 (2701 / 2.7kΩ) resistors check karein',
        'Q18 (1F NPN transistor) aur ZD2 zener diode, D30 diode check karein',
        'RELAY-1 (Mains/Inv changeover) aur RELAY-3 (Output Phase) coils aur contacts test karein',
        'Positive common line voltage check karein',
      ],

      technicalExplanation: {
        title: 'Microtek Relay Drive Circuit (Pin 6 & Pin 16 Diagram)',
        explanation:
          'Microtek V4 to V7 model mein PIC16F72 microcontroller 2 dedicated pins se changeover relays control karta hai: 1) Pin 16 se R78 (2201 / 2.2kΩ) ke through Q12 (1F NPN transistor) ke Base par drive signal jata hai, jo RELAY-1 coil ko Positive Common Line se switch karta hai (CN7 connector par 200V aur 140V changeover ke liye). 2) Pin 6 se R89 (2201), R87 (2201) aur R88 (2701) network ke through Q18 (1F NPN transistor) drive hota hai, jo RELAY-3 coil ko switch karta hai (ZD2 zener aur D30 protection ke sath) aur Main Line Phase ko Output Pin tak switch karta hai.',
        components: [
          {
            component: 'PIC16F72',
            function: 'Microcontroller — Pin 16 (Relay-1 Drive) aur Pin 6 (Relay-3 Drive) control pulses generate karta hai.',
            package: '28-pin DIP',
          },
          {
            component: 'RELAY-1',
            function: 'Primary Changeover Relay — CN7 connector par 200V aur 140V tapping ko switch karta hai.',
            value: '12V DC Coil / 30A',
          },
          {
            component: 'RELAY-3',
            function: 'Output Phase Relay — Main Line Phase ko Output Pin se connect/disconnect karta hai.',
            value: '12V DC Coil / 30A',
          },
          {
            component: 'Q12 (1F)',
            function: 'RELAY-1 coil driver NPN transistor (Base driven from Pin 16 via R78).',
            value: 'NPN Transistor (1F)',
          },
          {
            component: 'Q18 (1F)',
            function: 'RELAY-3 coil driver NPN transistor (Base driven from Pin 6 via R89/R87).',
            value: 'NPN Transistor (1F)',
          },
          {
            component: 'R78',
            function: 'PIC16F72 Pin 16 se Q12 Base resistor.',
            value: '2.2kΩ (Marking: 2201)',
          },
          {
            component: 'R89 & R87',
            function: 'PIC16F72 Pin 6 se Q18 Base biasing divider network.',
            value: '2.2kΩ each (Marking: 2201)',
          },
          {
            component: 'R88',
            function: 'Positive Common Line se Pin 6 pull-up resistor.',
            value: '2.7kΩ (Marking: 2701)',
          },
          {
            component: 'ZD2 & D30',
            function: 'RELAY-3 coil ke parallel protection clamp zener diode aur flyback diode.',
            value: 'Zener + Switching Diode',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Q12 ya Q18 transistor (1F) short / open',
          explanation: 'Driver transistor kharab hone se relay coil energize nahi hoti ya continuously energized rehti hai.',
        },
        {
          cause: 'R78 (2201) ya R89/R87/R88 open',
          explanation: 'Resistor open hone par microcontroller ka switching signal transistor base tak nahi pahunch pata.',
        },
        {
          cause: 'RELAY-1 / RELAY-3 contact carbonized ya welded',
          explanation: 'Heavy load ya sparking se relay point burn hokar open ya weld ho jate hain.',
        },
        {
          cause: 'ZD2 / D30 diode short',
          explanation: 'Protection diode short hone se relay coil supply direct ground ho jati hai.',
        },
        {
          cause: 'PIC16F72 Pin 6 ya Pin 16 output failure',
          explanation: 'Microcontroller output pin damage hone par relay trigger voltage missing rehti hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Relay Coil Resistance Measure',
          explanation: 'RELAY-1 aur RELAY-3 dono coils ka resistance multimeter se check karein (200Ω–400Ω expected). Open = relay dead.',
        },
        {
          step: 2,
          title: 'Q12 & Q18 (1F) Transistors Test',
          explanation: 'Multimeter diode mode par Q12 aur Q18 transistors ka B-E aur B-C drop (~0.65V) check karein. Short hone par replace karein.',
        },
        {
          step: 3,
          title: 'R78 (2201), R89 (2201), R88 (2701) Value Check',
          explanation: 'Resistance mode par R78 (2.2kΩ), R89 (2.2kΩ), R87 (2.2kΩ), R88 (2.7kΩ) confirm karein.',
        },
        {
          step: 4,
          title: 'ZD2 & D30 Protection Diode Check',
          explanation: 'ZD2 zener aur D30 flyback diode short circuit test karein.',
        },
        {
          step: 5,
          title: 'PIC16F72 Pin 6 & Pin 16 Voltage Check',
          explanation: 'Inverter ON aur Mains ON/OFF state mein Pin 6 aur Pin 16 par 0V / 5V transition observe karein.',
        },
      ],

      circuitFlow: 'Pin 16 ➔ R78 (2201) ➔ Q12 (1F Base) ➔ RELAY-1 Coil ➔ CN7 (200V/140V Tap) | Pin 6 ➔ R89/R87 (2201) + R88 (2701) ➔ Q18 (1F Base) ➔ RELAY-3 Coil (ZD2, D30) ➔ Main Line Phase to Output Pin',
      importantNote: 'Relay replace karte waqt hamesha high quality 30A rated 12V relay use karein. Low quality relay jaldi burn ho jati hai.',
      diagnosis: 'Agar Q12/Q18 ke base par 0.7V aa raha hai lekin relay click nahi kar rahi to transistor open ya relay coil damaged hai.',
    },

    'changeover': {
      id: 'changeover',
      title: 'Mains Changeover Fault (Pin 4 & Pin 28)',
      subtitle:
        'Microtek V4 to V7 model mein Mains Sensing aur Changeover failure TV31B02 transformer, D16, D17, D19, D22 bridge diodes, Q13 (Pin 4) aur Q7 (Pin 28) circuit se relate karta hai.',
      icon: '🔄',
      severity: 'high',

      symptoms: [
        'Mains line aane par bhi inverter backup mode se switch nahi karta (Changeover fail)',
        'Mains connect karne par inverter tripping ya continuously restart hota hai',
        'Microcontroller ke Pin 4 ya Pin 28 par sensing logic missing hai',
        'Q13 ya Q7 transistor overheat ya short hone par changeover ruk jata hai',
      ],

      basicChecks: [
        'Mains N & L line par R58 (1003 = 100kΩ) aur R66 (1003 = 100kΩ) check karein',
        'TV31B02 sense transformer secondary 1002 (10kΩ) resistor check karein',
        'D16, D17, D19, D22 (M7) bridge rectifier diodes check karein',
        'R62 (2702 = 27kΩ), R67 (3901 = 3.9kΩ), R63 (1002 = 10kΩ), R64 (1002 = 10kΩ) check karein',
        'Q13 (1F NPN) transistor aur R68 (1002 = 10kΩ) Pin 4 line check karein',
        'Q7 (1F NPN) transistor aur R57 (1001 = 1kΩ) Pin 28 line check karein',
        'C20 aur C22 filter capacitors par leakage ya short check karein',
      ],

      technicalExplanation: {
        title: 'Microtek Changeover Circuit (Pin 4 & Pin 28 Diagram)',
        explanation:
          'Mains AC line N & L se R58 (1003 = 100kΩ) aur R66 (1003 = 100kΩ) ke through TV31B02 sense transformer ko AC input milti hai. Secondary par D16, D17, D19, D22 (M7) full-wave bridge rectifier laga hai. Rectified DC do alag-alag control paths mein divide hoti hai: 1) R62 (2702 = 27kΩ), R67 (3901 = 3.9kΩ), R64 (1002), C22, R72 (1002), C20 se filter hokar Q13 (1F NPN) transistor ke through Microcontroller ke Pin 4 (Micro ki pin number 4) tak direct sensing signal deliver hota hai. 2) Q7 (1F NPN) transistor R57 (1001 = 1kΩ) ke through Microcontroller ke Pin 28 (Pin 28 Se Direct Connected) se drive hokar Positive supply line se changeover synchronization control karta hai.',
        components: [
          {
            component: 'TV31B02',
            function: 'AC Mains line isolation & sensing step-down transformer.',
            value: 'Sense Transformer',
          },
          {
            component: 'R58 & R66',
            function: 'Mains high-voltage AC drop input resistors.',
            value: '100kΩ each (Marking: 1003)',
          },
          {
            component: 'D16, D17, D19, D22 (M7)',
            function: 'Full-wave bridge rectifier diodes.',
            value: 'M7 (1N4007 SMD)',
          },
          {
            component: 'Q13 (1F)',
            function: 'Pin 4 direct mains sensing drive NPN transistor.',
            value: 'NPN Transistor (1F)',
          },
          {
            component: 'Q7 (1F)',
            function: 'Pin 28 direct synchronization drive NPN transistor (via R57 1kΩ).',
            value: 'NPN Transistor (1F)',
          },
          {
            component: 'R62, R67, R63, R64, R72, R68',
            function: 'Filter divider and transistor biasing resistor network.',
            value: 'R62: 27kΩ (2702), R67: 3.9kΩ (3901), Others: 10kΩ (1002)',
          },
          {
            component: 'R57',
            function: 'Pin 28 microcontroller drive series resistor.',
            value: '1kΩ (Marking: 1001)',
          },
          {
            component: 'C20 & C22',
            function: 'DC sensing filter capacitors to ground.',
            value: 'SMD Filter Capacitors',
          },
          {
            component: 'PIC16F72',
            function: 'Pin 4 (Mains Presence Sense) aur Pin 28 (Zero Cross / Sync) se mains status read karta hai.',
            package: '28-Pin Microcontroller',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'R58 ya R66 (100kΩ / 1003) open',
          explanation: 'TV31B02 transformer primary par AC cut hone se sensing voltage generate nahi hoti.',
        },
        {
          cause: 'D16-D22 bridge diodes short ya open',
          explanation: 'DC sensing pulse ground ho jati hai ya interrupt ho jati hai.',
        },
        {
          cause: 'Q13 ya Q7 (1F) transistor faulty',
          explanation: 'Transistor kharab hone se Pin 4 ya Pin 28 par switching voltage nahi pahunchti.',
        },
        {
          cause: 'R57 (1kΩ / 1001) ya R68 (10kΩ / 1002) open',
          explanation: 'Microcontroller pins tak signal path cut ho jata hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'R58 & R66 (100kΩ) Resistors Check',
          explanation: 'Mains N aur L line ke series 100kΩ (1003) resistors ko multimeter se test karein.',
        },
        {
          step: 2,
          title: 'TV31B02 Transformer & D16-D22 Bridge Test',
          explanation: 'TV31B02 secondary par AC aur D16-D22 bridge diodes ka forward voltage (~0.6V) measure karein.',
        },
        {
          step: 3,
          title: 'Q13 (1F) & Pin 4 Voltage Verification',
          explanation: 'Q13 transistor test karein aur Pin 4 par DC sensing level confirm karein.',
        },
        {
          step: 4,
          title: 'Q7 (1F), R57 (1kΩ) & Pin 28 Verification',
          explanation: 'Q7 transistor, R57 (1001) resistor aur Pin 28 line test karein.',
        },
      ],

      circuitFlow:
        'Mains AC (N, L) ➔ R58, R66 (1003 / 100kΩ) ➔ TV31B02 ➔ Bridge Diodes (D16, D17, D19, D22 M7) ➔ Branch 1: Q13 (1F) ➔ Microcontroller Pin 4 | Branch 2: Q7 (1F) + R57 (1001 / 1kΩ) ➔ Microcontroller Pin 28',

      importantNote:
        'Microtek changeover failure mein R58, R66 (100kΩ) aur TV31B02 ke bridge diodes 90% common fault hote hain. Inhe sabse pehle check karein.',

      diagnosis:
        'Agar TV31B02 ke secondary par AC voltage aa rahi hai lekin Pin 4 aur Pin 28 par logic change nahi ho raha to bridge diodes M7 ya Q13/Q7 (1F) badlein.',
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
      title: 'Battery Low / Overcharge Sensing Problem',
      subtitle: 'Livguard LG1100 / LG900 / LG700 / LG700E models mein battery low false alarm ya overcharging issue Microcontroller ke Pin 16 aur R27 / R56 / R28 voltage divider network se relate karta hai.',
      icon: '🔋',
      severity: 'high',

      symptoms: [
        'Battery full charged hone par bhi inverter false Battery Low indicate karta hai',
        'Inverter battery ko overcharge karta hai (battery garam hona, acid/pani sukhna)',
        'Backup time achanak bahut kam dikhana',
        'Microcontroller Pin 16 par sensing voltage normal threshold (2.86V ya 3.17V) se deviate hona',
      ],

      basicChecks: [
        '12V Battery terminal voltage multimeter se check karein (Normal: 12.6V - 13.8V)',
        'Microcontroller ke Pin 16 par DC voltage measure karein (Expected: 2.86V or 3.17V)',
        'R27 (1502 / 15kΩ) SMD resistor check karein',
        'R56 (1002 / 10kΩ) SMD resistor check karein',
        'R28 (3301 / 3.3kΩ / 33kΩ) to ground resistor check karein',
        'C21 (1µF / 63V) filter capacitor test karein (leakage ya short check)',
      ],

      technicalExplanation: {
        title: 'Livguard Battery Low Sensing Circuit (LG1100/900/700/700E Pin 16 Diagram)',
        explanation:
          'Livguard Pure Sine Wave (LG700E, LG700, LG900, LG1100) models mein 12V Battery line se sensing voltage R27 (1502 / 15kΩ) ke through aati hai. Junction par R56 (1002 / 10kΩ) series resistor aur R28 (3301 / 3.3kΩ) ground resistor voltage divider banate hain. Sensed filtered DC voltage C21 (1µF / 63V capacitor) ke sath Microcontroller ke Pin 16 par deliver hoti hai. Normal operational state mein Pin 16 par exactly 2.86V ya 3.17V voltage honi chahiye. Agar yeh voltage drop hoti hai to microcontroller inverter ko false Battery Low shut down mein daal deta hai; agar voltage high hoti hai to overcharge hota hai.',
        components: [
          {
            component: 'Microcontroller (Pin 16)',
            function: 'Battery voltage sensing ADC input pin. Normal operating voltage: 2.86V or 3.17V.',
            package: 'LQFP / DIP Microcontroller',
          },
          {
            component: 'R27',
            function: '12V Battery positive line se main high-side sensing input resistor.',
            value: '15kΩ (Marking: 1502)',
          },
          {
            component: 'R56',
            function: 'Sensing junction se Pin 16 microcontroller input series limiting resistor.',
            value: '10kΩ (Marking: 1002)',
          },
          {
            component: 'R28',
            function: 'Sensing node se ground pull-down divider resistor.',
            value: '3.3kΩ (Marking: 3301)',
          },
          {
            component: 'C21',
            function: 'Sensing node filter capacitor — battery ripple noise ko ground par filter karta hai.',
            value: '1µF / 63V',
          },
        ],
      },

      resistorValues: {
        title: 'Livguard Battery Sensing Resistor Table (Pin 16)',
        explanation: 'LG1100/900/700/700E models mein precision 1% SMD resistors use hote hain.',
        values: [
          {
            pcb: 'LG Series (12V)',
            r24: 'R27 = 15kΩ (1502)',
            marking: '1502',
            reason: 'High-side battery voltage dropper resistor.',
          },
          {
            pcb: 'LG Series (12V)',
            r24: 'R56 = 10kΩ (1002)',
            marking: '1002',
            reason: 'Pin 16 microcontroller input series feed.',
          },
          {
            pcb: 'LG Series (12V)',
            r24: 'R28 = 3.3kΩ (3301)',
            marking: '3301',
            reason: 'Ground divider network bottom resistor.',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'R27 (1502 / 15kΩ) value drift ya open',
          explanation: 'R27 resistance badhne se Pin 16 par voltage drop ho jati hai aur false battery low trigger hota hai.',
        },
        {
          cause: 'R56 (1002 / 10kΩ) open',
          explanation: 'R56 open hone se Pin 16 par 0V milti hai aur inverter turant battery low shutdown deta hai.',
        },
        {
          cause: 'R28 (3301 / 3.3kΩ) open ya drifted',
          explanation: 'R28 open hone par Pin 16 par abnormally high voltage pahunchti hai jisse overcharge condition create hoti hai.',
        },
        {
          cause: 'C21 (1µF / 63V) leaky ya short',
          explanation: 'C21 leaky hone par sensing voltage ground leak ho jati hai aur Pin 16 par voltage 2.86V se niche gir jati hai.',
        },
        {
          cause: 'Microcontroller Pin 16 internal ADC input leakage',
          explanation: 'Pin 16 internal clamping diode short.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Measure Pin 16 Voltage',
          explanation: 'Battery connect karke multimeter DC voltage mode par Microcontroller ke Pin 16 par voltage measure karein. Exactly 2.86V ya 3.17V hona chahiye.',
        },
        {
          step: 2,
          title: 'R27 (1502 / 15kΩ) SMD Test',
          explanation: 'Multimeter resistance mode par R27 ki value 15kΩ check karein. Drifted hone par 1% precision SMD replace karein.',
        },
        {
          step: 3,
          title: 'R56 (1002 / 10kΩ) & R28 (3301 / 3.3kΩ) Test',
          explanation: 'R56 (10kΩ) aur R28 (3.3kΩ) resistors ki accurate value verify karein.',
        },
        {
          step: 4,
          title: 'C21 (1µF / 63V) Capacitor Check',
          explanation: 'C21 par capacitance aur resistance (leakage) check karein.',
        },
      ],

      circuitFlow: '+12V Battery ➔ R27 (1502 / 15kΩ) ➔ [Junction: R28 (3301 / 3.3kΩ) to GND + C21 (1µF 63V)] ➔ R56 (1002 / 10kΩ) ➔ Microcontroller Pin 16 (Normal: 2.86V or 3.17V)',
      importantNote: 'Sensing circuit mein replacement ke waqt standard 5% carbon resistor ke badle 1% precision MFR/SMD resistor hi lagayein, warna voltage sensing accurate nahi hogi.',
      diagnosis: 'Agar battery 12.8V hai lekin Pin 16 par voltage 2.5V se kam hai to R27, R56 ya C21 faulty hai.',
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
      title: 'Charging Circuit Problem',
      subtitle: 'Livguard LG900 / LG700 / LG1100 / LG700E models mein charging na aana ya high current aana Microcontroller ke Pin 9, Pin 10, MOC3021 optocoupler, Q17 transistor aur Relay-2 AC circuit se relate karta hai.',
      icon: '⚡',
      severity: 'high',

      symptoms: [
        'Mains aane par charging indicator nahi jal raha aur battery charge nahi ho rahi',
        'Charging current zero ya abnormally high (battery boil hona)',
        'Mains connected hone par Relay-2 click nahi kar rahi',
        'MOC3021 optocoupler par trigger pulses missing hain',
        'Transformer ki 125V wali tapping switch nahi ho rahi',
      ],

      basicChecks: [
        'Microcontroller ke Pin 10 (SCR trigger) aur Pin 9 (Relay-2 drive) par logic pulses check karein',
        'R36 (2200 / 220Ω), R37 (1002 / 10kΩ) resistors check karein',
        'MOC3021 optocoupler IC test karein',
        'R35 (4700 / 4.7kΩ 1W) aur R39 (5700 / 5.7kΩ 1W) power resistors check karein',
        'TO-220 Power SCR / Triac / Transistor aur R40 (1001 / 1kΩ) check karein',
        'R65 (6801 / 6.8kΩ), Q17 (1F NPN transistor) aur Relay-2 (D9 flyback diode) check karein',
        'AC Section: R38 (470E / 470Ω 1W), C12 (D473K2J) metallized film capacitor aur 125V transformer tap check karein',
      ],

      technicalExplanation: {
        title: 'Livguard Charging Circuit (DC & AC Section Diagram)',
        explanation:
          'Livguard LG series mein charging control 2 interconnected sections mein kaam karta hai: 1) DC Section: Microcontroller Pin 10 se R36 (2200 / 220Ω) + R37 (1002 / 10kΩ) divider ke through MOC3021 optocoupler trigger hota hai. MOC3021 ka output R35 (4700 1W) aur R39 (5700 1W) ke through TO-220 switching device ke Gate ko drive karta hai (R40 1001 ke sath). Microcontroller Pin 9 se R65 (6801 / 6.8kΩ) ke through Q17 (1F NPN transistor) drive hota hai jo Relay-2 (D9 diode protection) ko energize karke transformer ki 125V wali tapping ko COM contact se connect karta hai. 2) AC Section: R38 (470E 1W) aur C12 (D473K2J film capacitor) snubber network AC switching spikes ko absorb karta hai.',
        components: [
          {
            component: 'Microcontroller',
            function: 'Pin 10 (Charging PWM trigger) aur Pin 9 (Relay-2 Changeover trigger) signals generate karta hai.',
            package: 'Microcontroller',
          },
          {
            component: 'MOC3021',
            function: 'Random-phase optoisolator TRIAC driver IC — DC control aur AC charging section ke beech galvanic isolation deta hai.',
            value: '6-pin DIP Optocoupler',
          },
          {
            component: 'Relay-2',
            function: 'Charging tap selector relay — 125V transformer tapping ko AC line se connect karta hai.',
            value: '12V DC Coil / 30A',
          },
          {
            component: 'Q17 (1F)',
            function: 'Relay-2 coil driver NPN transistor (Driven from Pin 9 via R65).',
            value: 'NPN Transistor (1F)',
          },
          {
            component: 'R35 & R39',
            function: 'Optocoupler output side gate current limiting high-power resistors.',
            value: 'R35: 4.7kΩ (4700) 1W, R39: 5.7kΩ (5700) 1W',
          },
          {
            component: 'R36 & R37',
            function: 'Pin 10 se MOC3021 input LED current limiting divider.',
            value: 'R36: 220Ω (2200), R37: 10kΩ (1002)',
          },
          {
            component: 'R65',
            function: 'Pin 9 se Q17 NPN driver Base resistor.',
            value: '6.8kΩ (Marking: 6801)',
          },
          {
            component: 'R38 & C12 (D473K2J)',
            function: 'AC Section Snubber Network — R38 (470Ω 1W) aur C12 (0.047µF / 47nF D473K2J) switching arcing suppress karte hain.',
            value: '470Ω 1W + D473K2J Cap',
          },
          {
            component: 'D9',
            function: 'Relay-2 coil flyback clamping diode.',
            value: '1N4007 / 1N4148',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'MOC3021 optocoupler dead / open',
          explanation: 'Optocoupler internal LED ya phototriac burn hone par AC charging device trigger nahi hota.',
        },
        {
          cause: 'R35 (4.7kΩ 1W) ya R39 (5.7kΩ 1W) power resistor open',
          explanation: 'Gate drive resistor open hone se charging gate pulse zero ho jati hai.',
        },
        {
          cause: 'Q17 (1F) transistor faulty ya R65 open',
          explanation: 'Q17 open hone par Relay-2 click nahi karti aur 125V transformer tapping connect nahi hoti.',
        },
        {
          cause: 'C12 (D473K2J) capacitor burst ya leaky',
          explanation: 'Snubber capacitor short hone se heavy spark aur resistor R38 burn ho jata hai.',
        },
        {
          cause: 'Relay-2 coil open ya contacts burnt',
          explanation: 'Relay changeover failure se charging current flow stop ho jata hai.',
        },
        {
          cause: 'Microcontroller Pin 9 ya Pin 10 logic missing',
          explanation: 'MCU charging output disabled ya damaged.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Relay-2 & Q17 (1F) Test',
          explanation: 'Mains connect karke Pin 9 par ~5V aur Q17 transistor ke Collector par low voltage verify karein. Relay-2 click honi chahiye.',
        },
        {
          step: 2,
          title: 'MOC3021 Optocoupler Test',
          explanation: 'Pin 1-2 par ~1.2V forward drop aur Pin 4-6 par trigger switching check karein. Sandehaaspad hone par MOC3021 replace karein.',
        },
        {
          step: 3,
          title: 'Power Resistors R35 (4700 1W) & R39 (5700 1W)',
          explanation: 'Resistance mode par R35 aur R39 1W resistors check karein. Often high voltage surge se open ho jate hain.',
        },
        {
          step: 4,
          title: 'AC Snubber C12 (D473K2J) & R38 (470E 1W)',
          explanation: 'C12 film capacitor aur R38 resistor physically inspect karein aur value measure karein.',
        },
        {
          step: 5,
          title: '125V Transformer Tapping Test',
          explanation: 'Transformer secondary se aane wali 125V tapping voltage AC voltmeter se measure karein.',
        },
      ],

      circuitFlow: 'DC: Pin 10 ➔ R36 (2200) ➔ MOC3021 ➔ R35 (4700 1W) + R39 (5700 1W) ➔ SCR Gate | Pin 9 ➔ R65 (6801) ➔ Q17 (1F) ➔ Relay-2 Coil (D9) ➔ 125V Tapping | AC: R38 (470E 1W) + C12 (D473K2J)',
      importantNote: 'Charging circuit repair karte waqt Mains disconnected hona chahiye. MOC3021 aur 1W resistors replace karte waqt wattage rating ka khas dhyan rakhein.',
      diagnosis: 'Agar Relay-2 click ho rahi hai lekin charging start nahi hoti to MOC3021 ya R35/R39 power resistors kharab hain.',
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

  // ─── Su-Kam Shark SMD / DIP (Square Wave) ──────────────────────────────────
  'sukam-shark-inverter': {
    'microcontroller-pin-details': {
      id: 'microcontroller-pin-details',
      title: 'Microcontroller 28-Pin Details & Voltage Guide',
      subtitle:
        'Su-Kam Shark SMD & DIP Square Wave Inverter — Complete 28-Pin voltage readings in Mains and Inverter modes with fault testing guide.',
      icon: '📟',
      severity: 'high',

      symptoms: [
        'Inverter output switching signals nahi de raha (Pin 27/28 par 0V hai)',
        'Inverter battery ko charge nahi kar raha (Pin 26 charging signal 0V)',
        'Mains connect hone par bhi inverter backup mode se switch nahi kar raha (Pin 2/22 sensing failure)',
        'Relay operate nahi kar rahi — changeover nahi ho raha (Pin 11/23 drive line)',
        'Fan continuous maximum speed par chal raha hai ya bilkul nahi chal raha (Pin 24)',
        'Display LEDs (Mains, Low Batt, Overload, Charging, Inv On) glow nahi kar rahe (Pins 12–16)',
        'Overload trip bar-bar ho raha hai (Pin 5 & Pin 21 sensing circuit)',
      ],

      basicChecks: [
        'Pin 20 par +5V VCC supply multimeter se check karein (5V/5V constant)',
        'Pin 8 aur Pin 19 par GND continuity check karein (0V)',
        'Pin 1 Reset pin par 5V logic high voltage check karein',
        'Pin 9 aur Pin 10 Crystal Oscillator pins par 2.4V DC check karein',
        'Pin 2 (1.4V Mains / 0V Inv) aur Pin 22 (2.5V Mains / 5V Inv) mains sensing check karein',
        'Pin 3 Battery Level Sensing par 3.4V DC check karein (12V nominal)',
        'Pin 27 aur Pin 28 Switching Output par Inverter mode mein 1.8V DC check karein',
        'Pin 26 Charging Signal par Mains mode mein 2.0V DC check karein',
        'Pin 23 Output Relay Drive (0V Mains / 4.9V Inv) aur Pin 11 Relay 1 Drive check karein',
        'Pin 24 Fan Drive par 0V (OFF) aur 4.9V (ON) logic check karein',
      ],

      technicalExplanation: {
        title: 'Su-Kam Shark 28-Pin Microprocessor Architecture & Voltage Chart',
        explanation:
          'Su-Kam Shark Square Wave inverter mein 28-pin microcontroller main central processing unit hai. Yeh Mains Sensing (Pins 2, 22), Battery Voltage (Pin 3), Overload (Pins 5, 21), Relays (Pins 11, 23), Fan (Pin 24), Charging PWM (Pin 26), aur MOSFET Gate Drive (Pins 27, 28) ko monitor v control karta hai. Niche har pin ka standard working voltage diya gaya hai.',
        components: [
          {
            component: 'Pin 1 (RESET)',
            function: 'Microcontroller Master Clear / Reset line. Active low pull-up.',
            value: '5V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 2 (MAINS SENSING)',
            function: 'AC mains presence detection input signal.',
            value: '1.4V (Mains) / 0V (Inv)',
          },
          {
            component: 'Pin 3 (BATTERY SENSING)',
            function: '12V Battery level divider sensing input for Low Batt & Overcharge.',
            value: '3.4V (Mains) / 3.4V (Inv)',
          },
          {
            component: 'Pin 4 (CHARGING AMP SENSE)',
            function: 'Charging current sensing input from CT / shunt.',
            value: '0V (Mains) / 0V (Inv)',
          },
          {
            component: 'Pin 5 (OVERLOAD SENSING 1)',
            function: 'Current sense amplifier input for overload trip detection.',
            value: '0V (Mains) / 0V (Inv)',
          },
          {
            component: 'Pin 6 (UPS ON/OFF SW)',
            function: 'Front panel ON/OFF push switch input.',
            value: '5V (Mains) / 0V (Inv)',
          },
          {
            component: 'Pin 7 (THERMISTOR)',
            function: 'Heatsink thermal sensor input for overheat protection.',
            value: '0V (Mains) / 0V (Inv)',
          },
          {
            component: 'Pin 8 (GND)',
            function: 'Digital ground reference connection.',
            value: '0V (Ground)',
          },
          {
            component: 'Pin 9 & 10 (CRYSTAL)',
            function: 'Clock oscillator crystal inputs for 50Hz timebase generation.',
            value: '2.4V (Mains) / 2.4V (Inv)',
          },
          {
            component: 'Pin 11 (RELAY 1 DRIVE)',
            function: 'Input changeover relay driver trigger output.',
            value: '0V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 12 (LOW BATT LED)',
            function: 'Front panel Low Battery LED driver output.',
            value: '0V (Normal) / 4.5V (Active)',
          },
          {
            component: 'Pin 13 (OVERLOAD LED)',
            function: 'Front panel Overload warning LED output.',
            value: '0V (Normal) / 4.5V (Active)',
          },
          {
            component: 'Pin 14 (CHARGING LED)',
            function: 'Battery Charging indicator LED output.',
            value: '0V (Idle) / 4.5V (Active)',
          },
          {
            component: 'Pin 15 (MAINS LED)',
            function: 'Mains ON green indicator LED output.',
            value: '5V (Mains) / 0V (Inv)',
          },
          {
            component: 'Pin 16 (INV ON LED)',
            function: 'Inverter Backup ON indicator LED output.',
            value: '0V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 17 (BUZZER DRIVE)',
            function: 'Audio alarm buzzer driver output.',
            value: '5V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 18 (AC FUSE BLOWN)',
            function: 'AC Input glass fuse monitoring feedback input.',
            value: '5V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 19 (GND)',
            function: 'Internal chip logic ground.',
            value: '0V (Ground)',
          },
          {
            component: 'Pin 20 (VCC +5V)',
            function: 'Main +5V regulated DC power supply from 7805 regulator.',
            value: '5V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 21 (OVERLOAD SENSE 2)',
            function: 'Secondary peak current sensing comparator input.',
            value: '5V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 22 (AC VOLT SENSING)',
            function: 'AC Line voltage level sensing input for high/low voltage cut-off.',
            value: '2.5V (Mains) / 5V (Inv)',
          },
          {
            component: 'Pin 23 (OUTPUT RELAY)',
            function: 'Output Changeover relay trigger drive output.',
            value: '0V (Mains) / 4.9V (Inv)',
          },
          {
            component: 'Pin 24 (FAN DRIVE)',
            function: 'Cooling fan speed/ON-OFF trigger output to driver transistor.',
            value: '0V (OFF) / 4.9V (ON)',
          },
          {
            component: 'Pin 25 (UPS/INV MODE)',
            function: 'Narrow/Wide input voltage window selection switch input.',
            value: '5V (UPS) / 0V (INV)',
          },
          {
            component: 'Pin 26 (CHARGING SIGNAL)',
            function: 'SCR / Optocoupler / MOSFET charging trigger pulse output.',
            value: '2V (Mains) / 0V (Inv)',
          },
          {
            component: 'Pin 27 & 28 (SWITCHING)',
            function: 'Channel A & B 50Hz PWM switching gate drive outputs to driver transistors.',
            value: '0V (Mains) / 1.8V (Inv)',
          },
        ],
      },

      possibleCauses: [
        {
          cause: 'Pin 20 VCC +5V missing ya low',
          explanation: '7805 regulator kharab hone par MCU start nahi hota aur sabhi pins dead ho jati hain.',
        },
        {
          cause: 'Pin 1 Reset voltage drop (<4.5V)',
          explanation: 'Reset capacitor leak hone par MCU continuous reset loop mein phans jata hai.',
        },
        {
          cause: 'Pin 9/10 Crystal oscillator dead',
          explanation: 'Crystal kharab hone par 50Hz clock generate nahi hoti aur Pin 27/28 output dead rehti hai.',
        },
        {
          cause: 'Pin 2 ya Pin 22 AC sensing resistor open',
          explanation: 'Mains sensing divider resistor open hone par inverter mains sense nahi karta.',
        },
        {
          cause: 'Pin 27/28 gate drive transistor short',
          explanation: 'Driver transistor short hone se switching pulse ground ho jati hai.',
        },
        {
          cause: 'Pin 26 charging line optocoupler / driver damaged',
          explanation: 'Charging trigger pulse gate circuit tak nahi pahunch pati.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Power & Clock Verification',
          explanation: 'Multimeter DC par Pin 20 (+5V), Pin 1 (+5V), aur Pin 9/10 (2.4V) check karein.',
        },
        {
          step: 2,
          title: 'Battery & Mains Sensing Test',
          explanation: 'Pin 3 par 3.4V (12V Battery) aur Pin 2 par 1.4V (Mains on) check karein.',
        },
        {
          step: 3,
          title: 'Switching Gate Drive Test',
          explanation: 'Inverter mode mein Pin 27 aur Pin 28 dono par exactly 1.8V DC measure karein.',
        },
        {
          step: 4,
          title: 'Charging PWM Output Test',
          explanation: 'Mains mode mein Pin 26 par 2.0V DC charging drive check karein.',
        },
        {
          step: 5,
          title: 'Relay & Fan Drive Verification',
          explanation: 'Pin 23 (4.9V in Inv) aur Pin 24 (4.9V on Load) par switching logic confirm karein.',
        },
      ],

      circuitFlow:
        'AC Sensing (Pin 2: 1.4V / Pin 22: 2.5V) ➔ Su-Kam Microprocessor Core (5V VCC / 2.4V Crystal) ➔ Switching Drive (Pin 27/28: 1.8V) ➔ Charging PWM (Pin 26: 2V) ➔ Relays (Pin 11/23: 4.9V)',

      importantNote:
        'Su-Kam Shark SMD/DIP board mein Pin 27 aur Pin 28 dono ka output voltage barabar (1.8V DC) hona zaroori hai. Agar ek pin 1.8V aur dusri 0V ho to MOSFET blast ho sakte hain.',

      diagnosis:
        'Pin 20 = 5V, Pin 1 = 5V, Pin 9/10 = 2.4V confirm karein. Inverter mode mein Pin 27 & 28 par 1.8V aur Mains mode mein Pin 26 par 2V aana chahiye.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MICROTEK 24x7 HYBRID SERIES
  // ═══════════════════════════════════════════════════════════════════════════
  'microtek-24x7': {
    'microcontroller-pin-details': {
      id: 'microcontroller-pin-details',
      title: 'Microtek 24x7 Microcontroller 20-Pin Details & Voltage Guide',
      subtitle:
        'Microtek 24x7 Hybrid Inverter (20 Pin Non-SMD DIP IC) complete pin functions and live operating voltages across Backup & Mains modes.',
      icon: '🎛️',
      severity: 'high',

      symptoms: [
        'Inverter on nahi ho raha ya front display bilkul dead hai',
        'Mains aane par charging indicator nahi chalta ya changeover fail hota hai',
        'MOSFET drive pulses (Pins 7, 8, 19, 20) missing hone par output zero rehti hai',
        'False overload ya low battery alarm continuously trigger hota hai',
      ],

      basicChecks: [
        'Pin 5 (+VCC: 5.0V) aur Pin 3 (+VCC LM317: 4.9V) supply check karein',
        'Pin 4 (Ground: 0V) continuity check karein',
        'Pin 1 (Reset Volt: 5.0V in Backup / 2.5V in Mains) check karein',
        'Pin 10 (Battery Level Sense: 4.0V) check karein',
        'Pin 18 (Mains Sense: 2.5V in Mains mode) check karein',
        'Pin 13 (Chg Current Sense: 0.9V in Mains mode) check karein',
        'MOSFET Gate Drive Voltages: Pins 7 & 8 (1.5V Backup) aur Pins 19 & 20 (3.5V Backup) check karein',
      ],

      technicalExplanation: {
        title: 'Microtek 24x7 20-Pin DIP IC Pinout & Voltage Chart',
        explanation:
          'Microtek 24x7 Hybrid inverter mein 20-pin dual inline package (DIP) IC use hota hai. Sabhi pins ke live operating voltages Backup Mode aur Mains Mode mein niche table mein diye gaye hain:',
        components: [
          { component: 'Pin 1: RESET VOLT', function: 'Microcontroller reset and startup monitoring', value: '5.0V Backup / 2.5V Mains' },
          { component: 'Pin 2: FAN SUPPLY', function: 'Cooling fan speed and on/off drive signal', value: '0.5V (Both modes)' },
          { component: 'Pin 3: +VCC SUPPLY (LM317)', function: 'Regulated LM317 analog supply rail', value: '4.9V (Both modes)' },
          { component: 'Pin 4: GROUND', function: 'Common Circuit Ground', value: '0.0V (Both modes)' },
          { component: 'Pin 5: +VCC SUPPLY', function: 'Main digital 5V power rail', value: '5.0V (Both modes)' },
          { component: 'Pin 6: RANGE SELECTION', function: 'Wide / Narrow input voltage range selection switch', value: '4.9V / 0V (Both modes)' },
          { component: 'Pin 7: MOSFET DRIVE', function: 'Low side MOSFET channel 1 gate drive pulse', value: '1.5V (Backup mode)' },
          { component: 'Pin 8: MOSFET DRIVE', function: 'Low side MOSFET channel 2 gate drive pulse', value: '1.5V (Backup mode)' },
          { component: 'Pin 9: CHG. HIGH/LOW SELECTION', function: 'Battery charging current high/low selector switch', value: '5.0V / 0V (Both modes)' },
          { component: 'Pin 10: BATTERY LEVEL SENSE', function: 'Battery DC voltage monitoring line', value: '4.0V (Both modes)' },
          { component: 'Pin 11: OVERLOAD LED', function: 'Overload warning LED drive', value: '4.5V (Backup mode)' },
          { component: 'Pin 12: LOW BATTERY LED', function: 'Battery low warning LED drive', value: '4.5V (Backup mode)' },
          { component: 'Pin 13: CHG. CURRENT SENSE', function: 'Battery charging current shunt sense', value: '0.9V (Mains mode)' },
          { component: 'Pin 14: OVERLOAD SENSE (LM358)', function: 'Op-amp LM358 current sensing feedback', value: '4.5V (Backup mode)' },
          { component: 'Pin 15: CHG. LED', function: 'Mains charging status LED drive', value: '4.5V (Mains mode)' },
          { component: 'Pin 16: UPS LED / RELAY DRIVE', function: 'Changeover relay driver signal', value: '4.5V (Backup mode)' },
          { component: 'Pin 17: OVERLOAD SENSE', function: 'Fast peak current overload monitoring', value: '4.5V (Backup mode)' },
          { component: 'Pin 18: MAINS SENSE', function: 'Mains AC presence sensing input', value: '2.5V (Mains mode)' },
          { component: 'Pin 19: MOSFET DRIVE', function: 'High side MOSFET channel 1 gate drive pulse', value: '3.5V (Backup mode)' },
          { component: 'Pin 20: MOSFET DRIVE', function: 'High side MOSFET channel 2 gate drive pulse', value: '3.5V (Backup mode)' },
        ],
      },

      possibleCauses: [
        {
          cause: 'Pin 3 / Pin 5 VCC supply drop (<4.5V)',
          explanation: 'LM317 ya 7805 regulator faulty hone se microcontroller properly initiate nahi hota.',
        },
        {
          cause: 'Pin 7, 8 (1.5V) ya Pin 19, 20 (3.5V) drive missing',
          explanation: 'Gate drive transistor short hone se switching signal ground ho jata hai.',
        },
        {
          cause: 'Pin 18 Mains sense missing (<2.0V)',
          explanation: 'Mains sensing transformer ya divider resistors open hone se inverter mains detect nahi karta.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'VCC Power Rails Verification',
          explanation: 'Pin 5 par 5.0V aur Pin 3 par 4.9V check karein.',
        },
        {
          step: 2,
          title: 'MOSFET Drive Pulses Test',
          explanation: 'Backup mode mein Pin 7 & 8 par 1.5V DC aur Pin 19 & 20 par 3.5V DC measure karein.',
        },
        {
          step: 3,
          title: 'Battery & Mains Sensing Check',
          explanation: 'Pin 10 par 4.0V battery sense aur Pin 18 par 2.5V mains sense confirm karein.',
        },
        {
          step: 4,
          title: 'Relay & LED Outputs Test',
          explanation: 'Pin 16 relay drive (4.5V) aur display LED pins (11, 12, 15) verify karein.',
        },
      ],

      circuitFlow:
        'LM317 / 5V Reg ➔ VCC (Pins 3, 5: 5V) ➔ Sensing (Pin 10 Batt: 4V, Pin 18 Mains: 2.5V) ➔ Micro IC ➔ Gate Drives (Pins 7, 8: 1.5V / Pins 19, 20: 3.5V) ➔ Relay Drive (Pin 16: 4.5V)',
      importantNote:
        'Microtek 24x7 20-Pin DIP IC mein high-side aur low-side gate voltages alag hoti hain (1.5V vs 3.5V). Dono pairs match hone chahiye.',
      diagnosis:
        'Power Rails OK hone par agar backup mode mein Pin 7/8 par 1.5V aur Pin 19/20 par 3.5V na mile to Micro IC ya gate driver transistors check karein.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MICROTEK SQUARE WAVE (JM1250 / CLASSIC SERIES)
  // ═══════════════════════════════════════════════════════════════════════════
  'microtek-square-wave': {
    'microcontroller-pin-details': {
      id: 'microcontroller-pin-details',
      title: 'Microtek Square Wave Inverter Micro IC 28-Pin Details',
      subtitle:
        'Microtek Square Wave Inverter (JM1250 / Classic Series) 28-Pin Micro IC complete operating voltages and pin functions in Mains and Inverter modes.',
      icon: '🎛️',
      severity: 'high',

      symptoms: [
        'Inverter start nahi hota ya output bilkul dead hai',
        'Switching outputs (Pins 27 & 28) par 1.8V drive pulse missing hai',
        'Mains line aane par bhi changeover relay nahi click karti',
        'Charging start nahi hoti (Pin 26 par 2V PWM signal missing)',
      ],

      basicChecks: [
        'Pin 20 (+5V VCC Supply) aur Pin 8, Pin 19 (Ground) check karein',
        'Pin 1 (Reset: 5V Mains / 5V Inv) check karein',
        'Pin 9 & 10 Crystal Oscillator (2.4V Mains / 2.4V Inv) check karein',
        'Pin 2 (Mains Sensing: 1.4V Mains / 0V Inv) check karein',
        'Pin 3 (Battery Level Sense: 3.4V Mains / 4.0V Inv) check karein',
        'Pin 27 & 28 Switching Signal Output (0V Mains / 1.8V Inv) check karein',
        'Pin 26 Charging Signal Output (2.0V Mains / 0V Inv) check karein',
        'Pin 23 Output Relay Drive (0V Mains / 4.9V Inv) check karein',
      ],

      technicalExplanation: {
        title: 'Microtek Square Wave 28-Pin Micro IC Details',
        explanation:
          'Microtek Square Wave inverter series mein 28-pin microcontroller switching, sensing, charging aur protection control karta hai. Yahan sabhi 28 pins ke operating voltages Mains Mode / Inverter Mode format mein diye gaye hain:',
        components: [
          { component: 'Pin 1: RESET', function: 'Master reset pin', value: '5V (5V)' },
          { component: 'Pin 2: MAINS SENSING INPUT', function: 'Mains AC voltage sensing', value: '1.4V (0V)' },
          { component: 'Pin 3: BATTERY LEVEL SENSING INPUT', function: 'Battery voltage sensing line', value: '3.4V (4V)' },
          { component: 'Pin 4: CHARGING AMP SENSING INPUT', function: 'Charging current sensing input', value: '0V (0V)' },
          { component: 'Pin 5: OVERLOAD SENSING INPUT', function: 'Overload trip comparator input', value: '0V (0V)' },
          { component: 'Pin 6: BUZZER DRIVE OUTPUT', function: 'Alarm buzzer trigger output', value: '5V (5V)' },
          { component: 'Pin 7: MAINS HIGH CUT SENSE', function: 'High voltage cutoff sensing', value: '1V (0V)' },
          { component: 'Pin 8: GND', function: 'Circuit Ground', value: '0V (0V)' },
          { component: 'Pin 9: [CRYSTAL] OSCILLATOR', function: 'Crystal oscillator input 1', value: '2.4V (2.4V)' },
          { component: 'Pin 10: [CRYSTAL] OSCILLATOR', function: 'Crystal oscillator input 2', value: '2.4V (2.4V)' },
          { component: 'Pin 11: MAINS LED CONNECTION', function: 'Mains indication LED', value: '5V (0V)' },
          { component: 'Pin 12: BATT CHARGING LED OUT', function: 'Battery charging indication LED', value: '4.5V (0V)' },
          { component: 'Pin 13: INV ON LED CONNECTION OUT', function: 'Inverter ON status LED', value: '0V (4.5V)' },
          { component: 'Pin 14: LOW BATT LED CONNECTION OUT', function: 'Low battery warning LED', value: '0V (4.5V)' },
          { component: 'Pin 15: OVERLOAD LED CONNECTION OUT', function: 'Overload warning LED', value: '0V (5V)' },
          { component: 'Pin 16: AC FUSE BLOWN SENSING', function: 'AC input fuse status sensing', value: '0V (5V)' },
          { component: 'Pin 17: UPS ON/OFF SW', function: 'Front panel ON/OFF switch sense', value: '5V (0V)' },
          { component: 'Pin 18: CHARGING H/L SETTING SW', function: 'High/Low charging current switch', value: '0V (5V)' },
          { component: 'Pin 19: GND', function: 'Circuit Ground', value: '0V (0V)' },
          { component: 'Pin 20: VCC +5V SUPPLY', function: 'Main +5V regulated power rail', value: '5V (5V)' },
          { component: 'Pin 21: OVER LOAD SENSING INPUT 2', function: 'Secondary overload trip input', value: '5V (5V)' },
          { component: 'Pin 22: AC VOLT MAIN SENSING INPUT', function: 'AC mains voltage level tracking', value: '2.5V (5V)' },
          { component: 'Pin 23: OUTPUT RELAY DRIVE OUT', function: 'Output changeover relay coil driver', value: '0V (4.9V)' },
          { component: 'Pin 24: FAN DRIVE OUTPUT', function: 'Cooling fan motor driver pulse', value: '0V OFF / 4.9V ON' },
          { component: 'Pin 25: UPS/INV MODE SW', function: 'UPS Mode / Inverter Mode selector switch', value: '5V (0V INV)' },
          { component: 'Pin 26: CHARGING SIGNAL OUTPUT', function: 'Battery charging SCR/triac trigger pulse', value: '2V (0V)' },
          { component: 'Pin 27: SWITCHING SIGNAL OUTPUT', function: 'Channel 1 MOSFET switching drive pulse', value: '0V (1.8V)' },
          { component: 'Pin 28: SWITCHING SIGNAL OUTPUT', function: 'Channel 2 MOSFET switching drive pulse', value: '0V (1.8V)' },
        ],
      },

      possibleCauses: [
        {
          cause: 'Pin 20 (+5V) missing',
          explanation: '7805 regulator dead hone se microcontroller bilkul on nahi hota.',
        },
        {
          cause: 'Pin 9/10 Crystal oscillator dead',
          explanation: '50Hz clock generation band hone se Pin 27 & 28 par switching drive nahi aati.',
        },
        {
          cause: 'Pin 27/28 switching voltage imbalance (one is 1.8V, other is 0V)',
          explanation: 'Driver transistor short hone se MOSFETs destroy ho sakte hain.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Power & Clock Check',
          explanation: 'Pin 20 (+5V), Pin 1 (+5V) aur Pin 9/10 (2.4V) test karein.',
        },
        {
          step: 2,
          title: 'Switching Gate Pulses Test',
          explanation: 'Inverter mode mein Pin 27 aur Pin 28 dono par exactly 1.8V DC confirm karein.',
        },
        {
          step: 3,
          title: 'Charging PWM Output Test',
          explanation: 'Mains mode mein Pin 26 par 2.0V DC charging drive measure karein.',
        },
        {
          step: 4,
          title: 'Relay & Sensing Verification',
          explanation: 'Pin 23 relay drive (4.9V in Inv) aur Pin 2 mains sensing (1.4V in Mains) test karein.',
        },
      ],

      circuitFlow:
        'Mains Sense (Pin 2: 1.4V) + Batt Sense (Pin 3: 3.4V) ➔ Micro IC (5V / 2.4V Crystal) ➔ Switching Drive (Pin 27/28: 1.8V) ➔ Charging PWM (Pin 26: 2V) ➔ Relay Drive (Pin 23: 4.9V)',
      importantNote:
        'Microtek Square Wave model mein Pin 27 aur Pin 28 dono par 1.8V balance voltage hona essential hai. Kisi bhi ek pin par 0V ho to inverter chalu mat karein.',
      diagnosis:
        'VCC 5V and Crystal 2.4V OK hone par inverter mode mein Pin 27 & 28 par 1.8V aani chahiye. Agar missing ho to IC replace karein.',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SU-KAM SHINY SINE WAVE
  // ═══════════════════════════════════════════════════════════════════════════
  'sukam-shiny-inverter': {
    'changeover': {
      id: 'changeover',
      title: 'Mains Changeover & Sensing Circuit (Pin 2)',
      subtitle:
        'Su-Kam Shiny Sine Wave inverter mein Mains Sensing aur Changeover circuit: 23-0-23/400V Step Down Transformer, D9 & D16 (M7) Bridge, R52 (15kΩ), R73 (1kΩ), C21 (0.47µF/63V) se Micro IC Pin 2 (~1.6V DC).',
      icon: '🔄',
      severity: 'high',

      symptoms: [
        'Mains 230V AC aane par bhi inverter backup mode se switch nahi karta (Changeover fail)',
        'Mains connect hone par continuous beeping ya flashing indicator aata hai',
        'Micro IC ke Pin 2 par expected 1.6V DC missing hai ya 0V aa rahi hai',
        'D9 ya D16 diode short hone par transformer secondary heat ho jati hai',
      ],

      basicChecks: [
        '230V AC Mains (N, FB) lines par input voltage measure karein',
        '23-0-23 / 400V transformer secondary par AC voltage check karein',
        'D9 aur D16 (M7) rectifier diodes check karein (DC output ~10V)',
        'R52 (15kΩ) resistor ki resistance test karein',
        'R73 (1kΩ) resistor ki resistance test karein',
        'C21 (0.47µF / 63V) electrolytic filter capacitor par short circuit ya leakage check karein',
        'Micro IC Pin 2 par exact ~1.6V DC sensing voltage measure karein',
      ],

      technicalExplanation: {
        title: 'Su-Kam Shiny Changeover Circuit (Pin 2 Diagram)',
        explanation:
          'Su-Kam Shiny Sine Wave model mein mains sensing dedicated step-down transformer se shuru hoti hai: 1) 230V AC Mains (N, FB) ko 23-0-23 / 400V center-tapped transformer step-down karta hai. 2) Secondary ke dono ends ko D9 aur D16 (M7) rectifier diodes DC mein convert karte hain (~10V DC). 3) Yeh 10V DC voltage R52 (15kΩ) aur R73 (1kΩ) ke divider network se divide hokar ~1.6V DC generate karti hai. 4) C21 (0.47µF / 63V) filter capacitor voltage ko filter aur stabilize karta hai. 5) Yeh ~1.6V DC signal Micro IC ke Pin 2 (Mains Sense Pin) tak pahunchti hai jisse MCU turant changeover command execute karta hai.',
        components: [
          {
            component: 'Step Down Transformer',
            function: '230V AC Mains (N-FB) ko step-down karta hai (Center tapped 23-0-23).',
            value: '23-0-23 / 400V',
          },
          {
            component: 'D9 & D16 (M7)',
            function: 'Secondary AC ko DC (~10V) mein convert karne wale rectifier diodes.',
            value: 'M7 (1N4007 SMD)',
          },
          {
            component: 'R52 (15kΩ)',
            function: 'Upper divider resistor (~10V se voltage drop karta hai).',
            value: '15kΩ Resistor',
          },
          {
            component: 'R73 (1kΩ)',
            function: 'Lower divider resistor to generate ~1.6V DC signal.',
            value: '1kΩ Resistor',
          },
          {
            component: 'C21 (0.47µF / 63V)',
            function: 'DC sensing voltage filter capacitor (stable DC level provide karta hai).',
            value: '0.47µF / 63V Electrolytic',
          },
          {
            component: 'Micro IC Pin 2',
            function: 'Microcontroller Mains Sensing Input Pin.',
            value: 'Pin 2 (~1.6V DC)',
          },
        ],
      },

      possibleCauses: [
        {
          cause: '23-0-23 Transformer primary / secondary winding open',
          explanation: 'Transformer damage hone se secondary par koi AC voltage generate nahi hoti.',
        },
        {
          cause: 'D9 ya D16 (M7) diode short / open',
          explanation: 'Diode fail hone par ~10V DC supply interrupt ho jati hai.',
        },
        {
          cause: 'R52 (15kΩ) ya R73 (1kΩ) resistor open',
          explanation: 'Divider circuit break hone se Pin 2 tak 1.6V signal nahi pahunch pata.',
        },
        {
          cause: 'C21 (0.47µF / 63V) capacitor short to ground',
          explanation: 'Capacitor short hone par Pin 2 voltage 0V ho jati hai.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'Transformer Input & Output Check',
          explanation: 'Primary par 230V AC aur secondary par 23V AC measure karein.',
        },
        {
          step: 2,
          title: 'D9 & D16 Rectifier Diodes Test',
          explanation: 'Multimeter diode mode par D9 aur D16 diodes ka forward voltage (~0.6V) test karein aur output par 10V DC verify karein.',
        },
        {
          step: 3,
          title: 'R52 (15kΩ) & R73 (1kΩ) Values Test',
          explanation: 'Power off karke R52 (15kΩ) aur R73 (1kΩ) resistors ki value confirm karein.',
        },
        {
          step: 4,
          title: 'C21 Capacitor & Pin 2 Voltage Check',
          explanation: 'C21 (0.47µF) check karein aur Micro IC Pin 2 par exactly ~1.6V DC confirm karein.',
        },
      ],

      circuitFlow:
        '230V AC (N, FB) ➔ 23-0-23/400V Transformer ➔ D9, D16 (M7) Diodes (~10V DC) ➔ R52 (15kΩ) + R73 (1kΩ) Divider ➔ C21 (0.47µF/63V Filter) ➔ Micro IC Pin 2 (~1.6V DC)',
      importantNote:
        'Su-Kam Shiny inverter mein changeover issue aane par sabse pehle Micro IC Pin 2 par 1.6V DC check karein. Agar 0V hai to D9/D16 ya R52 check karein.',
      diagnosis:
        'Mains 230V aane par agar Pin 2 par 1.6V DC aa rahi hai lekin changeover nahi ho raha to Relay drive transistor ya MCU fault hai.',
    },

    'microcontroller-pin-details': {
      id: 'microcontroller-pin-details',
      title: 'Su-Kam Shiny Sine Wave PIC16F72 28-Pin Details & Voltage Guide',
      subtitle:
        'Su-Kam Shiny Pure Sine Wave Inverter PIC16F72 (28-Pin) complete operating voltages, pinouts, and test procedures.',
      icon: '🎛️',
      severity: 'high',

      symptoms: [
        'Inverter completely dead hai ya switch press karne par response nahi deta',
        'MOSFET gate drives (Pins 25, 26, 27, 28) abnormal hain (1.3V / 3.5V)',
        'Mains line detect nahi ho rahi (Pin 2: 1.4V / Pin 22 Zero-Cross: 5/2.5V)',
        'Overheat (Pin 11) ya Overload (Pin 4/21) false trigger ho raha hai',
      ],

      basicChecks: [
        'Pin 20 (+5V VCC Supply) aur Pin 8, Pin 19 (Ground) check karein',
        'Pin 1 (Reset: 5.0V) check karein',
        'Pin 9 & Pin 10 (Crystal Oscillator) check karein',
        'Pin 2 (Mains Sense: 1.4V) & Pin 22 (Zero Cross Sense: 5V/2.5V) check karein',
        'Pin 3 (Batt Sense: 3.8V) & Pin 5 (Feedback: 1.5V) check karein',
        'Pin 4 (3.0V Overload) & Pin 21 (Overload 5V) check karein',
        'Switching Gate Drive Voltages: Pins 25 & 27 (1.3V Drive) aur Pins 26 & 28 (3.5V Drive) check karein',
      ],

      technicalExplanation: {
        title: 'Su-Kam Shiny Sine Wave PIC16F72 28-Pin Details',
        explanation:
          'Su-Kam Shiny Pure Sine Wave inverter mein PIC16F72 microcontroller 28 pins ke through entire power inverter system ko control karta hai. Yahan complete pinout aur exact working voltages listed hain:',
        components: [
          { component: 'Pin 1: Reset', function: 'Microcontroller Master Reset', value: '5.0V' },
          { component: 'Pin 2: Mains Sense', function: 'Mains AC changeover sensing input (from D9/D16 divider)', value: '1.4V' },
          { component: 'Pin 3: Batt Sense', function: 'Battery voltage monitoring input', value: '3.8V' },
          { component: 'Pin 4: Overload', function: 'Overload current detection input', value: '3.0V' },
          { component: 'Pin 5: Feedback', function: 'AC output voltage regulation feedback', value: '1.5V' },
          { component: 'Pin 6: Buzz', function: 'Buzzer audio alarm drive output', value: '4.0V–9.0V' },
          { component: 'Pin 7: CHG Sense', function: 'Charging current sensing line', value: '0.0V–9.0V' },
          { component: 'Pin 8: Ground', function: 'Circuit Common Ground', value: '0.0V' },
          { component: 'Pin 9: Crystal', function: 'Oscillator crystal clock input 1', value: 'Oscillator Clock' },
          { component: 'Pin 10: Crystal', function: 'Oscillator crystal clock input 2', value: 'Oscillator Clock' },
          { component: 'Pin 11: Over Heat', function: 'Heatsink thermal sensor input', value: '5.0V' },
          { component: 'Pin 12: Fan Drive', function: 'Cooling fan motor driver signal', value: '5.0V' },
          { component: 'Pin 13: Led Overload', function: 'Overload warning LED drive', value: '5.0V' },
          { component: 'Pin 14: Low Batt Led', function: 'Battery low warning LED drive', value: '5.0V' },
          { component: 'Pin 15: Main Led', function: 'Mains present LED drive', value: '5.0V' },
          { component: 'Pin 16: CHG Led', function: 'Battery charging LED drive', value: '5.0V' },
          { component: 'Pin 17: Hi / Low CHG', function: 'High / Low charging mode switch', value: 'Switch Input' },
          { component: 'Pin 18: UPS / INV', function: 'UPS mode / Inverter mode switch', value: 'Switch Input' },
          { component: 'Pin 19: Ground', function: 'Circuit Common Ground', value: '0.0V' },
          { component: 'Pin 20: +5V', function: 'Main regulated +5V power rail (VCC)', value: '5.0V' },
          { component: 'Pin 21: Overload', function: 'Secondary overload trip input', value: '5.0V' },
          { component: 'Pin 22: Zero Cross Sense', function: 'Mains AC sinusoidal zero cross detector', value: '5.0V / 2.5V' },
          { component: 'Pin 23: UPS Led + Relay Drive', function: 'UPS status LED and changeover relay drive', value: '5.0V' },
          { component: 'Pin 24: ON/OFF', function: 'Power switch input', value: '5.0V / 0.0V' },
          { component: 'Pin 25: Drive', function: 'MOSFET switching drive channel 1', value: '1.3V' },
          { component: 'Pin 26: Drive', function: 'MOSFET switching drive channel 2', value: '3.5V' },
          { component: 'Pin 27: Drive', function: 'MOSFET switching drive channel 3', value: '1.3V' },
          { component: 'Pin 28: Drive', function: 'MOSFET switching drive channel 4', value: '3.5V' },
        ],
      },

      possibleCauses: [
        {
          cause: 'Pin 20 (+5V) missing',
          explanation: '7805 regulator failure se PIC16F72 microcontroller start nahi hota.',
        },
        {
          cause: 'Pin 25/27 (1.3V) ya Pin 26/28 (3.5V) drive missing',
          explanation: 'Driver transistors short hone se sine wave generation interrupt ho jati hai.',
        },
        {
          cause: 'Pin 2 Mains Sense (1.4V) missing',
          explanation: 'Changeover transformer ya D9/D16 bridge cut hone se mains sense nahi hoti.',
        },
      ],

      repairProcedure: [
        {
          step: 1,
          title: 'VCC (+5V) & Reset Test',
          explanation: 'Pin 20 par +5.0V aur Pin 1 par +5.0V verify karein.',
        },
        {
          step: 2,
          title: 'Mains & Zero Cross Sense Test',
          explanation: 'Pin 2 par 1.4V aur Pin 22 par 5V/2.5V zero cross signal check karein.',
        },
        {
          step: 3,
          title: 'MOSFET Gate Drives Test',
          explanation: 'Pins 25 & 27 par 1.3V DC aur Pins 26 & 28 par 3.5V DC drive pulses measure karein.',
        },
        {
          step: 4,
          title: 'Relay Drive (Pin 23) Test',
          explanation: 'Pin 23 par 5.0V relay switching command check karein.',
        },
      ],

      circuitFlow:
        'Mains Sense (Pin 2: 1.4V) + Zero Cross (Pin 22: 5V/2.5V) ➔ PIC16F72 Microcontroller ➔ Gate Drives (Pins 25/27: 1.3V & Pins 26/28: 3.5V) ➔ Relay Drive (Pin 23: 5V) ➔ Display LEDs (Pins 13-16: 5V)',
      importantNote:
        'Su-Kam Shiny mein 4 gate drive pins hoti hain: Pins 25 & 27 par 1.3V aur Pins 26 & 28 par 3.5V hona chahiye. Agar voltages mismatch hon to gate drive transistors check karein.',
      diagnosis:
        'Power Rails 5V OK hone par agar switching pins (25, 26, 27, 28) par 1.3V/3.5V nahi milti to MCU IC ya gate circuitry replace karein.',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────────────────────────────────

import { getTranslatedFault } from '@/data/faultTranslationsHi';

/**
 * Get all faults for a given inverter as an array (for list rendering).
 * Attaches circuit diagrams from assets when available.
 */
export function getFaultsForInverter(
  inverterId: string,
  language = 'en',
): InverterFaultDetail[] {
  const map = inverterFaultsMap[inverterId];
  if (!map) return [];

  const list: InverterFaultDetail[] = [];

  for (const fault of Object.values(map)) {
    if (!fault || !fault.id) continue;
    const diagram = getDiagramImage(inverterId, fault.id);
    const diagramImg = diagram ?? fault.diagramImage;

    // Only include faults that have real circuit diagram assets
    if (!diagramImg) continue;

    const faultWithDiagram: InverterFaultDetail = {
      ...fault,
      diagramImage: diagramImg,
    };

    const translated = getTranslatedFault(
      inverterId,
      faultWithDiagram,
      language,
    );

    if (translated) {
      list.push(translated);
    }
  }

  return list;
}

/**
 * Get a single fault by inverter + fault ID with optional language translation.
 */
export function getInverterFault(
  inverterId: string,
  faultId: string,
  language = 'en',
): InverterFaultDetail | undefined {
  if (!inverterId || !faultId) return undefined;
  const fault = inverterFaultsMap[inverterId]?.[faultId];
  if (!fault) return undefined;
  const diagram = getDiagramImage(inverterId, faultId);
  const faultWithDiagram = {
    ...fault,
    diagramImage: diagram ?? fault.diagramImage,
  };
  return getTranslatedFault(inverterId, faultWithDiagram, language);
} 