import React from 'react';
import RowItemRpi from "./RowItemRpi";

class RpiData extends React.Component {


    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.props.onGetData}>Refresh</button>
            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">CPU</th>
                    <th scope="col">Memory</th>
                </tr>
                </thead>
                <tbody>
                {this.props.rpidata? this.props.rpidata.map(c => (<RowItemRpi id={c[0]} timestamp ={c[1]} cpu={c[2]} memory={c[3]}/>)) : ""}
                </tbody>
            </table>
            </div>
        );
    }
}
export default RpiData;