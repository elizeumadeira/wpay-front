import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { storedConfigs } from '../../configs';
// import './index.scss';
// import consts from '../../components/token';
// import {save_token, get_token} from '../../components/token';
import useToken from '../../components/token';

export default (props) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { token, setToken } = useToken();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (token !== 'null') {
            setRedirect(true);
        }
    }, [token]);

    // useEffect(() => {
    //     <Redirect to="/dashboard" />
    // }, [redirect]);

    async function login(credentials) {
        return fetch('http://127.0.0.1:8096/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(data => data.json());
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await login({
            email: username,
            password
        });
        setToken(token);
        setRedirect(true);
    }

    const facilitador_login = () => {
        setUserName('admin@admin.com');
        setPassword('admin');
    };

    return (
        redirect ? <Redirect to="/dashboard" /> : 
        <>
            <h1>Login</h1>
            {props.message && <div>${props.message}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <button type="button" onClick={e => facilitador_login()}>Use esse!</button>
                </div>
                <div className="form-control">
                    <label>Login </label>
                    <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="form-control">
                    <label>Senha: </label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Acessar</button>
                </div>
            </form>
        </>
    )
}