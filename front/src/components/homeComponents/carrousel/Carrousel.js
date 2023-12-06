import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

import "./carrousel.css";
import img1 from '../../../assets/annexos.png';
import img2 from '../../../assets/aparatologia.webp';
import img3 from '../../../assets/depilacions.png';
import img4 from '../../../assets/manicura.jpg';
import img5 from '../../../assets/tractamentCorporal.jpg';
import img6 from '../../../assets/tractamentFacial.jpg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carrousel() {

  const [slidesToShow, setSlidesToShow] = useState(3);

  const info = [
    {
      image: img6,
      title: 'TRACTAMENT FACIAL'
    },
    {
      image: img2,
      title: 'APARATOLOGÍA'
    },
    {
      image: img3,
      title: 'DEPILACIONS'
    },
    {
      image: img5,
      title: 'TRACTAMENT CORPORAL'
    },
    {
      image: img4,
      title: 'MANICURA'
    },
    {
      image: img1,
      title: 'ANNEXOS'
    },
    
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        if(window.innerWidth < 700)
          setSlidesToShow(1);
        else
          setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div className='carrousel'>
      <h1>SERVEIS</h1>
      <div className='allImages'>
        <Slider {...settings}>
          {info.map((e, index) => (
            <div key={index} className='slider'>
              <img src={e.image} className='imageSlider' />
              <p className='titleCarrousel'>{e.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carrousel;
