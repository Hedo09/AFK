import React, {useState} from 'react';
import RowItemMeasurement from "./RowItemMeasurement";
import {timestampToDate} from "../util/util";
import RowItemRpi from "./RowItemRpi";
import RowItemUser from "./RowItemUser";

class Temperature extends React.Component {

    state = {
        deleteName: ""
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.props.onGetData}>Refresh</button>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.users? this.props.users.map(c => (<RowItemUser name={c} />)) : ""}
                    </tbody>
                </table>
                <form className="form-inline">
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="inputPassword2" className="sr-only">Name</label>
                        <input onChange={(event) => this.setState({deleteName: event.target.value})} type="password"
                               className="form-control" id="inputPassword2" placeholder="Name of User"/>
                    </div>
                    <button type="button" className="btn btn-primary mb-2" onClick={() => {
                        this.props.onDeleteUser(this.state.deleteName)
                    }}>Delete
                    </button>
                </form>
            </div>
        );
    }
}
export default Temperature;