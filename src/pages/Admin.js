import React from 'react'
import HomeProfileAdmin from '../components/ProfileAdmin/HomeProfileAdmin'
import DashBoard from '../components/ProfileAdmin/PagesAdmin/DashBoard'
import Students from '../components/ProfileAdmin/PagesAdmin/Students'
import Companies from '../components/ProfileAdmin/PagesAdmin/Companies'
import Request from '../components/ProfileAdmin/PagesAdmin/Request'
import { Route, Routes} from "react-router-dom";

export default function Admin() {
  return (
    <>
        <Route>
            <Routes path="/dashboard" element={<DashBoard/>}/>
            <Routes path = "/students" element={<Students/>}/>
            <Routes paht = "/companies" element={<Companies/>}/>
            <Routes paht = "/request" element={<Request/>}/>
        </Route>
    </>
  )
}
