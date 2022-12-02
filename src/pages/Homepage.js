import React from "react";
import Post from "./Post";
import "./Home.css";
import Footer from "../components/Home/Footer"
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
import ArticleList from "../components/Article/ArticleList/ArticleList"
import ArticlePost from "../components/Article/ArticlePost/ArticlePost"
import {CreatePost} from "../components/Article/Createpost/CreatePost"
import EditPost from "../components/Article/EditPost/EditPost"
import HomeProfileAdmin from '../components/ProfileAdmin/HomeProfileAdmin'
import HomeProfileCompany from "../components/ProfileCompany/HomeProfileCompany";
import { CreatePost } from "../components/Createpost/CreatePost";
import DashBoard from '../components/ProfileAdmin/PagesAdmin/DashBoard'
import Students from '../components/ProfileAdmin/PagesAdmin/Students'
import Companies from '../components/ProfileAdmin/PagesAdmin/Companies'
import Request from '../components/ProfileAdmin/PagesAdmin/Request'
export default function Homepage(){
    const auth = useSelector(state => state.auth)
    const { role, isAdmin } = auth;
    return (
        (!isAdmin) ?
           (
            <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path = "/post/newest" element={<ArticleList/>}/>
                    <Route path = "/post/readmore" element={<ArticlePost/>}/>
                    <Route path = "/post/create" element={<CreatePost/>}/>
                    <Route path = "/post/editpost" element={<EditPost/>}/>
                    <Route path="/recruitment/myjobpost" element={<MyJobPost />} />
                    <Route path="/recruitment/newest" element={<Recruitment />} />
                    <Route path="/recruitment/detail/:id" element={<RecruitmentDetail />} />
                    <Route path="/recruitment/edit/:id" element={<UpdateJob />} />
                    <Route path="/profile" exact element={(role === 0) ? (<HomeProfile />) : (<HomeProfileCompany />)} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/liststudent" element={<ListStudent />} />
                </Routes>
            <Footer />
            </> 
            )
            : (
              <>
               <div style={{display:"flex", height: '100vh'}}>
                <HomeProfileAdmin/>
                    <Routes>
                        <Route path="/" element={<DashBoard/>}/>
                        <Route path = "/admin/students" element={<Students/>}/>
                        <Route path = "/admin/companies" element={<Companies/>}/>
                        <Route path = "/admin/request" element={<Request/>}/>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
               </div>
                <Footer/>
              </>
            )
    )
}