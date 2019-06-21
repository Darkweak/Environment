import { commonRequest } from './common';
import {
    CATEGORY_FETCH_FAILED,
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FETCH_SUCCESS
} from "../components/Category/store/action";

export const handleCategory = async (action: any) => {
    const {dispatch, payload, type} = action;
    switch (type) {
        case CATEGORY_FETCH_REQUEST:
            return await commonRequest({
                path: `/categories?${payload ? JSON.stringify(payload) : ''}`,
                dispatch,
                method: 'GET',
                callback: {
                    error: CATEGORY_FETCH_FAILED,
                    success: CATEGORY_FETCH_SUCCESS,
                }
            });
        default:
            break;
    }
};
