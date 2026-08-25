export type FaultSeverity = 'low' | 'medium' | 'high' | 'critical';

export type Fault = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  severity: FaultSeverity;

  symptoms: string[];

  possibleCauses: string[];

  checks: string[];

  solution: string[];

  components?: string[];

  safety?: string[];
};

export type Inverter = {
  id: string;
  brand: string;
  model: string;
  capacity: string;
  batteryVoltage: string;
  type: string;
  image: any;
  faults: string[];
};