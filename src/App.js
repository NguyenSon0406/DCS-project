
import './App.css';
import React, {useEffect} from 'react';
import {Route, Routes, useNavigate, Navigate} from "react-router-dom";
import Login from './auth/Login.js';
import {Container} from "react-bootstrap";
import SignUpRoleStudent from "./auth/SignUpRoleStudent";
import SignUpRoleBusiness from "./auth/SignUpRoleBusiness";
import Homepage from './pages/Homepage';
import Post from './pages/Post';
import ActivationEmail from './auth/ActivationEmail';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import NotFound from './utils/notFound';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authActions'
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {isLogged, isAdmin} = auth

  function requireAuth(nextState, replace, next) {
    if (!isLogged) {
      replace({
        pathname: "/",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])
  return (   
      <Container>  
            <Routes>
              <Route path= "/" exact  element={(isLogged ? 
              (
                <Navigate to="/home/" replace/>
              ): (<Login/>)) }/>
              <Route path= "/home/" exact element={(!isLogged ? 
              (
                <Navigate to="/" replace/>
              ): (<Homepage/>))}/>
              <Route path= "/sign-up-role-student" exact element= {isLogged ? <NotFound/> : <SignUpRoleStudent/>}/>
              <Route path= "/sign-up-role-business" exact element={isLogged ? <NotFound/> : <SignUpRoleBusiness/>}/>
              <Route path= "/post" exact element={<Post/>}/>
              <Route path= "/forgot-password" exact element={<ForgotPassword/>}/>
              <Route path= "/user/reset/:token" exact element={<ResetPassword/>}/>
              <Route path= "/user/activate/:activation_token" exact element={<ActivationEmail/>}/>
            </Routes>
      </Container>
      
  );
}

export default App;
