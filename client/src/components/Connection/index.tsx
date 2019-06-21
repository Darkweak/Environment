import React from 'react';
import { Layout } from '../Layout';
import { LoginForm } from '../Form/Login';
import { RegisterForm } from '../Form/Register';
import {
    Divider,
    Segment
} from 'semantic-ui-react';

export const Connection = () => (
    <Layout container title="Se connecter ou s'inscrire c'est ici">
        <Segment className="py-md-4 px-0">
            <div className="row m-0">
                <div className="col-12 col-md-6 px-md-5 py-sm-4">
                    <h3 className="text-center">
                        Se connecter
                    </h3>
                    <LoginForm withoutText/>
                </div>
                <Divider horizontal className="w-100 d-md-none">OU</Divider>
                <div className="col-12 col-md-6 px-md-5 py-sm-4">
                    <h3 className="text-center">
                        S'incrire
                    </h3>
                    <RegisterForm/>
                </div>
            </div>
            <Divider vertical className="d-none d-md-block">OU</Divider>
        </Segment>
    </Layout>
);
