import React from 'react';
import { Layout } from "../Layout";
import { UpdatePassword } from "../Form/UpdatePassword";
import { lifecycle } from "recompose";
import { getToken } from "../../helpers";

export const ChangePassword: any = lifecycle({
    componentDidMount() {
        if (!getToken()) {
            window.location.pathname = '/'
        }
    }
})(() => (
    <Layout title={'Changement de votre mot de passe'} container>
        <div className="row m-0">
            <div className="col-md-8 offset-md-2">
                <UpdatePassword/>
            </div>
        </div>
    </Layout>
));
