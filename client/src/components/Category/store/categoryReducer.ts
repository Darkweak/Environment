import * as actions from './action';
import { Category } from "../../Objects";
import { Reducer } from "redux";

export interface CategoryReducerProps {
    isError: boolean,
    categories: Category[],
    isFetching: boolean,
}

export const CategoryReducer: Reducer = (state: CategoryReducerProps = {
    isError: false,
    categories: [],
    isFetching: false,
}, action: any) => {
    const {type, payload} = action;
    switch (type) {
        case actions.CATEGORY_FETCH_FAILED:
            return {
                ...state,
                isError: true,
                isFetching: false,
                categories: null
            };
        case actions.CATEGORY_FETCH_REQUEST:
            return {
                ...state,
                isError: false,
                isFetching: true
            };
        case actions.CATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                isError: false,
                isFetching: false,
                categories: payload
            };
        default:
            return state;
    }
};
