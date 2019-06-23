import React from 'react';
import { GenerateForm } from './Common';
import { Danger, Success } from '../Layout/Alert';
import { connect } from "react-redux";
import { UserReducerProps } from "../User/store/userReducer";
import { changePassword } from "../User/store/action";
import { FormReducerProps } from "./store/formReducer";
import { Field } from "../Objects";

const oldPassword: Field = {
    name: 'oldPassword',
    placeholder: 'Ancien mot de passe',
    type: 'password',
    label: 'Ancien mot de passe'
};
const newPassword: Field = {
    name: 'newPassword',
    placeholder: 'Nouveau mot de passe',
    type: 'password',
    label: 'Nouveau mot de passe'
};

interface ILoginForm {
    isLogged?: boolean;
    isLoginError?: boolean;
    login?: () => void;
    withoutText?: boolean;
}

interface Reducer {
    FormReducer: FormReducerProps,
    UserReducer: UserReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.FormReducer,
    ...reducers.UserReducer,
});

export const UpdatePassword = connect(
    mapStateToProps,
    {
        changePassword
    }
)(({ changePassword, changePasswordError, changePasswordSuccess, login, ...rest }: ILoginForm & any) => (
    <GenerateForm
        fields={[ oldPassword, newPassword ]}
        onSubmit={changePassword}
        withoutText
        {...rest}
    >
        {
            changePasswordError ?
                <div className="py-3">
                    <Danger>
                        <span>Une erreur est survenue, votre mot de passe n'a pas été changé</span>
                    </Danger>
                </div> :
                changePasswordSuccess ?
                    <div className="py-3">
                        <Success>
                            <span>Votre mot de passe a bien été changé</span>
                        </Success>
                    </div> : null
        }
    </GenerateForm>
));
