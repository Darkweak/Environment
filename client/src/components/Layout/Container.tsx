import React from 'react';
import { IChildren } from "./index";

export const TextContainer = ({ children }: IChildren) => (
    <div className="container">{ children }</div>
);
