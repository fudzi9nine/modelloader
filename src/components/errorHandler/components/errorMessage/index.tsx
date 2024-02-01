import React from 'react';

import {DEFAULT_ERROR_MESSAGE} from '../../constants';

import styles from './styles.module.css';

interface Props {
  message?: string;
}

function ErrorMessage({message}: Props): React.ReactNode {
  return <p className={styles.message}>{message ?? DEFAULT_ERROR_MESSAGE}</p>;
}

export default ErrorMessage;
