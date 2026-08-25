import { Fault } from '@/types/inverter';

export const faults: Fault[] = [
  {
    id: 'overload',
    title: 'Overload',
    subtitle: 'Inverter trips or shows overload',
    icon: '⚡',
    severity: 'high',

    symptoms: [
      'Overload indicator turns ON',
      'Inverter starts beeping',
      'Output switches OFF',
      'Inverter trips when load is connected',
      'Inverter works normally without heavy load',
    ],

    possibleCauses: [
      'Connected load is higher than inverter capacity',
      'Motor or compressor has high starting current',
      'Short circuit in connected appliance',
      'Internal power stage problem',
      'MOSFETs may be damaged',
    ],

    checks: [
      'Disconnect the connected appliances',
      'Restart the inverter',
      'Check whether the inverter starts without load',
      'Connect appliances one at a time',
      'Check the appliance that causes the trip',
    ],

    solution: [
      'Reduce the connected load',
      'Remove faulty appliances',
      'Check the inverter output stage if overload occurs without load',
      'Inspect MOSFETs and associated driver circuitry if required',
    ],

    components: [
      'MOSFET',
      'Gate driver',
      'Current sensing circuit',
      'Transformer',
      'Output relay',
    ],

    safety: [
      'Disconnect mains before opening the inverter.',
      'Do not test exposed mains-voltage circuitry without appropriate training and equipment.',
    ],
  },

  {
    id: 'low-battery',
    title: 'Low Battery',
    subtitle: 'Low battery warning or early shutdown',
    icon: '🔋',
    severity: 'medium',

    symptoms: [
      'Low battery indicator is ON',
      'Backup time is very short',
      'Inverter shuts down quickly',
      'Battery voltage drops rapidly under load',
    ],

    possibleCauses: [
      'Battery is discharged',
      'Battery capacity has reduced',
      'Battery terminals are loose',
      'Battery charging is incomplete',
      'Battery has a weak cell',
    ],

    checks: [
      'Check battery terminal connections',
      'Check battery voltage with a suitable meter',
      'Check voltage under load',
      'Check whether charging is occurring',
      'Inspect battery condition according to its manufacturer instructions',
    ],

    solution: [
      'Fully charge the battery',
      'Clean and tighten appropriate terminals',
      'Replace a failed battery when testing confirms it is defective',
      'Check the charging circuit if the battery does not charge correctly',
    ],

    components: [
      'Battery',
      'Battery terminals',
      'Charging circuit',
      'Fuse',
      'Battery sensing circuit',
    ],
  },

  {
    id: 'battery-dead',
    title: 'Battery Dead',
    subtitle: 'Battery cannot hold useful charge',
    icon: '🪫',
    severity: 'high',

    symptoms: [
      'Battery voltage appears normal at rest but collapses under load',
      'Very short backup time',
      'Inverter shuts down shortly after switching to backup',
      'Battery does not recover normal performance after charging',
    ],

    possibleCauses: [
      'Battery has reached end of life',
      'One or more cells are weak',
      'Long-term deep discharge',
      'Charging problem',
      'Loose or corroded connection',
    ],

    checks: [
      'Inspect the battery condition',
      'Measure voltage using an appropriate meter',
      'Check voltage while the inverter is supplying a known load',
      'Compare the result with the battery manufacturer specifications',
    ],

    solution: [
      'Replace the battery if testing confirms failure',
      'Correct charging problems before installing a replacement battery',
      'Ensure terminals and cables are correctly connected',
    ],

    components: [
      'Battery',
      'Battery cable',
      'Battery terminal',
      'Charging circuit',
    ],
  },

  {
    id: 'mosfet',
    title: 'MOSFET Problem',
    subtitle: 'Power switching stage failure',
    icon: '🔧',
    severity: 'critical',

    symptoms: [
      'Fuse may blow repeatedly',
      'Inverter may fail to start',
      'Output may be absent',
      'Excessive current may be observed',
      'MOSFETs may become excessively hot',
      'Inverter may shut down immediately',
    ],

    possibleCauses: [
      'Shorted MOSFET',
      'Open MOSFET',
      'Gate driver failure',
      'Excessive load',
      'Transformer or output-stage fault',
      'Insufficient cooling',
    ],

    checks: [
      'Disconnect the inverter from all power sources before component-level inspection',
      'Inspect the power PCB for visible damage',
      'Test MOSFETs using an appropriate component-testing procedure',
      'Inspect gate resistors and driver components',
      'Check for secondary damage before replacing a MOSFET',
    ],

    solution: [
      'Replace damaged MOSFETs with correctly specified components',
      'Find and correct the cause of the MOSFET failure',
      'Check gate-drive circuitry',
      'Check cooling and heatsink contact',
    ],

    components: [
      'MOSFET',
      'Gate resistor',
      'Gate driver',
      'Heatsink',
      'Transformer',
      'PCB',
    ],

    safety: [
      'High current battery systems can produce dangerous short-circuit currents.',
      'Mains-powered inverter circuits can contain lethal voltages.',
      'Perform component-level repair only if you are trained to work safely with these circuits.',
    ],
  },

  {
    id: 'relay',
    title: 'Relay Problem',
    subtitle: 'Mains / inverter transfer problem',
    icon: '🔌',
    severity: 'high',

    symptoms: [
      'Mains is available but output does not transfer correctly',
      'Relay repeatedly clicks',
      'Output disappears during changeover',
      'Inverter remains in backup mode',
      'Relay contacts may become damaged',
    ],

    possibleCauses: [
      'Relay coil failure',
      'Burnt relay contacts',
      'Driver transistor failure',
      'Loose PCB connection',
      'Control circuit problem',
    ],

    checks: [
      'Disconnect power before inspecting the relay circuit',
      'Inspect relay and PCB for visible damage',
      'Check the relay control circuit',
      'Check connections and solder joints',
      'Verify relay operation according to the inverter service documentation',
    ],

    solution: [
      'Replace a failed relay with the correct specification',
      'Repair the relay driver circuit if defective',
      'Repair damaged PCB connections',
    ],

    components: [
      'Relay',
      'Relay driver transistor',
      'Diode',
      'PCB',
      'Control IC',
    ],
  },

  {
    id: 'switch',
    title: 'Power Switch Problem',
    subtitle: 'Inverter does not respond to the ON/OFF switch',
    icon: '⏻',
    severity: 'medium',

    symptoms: [
      'Power switch does not turn the inverter ON',
      'No indicator lights',
      'Switch feels physically damaged',
      'Intermittent operation',
    ],

    possibleCauses: [
      'Damaged switch',
      'Loose wire',
      'Broken PCB connection',
      'Blown fuse',
      'Control-board problem',
    ],

    checks: [
      'Check the switch physically',
      'Inspect wiring',
      'Check the appropriate fuse',
      'Inspect the PCB connection',
    ],

    solution: [
      'Replace the switch if defective',
      'Repair loose or damaged wiring',
      'Repair the associated control circuit if required',
    ],

    components: [
      'Power switch',
      'Fuse',
      'Wiring',
      'Control PCB',
    ],
  },

  {
    id: 'fuse',
    title: 'Fuse Blown',
    subtitle: 'Fuse repeatedly fails',
    icon: '💥',
    severity: 'critical',

    symptoms: [
      'Inverter completely dead',
      'Fuse is visibly damaged',
      'Replacement fuse blows immediately',
      'No charging or backup operation',
    ],

    possibleCauses: [
      'Short circuit',
      'Damaged MOSFET',
      'Incorrect battery connection',
      'Power-stage failure',
      'Excessive current',
    ],

    checks: [
      'Disconnect all power sources',
      'Inspect the fuse',
      'Look for shorted power components',
      'Check battery polarity and wiring',
      'Do not repeatedly replace a fuse without finding the cause',
    ],

    solution: [
      'Use only the correct fuse specification',
      'Find and repair the underlying fault',
      'Inspect MOSFETs and other power components when appropriate',
    ],

    components: [
      'Fuse',
      'MOSFET',
      'Battery wiring',
      'Power PCB',
    ],
  },

  {
    id: 'charging',
    title: 'Battery Not Charging',
    subtitle: 'Battery charging circuit problem',
    icon: '🔋',
    severity: 'high',

    symptoms: [
      'Battery remains low despite mains being available',
      'Charging indicator does not operate normally',
      'Backup time decreases over time',
      'Battery voltage does not increase as expected',
    ],

    possibleCauses: [
      'Charging circuit failure',
      'Fuse problem',
      'Relay problem',
      'Battery failure',
      'Loose connection',
      'Control circuit fault',
    ],

    checks: [
      'Verify mains input according to the inverter specifications',
      'Inspect charging indicators',
      'Check battery connections',
      'Measure charging parameters only using the correct procedure and equipment',
      'Check the charger circuit if battery and connections are good',
    ],

    solution: [
      'Repair the charging circuit',
      'Replace failed components',
      'Replace the battery if it is confirmed defective',
      'Correct loose connections',
    ],

    components: [
      'Charger circuit',
      'Rectifier',
      'Relay',
      'Fuse',
      'Battery',
    ],
  },

  {
    id: 'short-circuit',
    title: 'Short Circuit',
    subtitle: 'Output short-circuit protection activated',
    icon: '⚠️',
    severity: 'critical',

    symptoms: [
      'Inverter immediately shuts down',
      'Alarm sounds',
      'Fuse may blow',
      'Output voltage disappears',
    ],

    possibleCauses: [
      'Shorted appliance',
      'Damaged output wiring',
      'MOSFET failure',
      'Output-stage failure',
      'PCB damage',
    ],

    checks: [
      'Disconnect the load',
      'Do not reconnect a suspected shorted appliance',
      'Inspect output wiring',
      'If the fault remains with no load, internal service may be required',
    ],

    solution: [
      'Remove the faulty load',
      'Repair damaged wiring',
      'Repair the inverter output stage when an internal fault is confirmed',
    ],
  },

  {
    id: 'overheating',
    title: 'Overheating',
    subtitle: 'Inverter becomes excessively hot',
    icon: '🌡️',
    severity: 'high',

    symptoms: [
      'Fan runs continuously',
      'Thermal warning',
      'Inverter shuts down after operating for some time',
      'Heatsink becomes excessively hot',
    ],

    possibleCauses: [
      'Excessive load',
      'Blocked ventilation',
      'Fan failure',
      'Poor heatsink contact',
      'Power MOSFET problem',
      'High ambient temperature',
    ],

    checks: [
      'Reduce the load',
      'Check ventilation',
      'Inspect the cooling fan',
      'Inspect heatsink mounting',
      'Check power-stage components if overheating occurs at low load',
    ],

    solution: [
      'Improve ventilation',
      'Repair or replace the cooling fan',
      'Correct excessive load',
      'Repair the power stage if defective',
    ],

    components: [
      'Cooling fan',
      'Heatsink',
      'MOSFET',
      'Temperature sensor',
    ],
  },

  {
    id: 'fan',
    title: 'Cooling Fan Problem',
    subtitle: 'Fan does not operate correctly',
    icon: '🌀',
    severity: 'medium',

    symptoms: [
      'Fan does not spin',
      'Fan makes unusual noise',
      'Inverter becomes hot',
      'Thermal protection activates',
    ],

    possibleCauses: [
      'Fan motor failure',
      'Dust or obstruction',
      'Fan driver problem',
      'Loose connector',
      'Temperature-control problem',
    ],

    checks: [
      'Disconnect power before inspection',
      'Check for physical obstruction',
      'Inspect the connector',
      'Check fan operation according to the service procedure',
    ],

    solution: [
      'Clean the cooling path',
      'Replace a failed fan',
      'Repair the fan control circuit if necessary',
    ],
  },

  {
    id: 'no-output',
    title: 'No AC Output',
    subtitle: 'Inverter is ON but no output is available',
    icon: '🔌',
    severity: 'critical',

    symptoms: [
      'Inverter appears ON',
      'No AC output',
      'Output indicator may remain OFF',
      'Connected appliance does not operate',
    ],

    possibleCauses: [
      'Output relay failure',
      'MOSFET failure',
      'Fuse problem',
      'Transformer problem',
      'Protection circuit activated',
      'Control PCB failure',
    ],

    checks: [
      'Check whether the inverter reports a fault',
      'Disconnect the load',
      'Check the appropriate protection devices',
      'Inspect the output stage only when safely isolated',
    ],

    solution: [
      'Correct the identified internal fault',
      'Replace failed components with correctly specified parts',
      'Refer to the specific inverter service documentation for component-level repair',
    ],

    components: [
      'MOSFET',
      'Relay',
      'Fuse',
      'Transformer',
      'Control PCB',
    ],
  },

  {
    id: 'transformer',
    title: 'Transformer Problem',
    subtitle: 'Transformer or winding-related issue',
    icon: '🔩',
    severity: 'critical',

    symptoms: [
      'No output',
      'Abnormal noise',
      'Excessive heating',
      'Fuse repeatedly blows',
      'Burning smell',
    ],

    possibleCauses: [
      'Winding damage',
      'Shorted turns',
      'Overload',
      'Power-stage failure',
      'Mechanical damage',
    ],

    checks: [
      'Disconnect all power sources',
      'Inspect for visible damage',
      'Check the transformer according to its service procedure',
      'Check the power stage before replacing the transformer',
    ],

    solution: [
      'Repair or replace the transformer when confirmed defective',
      'Find the original cause of transformer failure before returning the inverter to service',
    ],
  },

  {
    id: 'pcb',
    title: 'PCB Problem',
    subtitle: 'Control or power board fault',
    icon: '🟩',
    severity: 'critical',

    symptoms: [
      'Multiple functions fail',
      'No indicators',
      'Intermittent operation',
      'Burnt components',
      'Unusual smell',
    ],

    possibleCauses: [
      'Burnt component',
      'Dry solder joint',
      'Track damage',
      'Moisture',
      'Power surge',
      'Secondary component failure',
    ],

    checks: [
      'Disconnect all power sources',
      'Visually inspect the PCB',
      'Look for burnt components',
      'Inspect connectors and solder joints',
      'Trace the fault according to the inverter service documentation',
    ],

    solution: [
      'Repair damaged PCB connections',
      'Replace failed components',
      'Replace the PCB when component-level repair is not practical',
    ],
  },
];

export const getFaultById = (id: string) => {
  return faults.find((fault) => fault.id === id);
};