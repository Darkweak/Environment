import React from 'react';
import { Dimmer, Loader as SLoader } from "semantic-ui-react";
import { ThemeReducerProps } from "./store/themeReducer";
import { connect } from "react-redux";
import { ITheme } from "./index";

interface ILoader {
    dimmer?: boolean,
    text?: string,
    size?:
    | 'mini'
    | 'tiny'
    | 'small'
    | 'medium'
    | 'large'
    | 'big'
    | 'huge'
    | 'massive',
}

interface Reducer {
    ThemeReducer: ThemeReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.ThemeReducer
});

export const Loader = connect(
    mapStateToProps,
    {}
)(({
    backgroundTheme,
    dimmer = false,
    text = 'Loading',
    textTheme,
    size = 'massive',
}: ILoader & ITheme) => (
   dimmer ?
        <Dimmer active>
            <SLoader size={size} active inline="centered" className={`text-${textTheme} bg-${backgroundTheme}`}>{ text }</SLoader>
        </Dimmer> :
       <SLoader size={size} active inline="centered">{ text }</SLoader>
));

