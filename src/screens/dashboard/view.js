import React, { useState } from 'react';

function ViewUrl(props) {
    const [url, setUrl] = useState('');
    const [status_code, setStatusCode] = useState(0);

    const get_content = (id) => {
        if (id !== null)
            fetch(`http://127.0.0.1:8096/url/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                },
            })
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .then(url => {
                    setUrl(url.url);
                });
    };

    get_content(props.id);
    // console.log(props)

    return (
        <div>
            <label>{url}</label>
            <label>{status_code}</label>
            <iframe src={`http://127.0.0.1:8096/url/show_content/${props.id}`}></iframe>
            <button onClick={props.setViewOpen}>Fechar</button>
        </div>
    )
}

export default ViewUrl;
