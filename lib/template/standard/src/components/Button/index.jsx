import React from 'react';

import styles from './button.scss';

export default function Button(props) {
    return (
        <button {...props} className={styles.button}>{props.text ?? '按钮'}</button>
    );
}