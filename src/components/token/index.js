import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        var userToken = 'null';
        
        if(tokenString !== 'undefined' && tokenString !== 'null'){
            userToken = JSON.parse(tokenString);
        }
        return userToken
    };
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}

// const save_token = (userToken) => {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
//     // setToken(userToken.token);
// };

// const get_token = () => {
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     console.log(userToken);
//     return userToken?.access_token
// };

// export default { save_token, get_token };