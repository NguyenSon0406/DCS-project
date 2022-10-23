import React, { useState,useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {AccountCircle, Lock} from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import "./Login.css";
import PopUp from "../components/PopupSignUp";
import { showErrMsg, showSuccessMsg } from "../utils/notification";
import { dispatchLogin } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";  

const Login = () =>
{
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const initialValues = {email:"", password:"", err:"", isSuccess:""};
    const [formValues,setFormValues] = useState(initialValues);
    const [user,setUser] = useState(initialValues);
    const dispatch = useDispatch();
    const {email,password,err, isSuccess} = user;
    const [isSubmit,setIsSubmit] = useState(false);
    const timer = useRef("");
    let navigate = useNavigate();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(validate(formValues));
      setIsSubmit(true);

      try {
        const res = await axios.post('/user/login', {email, password})
        setUser({...user, err: '', isSuccess: res.data.msg})

        localStorage.setItem('firstLogin', true)

        dispatch(dispatchLogin())
        navigate("/home");
    } catch (err) {
        err.response.data.msg && 
        setUser({...user, err: err.response.data.msg, isSuccess: ''})
        console.log(err);
    }
    };

    const handleChange = (e) => { 
        const {name, value} = e.target;
        setFormValues({...formValues,[name]:value});
        setUser({...user,[name]:value, err:'', isSuccess:""});
        
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&_*-])/;
        const minLengthRegExp   = /.{8,}/;
    
        const uppercasePassword = uppercaseRegExp.test(values.password);
        const lowercasePassword =   lowercaseRegExp.test(values.password);
        const digitsPassword =      digitsRegExp.test(values.password);
        const specialCharPassword = specialCharRegExp.test(values.password);
        const minLengthPassword =   minLengthRegExp.test(values.password);

        if(!values.email){
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if(!values.password)
        {
          errors.password = "Password is required!";
        } else if(!uppercasePassword || !lowercasePassword || !digitsPassword || !specialCharPassword || !minLengthPassword )
        {
          errors.password = "Password must be at least one Uppercase, one Lowercase, one Digit, one Special Characters and minumum 8 characters";
        }
        

        return errors;
    };

    useEffect(() => {
      console.log(error);
      if (Object.keys(error).length === 0 && isSubmit) {
        console.log(formValues);
      }
    }, [error]);

    useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);

    const handleButtonClick = (e) => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          handleSubmit(e);
        }, 2000);
      }
      
    };

    return (
      <>
        <div className="main-page">
            <img src="image/duytan-banner.jpg" alt="Duy Tân Banner" />
            <div className="login-page">
                <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
                <Form className="login-ui" onSubmit={handleSubmit}>
                <Box display="flex"
                flexDirection={"column"}
                maxWidth={900}
                alignItem="center"
                justifyContent="center"
                margin="auto"
                marginTop={5}
                padding={2}
                borderRadius={5}
                boxShadow={"5px 5px 10px #ccc"}
                sx={{":hover": {
                  boxShadow:'10px 10px 20px #ccc',
                }}}>
                 <h3>Sign in with</h3>
                {Object.keys(error).length === 0 && isSubmit ? (
                  <>
                    {err && showErrMsg(err)}
                    {isSuccess && showSuccessMsg(isSuccess)}
                  </>
                  )  : Object.keys(error).length !==0 && isSubmit  ? (
                    <div className="ui message error">Sign in failed</div>
                  ):(
                    <div></div>
                  )}
                  <Box sx={{ display: 'flex'}}>
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 1 }} />
                     <div className="textfield-border-radius">
                      <TextField 
                        id="input-email" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth={true}
                        value={email}
                        name="email"
                        {...error.email && {error: true, helperText:error.email}}
                        onChange={handleChange}
                        required   
                        size="small"/>
                     </div>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop:2 }}>
                      <Lock  sx={{ color: 'action.active', mr: 1, my: 1 }} />
                      <div className="textfield-border-radius">
                        <TextField 
                        id="input-password" 
                        label="Password" 
                        type='password'
                        name="password"
                        variant="outlined" 
                        value={password}
                        {...error.password && {error: true, helperText:error.password}}
                        onChange={handleChange} 
                        fullWidth={true} 
                        required 
                        size="small"/>
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex'}}>
                      <FormControlLabel control={<Checkbox defaultChecked color="error"/>}  label="Remember me" />
                      <FormControlLabel fullWidth={true} 
                      sx={{marginLeft:"172px"}} 
                      control={<Link to="/forgot-password">Forgot password</Link>}   />
                    </Box>
                    <div className="login-component">
                    <Box sx={{ position: 'relative' }}>
                      <Button 
                        type="Submit"
                        variant="contained" 
                        fullWidth={true} 
                        color="error" 
                        sx={{fontWeight:"bold",borderRadius:2}}
                        disabled={loading}
                        onClick={handleButtonClick}
                        >Sign in</Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          color="inherit"
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                            }}
                          />
                        )}
                    </Box>    
                    </div>
                    <div className="login-component" style={{fontWeight:"bold"}}>
                    OR
                    </div>
                    <div className="login-component">
                        Don't have an account? <a  onClick={() => setOpenPopup(true)}>Sign up</a>
                    </div>  
                </Box>
                    
                </Form>
            </div>
        </div>
        <PopUp openPopup = {openPopup}
        setOpenPopup={setOpenPopup}
        >    
        </PopUp>
      </>
    );
}
//error && <Alert variant="danger">{error}</Alert>
export default Login;

