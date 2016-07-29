import authentification from './authentification';
import memo from './memo';
import search from './search';


import { combineReducers } from 'redux';

export default combineReducers({
    authentification,
    memo,
    search
});
