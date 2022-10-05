import React from "react";
import Post from "./Post";
import "./Home.css"
import Navbar from "../components/Navbar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function Homepage(){
    return(
        <div className="ui container">
            <Post/>
        </div>
    );
}