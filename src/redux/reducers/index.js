import {combineReducers} from "redux";
import auth from './authReducer';
import token from "./tokenReducers";
import users from './usersReducer'

export default combineReducers({
    auth,token,users
})