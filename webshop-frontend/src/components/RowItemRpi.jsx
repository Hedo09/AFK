import React from 'react';
import {timestampToDate} from "../util/util";

const RowItemRpi = (props) => (
    <tr>
        <th scope="row">{props.id}</th>
        <td>{timestampToDate(props.timestamp)}</td>
        <td>{props.cpu + "%"}</td>
        <td>{props.memory + "%"}</td>
    </tr>
);

export default RowItemRpi;