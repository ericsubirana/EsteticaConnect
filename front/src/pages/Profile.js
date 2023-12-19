import React from 'react'
import Header from '../components/header/Header.js'
import Footer from '../components/footer/Footer.js'
import ProfileUser from '../components/profile/ProfileUser.js'

function Profile() {
  return (
    <div>
      <Header page='profile'/>
      <ProfileUser/>
      <Footer/>
    </div>
  )
}

export default Profile