import * as actions from './action';
import { Reducer } from "redux";
import { SubjectResponse } from "../../Objects";

export interface ResponseReducerProps {
    responsesCreated: SubjectResponse[],
}

export const ResponseReducer: Reducer = (state: ResponseReducerProps = {
    responsesCreated: []
}, action: any) => {
    const {payload, type} = action;
    switch (type) {
        case actions.RESPONSE_CREATE_SUCCESS:
            document.getElementsByTagName('form')[0].reset();
            let responsesCreated = state.responsesCreated;
            responsesCreated.push(payload);
            return {
                ...state,
                responsesCreated
            };
        default:
            return state;
    }
};
