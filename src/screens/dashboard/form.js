import React, { useEffect, useState } from 'react';
import utils from '../../utils/utils.js';

function Form(props) {
    console.log('id', props);
    // const [id_url, setIDUrl] = useState(props.id ?? null);
    const [url, setUrl] = useState(props.url);
    const [valid_url, setValidUrl] = useState(false);

    function is_valid_url(string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    function enviar_url() {
        fetch(`${utils.url_base}url${props.id !== null && '/' + props.id}`, {
            method: props.id == null ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${props.token}`
            },
            body: JSON.stringify({url: url})
        })
        .then(data => props.setIsOpen())
        .then(data => props.updateList());
        // props.setIsOpen();
    }

    useEffect(() => {
        setValidUrl(is_valid_url(url));
    }, [url]);

    return (
        <div className="container-form">
            <div className="campo">
                <label>URL</label>
                <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
                <small>{valid_url ? 'URL válida' : 'URL inválida'}</small>
            </div>
            <div className="campo">
                <button type="button" disabled={!valid_url} onClick={e => enviar_url()}>Use esse!</button>
            </div>
        </div>
    );
}

export default Form;
