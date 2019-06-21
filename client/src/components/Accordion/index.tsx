import React from 'react';
import { Link } from "react-router-dom";
import { Category, Subject } from "../Objects";
import { compose, withState } from 'recompose';
import { ItemList } from "../Item";

interface IAccordion {
    category: Category;
}

export const Accordion: any = compose(
    withState('isOpen', 'setOpen', true)
)(({category, isOpen, setOpen}: IAccordion & any) => (
    <div className="py-4">
        <div className={`d-flex p-3 bg-${ category.color }`}>
            <h3>
                <Link to={`/category/${ category.name }`} className="text-decoration-none">
                    {category.name}
                </Link>
            </h3>
            <h2 className="ml-auto" onClick={() => setOpen(!isOpen)}>
                <i className={`fa fa-caret-up ${isOpen ? 'rotate-0' : 'rotate-180' } transition`} />
            </h2>
        </div>
        <div className={`container items-category-list transition ${isOpen ? 'open' : 'close'}`}>
            <div className="row text-center flex-nowrap">
                {
                    category.subjects.reverse().map((item: Subject, index: number) => (
                        <div key={index} className="col-12 col-sm-11 col-md-5 col-lg-4 p-3">
                            <ItemList item={item}/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
));
