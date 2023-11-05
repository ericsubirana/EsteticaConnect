import React, { useState } from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./carrousel.css"
import img1 from '../../assets/annexos.png'
import img2 from '../../assets/aparatologia.webp'
import img3 from '../../assets/depilacions.png'
import img4 from '../../assets/manicura.jpg'
import img5 from '../../assets/tractamentCorporal.jpg'
import img6 from '../../assets/tractamentFacial.jpg'




function Carrousel() {

  const images = [img1, img2, img3, img4, img5, img6];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='carrousel'>
        <h1>SERVEIS</h1>
        <Slider {...settings}>

        </Slider>
    </div>
  )
}

export default Carrousel