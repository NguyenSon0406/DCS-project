import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import './Card.css';
import { dataDigitalBestSeller } from './data';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Divider from '@mui/material/Divider';
function Card() {
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    < ArrowCircleLeftIcon {...props} sx = {{color: 'black', "&:hover":{color: "gray"}}} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <ArrowCircleRightIcon {...props} sx = {{color: 'black', "&:hover":{color: "gray"}}} />

  );
  const [defaultImage, setDefaultImage] = useState({});
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

 

  return (
    <>
    <Box sx={{marginTop: '40px', display: 'flex', width: '70%'}}>
    <h2 style={{fontFamily: 'Helvetica, Arial, Tahoma, sans-serif', textAlign: 'left', display: 'flex' ,color: '#253b80'}}>SOFTWARE COMPANY</h2>
    
    </Box>
    <div className="Card">
      <Slider {...settings}>
        {dataDigitalBestSeller?.map((item) => (
          <div className="card">
            <div className="card-top">
              <img
                src={
                  defaultImage[item.title] === item.title
                    ? defaultImage.linkDefault
                    : item.linkImg
                }
                alt={item.title}
                
              />
              <h1>{item.title}</h1>
            </div>
            <div className="card-bottom">
              <h3>{item.price}</h3>
              <span className="category">{item.category}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
}

export default Card;