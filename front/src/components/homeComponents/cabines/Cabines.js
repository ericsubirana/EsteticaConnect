import React from 'react'

import './cabines.css'
import img1 from '../../../assets/cabina1.jpeg'
import img2 from '../../../assets/cabina2.jpeg'
import img3 from '../../../assets/cabina3.jpeg'


function Cabines() {

    const info = [
        {
            image: img1,
            description: "En la cabina 1 ofrecemos todo tipo de depilaciones, depilación con cera fría o caliente, depilación eléctrica y depilación láser.",
        },
        {
            image: img2,
            description: "En la cabina 2 ofrecemos todo tipo de tratamientos faciales y tratamientos corporales personalizados.",
        },
        {
            image: img3,
            description: "En la cabina 3 ofrecemos diferentes servicios como pedicura, manicura, esmalte permanente, uñas acríclicas y más.",
        }
    ];

    return (
        <div className='cabines'>
            <div className='titleCabines'>
                <h1>NUESTRAS CABINAS</h1>
            </div>
            <div className='centerCabines'>
                {info.map((e, index) => (
                    <div key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                        <div className={`imageCabina ${index % 2 === 1 ? 'swap' : ''}`}>
                            <img src={e.image} alt="" />
                        </div>
                        <div className={`textCabina ${index % 2 === 1 ? 'swap' : ''}`}>
                            <h2 className='titleCabina'>CABINA</h2>
                            <p>{e.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cabines