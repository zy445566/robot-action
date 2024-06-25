interface Action {
  command: string;
  args: Array<string | number>;
}

export interface ActionFlowsData {
  action: Action[];
  keyboardDelay?: number;
  mouseDelay?: number;
}
