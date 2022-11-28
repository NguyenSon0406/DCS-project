
import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './auth/Login.js';
import SignUpRoleStudent from "./auth/SignUpRoleStudent";
import SignUpRoleBusiness from "./auth/SignUpRoleBusiness";
import Homepage from './pages/Homepage';
import ActivationEmail from './auth/ActivationEmail';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import NotFound from './utils/notFound';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authActions'
import axios from 'axios';
import PrivateRoute from './utils/PrivateRoute';
import Admin from './pages/Admin';


function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const auth = useSelector(state => state.auth);
  const { isLogged, authLoading } = auth;

  useEffect(() => {
    let info = null;
    const getInfo = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        const res = await axios.get('/user/infor', {
          headers: { Authorization: accessToken }
        })
        if (!res.data?.success) {
          localStorage.removeItem('accessToken')
        }
        info = res.data?.info
      }
    }
    getInfo().then(() => dispatch(fetchUser(info)))
  }, [authLoading])

  return (
    <>
      <div>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/" exact element={<Navigate to="/home" replace />} />
          <Route path="home/*" exact element={<PrivateRoute><Homepage /></PrivateRoute>} />
          <Route path="/sign-up-role-student" exact element={<SignUpRoleStudent />} />
          <Route path="/sign-up-role-business" exact element={<SignUpRoleBusiness />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/user/reset/:token" exact element={<ResetPassword />} />
          <Route path="/user/activate/:activation_token" exact element={<ActivationEmail />} />
          <Route path="/admin/*" exact element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
