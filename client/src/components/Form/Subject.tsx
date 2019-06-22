import React from 'react';
import { GenerateForm } from './Common';
import { connect } from 'react-redux';
import { category, description, image, name } from "./fields";
import { UserReducerProps } from "../User/store/userReducer";
import { FormReducerProps } from "./store/formReducer";
import { createSubject } from "../Item/store/action";
import { Category, Option } from "../Objects";
import { compose, lifecycle } from "recompose";
import { getCategories } from "../../helpers";
import { getCategory } from "../Category/store/action";
import { CategoryReducerProps } from "../Category/store/categoryReducer";

interface Reducer {
    CategoryReducer: CategoryReducerProps,
    FormReducer: FormReducerProps,
    UserReducer: UserReducerProps
}

const defaultOption: Option = {
    text: 'Choisissez une catégorie',
    value: '',
};

const categoryBuilder = (categories: Category[]) => {
    let categoryBuild = category;
    let categoryOptions: Option[] = [ defaultOption ];

    categories.map(category => categoryOptions.push({ text: category.name, value: category['@id'] }));

    categoryBuild.options = categoryOptions;
    return categoryBuild;
};

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.CategoryReducer,
    ...reducers.FormReducer,
    ...reducers.UserReducer,
});

export const SubjectForm = compose(
    connect(
        mapStateToProps,
        {
            createSubject,
            getCategories,
            getCategory
        }
    ),
    lifecycle({
        componentDidMount() {
            if (!JSON.parse(getCategories()).length) {
                const { getCategory }: any = this.props;
                getCategory();
            }
        }
    })
)(({ categories, createSubject, ...rest }: any) => (
    <GenerateForm
        fields={[name, description, categoryBuilder(JSON.parse(getCategories()).length ? JSON.parse(getCategories()) : categories), image]}
        onSubmit={createSubject}
        {...rest}
    />
));
