import React, { useState,useEffect } from "react";
import "../auth/Login.css"
import { Link} from "react-router-dom";
import { Form} from "react-bootstrap";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
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
          email,password
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
    <div className="main-page">
            <img src="image/duytan-banner.jpg" alt="Duy Tân Banner" />
            <div className="login-page">
                <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
                <h3>Sign up with</h3>
               
                <Form className="login-ui" onSubmit={handleSubmit}>
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
               
                {/* <div className="field">
                    <input type="text" id="textfile" name="file"  placeholder="Business License (*pdf, *png, *jpg)"
                    readOnly onClick={uploadFile} 
                    />
                    <input type="file"
                            id="fileinput" name="file"
                            accept="image/png, image/jpeg, .pdf" 
                            
                            style={{visibility:"hidden", display:"none"}}
                            onChange={fileChange}
                            />
                    <i class="fa fa-file fa-lg fa-fw" aria-hidden="true"/>
                </div>
                <p>{error.file}</p> */}
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
}

export default SignUpRoleBusiness;