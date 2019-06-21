import { handleCategory } from "../../../sagas/category";

export const CATEGORY_FETCH_FAILED = 'CATEGORY_FETCH_FAILED';
export const CATEGORY_FETCH_REQUEST = 'CATEGORY_FETCH_REQUEST';
export const CATEGORY_FETCH_SUCCESS = 'CATEGORY_FETCH_SUCCESS';

export const getCategory = (data?: any) => async (dispatch: any) => {
    dispatch({ type: CATEGORY_FETCH_REQUEST });
    return handleCategory({
        dispatch,
        type: CATEGORY_FETCH_REQUEST,
        payload: data
    })
};
