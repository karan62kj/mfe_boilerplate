import React from 'react';
import './button.css'

type ButtonWrapperProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AppV1Button = (props: ButtonWrapperProps) => {
    const {children, ...rest} = props;
    return (
        <button className="app-button" {...rest}>
            {children}
        </button>
    );
}