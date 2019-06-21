import { handleResponse } from "../../../sagas/response";
import { getUrl } from "../../../sagas/common";

export const RESPONSE_CREATE_FAILED = 'RESPONSE_CREATE_FAILED';
export const RESPONSE_CREATE_REQUEST = 'RESPONSE_CREATE_REQUEST';
export const RESPONSE_CREATE_SUCCESS = 'RESPONSE_CREATE_SUCCESS';

export const createResponse = (payload: any) => async (dispatch: any) => {
    dispatch({ type: RESPONSE_CREATE_REQUEST });
    return handleResponse({
        dispatch,
        type: RESPONSE_CREATE_REQUEST,
        payload: {...payload, subject: `/subjects/${getUrl()[2]}`}
    })
};
