import React from 'react';

function ListItem(props) {
    // console.log(props);
    return (
        <div>
            <label>{props.url}</label>
            <label>{props.status_code}</label>
            <button onClick={() => {props.edit(props.id, props.url)}}>Editar</button>
            <button onClick={() => {props.view(props.id)}}>Visualizar</button>
        </div>
    )
}

export default ListItem;
