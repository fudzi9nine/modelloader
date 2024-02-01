import './index.css';
import {Html} from '@react-three/drei';
import React from 'react';

import {useLoading} from '../../services/useLoading';

function Loading(): React.JSX.Element {
  const {progress} = useLoading();
  return (
    <Html
      fullscreen
      style={{
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <span className="loader" />
      <span
        style={{
          color: '#fff',
          marginTop: 40,
          marginLeft: 10,
          width: 130,
          textAlign: progress !== '' ? 'left' : 'center'
        }}>{`Loading${progress !== '' ? ` ${progress}%` : ''}`}</span>
    </Html>
  );
}

export default Loading;
