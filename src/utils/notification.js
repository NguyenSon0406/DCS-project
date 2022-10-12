import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export const showErrMsg = (msg) => {
    return <Alert severity="error" variant="filled" style={{marginBottom:"10px",padding:4}}>
                <AlertTitle sx={{marginTop:"2px", fontWeight:"bold"}}>Error - {msg}</AlertTitle> 
            </Alert>
}

export const showSuccessMsg = (msg) => {
    return  <Alert severity="success" variant="filled" style={{marginBottom:"10px",padding:4}}>
            <AlertTitle sx={{marginTop:"2px", fontWeight:"bold"}}>Success - {msg}</AlertTitle>
                
            </Alert>
            
}