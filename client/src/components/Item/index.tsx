import React from 'react';
import { Link } from "react-router-dom";
import { Subject } from "../Objects";

interface IItemList {
    item: Subject
}

export const ItemList = ({ item }: IItemList) => (
  <div className="card h-100 shadow position-relative">
    <div className={`position-relative d-flex`}>
      <img
        className="img-fluid w-100 img-fit"
        src={item.imageUrl}
        alt={item.imageName}/>
    </div>
    <div className="bg-primary text-center">
      <h5 className="card-title text-center m-0 py-4">
        <Link className="text-white text-decoration-none" to={`${item['@id']}`}>
            {item.name}
        </Link>
      </h5>
    </div>
    <div className="card-body position-relative">
      <p className="card-text description-clamped">{item.description}</p>
      <div className="card-text text-right">
          <Link to={`${item['@id']}`} className="text-decoration-none">
              Voir tout l'article <i className="fa fa-arrow-right"/>
          </Link>
      </div>
    </div>
    <div className="card-body position-relative d-flex">
      <p className="card-text"><i className="fa fa-comment-alt"/> {item.responsesCount}</p>
      <p className="card-text ml-auto">
          <i className="fa fa-user-circle"/> <Link to={`/user/${item.subjectCreator.username}`}>{item.subjectCreator.username}</Link>
      </p>
    </div>
  </div>
);

