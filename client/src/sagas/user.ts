import { commonRequest } from './common';
import {
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
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
        default:
            break;
    }
};
