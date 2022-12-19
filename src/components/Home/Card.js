import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './Card.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
function Card() {
  const [company, setCompany] = useState([]);
  const token = localStorage.getItem('accessToken');

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    < ArrowCircleLeftIcon {...props} sx = {{color: 'black', "&:hover":{color: "gray"}}} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <ArrowCircleRightIcon {...props} sx = {{color: 'black', "&:hover":{color: "gray"}}} />

  );
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() =>{
    if(token)
    {
    const getAllCompany= async() => {
        const response = await axios.get("/admin/list-company",{
        headers: {Authorization: token}
        });
        setCompany(response.data);
    }
    getAllCompany();
    }
  },[token])
 

  return (
    <>
    <Box sx={{marginTop: '40px', display: 'flex', width: '70%'}}>
    <h2 style={{fontFamily: 'Helvetica, Arial, Tahoma, sans-serif', textAlign: 'left', display: 'flex' ,color: '#253b80'}}>SOFTWARE COMPANY</h2>
    
    </Box>
    <div className="Card">
      <Slider {...settings}>
        {company.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-top">
             
              <img
                src={
                  item.avatar
                }
                alt={item.title}
              />
              
              <h1><LocationOnIcon 
                sx={{fontSize:"13px"}}
              />{item.address}</h1>
            </div>
            <div className="card-bottom">
              <h3>{item.companyName}</h3>
              <span className="category">Software Company</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
}

export default Card;