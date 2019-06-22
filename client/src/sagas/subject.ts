import { commonRequest, encodeParams, getUrl } from './common';
import {
    SUBJECT_CREATE_FAILED,
    SUBJECT_CREATE_REQUEST,
    SUBJECT_CREATE_SUCCESS,
    SUBJECT_FETCH_FAILED,
    SUBJECT_FETCH_REQUEST,
    SUBJECT_FETCH_SUCCESS,
    SUBJECT_ITEM_FETCH_FAILED,
    SUBJECT_ITEM_FETCH_REQUEST,
    SUBJECT_ITEM_FETCH_SUCCESS,
    SUBJECT_LIKE_UPDATE_FAILED,
    SUBJECT_LIKE_UPDATE_REQUEST,
    SUBJECT_LIKE_UPDATE_SUCCESS
} from "../components/Item/store/action";
import { getId } from "../helpers";

export const handleSubject = async (action: any) => {
    const {dispatch, payload, type} = action;
    switch (type) {
        case SUBJECT_FETCH_REQUEST:
            let params = { ...payload };
            if (!(
                getUrl().includes('subject') ||
                getUrl().includes('subjects') ||
                getUrl().includes('categories')
            )) {
                params = { ...payload, 'category.name': getUrl()[2] };
            }
            return await commonRequest({
                path: `/subjects?${params ? encodeParams(params) : ''}`,
                dispatch,
                method: 'GET',
                callback: {
                    error: SUBJECT_FETCH_FAILED,
                    success: SUBJECT_FETCH_SUCCESS,
                }
            });
        case SUBJECT_ITEM_FETCH_REQUEST:
            return await commonRequest({
                path: `/subjects/${payload}`,
                dispatch,
                method: 'GET',
                callback: {
                    error: SUBJECT_ITEM_FETCH_FAILED,
                    success: SUBJECT_ITEM_FETCH_SUCCESS,
                }
            });
        case SUBJECT_LIKE_UPDATE_REQUEST:
            return await commonRequest({
                path: `/user_subject_likes${ payload.isLiked ? `/likeOwner=${getId()};likeSubject=${payload.subjectId}` : '' }`,
                dispatch,
                body: payload.isLiked ? null : {
                    likeOwner: `/users/${getId()}`,
                    likeSubject: `/subjects/${payload.subjectId}`
                },
                method: payload.isLiked ? 'DELETE' : 'POST',
                callback: {
                    error: SUBJECT_LIKE_UPDATE_FAILED,
                    success: SUBJECT_LIKE_UPDATE_SUCCESS,
                }
            });
        case SUBJECT_CREATE_REQUEST:
            return await commonRequest({
                path: `/subjects`,
                dispatch,
                body: payload,
                method: 'POST',
                callback: {
                    error: SUBJECT_CREATE_FAILED,
                    success: SUBJECT_CREATE_SUCCESS,
                }
            });
        default:
            break;
    }
};
