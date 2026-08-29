export type FaultSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ComponentDetail = {
  component: string;
  function: string;
  value?: string;
  value12V?: string;
  value24V?: string;
  marking?: string;
  package?: string;
  important?: string;
};

export type ResistorValue = {
  pcb: string;
  r24: string;
  marking: string;
  reason: string;
};

export type TechnicalExplanation = {
  title: string;
  explanation: string;
  components: ComponentDetail[];
};

export type ResistorValues = {
  title: string;
  explanation: string;
  values: ResistorValue[];
};

export type PossibleCause = {
  cause: string;
  explanation: string;
};

export type RepairStep = {
  step: number;
  title: string;
  explanation: string;
};

export type InverterFaultDetail = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  severity: FaultSeverity;

  /** PCB / circuit diagram image for this specific fault */
  diagramImage?: any;

  symptoms: string[];
  basicChecks: string[];

  technicalExplanation?: TechnicalExplanation;
  resistorValues?: ResistorValues;

  possibleCauses: PossibleCause[];
  repairProcedure: RepairStep[];

  importantNote?: string;
  circuitFlow?: string;
  diagnosis?: string;
};

