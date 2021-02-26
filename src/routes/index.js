import React, { useEffect, useState } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import Login from '../screens/login';
import Dashboard from '../screens/dashboard';
import useToken from '../components/token';

export default props => {
    // const { token, setToken } = useToken();

    // useEffect(() => {
    //     console.log('route', token);
    // }, [token]);

    return (
        <Switch>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route exact path="/">
                <Login />
            </Route>

        </Switch>
    );
}
