import React, { useState } from "react";
import './TabInformation.css';
import ModalChangePassword from "./modal/ModalChangePassword";
import axios from "axios"
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const initialState = {
    contact:'',
    address:'',
    description:'',
    err:'',
    success:''
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function TabInformation(props) {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user} = auth;

    const [data, setData] = useState(initialState)
    const {contact, address, description, err, success} = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }
    
    //change avatar
    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    //update user infor
    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                avatar: avatar ? avatar : user.avatar,
                contact: contact ? contact : user.contact,
                address: address ? address : user.address,
                description: description ? description : user.description
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    const handleUpdate = () => {
        if(contact || address || description || avatar )
            {
                updateInfor();
                handleClick();
            }

    }
    const convertBirthday = (userbirthday) => {
        const birthday = new Date(userbirthday).toISOString().slice(0,10)
        return birthday;
    }
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
        return (
            <>
                <ModalChangePassword
                    isOpen={openModalChangePassword}
                    setIsOpen={setOpenModalChangePassword}
                />
                <div className="infor-container">
                    <div className="infor-title">Personal Information</div>
                    <div className="avatar">
                        <div className="title-avatar">Avatar</div>
                        <input className="input-img" type="file" onChange={changeAvatar} />
                    </div>
                    <div className="infor-input">
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>First name</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={user.firstName}
                                    disabled={true}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Last name</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={user.lastName}
                                    disabled={true}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Birthday</label>
                                <input
                                    className="input-item"
                                    type='date'
                                    value={convertBirthday(user.dayofbirth)}
                                    placeholder="dd/mm/yyyy"                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>Gender</label>
                                <select
                                    className="input-item"
                                    value={user.gender}
                                    disabled={true}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="infor-item">
                                <label>Phone</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    name="contact"
                                    defaultValue={user.contact}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Email</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={user.email}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>Address</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    name="address"
                                    defaultValue={user.address}
                                    onChange={handleChange}                                />
                            </div>
                            <div className="infor-item">
                                <label>Falculty</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={user.falculty}
                                    disabled={true}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Class</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={user.className}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="infor-group"> 
                            <div className="infor-item">
                                    <label>Description</label>
                                    <textarea
                                        className="input-item"
                                        type="text"
                                        name="description"
                                        defaultValue={user.description}
                                        onChange={handleChange}
                                        style={{
                                            height:"100%"
                                        }}
                                    />
                                </div>
                        </div>
                    </div>
                    <div className="infor-btnsave">
                        <button
                            className="btn-save"
                            onClick={handleUpdate}
                        >{loading ? <h5>Loading.....</h5> : <h5>SAVE</h5>}</button>
                    </div>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        {success && <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                           {success}
                        </Alert>}
                    </Snackbar>
                   
                    <div className="infor-account">
                        <div className="text-account">Account</div>
                        <button
                            className="btn-on-change-password"
                            onClick={()=> setOpenModalChangePassword(true)}
                        >Change Password</button>
                    </div>
                </div>
            </>
        );
}

export default TabInformation;
