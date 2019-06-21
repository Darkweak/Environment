import React from 'react';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { SubjectReducerProps } from "./store/itemReducer";
import { Subject, SubjectResponse } from "../Objects";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { getSubject, updateLikeSubject } from "./store/action";
import { ITheme, Layout } from "../Layout";
import { Loader } from "../Layout/Loader";
import { Danger, Info, Warning } from "../Layout/Alert";
import { UserReducerProps } from "../User/store/userReducer";
import { GenerateForm } from "../Form/Common";
import { response } from "../Form/fields";
import { ThemeReducerProps } from "../Layout/store/themeReducer";
import { createResponse } from "../Response/store/action";
import { FormReducerProps } from "../Form/store/formReducer";
import { ResponseReducerProps } from "../Response/store/responseReducer";
import { Response } from "../Response";

interface Reducer {
    FormReducer: FormReducerProps,
    ResponseReducer: ResponseReducerProps,
    SubjectReducer: SubjectReducerProps,
    ThemeReducer: ThemeReducerProps,
    UserReducer: UserReducerProps,
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.FormReducer,
    ...reducers.ResponseReducer,
    ...reducers.SubjectReducer,
    ...reducers.ThemeReducer,
    ...reducers.UserReducer,

});

interface IList {
    isFetching: boolean,
    isFetchingItem: boolean,
    isFetchingLike: boolean,
    likesCount: boolean,
    likedItem: boolean,
    responsesCreated: SubjectResponse[],
    subject: Subject,
    updateLikeSubject: () => void;
}

export const Item = compose(
    connect(
        mapStateToProps,
        {
            createResponse,
            getSubject,
            updateLikeSubject
        }
    ),
    lifecycle({
        componentDidMount() {
            const { getSubject, match }: any  = this.props;
            getSubject(match.params.id);
        }
    })
)(({ backgroundTheme, createResponse, isFetching, isFetchingItem, isFetchingLike, isLogged, likesCount, likedItem, match: { params: { id } }, responsesCreated, subject, textTheme, updateLikeSubject }: IList & ITheme & any) => (
    <Layout container title={subject ? subject.name : undefined}>
        <div className="row m-0">
            {
                isFetchingItem ?
                    <Loader text={'Chargement du sujet en cours'} /> :
                    subject ?
                        <React.Fragment>
                            <div className="col-sm-12 col-md-4 d-md-flex pb-5 order-md-2">
                                <div className="m-auto">
                                    <h4>
                                        <Link to={`/user/${ subject.subjectCreator.username }`} className={`text-${textTheme}`}>
                                            <i className="far fa-user-circle"/> Auteur : { subject.subjectCreator.username }
                                        </Link>
                                    </h4>
                                    <h4>
                                        <HashLink to={`#comments`} className={`text-${textTheme}`}>
                                            <i className="fa fa-comment-alt"/> Réponses : { subject.responsesCount + responsesCreated.length }
                                        </HashLink>
                                    </h4>
                                    <h4
                                        className={`cursor-pointer text-${textTheme} ${ isFetchingLike ? 'opacity-6' : null } ${ likedItem ? 'liked' : null }`}
                                        onClick={() => !isFetchingLike && updateLikeSubject({subjectId: id, isLiked: likedItem})}>
                                        <i className="fa fa-heart"/> Likes : { likesCount }
                                    </h4>
                                    { likedItem ? <Danger>Vous aimez ce sujet</Danger> : null }
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-8 py-md-0 order-md-1">
                                <span className="description-clamped">{ subject.description }</span>
                            </div>
                            <div className="col-sm-12 dropdown-divider py-4 order-11" />
                            <div className="col-12 order-12">
                                <h2 className={`pb-2 text-${textTheme}`} id="comments"><i className="fa fa-comment-alt"/> Messages :</h2>
                                <div className="pb-3">
                                    {
                                        isLogged && !(subject.responses.length || responsesCreated.length) ?
                                            <Info>
                                                <span>
                                                    Malheureusement il n'y a pas encore de commentaire pour ce sujet. Soyez le premier à commenter ce sujet
                                                </span>
                                            </Info> :
                                            !isLogged ?
                                                <Info>
                                                    <span>
                                                        <Link to="/connection">Connectez vous ou inscrivez vous pour commenter ce sujet</Link>
                                                    </span>
                                                </Info> : null
                                    }
                                    {
                                        subject.responses.length || responsesCreated.length ?
                                            [...subject.responses, ...responsesCreated].reverse().map((response: SubjectResponse, index: number) => (
                                                <Response key={index} response={response}/>
                                            )) : null
                                    }
                                </div>
                                {
                                    isLogged ?
                                        <React.Fragment>
                                            <div className="col-sm-12 dropdown-divider py-2 order-11" />
                                            <GenerateForm fields={[response]} onSubmit={createResponse} isFetching={isFetching} />
                                        </React.Fragment> : null
                                }
                            </div>
                        </React.Fragment> :
                        <Warning className={'m-auto'}>
                            <span>
                                Le sujet sélectionné n'a pas été trouvé
                            </span>
                        </Warning>
            }
        </div>
    </Layout>
));
