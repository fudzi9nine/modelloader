export interface FromWebActions {
  typeIdentified: {
    isIdentified: boolean;
  };
}

export type FromWebActionName = keyof FromWebActions;
