import {Html} from '@react-three/drei';
import React from 'react';

import {useLoading} from '../../services/useLoading';

import styles from './styles.module.css';

function Loading(): React.ReactNode {
  const {progress} = useLoading();

  const isLoadingStarted = progress !== '';

  return (
    <Html fullscreen className={styles.container}>
      <span className={styles.loader} />
      <span
        className={
          styles.text + (isLoadingStarted ? ' ' + styles.loadingText : '')
        }>{`Loading${isLoadingStarted ? ` ${progress}%` : '...'}`}</span>
    </Html>
  );
}

export default Loading;
