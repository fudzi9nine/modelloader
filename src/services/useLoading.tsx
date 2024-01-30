import React, {type PropsWithChildren, useCallback, useState} from 'react';

interface LoadingContextType {
  progress: string;
  setProgress: (e: ProgressEvent) => void;
}

const LoaderContext = React.createContext<LoadingContextType>({
  progress: '',
  setProgress: () => {}
} satisfies LoadingContextType);

const LoaderProvider = ({children}: PropsWithChildren<Record<never, never>>): React.JSX.Element => {
  const [progress, setProgress] = useState<string>('0');

  const changeProgress = useCallback((e: ProgressEvent) => {
    setProgress(((e.loaded / e.total) * 100).toFixed(2));
  }, []);

  return <LoaderContext.Provider value={{progress, setProgress: changeProgress}}>{children}</LoaderContext.Provider>;
};

const useLoading = (): LoadingContextType => {
  const context = React.useContext(LoaderContext);

  return context;
};

export {useLoading, LoaderProvider};
