import React from 'react';

const CategoryItem = (props) => (
    <li key={props.id} data-id={props.id} onClick={props.onClick}><a>{props.name}</a></li>
);

export default CategoryItem;