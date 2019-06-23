import React from 'react';
import { Subject } from "../Objects";
import { Layout } from "../Layout";
import { ItemList } from "../Item";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { SubjectReducerProps } from "../Item/store/itemReducer";
import { SearchSubject } from "../Search";
import { getSubjects } from "../Item/store/action";
import { Loader } from "../Layout/Loader";
import { Warning } from "../Layout/Alert";

interface Reducers {
    SubjectReducer: SubjectReducerProps
}

const mapStateToProps = ( reducers: Reducers ) => ({
    ...reducers.SubjectReducer
});

export const Item = compose(
    connect(
        mapStateToProps,
        {
            getSubjects
        }
    ),
    lifecycle({
        componentDidMount() {
             const { getSubjects }: any = this.props;
            getSubjects();
        }
    })
)(({ isFetchingItem, match: {params: {name}}, subjects }: any) => (
    <Layout title={`Sujets de la catégorie ${ name }`} container>
        <SearchSubject/>
        {
            isFetchingItem ?
                <Loader text={'Chargement en cours'}/> :
                subjects.length ?
                    <div className="row m-0">
                        {
                            subjects.map((item: Subject, index: number) => (
                                <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-4 p-3">
                                    <ItemList item={item}/>
                                </div>
                            ))
                        }
                    </div> :
                    <Warning>
                        La catégorie {name} n'a pas été trouvée, veuillez réessayer plus tard ou contacter l'administrateur du site
                    </Warning>
        }
    </Layout>
));
