import React from "react";
import Post from "./Post";
import "./Home.css";
import {Route,Routes,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Recruitment from "./Recruitment";
import NotFound from '../utils/notFound';
import { Home } from "./Home";
import MyJobPost from "./MyJobPost";

export default function Homepage(){
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth;
    return(
        (!isLogged) ? (<Navigate to="/"/>) : (
            <>
            <Navbar/>
            <Routes>
                <Route path= "/"  element={<Home/> }/>
                <Route path= "/post" element={<Post/>}/>
                <Route path = "/recruitment/myjobpost" element={<MyJobPost/>}/>
                <Route path= "/recruitment/newest" element={<Recruitment/> }/>
                <Route path= "*"  element={<NotFound/> }/>
            </Routes>
             </> 
        )  
    );
}