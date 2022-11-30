import { ClassNames } from "@emotion/react";
import React from "react";
import "./CreatePost.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const CreatePost = (props) => {
  return (
    <div>
      <div className="img">
        <input
          className="img1"
          type="file"
          id="img"
          name="img"
          accept="image/*"
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
      <div class="card-bottom">
        <button type="button">Create</button>
        <button type="button">Cancel</button>
      </div>
    </div>
  );
};
