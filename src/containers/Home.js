import React from 'react';
import { connect } from 'react-redux';
import { Write } from 'components';
import { memoPostRequest } from 'actions/memo';

class Home extends React.Component {
    render() {
        const write = (
            <Write
                onPost={this.props.memoPostRequest}
                status={this.props.postStatus}
            />
        );

        return (

            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentification.status.isLoggedIn,
        postStatus: state.memo.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
