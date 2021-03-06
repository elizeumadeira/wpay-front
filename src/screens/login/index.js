import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import useToken from '../../components/token';
import utils from '../../utils/utils.js';

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

    async function login(credentials) {
        return fetch(`${utils.url_base}login`, {
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