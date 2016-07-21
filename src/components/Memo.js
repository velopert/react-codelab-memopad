import React from 'react';
import TimeAgo from 'react-timeago';

class Memo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.data.contents,
            isRemoving: false
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    
    toggleEdit() {
        if(this.state.editMode) {
            this.props.onEdit(this.props.data._id, this.props.index, this.state.value).then(
                () => {
                    if(this.props.editStatus.status==="SUCCESS") {
                        Materialize.toast('Success!', 2000);
                    } else {
                        /*
                            ERROR CODES
                                1: INVALID ID,
                                2: EMPTY CONTENTS
                                3: NOT LOGGED IN
                                4: NO RESOURCE
                                5: PERMISSION FAILURE
                        */
                        let errorMessage = [
                            'Something broke',
                            'Please write soemthing',
                            'You are not logged in',
                            'That memo does not exist anymore',
                            'You do not have permission'
                        ];
                        
                        let error = this.props.editStatus.error;
                        
                        // NOTIFY ERROR
                        let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
                        Materialize.toast($toastContent, 2000);
                    
                        // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                        if(error === 3) {
                            setTimeout(()=> {location.reload(false)}, 2000);
                        }
                        
                    }
                    
                    this.setState({
                        editMode: !this.state.editMode
                    });
                }
            );
        } else {
            this.setState({
                editMode: !this.state.editMode
            });   
        }
    }
    
    handleRemove() {
        this.props.onRemove(this.props.data._id, this.props.index).then(() => {
            if(this.props.removeStatus.status==="SUCCESS") {
                
                this.setState({
                    isRemoving: true
                });
                
                // ACTUALLY REMOVE FROM DATA AFTER 1 SEC ( ANIMATION FINISH )
                setTimeout(() => {this.props.onRemoveData(this.props.index);}, 1000);
                
            } else {
                // ERROR
                /*
                    DELETE MEMO: DELETE /api/memo/:id
                    ERROR CODES
                        1: INVALID ID
                        2: NOT LOGGED IN
                        3: NO RESOURCE
                        4: PERMISSION FAILURE
                */
                let errorMessage = [
                    'Something broke',
                    'You are not logged in',
                    'That memo does not exist',
                    'You do not have permission'
                ];
                
                 // NOTIFY ERROR
                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
                Materialize.toast($toastContent, 2000);


                // IF NOT LOGGED IN, REFRESH THE PAGE
                if(this.props.removeStatus.error === 2) {
                    setTimeout(()=> {location.reload(false)}, 2000);
                }
            }
        });
    }
    
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    
    render() {
        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button' 
                    id={`dropdown-button-${this.props.data._id}`}
                    data-activates={`dropdown-${this.props.data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a onClick={this.handleRemove}>Remove</a></li>
                </ul>
            </div>
        );
        
        // EDITED info
        let editedInfo = (
            <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );

        
        const memoView = (
            <div className="card">
                <div className="info">
                    <a className="username">{this.props.data.writer}</a> wrote a log · <TimeAgo date={this.props.data.date.created}/> 
                    { this.props.data.is_edited ? editedInfo : undefined }
                    { this.props.ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {this.props.data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{this.props.data.starred.length}</span>
                </div>
            </div>
        );
        
        const editView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );
        
        const fadeOut = (this.state.isRemoving ? 'memo-fade-out' : undefined);
        return (
            <div className={`container memo memo-fade-in ${fadeOut}`}>
                { this.state.editMode ? editView : memoView }
            </div>
        );
    }
    
    
    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
}

Memo.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    editStatus: React.PropTypes.object,
    index: React.PropTypes.number,
    onRemove: React.PropTypes.func,
    onRemoveData: React.PropTypes.func,
    removeStatus: React.PropTypes.object
};

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true,
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    editStatus: {},
    index: -1,
    onRemove: (id, index) => { 
        console.error('remove function not defined'); 
    },
    onRemoveData: (index) => {
        console.error('remove data function not defined');
    },
    removeStatus: {}
}

export default Memo;
