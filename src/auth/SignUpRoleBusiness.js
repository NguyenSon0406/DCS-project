import React, { useState,useEffect } from "react";
import "../auth/Login.css"
import { Link} from "react-router-dom";
import { Form} from "react-bootstrap";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utils/notification";
import {AccountCircle, Lock, Business, Email, ContactPhone, InsertDriveFile} from '@mui/icons-material';

const SignUpRoleBusiness = () => {
  const [error, setError] = useState("");
  const initialValues = {
    email:"", 
    password:"", 
    company_name:"",
    file:"",
    phone_number:"", 
    firstName:"", 
    lastName:"",
    err:"",
    isSuccess:""
  };
  const [user,setUser] = useState(initialValues);
  const [formValues,setFormValues] = useState(initialValues);
  const {email,
    password,
    re_password,
    company_name,
    file,
    phone_number, 
    firstName, 
    lastName,
    err, 
    isSuccess} = user;
  const [isSubmit,setIsSubmit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = async(e) => {
      e.preventDefault();
      setError(validate(formValues));
      setIsSubmit(true);
      try {
        const res = await axios.post('user/register',{
          email,password,role:1,firstName, lastName, phone_number,company_name
        });
        setUser({...user, err: "", isSuccess: res.data.msg})
      } catch (err) {
        err.response.data.msg && 
        setUser({...user, err: err.response.data.msg, isSuccess:""})
      }
  };
  const uploadFile = () =>
  {
    document.getElementById("fileinput").click();
  }
  function uploadOnChange() 
  { 
    var input = document.getElementById("fileinput");
    var file = input.value.split("\\");
    var filename = file[file.length-1];
    if(filename)
      setIsFocus(true);
    else{
      setIsFocus(false);
    }
    document.getElementById('textfile').value = filename;
       
  }
  const handleChange = (e) => { 
    const {name, value} = e.target;
    setFormValues({...formValues,[name]:value});
    setUser({...user,[name]:value, err:'', isSuccess:""});
};
const fileChange = (e) => { 
  uploadOnChange();
  const {name, files} = e.target;
  setFormValues({...formValues,[name]:files});
  
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
    if(!values.firstName)
    {
      errors.firstName = "First Name is required!";
    }
    if(!values.lastName)
    {
      errors.lastName = "Last Name is required!";
    }
    if(!values.company_name)
    {
      errors.company_name = "Company Name is required!";
    }
    
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
    
    if(!values.phone_number)
    {
      errors.phone_number = "Contact Number is required!";
    }else if(values.phone_number.length < 10){
      errors.phone_number = "Contact Number must be at least 10 numbers";
    }
    
    if(!values.file)
    {
      errors.file = "Business License is required!";
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
     <div className="split right">
        <img className="banner-login" src="/image/bannerlogin.png" alt="banner login"/>
      </div>
    <div className="split left">
      <div className="centered">
        <img className="banner-duytan" src="image/icon.png" alt="Duy Tân Banner" />
        <div className="login-page">
                <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
                <Form className="login-ui" onSubmit={handleSubmit}>
                  <Box display="flex"
                  flexDirection={"column"}
                  maxWidth={600}
                  alignItem="center"
                  justifyContent="center"
                  margin="auto"
                  marginTop={1}
                  padding={2}
                  borderRadius={5}
                  boxShadow={"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;"}
                  sx={{
                    width:"480px",
                    transition:"0.3s",
                    ":hover": {
                      transition:"0.3s",
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;',
                    }
                  }}>
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
                  <Box sx={{ display: 'flex'}}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 1 }} />
                     <div className="textfield-border-radius">
                      <TextField 
                        id="input-firstName" 
                        label="First Name" 
                        variant="outlined" 
                        fullWidth={true}
                        name="firstName"
                        error={error.firstName ? true : false}
                        helperText={error.firstName ? error.firstName : ""}
                        onChange={handleChange}
                        required  
                        size="small"/>
                     </div>
                    </Box>
                  <Box sx={{ display: 'flex' ,  marginTop:2}}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 1 }} />
                     <div className="textfield-border-radius">
                      <TextField 
                        id="input-lastName" 
                        label="Last Name" 
                        variant="outlined" 
                        fullWidth={true}
                        name="lastName"
                        error={error.lastName ? true : false}
                        helperText={error.lastName ? error.lastName : ""}
                        onChange={handleChange} 
                        required 
                        size="small"/>
                     </div>
                  </Box>
                  <Box sx={{ display: 'flex',  marginTop:2}}>
                    <Business sx={{ color: 'action.active', mr: 1, my: 1 }} />
                     <div className="textfield-border-radius">
                      <TextField 
                        id="input-business" 
                        label="Company Name" 
                        variant="outlined" 
                        fullWidth={true}
                        name="company_name"
                        error={error.company_name ? true : false}
                        helperText={error.company_name ? error.company_name : ""}
                        onChange={handleChange} 
                        required 
                        size="small"/>
                     </div>
                  </Box>
                
                <Box sx={{ display: 'flex', marginTop:2}}>
                  <Email sx={{ color: 'action.active', mr: 1, my: 1 }} />
                     <div className="textfield-border-radius">
                      <TextField 
                        id="input-email" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth={true}
                        name="email"
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
                        variant="outlined" 
                        error={error.password ? true : false}
                        helperText={error.password ? error.password : ""}
                        onChange={handleChange} 
                        fullWidth={true} 
                        required 
                        size="small"/>
                      </div>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop:2}}>
                       <ContactPhone sx={{ color: 'action.active', mr: 1, my: 1 }} />
                     <div className="textfield-border-radius">
                      <TextField 
                        id="input-phoneNumber" 
                        label="Contact Number" 
                        type="number"
                        variant="outlined" 
                        fullWidth={true}
                        name="phone_number"
                        error={error.phone_number ? true : false}
                        helperText={error.phone_number ? error.phone_number : ""}
                        onChange={handleChange}
                        required  
                        size="small"/>
                     </div>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop:2}}>
                      <InsertDriveFile sx={{ color: 'action.active', mr: 1, my: 1 }} />   
                     <div className="textfield-border-radius">
                      <TextField 
                        id="textfile" 
                        label="Business License (*pdf, *png, *jpg)"
                        variant="outlined" 
                        fullWidth={true}
                        name="file"
                        error={error.file ? true : false}
                        helperText={error.file ? error.file : ""}
                        InputProps={{
                          readOnly: true,
                        }}
                        focused={ isFocus ? true : false}
                        onClick={uploadFile} 
                        size="small"/>
                     </div>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop:2}}>
                    <div className="textfield-border-radius">
                      <input type="file"
                              id="fileinput" name="file"
                              accept="image/png, image/jpeg, .pdf" 
                              style={{visibility:"hidden", display:"none"}}
                              onChange={fileChange}
                              />
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
                  </Box>
                </Form>
            </div>
      </div>      
    </div>
     
    </>
  );
}

export default SignUpRoleBusiness;