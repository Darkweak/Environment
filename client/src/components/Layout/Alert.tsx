import React from 'react';
import { IChildren, IClassName } from "./index";
import { Alert } from "react-bootstrap";

interface IBaseAlert {
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'dark'
        | 'light'
}

const BaseAlert = ({ children, className, ...rest }: IBaseAlert & IChildren & IClassName) => (
    <div className={`d-flex ${className ? className : null}`}>
        <Alert className="text-center m-auto" {...rest}>
            { children }
        </Alert>
    </div>
);

export const Warning = ({ children, ...rest }: IChildren & IClassName) => (
    <BaseAlert variant={'warning'} {...rest}>
        {children}
    </BaseAlert>
);

export const Success = ({ children, ...rest }: IChildren & IClassName) => (
    <BaseAlert variant={'success'} {...rest}>
        {children}
    </BaseAlert>
);

export const Danger = ({ children, ...rest }: IChildren & IClassName) => (
    <BaseAlert variant={'danger'} {...rest}>
        {children}
    </BaseAlert>
);

export const Info = ({ children, ...rest }: IChildren & IClassName) => (
    <BaseAlert variant={'info'} {...rest}>
        {children}
    </BaseAlert>
);
