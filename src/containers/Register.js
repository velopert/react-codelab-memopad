import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentification';

class Register extends React.Component {
    render() {
        return (
            <div>
                <Authentication mode={false}
                    onRegister={this.props.registerRequest}
                    status={this.props.status}
                    errorCode={this.props.errorCode}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentification.register.status,
        errorCode: state.authentification.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
