import React from 'react';

import {DEFAULT_ERROR_MESSAGE} from '../../constants';

interface Props {
  message?: string;
}

function ErrorMessage({message}: Props): React.ReactNode {
  return (
    <p
      style={{
        whiteSpace: 'pre-wrap',
        textAlign: 'center',
        height: '100vh',
        margin: '0',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
      }}>
      {message ?? DEFAULT_ERROR_MESSAGE}
    </p>
  );
}

export default ErrorMessage;
