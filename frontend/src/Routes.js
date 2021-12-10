import React from 'react';
import { Route, BrowserRouter as Router, Routes as Switch, Navigate, Outlet } from 'react-router-dom';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Chats from './pages/Chats';
import Sandbox from './pages/Sandbox';

import { getToken } from './utils/localStorageUtils';


// Guard to check if user has token
const AuthGuard = () => {
    const token = getToken();
    return token ? <Outlet /> : <Navigate replace to="/logged-out" />;
};

const Routes = () => {
    return (
        <Router>
        <Switch>
            <Route path ="/login" element={<Login />}/>
            <Route path ="/create-account" element={<CreateAccount />}/>
            <Route path="/" element={<Navigate replace to="/chats"/>}/>
            <Route path = "/chats" element = {<AuthGuard/>} >
                <Route path = "" element={<Chats />} />
            </Route>
            <Route path = "/logged-out" element={<Sandbox/>} />
            <Route path = "/dev/sandbox" element={<Sandbox/>} />
        </Switch>
    </Router>
    )
}

export default Routes;