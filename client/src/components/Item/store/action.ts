import { handleSubject } from "../../../sagas/subject";

export const SUBJECT_CREATE_FAILED = 'SUBJECT_CREATE_FAILED';
export const SUBJECT_CREATE_REQUEST = 'SUBJECT_CREATE_REQUEST';
export const SUBJECT_CREATE_SUCCESS = 'SUBJECT_CREATE_SUCCESS';
export const SUBJECT_FETCH_FAILED = 'SUBJECT_FETCH_FAILED';
export const SUBJECT_FETCH_REQUEST = 'SUBJECT_FETCH_REQUEST';
export const SUBJECT_FETCH_SUCCESS = 'SUBJECT_FETCH_SUCCESS';
export const SUBJECT_ITEM_FETCH_FAILED = 'SUBJECT_ITEM_FETCH_FAILED';
export const SUBJECT_ITEM_FETCH_REQUEST = 'SUBJECT_ITEM_FETCH_REQUEST';
export const SUBJECT_ITEM_FETCH_SUCCESS = 'SUBJECT_ITEM_FETCH_SUCCESS';
export const SUBJECT_LIKE_UPDATE_FAILED = 'SUBJECT_LIKE_UPDATE_FAILED';
export const SUBJECT_LIKE_UPDATE_REQUEST = 'SUBJECT_LIKE_UPDATE_REQUEST';
export const SUBJECT_LIKE_UPDATE_SUCCESS = 'SUBJECT_LIKE_UPDATE_SUCCESS';

export const getSubjects = (payload?: any) => async (dispatch: any) => {
    dispatch({ type: SUBJECT_FETCH_REQUEST });
    return handleSubject({
        dispatch,
        type: SUBJECT_FETCH_REQUEST,
        payload
    })
};

export const getSubject = (payload: any) => async (dispatch: any) => {
    dispatch({ type: SUBJECT_ITEM_FETCH_REQUEST });
    return handleSubject({
        dispatch,
        type: SUBJECT_ITEM_FETCH_REQUEST,
        payload
    })
};

export const updateLikeSubject = (payload: any) => async(dispatch: any) => {
    dispatch({ type: SUBJECT_LIKE_UPDATE_REQUEST });
    return handleSubject({
        dispatch,
        type: SUBJECT_LIKE_UPDATE_REQUEST,
        payload
    })
};

export const createSubject = (payload: any) => async(dispatch: any) => {
    dispatch({ type: SUBJECT_CREATE_REQUEST });
    return handleSubject({
        dispatch,
        type: SUBJECT_CREATE_REQUEST,
        payload
    })
}
