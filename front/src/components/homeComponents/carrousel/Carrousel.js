import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';

import "./carrousel.css";
import img1 from '../../../assets/annexos.png';
import img2 from '../../../assets/aparotologia.webp';
import img3 from '../../../assets/depilacions.png';
import img4 from '../../../assets/manicura.jpg';
import img5 from '../../../assets/tractamentCorporal.jpg';
import img6 from '../../../assets/tractamentFacial.jpg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carrousel() {

  const [slidesToShow, setSlidesToShow] = useState(3);
  const navigation = useNavigate();

  const info = [
    {
        title: 'TRATAMIENTOS CORPORALES',
        nom: 'Tratamientos Corporales',
        img: img5
    },
    {
        title: 'DEPILACIONES',
        nom: 'Depilaciones',
        img: img3
    },
    {
        title: 'TRATAMIENTOS FACIALES',
        nom: 'Tratamientos Faciales',
        img: img6
    },
    {
        title: 'MANICURAS & PEDICURAS',
        nom: 'Manicuras y Pedicuras',
        img: img4
    },
    {
        title: 'SERVICIOS ANEXOS',
        nom: 'Anexos',
        img: img1
    },
    {
        title: 'APARATOLOGÍA',
        nom: 'Aparatología',
        img: img2
    }
  ]


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

  const moveToService = (title) => {
    navigation(`/serveis/${title}`);
  }

  return (
    <div className='carrousel'>
      <h1>SERVEIS</h1>
      <div className='allImages'>
        <Slider {...settings}>
          {info.map((e, index) => (
            <div key={index} className='slider'>
              <img src={e.img} className='imageSlider' onClick={() => moveToService(e.nom)}/>
              <p className='titleCarrousel'>{e.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carrousel;
