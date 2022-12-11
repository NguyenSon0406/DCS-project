import React from 'react'
import Slider from '../components/Home/Slider'
import Card from '../components/Home/Card'
import ContentList from '../components/Home/ContentList'
import "./Home.css"
export const Home = () => {
  return (
    <div className='container' style={{marginTop:"50px"}}>
      <Slider/>
      <Card/>
      <ContentList/>
      
    </div>
  )
}

