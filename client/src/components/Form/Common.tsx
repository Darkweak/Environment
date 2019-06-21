import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Spinner } from 'react-bootstrap';
import { Field, Link as LinkObject } from '../Objects';

export const formatFormDatas = (elements: any) => [].reduce.call(elements, (data: any, element: any) => {
    if ('' !== element.value) {
        data[ element.name ] = element.value;
    }
    return data;

}, {});

export const generateFields: any = (fields: Field[], isLoading: boolean = false) => (
    fields.map((field: Field, index: number) => (
        <Form.Group key={index} className={field.className}>
            {
                field.label && (
                    <Form.Label>
                        {field.label}
                    </Form.Label>
                )
            }
            <Form.Control
                name={field.name}
                type={field.type || 'text'}
                as={'textarea' === field.type ? 'textarea' : 'input'}
                placeholder={field.placeholder && field.placeholder}
                disabled={isLoading}
            />
            {
                field.text && (
                    <Form.Label>
                        {field.text}
                    </Form.Label>
                )
            }
        </Form.Group>
    ))
);

interface IGenerateForm {
    additionnalLinks?: LinkObject[],
    button?: any
    children?: any;
    className?: string;
    fields?: Field[];
    isFetching?: boolean;
    onSubmit: (args?: any) => void;
    withoutText?: boolean;
}

export const GenerateForm: any = ({
                                      additionnalLinks = [],
                                      button = {
                                          variant: 'success',
                                          center: 'm-auto',
                                          text: 'Valider'
                                      },
                                      children,
                                      className,
                                      fields,
                                      isFetching,
                                      onSubmit,
                                      withoutText
                                  }: IGenerateForm) => (
    <Form className={className} onSubmit={(event: any) => {
        event.preventDefault();
        onSubmit(formatFormDatas(event.target.elements))
    }}>
        {children}
        {
            generateFields(fields, isFetching)
        }
        <div className="col-12">
            <Button variant={ button.variant } type="submit" className={`d-block ${ button.center }`} disabled={isFetching}>
                {isFetching ? <Spinner animation="border" size="sm"/> : button.text}
            </Button>
        </div>
        {
            withoutText ?
                null :
                <div className="py-2 text-center">
                    {
                        additionnalLinks.map(
                            (link: LinkObject, index: number) => <Link className="d-block" key={index}
                                                              to={link.path}>{link.label}</Link>
                        )
                    }
                </div>
        }
    </Form>
);
