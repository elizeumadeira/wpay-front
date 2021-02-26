import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { storedConfigs } from '../../configs';
// import './index.scss';
import useToken from '../../components/token';

export default (props) => {
    const { token, setToken } = useToken();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (token === null) {
            setRedirect(true);
        }
    }, [token]);

    return (
        redirect ? <Redirect to="/" /> : 
        <>
            <button onClick={() => setToken(null)}>
                Sair
            </button>
            <h1>Dashboard</h1>
        </>
    )
}