import * as actions from './action';
import { Reducer } from "redux";
import { getBackgroundTheme, getTextTheme, setTheme } from "../../../helpers";

export interface ThemeReducerProps {
    textTheme: string,
    backgroundTheme: string,
}

export const ThemeReducer: Reducer = (state: ThemeReducerProps = {
    textTheme: getTextTheme(),
    backgroundTheme: getBackgroundTheme(),
}, action: any) => {
    const {type} = action;
    switch (type) {
        case actions.SWITCH_THEME:
            let textTheme = 'primary' === state.textTheme ? 'secondary' : 'primary';
            let backgroundTheme = 'primary' === state.backgroundTheme ? 'secondary' : 'primary';
            setTheme(JSON.stringify({textTheme, backgroundTheme}));
            return {
                ...state,
                textTheme,
                backgroundTheme,
            };
        default:
            return state;
    }
};
