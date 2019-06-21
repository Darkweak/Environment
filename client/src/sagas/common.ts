import { getToken } from '../helpers';
import axios from 'axios';

export const encodeParams = (obj: any) => {
    let values = '';
    Object.keys(obj).forEach((elt: any) => values += `${elt}=${obj[elt]}&`);

    return values;
};

export const getUrl = () => decodeURIComponent(window.location.pathname).split('/');

interface CommonRequestProps {
    body?: any;
    callback?: {
        error: string,
        success: string,
    };
    dispatch: any;
    isForm?: boolean;
    method: string;
    path: string;
}

export async function commonRequest({
                                        body = null,
                                        callback,
                                        dispatch,
                                        isForm,
                                        method = 'GET',
                                        path
                                    }: CommonRequestProps) {
    try {
        let headers: any = {
            Accept: 'application/ld+json',
            'Content-Type': 'application/ld+json'
        };
        if (getToken()) {
            headers.Authorization = `Bearer ${getToken()}`;
        }
        const request: any = ({
            url: `${ process.env.REACT_APP_API_ENTRYPOINT }${ path }`,
            method,
            headers: headers,
            data: body && JSON.stringify(body)
        });
        const res = await axios.request(request);
        if (callback) {
            dispatch({
                type: callback.success,
                payload: res.data[ 'hydra:member' ] ? res.data[ 'hydra:member' ] : res.data,
                isList: !!res.data[ 'hydra:member' ]
            });
        }
    } catch (e) {
        if (callback) {
            dispatch({
                type: callback.error
            });
        }
    }
}
