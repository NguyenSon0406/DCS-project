
import React,{useState} from "react";
import "./CreatePost.css";
import {Box, Button, Typography} from "@mui/material"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TagInput from "../../Job/TagInput"
import SnackBar from "../../../utils/SnackBar";
import axios from "axios"
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
const initialState = {
  title:'',
  avatar:'',
  name:'',
  err:'',
  success:''
}

export const CreatePost = (props) => {
  const post = "post";
  const [data, setData] = useState(initialState)
  let {title,avatar,name,err,success} = data;
  const [skills,setSkills] = useState([]);
  const [description,setDescription] = useState('');
  const [image, setImage] = useState(false)
  const [open, setOpen] = useState(false);
  const auth = useSelector(state => state.auth)
  const token = localStorage.getItem('accessToken');
  const {user} = auth;
  const handleSkills = (tags) => {
    setSkills(tags);
  }
  const handleChange = e => {
    const {name, value} = e.target
    setData({...data, [name]:value, err:'', success: ''})
}
const handleImage = async(e) => {
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

      const res = await axios.post('/api/upload_imgPost', formData, {
          headers: {'content-type': 'multipart/form-data', Authorization: token}
      })

      setImage(res.data.url)
      
  } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
  }
}
const handlePost = async (e) => {
  e.preventDefault();
  avatar = user.avatar;
  if(user.companyName)
  name=user.companyName
  else{
  name = user.lastName + " " + user.firstName
  }
  try{
      const res = await axios.post('/post/postArticle',{
          title,avatar,name,image, skills, description
      },{
          headers: {Authorization: token} 
      })
      setData({...data, err:'', success: res.data.msg})
      setOpen(true);
  }catch(err){
      err.response.data.msg && 
      setData({...data, err:err.response.data.msg, success: ''})
      
  }
}
  return (
    <div>
      <div className="img">
        <Typography sx={{ fontSize:"20px", marginBottom:"10px"}}>Choose Image Post</Typography>
        <input
          className="img1"
          type="file"
          id="img"
          name="img"
          onChange={handleImage}
          accept="image/png,image/jpeg"
        />
      </div>
      <div className="Create">
      <Typography sx={{ fontSize:"20px", marginBottom:"10px"}}>Post Title</Typography>
        <input 
        type="text" 
        name="title" 
        class="input"
        placeholder="Post Title"
        onChange={handleChange} />
      </div>
      <div className="Create">
        <Typography sx={{ fontSize:"20px", marginBottom:"5px"}}>Hashtag</Typography>
        <TagInput handleSkills = {handleSkills}/>
      </div>
      <div className="editor">
      <Typography sx={{ fontSize:"20px", marginBottom:"5px"}}>Description</Typography>
      <CKEditor
        id="editor"
        editor={ClassicEditor}
        onChange={(event, editor) =>{
           const data = editor.getData()
           setDescription(data)
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
      <div class="create-button">
      <Box sx={{textAlign:"center", marginBottom:"20px"}}>
            <Button variant="contained" sx={{fontWeight:"bold", marginRight:"25px"}} onClick={handlePost}>Post</Button>
            <Button variant="outlined" sx={{fontWeight:"bold"}}><Link to="/home/post/newest">Cancel</Link></Button>
        </Box>
      </div>
      <SnackBar open={open} setOpen={setOpen} msg={success} type={post}/>
    </div>
  );
};
