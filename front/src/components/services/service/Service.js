import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getServices } from '../../../api/services.js'
import Header from '../../header/Header.js';
import Footer from '../../footer/Footer.js';

import TrataminetosCorporales from '../../../assets/TractamentsCorporalsBack.png'
import TrataminetosFaciales from '../../../assets/TractamentFacial2.jpg'
import Depilaciones from '../../../assets/depilacions.jpg'
import ManicuraPedicura from '../../../assets/manicura2.jpg'
import Anexos from '../../../assets/maquillaje.jpg'
import Aparatología from '../../../assets/aparatologia.jpg'

import './service.css'

function Service() {

    const { servei } = useParams();
    const [services, setServices] = useState([]);
    const [serviceClicked, setServicedClicked] = useState();
    const [backgroundImage, setBackgroundImage] = useState(`url(${TrataminetosCorporales})`);
    const height = useRef(null);
    const [descriptionHeight, setDescriptionHeight] = useState(450);
    
    useEffect(() => {
        const subServices = async () => {
            const result = await getServices(servei);
            setServices(result.data);
            setServicedClicked(result.data[0])
        }
        subServices();
    }, [servei])

    useEffect(() => {
        const chooseBack = async () => {
            let background;
            switch (servei) {
                case 'Trataminetos Corporales':
                    background = TrataminetosCorporales;
                    break;
                case 'Depilaciones':
                    background = Depilaciones;
                    break;
                case 'Tratamientos Faciales':
                    console.log(servei)
                    background = TrataminetosFaciales;
                    break;
                case 'Manicuras y Pedicuras':
                    background = ManicuraPedicura;
                    break;
                case 'Anexos':
                    background = Anexos;
                    break;
                case 'Aparatología':
                    background = Aparatología;
                    break;
                default:
                    background = TrataminetosCorporales;
                    break;
            }
            setBackgroundImage(`url(${background})`);
        }
        chooseBack();
    }, [servei])

    useEffect(() => {
        if (height.current) {
            const description = height.current;
            const hasOverflow = description.clientHeight > 451;
            setDescriptionHeight(hasOverflow ? 450 : 'auto');
        }
    }, []);

    const changeService = async (service) => {
        setServicedClicked(service);
    }

    return (
        <div>
            <Header page={'services'} />
            <div className='serviceMain' style={{ backgroundImage: backgroundImage }}>
                <div className='centerTitleProducts'>
                    <div className='titleServiceText'>
                        <h1>{servei}</h1>
                    </div>
                </div>
            </div>
            <div className='serviceShow'>
                <div className='widthService'>
                    <div className='serviceMapWidth'>
                        <div className='serviceMap' ref={height} style={{height:descriptionHeight}}>
                            {services.map((service, idx) => (
                                <div key={idx} onClick={() => changeService(service)} className={`titleService ${serviceClicked && serviceClicked.id === service.id ? 'selected' : ''}`}>
                                    {service.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {serviceClicked && (
                            <div className='infoService'>
                                <div className='serviceDesc'>
                                    {serviceClicked.description}
                                </div>
                                <img className='photoService' src={serviceClicked.image} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default Service