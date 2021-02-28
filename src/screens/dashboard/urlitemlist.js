import React from 'react';
import utils from '../../utils/utils.js';

function ListItem(props) {
    return (
        <div>
            <label>{props.url}</label>
            <label>{props.status_code} {utils.dot_status_code(props.status_code)}</label>
            <button className="editar" onClick={() => {props.edit(props.id, props.url)}}>Editar</button>
            <button className="visualizar" onClick={() => {props.view(props.id)}}>Visualizar</button>
        </div>
    )
}

export default ListItem;
