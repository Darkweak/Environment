import React from 'react';
import { GenerateForm } from './Common';
import { Link } from '../Objects';
import { Warning } from '../Layout/Alert';
import { password, username } from "./fields";
import { connect } from "react-redux";
import { UserReducerProps } from "../User/store/userReducer";
import { login } from "../User/store/action";
import { FormReducerProps } from "./store/formReducer";

const link: Link = {
    label: 'Pas encore de compte ?',
    path: '/connection',
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

export const LoginForm = connect(
    mapStateToProps,
    {
        login
    }
)(({ isLogged, isLoginError, login, ...rest }: ILoginForm & any) => (
    <GenerateForm
        additionnalLinks={[ link ]}
        fields={[ username, password ]}
        onSubmit={login}
        {...rest}
    >
        {
            isLoginError ?
                <div className="py-3">
                    <Warning>
                        <span>Identifiant ou mot de passe incorrect</span>
                    </Warning>
                </div> : null
        }
    </GenerateForm>
));
