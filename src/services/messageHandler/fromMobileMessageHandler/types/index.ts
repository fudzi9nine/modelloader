export interface FromMobileActions {
  additionalAssets: {
    assetList: string[];
  };
}

export type FromMobileActionName = keyof FromMobileActions;
