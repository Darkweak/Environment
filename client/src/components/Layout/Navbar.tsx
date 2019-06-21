import React from 'react';
import {
    Nav,
    NavDropdown,
    Navbar as BNavbar,
} from 'react-bootstrap';
import { LoginForm } from "../Form/Login";
import { connect } from "react-redux";
import { UserReducerProps } from "../User/store/userReducer";
import { logout } from "../User/store/action";
import { ThemeReducerProps } from "./store/themeReducer";
import { ITheme } from "./index";

interface Reducer {
    ThemeReducer: ThemeReducerProps,
    UserReducer: UserReducerProps
}

const mapStateToProps = (reducers: Reducer) => ({
    ...reducers.ThemeReducer,
    ...reducers.UserReducer
});

interface INavbar {
    isLogged: boolean,
    logout: () => void;
    username: string;
}

const currentPath = (path: string, strict?: boolean) => strict ? window.location.pathname === path : window.location.pathname.includes(path);

export const Navbar = connect(
    mapStateToProps,
    {
        logout
    }
)(({ backgroundTheme, isLogged, logout, textTheme, username }: INavbar & ITheme) => (
    <BNavbar
        bg={ 'secondary' === textTheme ? 'dark' : 'light' }
        variant={ 'secondary' === textTheme ? 'dark' : 'light' }
        expand="lg"
        className={`bg-${backgroundTheme}`}>
        <div className="container">
            <BNavbar.Brand href="#home">ENVIRONMENT</BNavbar.Brand>
            <BNavbar.Toggle />
            <BNavbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/" active={currentPath('/', true)}><i className="fa fa-home"/> Accueil</Nav.Link>
                    <Nav.Link href="/categories" active={currentPath('/categories')}><i className="far fa-list-alt"/> Catégories</Nav.Link>
                    <Nav.Link href="/subjects" active={currentPath('/subjects')}><i className="far fa-comment-alt"/> Sujets</Nav.Link>
                </Nav>
                <Nav>
                    {
                        isLogged ?
                            <NavDropdown title={ username } id="account">
                                <NavDropdown.Item href="/profile"><i className="far fa-user-circle"/> Profil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => logout()}><i className="fa fa-sign-out-alt"/> Déconnexion</NavDropdown.Item>
                            </NavDropdown> :
                            <NavDropdown alignRight title="Connexion" id="basic-nav-dropdown">
                                <LoginForm />
                            </NavDropdown>
                    }
                </Nav>
            </BNavbar.Collapse>
        </div>
    </BNavbar>
));
