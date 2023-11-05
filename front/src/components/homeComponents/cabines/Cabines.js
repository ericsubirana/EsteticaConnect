import React from 'react'

import './cabines.css'
import img1 from '../../../assets/cabina.jpg'

function Cabines() {

    const info = [
        {
            image: img1,
            description: "Lorem ipsum dolor sit amet consectetur adipiscing, elit sociis quis auctor tempus, in lobortis sollicitudin  primis accumsan.",
        },
        {
            image: img1,
            description: "Lorem ipsum dolor sit amet consectetur adipiscing, elit sociis quis auctor tempus, in lobortis sollicitudin  primis accumsan.",
        },
        {
            image: img1,
            description: "Lorem ipsum dolor sit amet consectetur adipiscing, elit sociis quis auctor tempus, in lobortis sollicitudin  primis accumsan.",
        }
    ];

    return (
        <div className='cabines'>
            <div className='titleCabines'>
                <h1>LES NOSTRES CABINES</h1>
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