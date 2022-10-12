import React from "react";
import Post from "./Post";
import "./Home.css";
import Container from '@mui/material/Container';
import {Route,Routes} from "react-router-dom";
import Navbar from "../components/Navbar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function Homepage(){
    return(
        <Container>
            <Navbar/>
            <Routes>
                <Route path= "/post"  element={<Post/> }/>
            </Routes>
            
        </Container>
    );
}