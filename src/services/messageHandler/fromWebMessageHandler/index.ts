import {type FromWebActionName, type FromWebActions} from './types';

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export const sendMessageToRN = <T extends FromWebActionName>(action: T, payload?: FromWebActions[T]): void => {
  window.ReactNativeWebView?.postMessage(JSON.stringify({action, payload}));
};
