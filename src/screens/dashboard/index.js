import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import Modal from 'react-modal';
import Form from './form';
// import { Link } from "react-router-dom";
// import { storedConfigs } from '../../configs';
// import './index.scss';
import useToken from '../../components/token';
import ListItem from './urlitemlist';
import ViewUrl from './view';

Modal.setAppElement('#root');

export default (props) => {
    const { token, setToken } = useToken();
    const [redirect, setRedirect] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const [urlEdit, setUrlEdit] = useState('');
    const [idEdit, setIdEdit] = useState(null);

    const [modalViewIsOpen, setViewIsOpen] = useState(false);
    const [idView, setIdView] = useState(null);

    function openModal() {
        setIsOpen(true);
    }

    function openViewModal() {
        setViewIsOpen(true);
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

    function closeViewModal() {
        setIdView(null);
        setViewIsOpen(false);
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
        fetch('http://127.0.0.1:8096/urls', {
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
                    return <ListItem key={url.id} id={url.id} url={url.url} status_code={url.status_code} edit={open_for_edit} view={open_for_view} />
                });
                setUrlList(list);
            });
    };
    const [url_list, setUrlList] = useState([]);

    function open_for_edit(id, url) {
        setIdEdit(id);
        setUrlEdit(url);
        openModal();
    }

    function open_for_view(id) {
        console.log('open_for_view');
        setIdView(id);
        openViewModal();
    }

    return (
        redirect ? <Redirect to="/" /> :
            <>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <Form setIsOpen={setIsOpen} setViewOpen={setViewIsOpen} token={token.access_token} id={idEdit} url={urlEdit} updateList={get_urls_lists} />
                </Modal>
                <Modal
                    isOpen={modalViewIsOpen}
                >
                    <ViewUrl token={token.access_token} id={idView} setViewOpen={closeViewModal}  />
                </Modal>
                <button onClick={() => setToken(null)}>Sair</button>
                <h1>Dashboard</h1>
                <div id="container-dashboard">
                    <button onClick={openModal}>Inserir URL</button>
                    <button onClick={get_urls_lists}>Atualizar Lista</button>
                    <div>
                        {url_list}
                    </div>
                </div>
            </>
    )
}