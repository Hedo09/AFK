import React from 'react';

class PieChart extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>Line Series</h3>
                            </div>
                            <div className="panel-body">
                                <div id="chart1"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>Polar Series</h3>
                            </div>
                            <div id="chart2" className="panel-body">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>Area Series</h3>
                            </div>
                            <div className="panel-body">
                                <div id="chart3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>StepLine Series</h3>
                            </div>
                            <div id="chart4" className="panel-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PieChart;