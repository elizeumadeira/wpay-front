import React, { useState } from 'react';
import utils from '../../utils/utils.js';

function ViewUrl(props) {
    const [url, setUrl] = useState('');
    const [status_code, setStatusCode] = useState(0);

    const get_content = (id) => {
        if (id !== null)
            fetch(`${utils.url_base}url/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                },
            })
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .then(url => {
                    setStatusCode(url.status_code)
                    setUrl(url.url);
                });
    };

    get_content(props.id);

    console.log(utils.url_base);

    return (
        <div className="view_url">
            <label>{url}</label>
            <label>Status Code: {status_code} {utils.dot_status_code(status_code)} </label>
            <iframe src={`${utils.url_base}url/show_content/${props.id}`}></iframe>
        </div>
    )
}

export default ViewUrl;
