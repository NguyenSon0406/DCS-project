import React, {useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import {showErrMsg,showSuccessMsg} from "../utils/notification";
import axios from 'axios';
import Container from "@mui/material/Container"

function ActivationEmail(props) {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <Container>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </Container>
            
        
    )
}


export default ActivationEmail;

