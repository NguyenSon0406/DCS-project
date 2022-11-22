import React from "react";
import Post from "./Post";
import "./Home.css";
import Footer from "../components/Home/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Recruitment from "./Recruitment";
import NotFound from "../utils/notFound";
import { Home } from "./Home";
import MyJobPost from "./MyJobPost";
import UpdateJob from "../components/Job/UpdateJob";
import RecruitmentDetail from "../components/Job/JobDetail";
import HomeProfile from "../components/ProfileStudent/HomeProfile";
import ListStudent from "./ListStudent";
import HomeProfileCompany from "../components/ProfileCompany/HomeProfileCompany";
import { CreatePost } from "./CreatePost";
export default function Homepage() {
     const auth = useSelector(state => state.auth)
    const {isLogged,role} = auth;
    return(
        (!isLogged) ? (<Navigate to="/"/>) : (
            <>
            <Navbar/>
            <Routes>
                <Route path= "/"  element={<Home/> }/>
                <Route path= "/post" element={<Post/>}/>
                <Route path = "/recruitment/myjobpost" element={<MyJobPost/>}/>
                <Route path= "/recruitment/newest" element={<Recruitment/> }/>
                <Route path = "/recruitment/detail/:id" element={<RecruitmentDetail/>}/>
                <Route path = "/recruitment/edit/:id" element={<UpdateJob/>}/>
                <Route path= "/profile" exact element={(role === 0) ? (<HomeProfile/>): (<HomeProfileCompany/>)}/>
                <Route path= "*"  element={<NotFound/> }/>
                <Route path= "/liststudent"  element={<ListStudent/> }/>
                <Route path="/post/create" exact element={<CreatePost />} />
            </Routes>
            <Footer/>
             </> 
        )  
    )
    ;
}
