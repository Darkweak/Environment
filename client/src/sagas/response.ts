import { commonRequest } from './common';
import {
    RESPONSE_CREATE_FAILED,
    RESPONSE_CREATE_REQUEST,
    RESPONSE_CREATE_SUCCESS
} from "../components/Response/store/action";

export const handleResponse = async (action: any) => {
    const {dispatch, payload, type} = action;
    switch (type) {
        case RESPONSE_CREATE_REQUEST:
            return await commonRequest({
                path: `/responses`,
                dispatch,
                method: 'POST',
                body: payload,
                callback: {
                    error: RESPONSE_CREATE_FAILED,
                    success: RESPONSE_CREATE_SUCCESS,
                }
            });
        default:
            break;
    }
};
