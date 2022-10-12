import React, {useState} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom'
import "./Login.css";
import { showErrMsg, showSuccessMsg } from "../utils/notification";

export default function ResetPassword() {
    const initialValues = {
        password:'',
        re_password:'',
        err:'',
        success:''
    }
    const [error, setError] = useState({});
    const [data,setData] = useState(initialValues);
    const {token} = useParams();

    const {password, re_password,err,success} = data;   
    
    const validate = (values) => {
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

        const errors = {};

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
    }

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data,[name]:value, err:"", success:""});
    }

    const handleResetPass = async (e) => {
        setError(validate(data));
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="main-page">
            <img src="/image/duytan-banner.jpg" alt="Duy Tân Banner" />
            <div className='login-page'>
            <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
            <h3>Reset Your Password ?</h3>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <Box className="login-ui" spacing={2} sx={{marginTop:"20px"}} >
            <div className='textfield-border-radius'>
                <TextField 
                        variant='outlined' 
                        id='input-password'
                        label="Password"
                        name='password' 
                        type="password"
                        fullWidth={true}
                        value={password}
                        size="small"
                        {...error.password && {error:true,helperText:error.password}}
                        onChange={handleChangeInput}
                        required
                        />
            </div>
            <div className='textfield-border-radius' style={{marginTop:"15px"}}>
                <TextField 
                        variant='outlined' 
                        id='input-re_password'
                        label="Confirm Password"
                        name='re_password' 
                        type="password"
                        fullWidth={true}
                        value={re_password}
                        size="small"
                        {...error.re_password && {error:true,helperText:error.re_password}}
                        onChange={handleChangeInput}
                        required
                        />
            </div>          
                <Button 
                    variant='contained' 
                    sx={{fontWeight:"bold" ,p:"15px", marginTop:"20px"}}
                    onClick={handleResetPass}>Reset Password</Button>
            </Box>
            </div>
    </div>
    )
}
