import { handleUser } from "../../../sagas/user";

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

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
