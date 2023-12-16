import React, { useEffect } from 'react'
import { getServices } from '../../api/services.js'

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
            nom: 'Tractaments Corporals',
            img: img1
        },
        {
            title: 'DEPILACIONES',
            nom: 'Depilacions',
            img: img2
        },
        {
            title: 'TRATAMIENTOS FACIALES',
            nom: 'Tractaments Facials',
            img: img3
        },
        {
            title: 'MANICURAS & PEDICURAS',
            nom: 'Manicures Pedicures',
            img: img4
        },
        {
            title: 'SERVICIOS ANEXOS',
            nom: 'Annexos',
            img: img5
        },
        {
            title: 'APARATOLOGÍA',
            nom: 'Aparatologia',
            img: img6
        }
    ]

    const takeServices = async (title) => {
        const result = await getServices(title);
        console.log(result.data);
    }

    return (
        <div className='service'>
            <div className='servicesMain'>
                <div className='centerTitleProducts'>
                    <div className='titleProductsText'>
                        <h1>SERVICIOS</h1>
                        <div className='lineProducts'></div>
                        <h3>Concoce los servicios que ofrecemos</h3>
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