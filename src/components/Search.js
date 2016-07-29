import React from 'react';
import { browserHistory, Link } from 'react-router';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false,
            keyword: ''
        };
        this.handleClose = this.handleClose.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        
        
        
        // LISTEN ESC KEY, CLOSE IF PRESSED
        const listenEscKey = (evt) => {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                this.handleClose();
            }
        }
        
        document.onkeydown = listenEscKey;
    }
    
    handleClose() {
        this.handleSearch("");
        document.onkeydown = null;
        this.props.onClose();
    }
    
    handleSearch(keyword) {
        // IMPLEMENT: use this.props.onSearch
        this.props.onSearch(keyword);
    }
    
    handleChange(e) {
        // IMPLEMENT: use state.keyword for value of input
        this.setState({
            keyword: e.target.value
        });
        // IMPLEMENT: everytime keyword changes, do this.handleSearch
        this.handleSearch(e.target.value);
    }
    
    handleKeyDown(e) {
        // IF PRESSED ENTER, TRIGGER TO NAVIGATE TO THE FIRST USER SHOWN
        if(e.keyCode === 13) {
            if(this.props.usernames.length > 0) {
                this.handleClose();
                browserHistory.push('/wall/' + this.props.usernames[0].username);
            }
        }
    }
    
    render() {
        
        const mapDataToLinks = (data) => {
            // IMPLEMENT: map data array to array of Link components
            // create Links to '/user/:username'
            return data.map((username, i) => {
                return (<Link onClick={this.handleClose} to={`/wall/${username.username}`}
                    key={i}
                    onClick={this.handleClose}>{username.username}</Link>);
            });
        }
        
        return (
            <div className="search-screen white-text">
                <div className="right">
                    <a className="waves-effect waves-light btn red lighten-1"
                        onClick={this.handleClose}>CLOSE</a>
                </div>
                <div className="container">
                    { /* IMPLEMENT: use state.keyword for value of input*/ }
                    <input placeholder="Search a user" 
                            value={this.state.keyword}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}></input>
                    <ul className="search-results">
                        { mapDataToLinks(this.props.usernames) }
                    </ul>

                </div>
            </div>
        );
    }
}

Search.propTypes = {
    onClose: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    status: React.PropTypes.object
}

Search.defaultProps = {
    onClose: () => {
        console.error('onClose not defined');
    },
    onSearch: () => {
        console.error('onSearch not defined');
    },
    usernames: []
}

export default Search;