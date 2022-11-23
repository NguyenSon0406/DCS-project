import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from 'react';
import { useState } from 'react';

const TextEdittor = (props) => {
    const [text,setText] = useState("");
        return (
        <> <CKEditor
        id="editor"
        editor={ClassicEditor}
        data={props.jobDescription}
        onChange={(event, editor) =>{
           const data = editor.getData()
           setText(data);
           props.setDescription(text);
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
        </>
        
        );
}
export default TextEdittor;
