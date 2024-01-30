import './index.css';
import {Html} from '@react-three/drei';
import React from 'react';

import {useLoading} from '../../services/useLoading';

function Loading(): React.JSX.Element {
  const {progress} = useLoading();
  return (
    <Html center>
      <div
        style={{
          backgroundColor: '#000',
          display: 'flex',
          width: '100vw',
          height: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <span className="loader" />
        {Boolean(progress) && (
          <span style={{color: '#fff', marginTop: 50, marginLeft: 10, width: 130}}>{`Loading ${progress}%`}</span>
        )}
      </div>
    </Html>
  );
}

export default Loading;
