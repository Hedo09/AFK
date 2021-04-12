import React from 'react';

const CartEntry = (props) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.description}</td>
        <td>{props.price}</td>
        <td>{props.quantity}</td>
        <td>{props.price * props.quantity}</td>
    </tr>
);

export default CartEntry;