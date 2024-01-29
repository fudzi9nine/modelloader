import React, {useCallback, useState} from 'react';

const LoaderContext = React.createContext(null);

const LoaderProvider = ({children}) => {
  const [progress, setProgress] = useState(0);

  const changeProgress = useCallback(
    (e) => setProgress(((e.loaded / e.total) * 100).toFixed(2)),
    []
  );

  return <LoaderContext.Provider value={{progress, setProgress: changeProgress}}>{children}</LoaderContext.Provider>;
};

const useLoading = () => {
  const context = React.useContext(LoaderContext);

  return context;
};

export {useLoading, LoaderProvider};
