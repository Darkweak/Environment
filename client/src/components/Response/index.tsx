import React from 'react';
import { SubjectResponse } from "../Objects";
import { Link } from "react-router-dom";

interface IResponse {
    response: SubjectResponse
}

export const Response = ({ response }: IResponse) => (
    <div className="p-3">
        <div className="card h-100 shadow">
            <div className="card-body position-relative">
                <div className="col-sm-12">
                    <Link to={`/users/${response.responseCreator.username}`} className="text-decoration-none">{ response.responseCreator.username }</Link> a répondu :
                </div>
                <div className="dropdown-divider col-12"/>
                <div className="col-sm-12">
                    { response.description }
                </div>
            </div>
        </div>
    </div>
)
