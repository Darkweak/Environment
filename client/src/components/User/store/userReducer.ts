import * as actions from './action';
import { Reducer } from "redux";
import { deleteToken, getToken, getUsername, resetForm, setToken } from "../../../helpers";
import { User } from "../../Objects";

export interface UserReducerProps {
    isLoginError: boolean,
    token: string,
    username: string,
    isFetchingUser: boolean,
    isLogged: boolean,
    isRegistered: boolean,
    isRegisterError: boolean,
    changePasswordError: boolean,
    changePasswordSuccess: boolean,
    user?: User,
}

export const UserReducer: Reducer = (state: UserReducerProps = {
    isLoginError: false,
    token: getToken(),
    username: getUsername(),
    isFetchingUser: false,
    isLogged: !!getToken(),
    isRegistered: false,
    isRegisterError: false,
    changePasswordError: false,
    changePasswordSuccess: false,
    user: undefined,
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
        case actions.USER_FETCH_FAILED:
            return {
                ...state,
                isFetchingUser: false,
                user: undefined,
            };
        case actions.USER_FETCH_REQUEST:
            return {
                ...state,
                isFetchingUser: true,
            };
        case actions.USER_FETCH_SUCCESS:
            return {
                ...state,
                isFetchingUser: false,
                user: payload,
            };
        case actions.USER_CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                changePasswordError: true,
                changePasswordSuccess: false,
            };
        case actions.USER_CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                changePasswordError: false,
                changePasswordSuccess: false,
            };
        case actions.USER_CHANGE_PASSWORD_SUCCESS:
            resetForm();
            return {
                ...state,
                changePasswordError: false,
                changePasswordSuccess: true,
            };
        default:
            return state;
    }
};
