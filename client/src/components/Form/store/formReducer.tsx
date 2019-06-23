import * as user from '../../User/store/action';
import * as response from '../../Response/store/action';
import * as subject from '../../Item/store/action';
import { Reducer } from "redux";

export interface FormReducerProps {
    isFetching: boolean,
}

export const FormReducer: Reducer = (state: FormReducerProps = { isFetching: false }, action: any) => {
    const {type} = action;
    switch (type) {
        case user.LOGIN_FAILED:
        case user.LOGIN_SUCCESS:
        case user.REGISTER_FAILED:
        case user.REGISTER_SUCCESS:
        case user.USER_CHANGE_PASSWORD_FAILED:
        case user.USER_CHANGE_PASSWORD_SUCCESS:
        case response.RESPONSE_CREATE_SUCCESS:
        case response.RESPONSE_CREATE_FAILED:
        case subject.SUBJECT_CREATE_FAILED:
        case subject.SUBJECT_CREATE_SUCCESS:
            return {
                ...state,
                isFetching: false
            };
        case user.LOGIN_REQUEST:
        case user.REGISTER_REQUEST:
        case user.USER_CHANGE_PASSWORD_REQUEST:
        case response.RESPONSE_CREATE_REQUEST:
        case subject.SUBJECT_CREATE_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        default:
            return state;
    }
};
