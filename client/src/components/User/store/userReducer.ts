import * as actions from './action';
import { Reducer } from "redux";
import { deleteToken, getToken, getUsername, setToken } from "../../../helpers";

export interface UserReducerProps {
    isLoginError: boolean,
    token: string,
    username: string,
    isLogged: boolean,
    isRegistered: boolean,
    isRegisterError: boolean,
}

export const UserReducer: Reducer = (state: UserReducerProps = {
    isLoginError: false,
    token: getToken(),
    username: getUsername(),
    isLogged: !!getToken(),
    isRegistered: false,
    isRegisterError: false,
}, action: any) => {
    const {type, payload} = action;
    switch (type) {
        case actions.LOGIN_FAILED:
            return {
                ...state,
                isLoginError: true,
                token: null,
                username: '',
                isLogged: false,
            };
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                isLoginError: false,
                username: '',
                token: null,
                isLogged: false,
            };
        case actions.LOGIN_SUCCESS:
            setToken(payload.token);
            window.location.pathname = '/';
            return {
                ...state,
                isLoginError: false,
                username: getUsername(),
                token: getToken(),
                isLogged: true,
            };
        case actions.LOGOUT:
            deleteToken();
            window.location.pathname = '/';
            break;
        case actions.REGISTER_FAILED:
            return {
                ...state,
                isRegistered: false,
                isRegisterError: true,
            };
        case actions.REGISTER_REQUEST:
            return {
                ...state,
                isRegistered: false,
                isRegisterError: false,
            };
        case actions.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true,
                isRegisterError: false,
            };
        default:
            return state;
    }
};
