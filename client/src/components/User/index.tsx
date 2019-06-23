import React from 'react';
import { IChildren, Layout } from "../Layout";
import { getUsername } from "../../helpers";
import { compose } from "redux";
import { UserReducerProps } from "./store/userReducer";
import { connect } from "react-redux";
import { getUserInfos } from "./store/action";
import { lifecycle } from "recompose";
import { Subject, SubjectLike, SubjectResponse } from "../Objects";
import { Info, Warning } from "../Layout/Alert";
import { Loader } from "../Layout/Loader";
import { Link } from "react-router-dom";

interface ICardProfile {
    title: string,
}

const CardProfile = ({ children, title }: ICardProfile & IChildren) => (
    <div className="card">
        <div className="bg-primary text-center">
            <h5 className="card-title text-white text-center m-0 py-4">
                { title }
            </h5>
        </div>
        <div className="card-body position-relative">
            { children }
        </div>
    </div>
);

interface Reducer {
    UserReducer: UserReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.UserReducer
});

export const Profile: any = compose(
    connect(
        mapStateToProps,
        {
            getUserInfos
        }
    ),
    lifecycle({
        componentDidMount() {
            const { getUserInfos }: any = this.props;
            getUserInfos();
        }
    })
)(({ user, isFetchingUser }: UserReducerProps) => (
    <Layout title={`Bienvenue sur votre profil ${getUsername()}`} container>
        {
            isFetchingUser ?
                <Loader text={'Récupération de votre profil en cours'}/> :
                user ?
                    <div className="row m-0">
                        <div className="col-md-6 pb-4">
                            <div className="col-12">
                                <CardProfile title={'Vos informations'}>
                                    <p>Pseudo : { user.username }</p>
                                    <p>email : { user.email }</p>
                                    <div className="text-center">
                                        <Link to="/change-password" className="btn btn-primary">
                                            Changer votre mot de passe
                                        </Link>
                                    </div>
                                </CardProfile>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="col-12 pb-4">
                                <CardProfile title={'Vos sujets créés'}>
                                    {
                                        user.subjectsOwned && user.subjectsOwned.length ?
                                            user.subjectsOwned.map((subject: Subject) => (
                                                <Link className="d-block mb-3" to={subject['@id']}>{ subject.name }</Link>
                                            )) :
                                            <Info>
                                                Vous n'avez pas encore créé de sujet
                                            </Info>
                                    }
                                </CardProfile>
                            </div>
                            <div className="col-12 pb-4">
                                <CardProfile title={'Les sujets commentés'}>
                                    {
                                        user.subjectResponses && user.subjectResponses.length ?
                                            user.subjectResponses.map((subjectResponse: SubjectResponse) => (
                                                <Link className="d-block mb-3" to={subjectResponse.subject['@id']}>{ subjectResponse.subject.name }</Link>
                                            )) :
                                            <Info>
                                                Vous n'avez pas encore commenté de sujet
                                            </Info>
                                    }
                                </CardProfile>
                            </div>
                            <div className="col-12">
                                <CardProfile title={'Les sujets aimés'}>
                                    {
                                        user.userSubjectLikes && user.userSubjectLikes.length ?
                                            user.userSubjectLikes.map((subjectLike: SubjectLike) => (
                                                <Link className="d-block mb-3" to={subjectLike.likeSubject['@id']}>{ subjectLike.likeSubject.name }</Link>
                                            )) :
                                            <Info>
                                                Vous n'avez pas encore aimé de sujet
                                            </Info>
                                    }
                                </CardProfile>
                            </div>
                        </div>
                    </div> :
                    <Warning>
                        Votre profil n'a pas pu être chargé, réessayez plus tard
                    </Warning>
        }
    </Layout>
));
