import React from 'react'

function Footer() {
  return (
    <div className='routesDown'>
      <Link className='about' to='/'>About</Link>
      <Link className='contact' to='/'>Contact</Link>
    </div>
  )
}

export default Footer