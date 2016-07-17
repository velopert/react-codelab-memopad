import React from 'react';

class Write extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contents: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);

    }

    handleChange(e) {
        this.setState({
            contents: e.target.value
        });
    }

    handlePost() {
        this.props.onPost(this.state.contents).then(
            () => {
                if(this.props.status.status === "SUCCESS") {
                    this.setState({
                        contents: ""
                    });
                    Materialize.toast('Success!', 2000);
                    // TRIGGER LOAD NEW MEMO
                } else {

                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                    let $toastContent;
                    switch(this.props.status.error) {
                        case 1:
                            // TRIGGER PAGE REFRESH
                            // IT WILL NOTIFY THAT THE SESSION HAS EXPIRED
                            location.reload(false);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }

                }
            }
        );
    }

    render() {
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Write down your memo"
                            value={this.state.contents}
                            onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

Write.propTypes = {
    onPost: React.PropTypes.func,
    status: React.PropTypes.object
};

Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); },
    status: { }
};

export default Write;
