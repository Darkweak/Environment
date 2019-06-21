import React from 'react';
import { Field } from "../Objects";
import { GenerateForm } from "../Form/Common";
import { getSubjects } from "../Item/store/action";
import { connect } from "react-redux";
import { response } from "../Form/fields";

const search: Field = {
    placeholder: 'Rechercher un topic',
    name: 'name',
    label: 'Chercher un topic',
    className: 'col-sm-12 col-md-8'
};

const author: Field = {
    placeholder: 'Auteur',
    name: 'subjectCreator.username',
    label: 'Chercher un auteur',
    type: 'select',
    className: 'col-sm-12 col-md-4'
};

export const SearchSubject = connect(
    null,
    {
        getSubjects
    }
)(({ getSubjects }) => (
    <div className="p-3">
        <GenerateForm
            withoutText
            fields={[search, author]}
            onSubmit={getSubjects}
            className="table-active p-3 row"
            button={{
                variant: 'info',
                center: false,
                text: <i className="fa fa-search"/>
            }}
        />
    </div>
));

export const RespondToSubject = connect(
    null,
    {
        getSubjects
    }
)(({ getSubjects }) => (
    <div className="p-3">
        <GenerateForm
            withoutText
            fields={[response]}
            onSubmit={getSubjects}
            className="table-active p-3 row"
            button={{
                variant: 'info',
                center: false,
                text: <i className="fa fa-search"/>
            }}
        />
    </div>
));
