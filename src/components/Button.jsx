import React from 'react';

const Button = props => {
    return (
        <button type={props.type} className={props.klass}>{props.text}</button>
    );
};

export default Button;
