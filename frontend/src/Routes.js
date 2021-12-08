import React from 'react';
import { Route, BrowserRouter as Router, Routes as Switch, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Chats from './pages/Chats';
import Sandbox from './pages/Sandbox';

import { getToken } from './utils/localStorageUtils';


// Guard to check if user has token
const authGuard = (Component) => (props) => {
    const token = getToken();

    if (!token) {
        return (<Navigate to="/logged-out" {...props} />);
    } else {
        return (<Component {...props} />);
    }
};

const Routes = () => {
    return (
        <Router>
        <Switch>
            <Route path ="/login" render={() => <Login />}/>
            <Route path="/">
                <Navigate to="/chats" />
            </Route>
            <Route path = "/chats" render={(props) => authGuard(Chats)(props)} />
            <Route path = "/dev/sandbox" render={() => <Sandbox/>} />
        </Switch>
    </Router>
    )
}

export default Routes;