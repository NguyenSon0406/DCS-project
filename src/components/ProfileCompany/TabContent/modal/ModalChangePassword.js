import React, { useState } from "react";
import './ModalChangePassword.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton, InputAdornment, TextField,Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    err:'',
    success:''
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function ModalChangePassword (props) {
    const [error, setError] = useState("");
    const token = useSelector(state => state.token)
    const [showOldPassword,setShowOldPassword] = useState(false);
    const [showNewPassword,setShowNewPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const {isOpen, setIsOpen} = props;
    const [data, setData] = useState(initialState)
    const {oldPassword,newPassword,confirmPassword, err, success} = data;

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data,[name]:value, err:"", success:""});
    }
    const [errOpen, setErrOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const handleClick = (id) => {
        if(id === 1)
            setErrOpen(true);
        else if(id === 2 ) 
            setSuccessOpen(true);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setErrOpen(false);
      setSuccessOpen(false)
    };
    const handleShowHideOldPassword = (e) => {
        setShowOldPassword(!showOldPassword);
    };
    const handleShowHideNewPassword = (e) => {
        setShowNewPassword(!showNewPassword);
    };
    const handleShowHideConfirmPassword = (e) => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const validate = (values) => {
        const errors = {};
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&_*-])/;
        const minLengthRegExp   = /.{8,}/;
    
        const uppercasePassword = uppercaseRegExp.test(values.oldPassword);
        const lowercasePassword =   lowercaseRegExp.test(values.oldPassword);
        const digitsPassword =      digitsRegExp.test(values.oldPassword);
        const specialCharPassword = specialCharRegExp.test(values.oldPassword);
        const minLengthPassword =   minLengthRegExp.test(values.oldPassword);

        const uppercasePassword1 = uppercaseRegExp.test(values.newPassword);
        const lowercasePassword1 =   lowercaseRegExp.test(values.newPassword);
        const digitsPassword1 =      digitsRegExp.test(values.newPassword);
        const specialCharPassword1 = specialCharRegExp.test(values.newPassword);
        const minLengthPassword1 =   minLengthRegExp.test(values.newPassword);
        if(!values.oldPassword)
        {
          errors.oldPassword = "Password is required!";
        } else if(!uppercasePassword || !lowercasePassword || !digitsPassword || !specialCharPassword || !minLengthPassword )
        {
          errors.oldPassword = "Password must be at least one Uppercase, one Lowercase, one Digit, one Special Characters and minumum 8 characters";
        }
        if(!values.newPassword)
        {
          errors.newPassword = "Password is required!";
        } else if(!uppercasePassword1 || !lowercasePassword1 || !digitsPassword1 || !specialCharPassword1 || !minLengthPassword1 )
        {
          errors.newPassword = "Password must be at least one Uppercase, one Lowercase, one Digit, one Special Characters and minumum 8 characters";
        }
        if(!values.confirmPassword)
        {
          errors.confirmPassword = "Please confirm your password!";
        }else if(values.confirmPassword !== values.newPassword){
          errors.confirmPassword = "The two passwords that you entered do not match!";
        }

        return errors;
    };
    const updatePass = async (e) => {
        e.preventDefault();
        setError(validate(data));
        try {
            const res = await axios.post('/user/change-pass', {oldPassword,newPassword}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    const handleChangePass = (e) => {
        if(oldPassword || newPassword || confirmPassword)
        {
            updatePass(e);
            if(err)
                handleClick(1);
            else if(success)
                handleClick(2);
        }
    }

        return (
            <>
                <Modal
                    open={isOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={()=>setIsOpen(false)}
                >
                    <Box sx={style}>
                        <div className="modal-changepassword-container">
                            <div className="title-change-password">
                                <label>Change Password</label>
                                <span onClick={() => setIsOpen(false)}>
                                    <i className="fas fa-xmark"></i>
                                </span>
                            </div>
                            <div className="old-password">
                            <TextField
                                    id="input-oldpassword"
                                    label="Old Password"
                                    name="oldPassword"
                                    size="small"
                                    fullWidth={true}
                                    type={showOldPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    error={error.oldPassword ? true : false}
                                    helperText={error.oldPassword ? error.oldPassword : ""}
                                    onChange={handleChangeInput}
                                    InputProps={
                                        {
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility1"
                                                onClick={handleShowHideOldPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                position="end"
                                                >
                                                {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    }
                                />
                            </div>
                            <div className="new-password">
                                <TextField
                                    id="input-newpassword"
                                    label="New Password"
                                    name="newPassword"
                                    size="small"
                                    fullWidth={true}
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    error={error.newPassword ? true : false}
                                    helperText={error.newPassword ? error.newPassword : ""}
                                    onChange={handleChangeInput}
                                    InputProps={
                                        {
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility2"
                                                onClick={handleShowHideNewPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                position="end"
                                                >
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    }
                                />
                            </div>
                            <div className="confirm-password">
                            <TextField
                                    id="input-confirmpassword"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    size="small"
                                    fullWidth={true}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    error={error.confirmPassword ? true : false}
                                    helperText={error.confirmPassword ? error.confirmPassword : ""}
                                    onChange={handleChangeInput}
                                    InputProps={
                                        {
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility3"
                                                onClick={handleShowHideConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                position="end"
                                                >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    }
                                />
                            </div>
                            <div className="btn-change-password">
                                <button
                                        className="btn-return"
                                        onClick={() => setIsOpen(false)}
                                    >Return</button>
                                    <button
                                        className="btn-change"
                                        onClick={handleChangePass}
                                    >Change</button>
                            </div>
                            <Snackbar open={errOpen} autoHideDuration={6000} onClose={handleClose}>  
                                {err && <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    {err}
                                </Alert>}
                            </Snackbar>
                            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>  
                                {success && <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    {success}
                                </Alert>}
                            </Snackbar>
                        </div>
                    </Box>
                </Modal>
            </>
        );
}

export default ModalChangePassword;
