interface Action {
  command: string;
  args: string[];
}

export interface ActionFlowsData {
  action: Action[];
  keyboardDelay?: number;
  mouseDelay?: number;
}
