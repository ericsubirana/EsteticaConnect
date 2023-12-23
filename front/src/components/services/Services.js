import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './services.css'
import img1 from '../../assets/tractamentCorporal.jpg'
import img2 from '../../assets/depilacions.png'
import img3 from '../../assets/tractamentFacial.jpg'
import img4 from '../../assets/manicura.jpg'
import img5 from '../../assets/annexos.png'
import img6 from '../../assets/aparotologia.webp'

function Services() {

    const Components = [
        {
            title: 'TRATAMIENTOS CORPORALES',
            nom: 'Tratamientos Corporales',
            img: img1
        },
        {
            title: 'DEPILACIONES',
            nom: 'Depilaciones',
            img: img2
        },
        {
            title: 'TRATAMIENTOS FACIALES',
            nom: 'Tratamientos Faciales',
            img: img3
        },
        {
            title: 'MANICURAS & PEDICURAS',
            nom: 'Manicuras y Pedicuras',
            img: img4
        },
        {
            title: 'SERVICIOS ANEXOS',
            nom: 'Anexos',
            img: img5
        },
        {
            title: 'APARATOLOGÍA',
            nom: 'Aparatología',
            img: img6
        }
    ]

    const navigation = useNavigate();

    const takeServices = async (title) => {
        navigation(`/serveis/${title}`);
    }

    return (
        <div className='service'>
            <div className='servicesMain'>
                <div className='centerTitleProducts'>
                    <div className='titleServicesText'>
                        <div className='marginTitleService'>
                            <h1>SERVICIOS</h1>
                            <div className='lineService'></div>
                            <h3>Concoce los servicios que ofrecemos</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='servicesWidth'>
                <div className='serviceComponents'>
                    {Components.map((component, idx) => (
                        <div key={idx} className='serviceComponent' onClick={() => takeServices(component.nom)}>
                            <div className='serviceTitle'>
                                <h3>{component.title}</h3>
                            </div>
                            <div className='servImage'>
                                <img className='serviceImage' src={component.img} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services