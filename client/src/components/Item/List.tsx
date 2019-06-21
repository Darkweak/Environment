import React from 'react';
import { SubjectReducerProps } from "./store/itemReducer";
import { Subject } from "../Objects";
import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { SearchSubject } from "../Search";
import { Layout } from "../Layout";
import { Loader } from "../Layout/Loader";
import { ItemList } from "./index";
import { Warning } from "../Layout/Alert";
import { getSubjects } from "./store/action";

interface Reducer {
    SubjectReducer: SubjectReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.SubjectReducer
});

interface IList {
    isFetchingList: boolean,
    subjects: Subject[],
}

export const List = compose(
    connect(
        mapStateToProps,
        {
            getSubjects
        }
    ),
    lifecycle({
        componentDidMount() {
            const { getSubjects }: any  = this.props;
            getSubjects();
        }
    })
)(({ isFetchingList, subjects }: IList & any) => (
    <Layout container title={'Voici la liste de tous nos sujets'}>
        <SearchSubject/>
        <div className="row m-0">{
            isFetchingList ?
                <Loader text={'Chargement des sujets en cours'} /> :
                subjects && subjects.length ?
                    subjects.map((subject: Subject, index: number) => (
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
