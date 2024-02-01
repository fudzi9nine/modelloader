import EventEmitter from 'events';

import {useEffect} from 'react';

import {type FromMobileActionName, type FromMobileActions} from './types';

declare global {
  interface Window {
    onMessageFromMobile: (message: string) => void;
  }
}

const MobileEvents = new EventEmitter();

const registerMobileMessageHandler = <T extends FromMobileActionName>(
  action: T,
  callback: (payload: FromMobileActions[T]) => void
): (() => void) => {
  MobileEvents.on(action, callback);
  return () => {
    MobileEvents.off(action, callback);
  };
};

export const useMobileMessageHandler = <T extends FromMobileActionName>(
  action: T,
  callback: (payload: FromMobileActions[T]) => void
): void => {
  useEffect(() => {
    const deregister = registerMobileMessageHandler<T>(action, callback);
    return deregister;
  }, [action, callback]);
};

const onMessageFromMobile = (message: string): void => {
  const {
    action,
    payload
  }: {
    action: FromMobileActionName;
    payload: FromMobileActions[FromMobileActionName];
  } = JSON.parse(message);
  MobileEvents.emit(action, payload);
};

window.onMessageFromMobile = onMessageFromMobile;
