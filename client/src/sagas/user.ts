import { commonRequest } from './common';
import {
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    USER_FETCH_FAILED,
    USER_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_CHANGE_PASSWORD_FAILED,
    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS
} from "../components/User/store/action";

export const handleUser = async (action: any) => {
    const {dispatch, payload, type} = action;
    switch (type) {
        case LOGIN_REQUEST:
            return await commonRequest({
                path: `/login`,
                dispatch,
                method: 'POST',
                callback: {
                    error: LOGIN_FAILED,
                    success: LOGIN_SUCCESS,
                },
                body: payload
            });
        case REGISTER_REQUEST:
            return await commonRequest({
                path: `/users`,
                dispatch,
                method: 'POST',
                callback: {
                    error: REGISTER_FAILED,
                    success: REGISTER_SUCCESS,
                },
                body: payload
            });
        case USER_FETCH_REQUEST:
            return await commonRequest({
                path: '/me',
                dispatch,
                method: 'GET',
                callback: {
                    error: USER_FETCH_FAILED,
                    success: USER_FETCH_SUCCESS,
                }
            });
        case USER_CHANGE_PASSWORD_REQUEST:
            return await commonRequest({
                path: '/change-password',
                dispatch,
                method: 'POST',
                callback: {
                    error: USER_CHANGE_PASSWORD_FAILED,
                    success: USER_CHANGE_PASSWORD_SUCCESS,
                },
                body: payload
            });
        default:
            break;
    }
};
