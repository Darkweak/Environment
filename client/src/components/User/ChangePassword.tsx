import React from 'react';
import { Layout } from "../Layout";
import { UpdatePassword } from "../Form/UpdatePassword";
import { lifecycle } from "recompose";
import { isGrantedToAccessToResource } from "../../helpers";

export const ChangePassword: any = lifecycle({
    componentDidMount() {
        isGrantedToAccessToResource();
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
