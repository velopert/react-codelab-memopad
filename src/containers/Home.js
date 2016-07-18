import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends React.Component {
    
    componentDidMount() {
        this.props.memoListRequest(true).then(
            () => {
                console.log(this.props.memoData);
            }
        );
    }
    
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
                <MemoList data={this.props.memoData} currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentification.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentification.status.currentUser,
        memoData: state.memo.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        }, 
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
