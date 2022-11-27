import React, { useState} from "react";
import './TabInformation.css';
import ModalChangePassword from "./modal/ModalChangePassword";
import axios from "axios"
import { useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = {
    firstName:'',
    lastName:'',
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
    const auth = useSelector(state => state.auth);
    const token = localStorage.getItem('accessToken');
    const {user} = auth;

    const [data, setData] = useState(initialState)
    const {firstName, lastName,contact, address, err, success} = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

    const [descriptionHTML,setDesciptionHTML] = useState(initialState.description);
    const {description} = descriptionHTML;
    
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
    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

     const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                avatar: avatar ? avatar : user.avatar,
                firstName : firstName ? firstName : user.firstName,
                lastName: lastName ? lastName : user.lastName,
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
            if(firstName || lastName || contact || address || description || avatar )
                {
                    updateInfor();
                    handleClick();
                }
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
                    <div className="infor-title">Company information</div>
                    <div className="avatar">
                        <div className="title-avatar">Avatar</div>
                        <input className="input-img" type="file"  onChange={changeAvatar}  />
                    </div>
                    <div className="infor-input">
                        <div className="infor-group">
                        </div>
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>First Name</label>
                                <input
                                    className="input-infor-item"
                                    type="text"
                                    name="firstName"
                                    defaultValue={user.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Last Name</label>
                                <input
                                    className="input-infor-item"
                                    type="text"
                                    name="lastName"
                                    defaultValue={user.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Email</label>
                                <input
                                    className="input-infor-item"
                                    type="email"
                                    value={user.email}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>Phone</label>
                                <input
                                    className="input-infor-item"
                                    type="text"
                                    name="contact"
                                    defaultValue={user.contact}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Address</label>
                                <input
                                    className="input-infor-item"
                                    type="text"
                                    name="address"
                                    defaultValue={user.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="infor-group">
                            <div className="description">     
                                    <label>Description</label>
                                    <CKEditor
                                        id="editor"
                                        editor={ClassicEditor}
                                        data={user.description ?? "<p>Input Job Descriptions</p>"}
                                        onChange={(event, editor) =>{
                                            const data = editor.getData()
                                            setDesciptionHTML({...descriptionHTML,description: data});
                                        }}
                                        onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                        writer.setStyle(
                                        "height",   
                                        "300px",
                                        editor.editing.view.document.getRoot()
                                        );
                                        });
                                        }}

                                    />
                            </div>
                        </div>
                    </div>
                    <div className="infor-btnsave">
                        <button
                            className="btn-save btn btn-primary"
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
                            className="btn-on-change-password btn btn-primary"
                            onClick={()=> setOpenModalChangePassword(true)}
                        >Change Password</button>
                    </div>
                </div>
            </>
        );
}

export default TabInformation;
