import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import { routes } from './routes';
import './css/main.css';
import { reducers } from "./reducers";

export const history: any = createBrowserHistory();
export const store = createStore(
    combineReducers({
        router: connectRouter(history),
        ...reducers
    }),
    {},
    applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                {
                    routes.map((route, index) => <Route key={index} path={route.path} component={route.component}/>)
                }
            </Switch>
        </Router>
    </Provider>,
    window.document && window.document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
