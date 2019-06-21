import React from 'react';
import { GenerateForm } from './Common';
import { connect } from 'react-redux';
import { email, password, pseudo } from "./fields";
import { Danger, Success } from '../Layout/Alert';
import { register } from "../User/store/action";
import { UserReducerProps } from "../User/store/userReducer";
import { FormReducerProps } from "./store/formReducer";

interface IRegister {
    isRegistered?: boolean,
    isRegisterError?: boolean,
    register?: (args?: any) => void
}

interface Reducer {
    FormReducer: FormReducerProps,
    UserReducer: UserReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.FormReducer,
    ...reducers.UserReducer,
});

export const RegisterForm = connect(
    mapStateToProps,
    {
        register
    }
)(({ isRegistered, isRegisterError, register, ...rest }: IRegister) => (
    <GenerateForm
        fields={[email, password, pseudo]}
        onSubmit={register}
        {...rest}
    >
        {
            isRegistered ?
                <Success>
                    <span>Votre compte a bien été créé</span>
                </Success> : null
        }
        {
            isRegisterError &&
            <Danger>
                <span>Une erreur est survenue lors de la création de votre compte</span>
            </Danger>
        }
    </GenerateForm>
));
