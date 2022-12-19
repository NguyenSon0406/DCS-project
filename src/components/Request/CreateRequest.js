import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl,InputLabel, Select, MenuItem, Button, Typography, Box } from '@mui/material'
export default function CreateRequest(props) 
{
  const [title, setTitle] = React.useState('');
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
   const handleChangeStage= () => {
    props.handleComplete();
   }
    return (
    <>
   <Box sx={{
    marginTop:"20px",
    boxShadow:"0px 1px 5px rgba(0,0,0,0.3)",
    borderRadius:'5px',
    height:"550px",
    padding: 2
   }}>
   <Typography sx={{
      fontWeight:"bold",
      fontSize:"25px"
    }}>Create Request</Typography>
    <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-filled-label">Title</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={title}
          onChange={handleChange}
        >
          <MenuItem value="List potential Student">List potential Student</MenuItem>
          <MenuItem value="Seminar">Seminar</MenuItem>
        </Select>
      </FormControl>
      <CKEditor
        id="editor"
        editor={ClassicEditor}
        onChange={(event, editor) =>{
           const data = editor.getData()
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
        <Button variant='contained' color="error" 
        sx={{fontWeight:"bold", p:1.5, float:"right", marginTop:"15px"}}
        onClick={handleChangeStage}
        >Create Request</Button>
   </Box>
    </>
  )
}
