import React from 'react';

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    };

    buttonClick = (e) => {
        console.log(this.state.username + " ; " + this.state.password);
    };

    messageOnChange = (e) => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
    };

    render() {
        return (
        <div className="jumbotron">
            <div className="row">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input id="userName" type="text" className="form-control" onChange={this.props.onUserDataChange}/>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="text" className="form-control" onChange={this.props.onUserDataChange}/>
                    <button className="btn btn-defaultt"><span className="glyphicon glyphicon-ok"
                                                               onClick={this.props.onSendUser}/>
                    </button>
                </div>
            </div>
        </div>
        );
    }
}
 export default Login;