import React from 'react'

import img1 from '../../assets/f.png'
import { LuMail } from 'react-icons/lu'
import { BsTelephone } from 'react-icons/bs'
import { CiFacebook } from 'react-icons/ci'
import { FiInstagram } from 'react-icons/fi'
import { AiFillLinkedin } from 'react-icons/ai'


import './footer.css'

function Footer() {
  return (
    <>
      <div className='footer'>
        <div className='widthFooter'>
          <div className='contact'>
            <h1>CONTACTE</h1>
            <div className='contactEmail'>
              <LuMail size={25} />
              <p>ce.fina@hotmail.com</p>
            </div>
            <div className='contactTelephone'>
              <BsTelephone size={25} />
              <p>696156241</p>
            </div>
            <div className='followUs'>
              <h1>SEGUEIX-NOS!</h1>
              <CiFacebook size={25} className="icon" />
              <FiInstagram size={25} className="icon" />
              <AiFillLinkedin size={25} className="icon" />
            </div>
          </div>
          <div className='imageFooter'>
            <img src={img1} height={255} />
            <p>© 2023 Èric Subirana</p>
          </div>
          <div className='ubication'>
            <h1>UBICACIÓ</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.2865405876532!2d1.8450521770084654!3d41.735911971257735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f7f20ab2e60f%3A0xaa864b8f1e19c9c6!2sCam%C3%AD%20dels%20Tovots%2C%204%2C%2008243%20Manresa%2C%20Barcelona!5e0!3m2!1sca!2ses!4v1699305719382!5m2!1sca!2ses" width="225" height="225" style={{ border: 0, borderRadius: "15px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
      <div className='footerlinks'>
        <a href="" className='fl'>Avís legal</a>
        <a href="" className='fl'>Terminis generals de venta</a>
        <a href="" className='fl'>Política de calitat</a>
      </div>
    </>
  )
}

export default Footer