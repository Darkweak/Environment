import React from 'react';
import { SubjectReducerProps } from "./store/itemReducer";
import { Subject } from "../Objects";
import { compose, lifecycle, withState } from "recompose";
import { connect } from "react-redux";
import { SearchSubject } from "../Search";
import { Layout } from "../Layout";
import { Loader } from "../Layout/Loader";
import { ItemList } from "./index";
import { Warning } from "../Layout/Alert";
import { getSubjects } from "./store/action";
import { Button } from "react-bootstrap";
import { Modal } from "./Modal";
import { UserReducerProps } from "../User/store/userReducer";

interface Reducer {
    SubjectReducer: SubjectReducerProps
    UserReducer: UserReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.SubjectReducer,
    ...reducers.UserReducer
});

interface IList {
    isFetchingList: boolean,
    subjects: Subject[],
    subjectsCreated: Subject[]
}

export const List = compose(
    connect(
        mapStateToProps,
        {
            getSubjects
        }
    ),
    withState('isOpen', 'setOpen', false),
    lifecycle({
        componentDidMount() {
            const { getSubjects }: any  = this.props;
            getSubjects();
        }
    })
)(({ isFetchingList, isLogged, isOpen, setOpen, subjects, subjectsCreated }: IList & any) => (
    <Layout container title={'Voici la liste de tous nos sujets'}>
        {
            isLogged ? <Button variant="success" className={`d-block`} onClick={() => setOpen(true)}>
                <i className="fa fa-plus-square"/> Ajouter un sujet
            </Button> : null
        }
        <Modal show={isOpen} onHide={() => setOpen(false)}/>
        <SearchSubject/>
        {console.log(subjectsCreated)}
        <div className="row m-0">{
            isFetchingList ?
                <Loader text={'Chargement des sujets en cours'} /> :
                ((subjects && subjects.length) || (subjectsCreated && subjectsCreated.length)) ?
                    [...subjects, ...subjectsCreated].reverse().map((subject: Subject, index: number) => (
                        <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-4 p-3">
                            <ItemList item={ subject } key={ index }/>
                        </div>
                    )) :
                    <Warning className={'m-auto'}>
                        <span>
                            Aucun sujet correspondant à la recherche n'a été trouvé
                        </span>
                    </Warning>
        }
        </div>
    </Layout>
));
