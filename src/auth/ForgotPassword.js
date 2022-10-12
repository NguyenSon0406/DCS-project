import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import axios from 'axios';
import "./Login.css";
import {showErrMsg,showSuccessMsg} from "../utils/notification";

function ForgotPassword() {
    const initialValues = {
        email:"",
        err:"",
        success:"",

    }
    const [error, setError] = useState({});
    const [data,setData] = useState(initialValues);
    const {email,err,success} = data; 

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data,[name]:value, err:"", success:""});
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.email){
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }

        return errors;
    }
    const handleForgotPass = async (e) => {
        setError(validate(data));
        try{
            const res= await axios.post("/user/forgot",{email})
            return setData({...data,err:"",success:res.data.msg})
        }catch(err) {
            err.response.data.msg &&
            setData( {...data,err:err.response.data.msg,success:""}); 
        }
    }
  return (
    <div className="main-page">
        <img src="image/duytan-banner.jpg" alt="Duy Tân Banner" />
        <div className='login-page'>
        <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
        <h3>Forgot Your Password ?</h3>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <Box className="login-ui" spacing={2} sx={{marginTop:"20px"}} >
        <div className='textfield-border-radius'>
            <TextField 
                    variant='outlined' 
                    id='input-email'
                    label="Email"
                    name='email' 
                    fullWidth={true}
                    value={email}
                    size="small"
                    {...error.email && {error:true,helperText:error.email}}
                    onChange={handleChangeInput}
                    required
                    />
        </div>     
            <Button 
                variant='contained' 
                sx={{fontWeight:"bold" ,p:"15px", marginTop:"20px"}}
                onClick={handleForgotPass}>Verify your email</Button>
        </Box>
        </div>
      
    </div>
  )
}

export default ForgotPassword

