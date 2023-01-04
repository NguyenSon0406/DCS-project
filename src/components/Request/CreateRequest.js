import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormControl,InputLabel, Select, MenuItem,Modal, Button, Typography, Box, FilledInput } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  textAlign:"center",
};
export default function CreateRequest(props) 
{
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [title, setTitle] = React.useState('');
  const [type, setType] =  React.useState('');
  const [text,setText] = React.useState('')
  const handleTitle = (e) =>{
    setTitle(e.target.value)
  }
  const handleText = (e) => {
    setText(e)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleChange = (event) => {
    setType(event.target.value);
  };
   const handleChangeStage= () => {
    props.handleComplete();
    handleOpen();
   }
   const handleReturn = (e) => {
    e.preventDefault();
    setText('')
    setType('');
    setValue('');
    setTitle('');
    props.handleBack()
   }
    return (
    <>
   <Box sx={{
    marginTop:"20px",
    boxShadow:"0px 1px 5px rgba(0,0,0,0.3)",
    borderRadius:'5px',
    height:"650px",
    padding: 2
   }}>
   <Typography sx={{
      fontWeight:"bold",
      fontSize:"25px"
    }}>Create Request</Typography>
    <Box sx={{display:"flex", width:"100%", marginBottom:"15px"}}>
      <FormControl variant="filled" sx={{ m: 1, minWidth: "49%" }}>
        <InputLabel id="demo-simple-select-filled-label">Title</InputLabel>
        <FilledInput labelId="demo-simple-select-filled-label" value={title} onChange={handleTitle} />     
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: "49%" }}>
        <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={type}
          onChange={handleChange}
        >
          <MenuItem value="List potential Student">List potential Student</MenuItem>
          <MenuItem value="Seminar">Seminar</MenuItem>
        </Select>
      </FormControl>
    </Box>
    {(type==="Seminar") ?
      <Box sx={{
        width:"49%",
        marginBottom:"10px"
      }}>
        <Typography sx={{
            fontSize:"20px"
          }}>Choose Date</Typography>
       <Box sx={{
        display:"flex",
        textAlign:"center",
        alignItems:"center"
       }}>
        <DatePicker multiple
            format="DD/MM/YYYY"
            sort
            plugins={[
          <DatePanel />
          ]} value={value} onChange={setValue}
            style={{width:"100%", height:"35px"}}
          ></DatePicker>
          <EventIcon sx={{marginLeft:"10px", fontSize:"30px"}}/>
       </Box>
       
      </Box> : "" }
      <CKEditor
        id="editor"
        editor={ClassicEditor}
        data={text ? text : ""}
        onChange={(event, editor) =>{
           const data = editor.getData()
           handleText(data)
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
       {props.activeStep === 0 ?  <Button variant='contained' color="error" 
        sx={{fontWeight:"bold", p:1.5, float:"right", marginTop:"15px"}}
        onClick={handleChangeStage}
        >Create Request</Button> :  <Box sx={{
          display:"flex",
          float:"right",
          marginTop:"15px",
          textAlign:"center",
          alignItems:"center"
        }}>
          <Typography>Another request ?</Typography>
          <Button variant='outlined' onClick={handleReturn} sx={{marginLeft:"10px", p:1.5, fontWeight:"bold"}}>Click Here</Button>
        </Box>}
       
   </Box>
   <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={ open && setTimeout(() => {
            setOpen(false)
        }, 3000)}
        >
        <Box sx={style}>
            <CheckCircleIcon fontSize='large' sx={{color:"green"}}/>
            <Typography>Request Successfully</Typography>
            <Button variant="contained" onClick={(e)=>setOpen(false)} sx={{marginTop:"10px",color: "white", fontWeight:"bold"}}>
                Return
            </Button>
        </Box>
    </Modal>
    </>
  )
}
