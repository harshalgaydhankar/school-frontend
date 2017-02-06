import React from 'react';

export default (props) =>{
    return (
        <div className="box">
            <div onClick={props.click} className = {props.css} data-id={props.id}>{props.text}</div>
        </div>
    );
};