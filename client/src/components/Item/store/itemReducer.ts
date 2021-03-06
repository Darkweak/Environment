import * as actions from './action';
import { Subject } from "../../Objects";
import { Reducer } from "redux";
import { getUsername, resetForm } from "../../../helpers";

export interface SubjectReducerProps {
    isError: boolean,
    subject: Subject|null,
    isFetchingLike: boolean,
    isFetchingList: boolean,
    isFetchingItem: boolean,
    likesCount: number,
    likedItem: boolean,
    subjects: Subject[]
    subjectsCreated: Subject[]
}

export const SubjectReducer: Reducer = (state: SubjectReducerProps = {
    isError: false,
    subject: null,
    isFetchingLike: false,
    isFetchingList: false,
    isFetchingItem: false,
    likesCount: 0,
    likedItem: false,
    subjects: [],
    subjectsCreated: []
}, action: any) => {
    const {type, payload} = action;
    switch (type) {
        case actions.SUBJECT_CREATE_FAILED:
            return {
                ...state,
                isError: true
            };
        case actions.SUBJECT_CREATE_REQUEST:
            return {
                ...state,
                isError: false
            };
        case actions.SUBJECT_CREATE_SUCCESS:
            let subjectsCreated = state.subjectsCreated;
            subjectsCreated.push(payload);
            resetForm();
            return {
                ...state,
                isError: false,
                subjectsCreated
            };
        case actions.SUBJECT_FETCH_FAILED:
            return {
                ...state,
                isError: true,
                isFetchingList: false,
                products: payload
            };
        case actions.SUBJECT_FETCH_REQUEST:
            return {
                ...state,
                isError: false,
                isFetchingList: true,
            };
        case actions.SUBJECT_FETCH_SUCCESS:
            return {
                ...state,
                isError: false,
                isFetchingList: false,
                subjects: payload
            };
        case actions.SUBJECT_ITEM_FETCH_FAILED:
            return {
                ...state,
                isError: true,
                isFetchingItem: false,
                likedItem: false,
                products: payload
            };
        case actions.SUBJECT_ITEM_FETCH_REQUEST:
            return {
                ...state,
                isError: false,
                isFetchingItem: true,
                likedItem: false,
            };
        case actions.SUBJECT_ITEM_FETCH_SUCCESS:
            let likes = payload.subjectLikes;
            return {
                ...state,
                isError: false,
                isFetchingItem: false,
                likesCount: payload.subjectLikes.length,
                likedItem: (0 < likes.filter((elt: any) => getUsername() === elt.likeOwner.username).length),
                subject: payload
            };
        case actions.SUBJECT_LIKE_UPDATE_FAILED:
            return {
                ...state,
                isFetchingLike: false,
            };
        case actions.SUBJECT_LIKE_UPDATE_REQUEST:
            return {
                ...state,
                isFetchingLike: true,
            };
        case actions.SUBJECT_LIKE_UPDATE_SUCCESS:
            return {
                ...state,
                isFetchingLike: false,
                likesCount: !state.likedItem ? state.likesCount + 1 : state.likesCount - 1,
                likedItem: !state.likedItem
            };
        default:
            return state;
    }
};
