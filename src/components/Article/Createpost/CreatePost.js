import React from "react";
import "./CreatePost.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const CreatePost = (props) => {
  return (
    <div>
      <div className="img">
        <div style={{paddingBottom:"10px", fontSize:"20px", color:"#9e9e9e"}}>Choose Image Post</div>
        <input
          className="img1"
          type="file"
          id="img"
          name="img"
          accept="image/png,image/jpg"
        />
      </div>
      <div className="Create">
        <input type="text" class="input" placeholder="Post Title" />
      </div>
      <div className="Create">
        <input
          type="text"
          class="input"
          placeholder="Enter at least 1 hashtag!"
        />
      </div>
      <div className="editor">
      <CKEditor
        id="editor"
        editor={ClassicEditor}
        data={props.jobDescription}
        onChange={(event, editor) =>{
           const data = editor.getData()
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
            <Button variant="contained" sx={{fontWeight:"bold", marginRight:"25px"}}>Post</Button>
            <Button variant="outlined" sx={{fontWeight:"bold"}}><Link to="/home/post/newest">Cancel</Link></Button>
        </Box>
      </div>
    </div>
  );
};
