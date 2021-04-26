import React from 'react';
import RowItemMeasurement from "./RowItemMeasurement";

class SoilMoisture extends React.Component {


    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.props.onGetData}>Refresh</button>
            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Soil Moisture</th>
                </tr>
                </thead>
                <tbody>
                {this.props.soilmoistures? this.props.soilmoistures.map(c => (<RowItemMeasurement id={c[0]} timestamp ={c[1]} value={ c[2]}/>)) : ""}
                </tbody>
            </table>
            </div>
        );
    }
}
export default SoilMoisture;