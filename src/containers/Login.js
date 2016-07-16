import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentification';

class Login extends React.Component {
    render() {
        return (
            <div>
                <Authentication mode={true}
                    onLogin={this.props.loginRequest}
                    status={this.props.status}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentification.login.status
    };
};

const mapStateToDispatch = (dispatch) => {
    return {
        loginRequest: (id, pw) => { return dispatch(loginRequest(id, pw)); }
    };
};

export default connect(mapStateToProps, mapStateToDispatch)(Login);
