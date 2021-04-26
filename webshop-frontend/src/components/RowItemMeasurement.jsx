import React from 'react';
import {timestampToDate} from "../util/util";

const RowItemMeasurement = (props) => (
    <tr>
        <th scope="row">{props.id}</th>
        <td>{timestampToDate(props.timestamp)}</td>
        <td>{props.value}</td>
    </tr>
);

export default RowItemMeasurement;