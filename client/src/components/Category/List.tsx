import React from 'react';
import { Category } from "../Objects";
import { Accordion } from "../Accordion";
import { Layout } from "../Layout";
import { connect } from "react-redux";
import { CategoryReducerProps } from "./store/categoryReducer";
import { getCategory } from "./store/action";
import { compose, lifecycle } from "recompose";
import { Loader } from "../Layout/Loader";
import { Warning } from "../Layout/Alert";

interface Reducer {
    CategoryReducer: CategoryReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.CategoryReducer
});

interface IList {
    isFetching: boolean;
}

export const List = compose(
    connect(
        mapStateToProps,
        {
            getCategory
        }
    ),
    lifecycle({
        componentDidMount() {
            const { getCategory }: any = this.props;
            getCategory();
        }
    })
)(({ isFetching, categories }: IList & any) => (
    <Layout title={'Découvrez toutes nos catégories'} container>
        {
            isFetching ?
                <Loader text={'Chargement en cours des catégories'} /> :
                categories.length ?
                    categories.map((category: Category, index: number) => (
                        <Accordion key={index} category={category}/>
                    )) :
                    <Warning>
                        <span>
                            Aucune catégorie n'a été trouvée pour le moment, veuillez contacter le responsable du site si le problème persiste
                        </span>
                    </Warning>
        }
    </Layout>
));
