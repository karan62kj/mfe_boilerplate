import React from 'react';
import './textInput.css';

export const AppV1TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const { className, ...rest } = props;
    return (
        <input
            className={`app-text-input ${className || ''}`}
            {...rest}
        />
    );
};