import { handleUser } from "../../../sagas/user";

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED';
export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_CHANGE_PASSWORD_FAILED = 'USER_CHANGE_PASSWORD_FAILED';
export const USER_CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST';
export const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';

export const login = (payload: any) => async (dispatch: any) => {
    dispatch({ type: LOGIN_REQUEST });
    return handleUser({
        dispatch,
        type: LOGIN_REQUEST,
        payload
    })
};

export const register = (payload: any) => async (dispatch: any) => {
    dispatch({ type: REGISTER_REQUEST });
    return handleUser({
        dispatch,
        type: REGISTER_REQUEST,
        payload
    })
};

export const logout = () => async (dispatch: any) => {
    dispatch({ type: LOGOUT });
};

export const getUserInfos = () => async (dispatch: any) => {
    dispatch({ type: USER_FETCH_REQUEST });
    return handleUser({
        dispatch,
        type: USER_FETCH_REQUEST
    })
};

export const changePassword = (payload: any) => async (dispatch: any) => {
    dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });
    return handleUser({
        dispatch,
        type: USER_CHANGE_PASSWORD_REQUEST,
        payload
    })
};
