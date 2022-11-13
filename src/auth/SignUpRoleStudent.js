import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import "../auth/Login.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {AccountCircle, Lock} from '@mui/icons-material';
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { showErrMsg, showSuccessMsg } from "../utils/notification";
import axios from "axios";

const SignUpRoleStudent = () => {
  const [error, setError] = useState("");
  const initialValues = {email:"", password:"", re_password:"", err:"",isSuccess:""};
  const [user,setUser] = useState(initialValues);
  const [formValues,setFormValues] = useState(initialValues);
  const [isSubmit,setIsSubmit] = useState(false);
  const {email,password,re_password,err, isSuccess} = user;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      setError(validate(formValues));
      setIsSubmit(true);
    try {
      const res = await axios.post('user/register',{
        email,password
      });
      setUser({...user, err: "", isSuccess: res.data.msg})
    } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, isSuccess:""})
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
    if(!values.re_password)
    {
      errors.re_password = "Please confirm your password!";
    }else if(values.re_password !== values.password){
      errors.re_password = "The two passwords that you entered do not match!";
    }
    return errors;
};
  useEffect(() => {
  console.log(error);
  if (Object.keys(error).length === 0 && isSubmit) {
    console.log(formValues);
  }
}, [error]);
  return (
    <>
    <div className="main-page">
            <img src="image/duytan-banner.jpg" alt="Duy Tân Banner" />
            <div className="login-page" style={{width:"30%"}}>
                <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
                <h3>Sign up with</h3>
                {Object.keys(error).length === 0 && isSubmit ? (
                  <>
                    {err && showErrMsg(err)}
                    {isSuccess && showSuccessMsg(isSuccess)}
                  </>
                  ) : Object.keys(error).length !==0 && isSubmit  ? (
                    <>
                    {/* <div className="ui message error">Sign up failed</div> */}
                      {err && showErrMsg(err)}
                    </>
                    
                  ): (
                    <div></div>
                  )}
                <Form className="login-ui" onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex'}}>
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 1 }} />
                     <div className="textfield-border-radius">
                      <TextField 
                        id="input-email" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth={true}
                        name="email"
                        value={email}
                        error={error.email ? true : false}
                        helperText={error.email ? error.email : ""}
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
                        value={password}
                        variant="outlined" 
                        error={error.password ? true : false}
                        helperText={error.password ? error.password : ""}
                        onChange={handleChange} 
                        fullWidth={true} 
                        required 
                        size="small"/>
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop:2 }}>
                      <Lock  sx={{ color: 'action.active', mr: 1, my: 1 }} />
                      <div className="textfield-border-radius">
                        <TextField 
                        id="input-re-password" 
                        label="Confirm Password" 
                        type='password'
                        name="re_password"
                        value={re_password}
                        variant="outlined" 
                        error={error.re_password ? true : false}
                        helperText={error.re_password ? error.re_password : ""}
                        onChange={handleChange} 
                        fullWidth={true}
                        required  
                        size="small"/>
                      </div>
                    </Box>
                    <div className="login-component">
                      <Button 
                        type="Submit"
                        variant="contained" 
                        fullWidth={true} 
                        color="error" 
                        sx={{fontWeight:"bold"}}
                        >Sign up</Button>
                    </div>
                   
                    <div className="login-component">
                    OR
                    </div>
                    <div className="login-component">
                        Already have an account? <Link to="/">Sign In</Link>
                    </div>
                </Form>
            </div>
        </div>
     
    </>
  );
};

export default SignUpRoleStudent;