import React from 'react';
import { Button, Modal as BModal } from "react-bootstrap";
import { SubjectForm } from "../Form/Subject";


export const Modal = ({ ...rest }) => (
    <BModal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <BModal.Header closeButton>
            <BModal.Title id="contained-modal-title-vcenter">
                Création d'un nouveau sujet <i className="far fa-comment-alt"/>
            </BModal.Title>
        </BModal.Header>
        <BModal.Body>
            <SubjectForm/>
        </BModal.Body>
        <BModal.Footer>
            <Button>Close</Button>
        </BModal.Footer>
    </BModal>
)
