import React, {PropsWithChildren, useCallback, useState} from 'react';

type LoadingContextType = {
  progress: string;
  setProgress: (e: ProgressEvent) => void
}

const LoaderContext = React.createContext<LoadingContextType>({} as LoadingContextType);

const LoaderProvider = ({children}: PropsWithChildren<{}>) => {
  const [progress, setProgress] = useState<string>('0');

  const changeProgress = useCallback(
    (e: ProgressEvent) => setProgress(((e.loaded / e.total) * 100).toFixed(2)),
    []
  );

  return <LoaderContext.Provider value={{progress, setProgress: changeProgress}}>{children}</LoaderContext.Provider>;
};

const useLoading = () => {
  const context = React.useContext(LoaderContext);

  return context;
};

export {useLoading, LoaderProvider};
