
import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './auth/Login.js';
import { Container } from "react-bootstrap";
import SignUpRoleStudent from "./auth/SignUpRoleStudent";
import SignUpRoleBusiness from "./auth/SignUpRoleBusiness";
import Homepage from './pages/Homepage';
import ActivationEmail from './auth/ActivationEmail';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import NotFound from './utils/notFound';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authActions';
import HomeProfile from './components/ProfileStudent/HomeProfile';
import axios from 'axios';


function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const auth = useSelector(state => state.auth);
  const { isLogged, isAdmin } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
      }
      getToken()
    }
  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  }, [token, dispatch])
  return (
    <>
      <Container>
        <Routes>
          <Route path="/" exact element={isLogged ?
            (
              <Navigate to="/home" replace />
            ) : ((<Login />))} />
          <Route path="/home/*" exact element={<Homepage />} />
          <Route path="/sign-up-role-student" exact element={<SignUpRoleStudent />} />
          <Route path="/sign-up-role-business" exact element={<SignUpRoleBusiness />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/user/reset/:token" exact element={<ResetPassword />} />
          <Route path="/user/activate/:activation_token" exact element={<ActivationEmail />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </Container>
      <Routes>
        <Route path="/profile-student" element={<HomeProfile />} />
      </Routes>
    </>
  );
}

export default App;
