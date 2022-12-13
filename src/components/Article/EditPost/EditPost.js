import React,{useState} from 'react'
import './EditPost.css';
import { createRoot } from "react-dom/client";
import {Box, Grid, ThemeProvider, Typography, Button,Paper, Divider, Chip, IconButton,Menu, MenuItem,Tooltip} from "@mui/material"
import { useLocation,Link } from 'react-router-dom';
import TagInput from "../../Job/TagInput";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import SnackBar from '../../../utils/SnackBar';
const initialState = {
  tempTitle:'',
  err:'',
  success:''
}

export default function EditPost() {
  const post = "post";
  const [tempSkills,setTempSkills] = useState([]);
  const rootElement = document.getElementById("root");
    const root = createRoot(rootElement);
    const [tempImg, setTempImg] = useState("")
    const token = localStorage.getItem('accessToken');
    const getLocation = useLocation(); 
    const [data, setData] = useState(initialState);
    const {tempTitle,success,err} = data;
    const {_id,title,skills,description,img} = getLocation.state.edit;
    const [tempDescription, setTempDescription] = useState('');
    const [open,setOpen] = useState(false);
    const [anchorElSetting, setAnchorElSetting] = useState(null);
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
      setOpen(true);
    };
    const handleChange = (e) => {
      const {name,value} = e.target;
      setData({...data,[name]:value})
  }
      const handleUpdate = async(e) => {
        try{
           const res = await axios.patch(`/post/update/${_id}`,{
                title: tempTitle ? tempTitle : title,
                img: tempImg ? tempImg : img,
                skills: tempSkills ? tempSkills : skills,
                description: tempDescription ? tempDescription : description
            },{
                headers: {Authorization: token}
            })
            setData({...data,err:'',success:res.data.msg})
            setOpen(true);
        }catch(err)
        {
            err.response.data.msg && 
            setData({...data, err:err.response.data.msg, success: ''})
        }
    }
    const changeImg = async(e) => {
      e.preventDefault()
      try {
          const file = e.target.files[0]

          if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

          if(file.size > 1280 * 1280)
              return setData({...data, err: "Size too large." , success: ''})

          if(file.type !== 'image/jpeg' && file.type !== 'image/png')
              return setData({...data, err: "File format is incorrect." , success: ''})

          let formData =  new FormData()
          formData.append('file', file)

          setLoading(true)
          const res = await axios.post('/api/upload_imgPost', formData, {
              headers: {'content-type': 'multipart/form-data', Authorization: token}
          })

          setLoading(false)
         setTempImg(res.data.url)
          
      } catch (err) {
          setData({...data, err: err.response.data.msg , success: ''})
      }
  }
  const handleSkills = (tags) => {
    setTempSkills(tags);
}
    return(
    <>
        <div class="left-content grid-66">  
        <article class="main-article boxed ">
        <p style={{fontWeight:"bold", fontSize:"30px"}}>Edit Article</p>
            <div className="Create2">
                <input type="text" class="input2" name="tempTitle" placeholder="Post Title" defaultValue={title} onChange={handleChange}/>
            </div>
                <TagInput skills={skills} handleSkills={handleSkills}/>
            <section class="post-content">
                <div class="post-format-image post-format-wrapper ">
                    
        <div className="img" class =" editimg">
        <input
          className="img1"
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={changeImg}
        />
      </div>
                </div>
                <div class="text">
                <Grid item xs={12}>
      <div className="editor2">
      <CKEditor
        id="editor2"
        editor={ClassicEditor}
        data={description}
        onChange={(event, editor) =>{
           const data = editor.getData()
           setTempDescription(data);
        }}
        
        onReady={(editor) => {
       editor.editing.view.change((writer) => {
       writer.setStyle(
           "height",   
           "400px",
           editor.editing.view.document.getRoot()
           );
           });
           }}

        />
      </div>
                    </Grid>
                </div>
            </section>
        </article>
        <Grid item xs={12} spacing={2} textAlign="center">
                        <Button variant="contained" color="primary" sx={{fontWeight:"bold",fontSize:"15px",padding:1,marginRight:"30px", width:"100px"}} onClick={handleUpdate}>EDIT</Button>
                        <Button variant="contained" color="error" sx={{fontWeight:"bold",fontSize:"15px", padding:1,width:"100px"}} onClick={handleClick}>CANCEL</Button>
                    </Grid>
      </div>
      <SnackBar open={open} setOpen={setOpen} msg={success} type={post} />

    </>
    )
}