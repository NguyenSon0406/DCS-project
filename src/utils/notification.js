import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export const showErrMsg = (msg) => {
    return <Alert severity="error" variant="filled" style={{marginBottom:"10px"}}>
                <AlertTitle>Error</AlertTitle>
                {msg}
            </Alert>
}

export const showSuccesMsg = (msg) => {
    return  <Alert severity="success" variant="filled" style={{marginBottom:"10px"}}>
            <AlertTitle>Success</AlertTitle>
                {msg}
            </Alert>
            
}