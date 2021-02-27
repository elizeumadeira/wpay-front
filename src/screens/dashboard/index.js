import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import Modal from 'react-modal';
import Form from './form';
// import { Link } from "react-router-dom";
// import { storedConfigs } from '../../configs';
// import './index.scss';
import useToken from '../../components/token';
import ListItem from './urlitemlist';

Modal.setAppElement('#root');

export default (props) => {
    const { token, setToken } = useToken();
    const [redirect, setRedirect] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [urlEdit, setUrlEdit] = useState('');

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIdEdit(null);
        setUrlEdit('');
        setIsOpen(false);
    }

    useEffect(() => {
        if (token === null) {
            setRedirect(true);
        }
    }, [token]);

    React.useEffect(() => {
        get_urls_lists();
    }, []);

    const get_urls_lists = () => {
        fetch('http://localhost:8000/urls', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(urls => {
                let list = urls.map((url) => {
                    return <ListItem key={url.id} id={url.id} url={url.url} status_code={url.status_code} edit={open_for_edit} />
                });
                setUrlList(list);
            });
    };
    const [url_list, setUrlList] = useState([]);

    function open_for_edit(id, url) {
        // console.log(id, url);
        setIdEdit(id);
        setUrlEdit(url);
        openModal();
    }

    return (
        redirect ? <Redirect to="/" /> :
            <>
                <button onClick={openModal}>Open Modal</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <Form setIsOpen={setIsOpen} token={token.access_token} id={idEdit} url={urlEdit} updateList={get_urls_lists} />
                </Modal>
                <button onClick={() => setToken(null)}>Sair</button>
                <h1>Dashboard</h1>
                <div id="container-dashboard">
                    <div>
                        {url_list}
                    </div>
                </div>
            </>
    )
}