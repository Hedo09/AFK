import React from 'react';

class Logout extends React.Component {
    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Surely you want to logout?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.props.onLogoutYes} className="btn btn-primary">Yes</button>
                            <button type="button" onClick={this.props.onLogoutNo} className="btn btn-secondary" data-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Logout;