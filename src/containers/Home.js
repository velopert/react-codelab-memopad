import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.loadNewMemo = this.loadNewMemo.bind(this);
    }
    
    componentDidMount() {
        // LOAD NEW MEMO EVERY 5 SECONDS
        let loadMemoLoop = () => {
            this.loadNewMemo();
            this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
        };
        
        this.props.memoListRequest(true).then(
            () => {
                // BEGIN NEW MEMO LOADING LOOP
                loadMemoLoop();
            }
        );
    }
    
    componentWillUnMount() {
        // STOPS THE loadMemoLoop
        clearTimeout(this.memoLoaderTimeoutId);
    }
    
    loadNewMemo() {
        // CANCEL IF THERE IS A PENDING REQUEST
        if(this.props.listStatus === 'WAITING') 
            return new Promise((resolve, reject)=> {
                resolve();
            });
        
        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if(this.props.memoData.length === 0 )
            return this.props.memoListRequest(true);
            
        return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
    }
    
    render() {
        const write = (
            <Write
                onPost={this.props.memoPostRequest}
                loadMemo={this.loadNewMemo}
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
        memoData: state.memo.list.data,
        listStatus: state.memo.list.status
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
