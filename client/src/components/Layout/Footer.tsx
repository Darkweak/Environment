import React from 'react';
import { Link } from "react-router-dom";
import { ITheme } from "./index";
import { switchTheme } from "./store/action";
import { connect } from "react-redux";
import { compose, withState } from "recompose";
import { getBackgroundTheme, getTextTheme } from "../../helpers";
import { ThemeReducerProps } from "./store/themeReducer";

const brands = [
    'instagram',
    'facebook',
    'twitter'
];

interface IFooter {
    switchTheme: () => void;
}

interface Reducer {
    ThemeReducer: ThemeReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.ThemeReducer
});

export const Footer = compose(
    connect(
        mapStateToProps,
        {
            switchTheme
        }
    ),
    withState('checked', 'check', 'primary' === getBackgroundTheme())
)(({ backgroundTheme, check, checked, switchTheme, textTheme }: IFooter & ITheme & any) => (
    <footer className={`footer py-4 text-${textTheme} bg-${backgroundTheme}`}>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-4 text-center align-items-center d-flex order-md-1 py-2">
                    <span
                        className="text-muted d-block m-auto">© ENVIRONMENT - {(new Date()).getFullYear()}</span>
                </div>
                <div className="col-sm-12 col-md-4 order-md-0 py-2">
                    <div className="align-items-center row m-0 h-100">
                        <div className="m-auto">
                            <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="nightmode"  onChange={() => { switchTheme(); check(!checked) }} checked={checked} />
                                <label className={`custom-control-label text-${textTheme}`} htmlFor="nightmode">Mode nuit</label>
                            </div>
                            <Link to="/cgu" className="d-block text-muted text-decoration-none">Conditions générales</Link>
                            <Link to="/about" className="d-block text-muted text-decoration-none">À propos</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4 text-center order-md-2 py-2">
                    <div className="align-items-center row m-0 h-100">
                        <span className="text-muted col-sm-12">Restons en contact</span>
                        <div className="col-sm-12 d-flex justify-content-around">
                            {
                                brands.map((brand, index) => <a href={`https://${brand}.com`} key={index}
                                                                className={`d-flex text-decoration-none text-muted fab fa-${brand} display-4`}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
));
