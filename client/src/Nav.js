import React from 'react'
import { Link } from 'react-router-dom'
// import Insta from './Photos/instagram.png'
// import Facebook from './Photos/facebook.png'
import './App.css'

function Nav() {
    return (
        <div className='nav-container'>
            <span className="socials">
                <a href="https://www.instagram.com/vitamnk/">
                    {/* <img src={Insta} alt="instagram-logo"/> */}
                </a>
                <a href="https://www.facebook.com/kaya.poore">
                    {/* <img src={Facebook} alt="facebook-logo"/> */}
                </a>
            </span>
            <span className='nav-logo'>
                <Link to='/'>
                    <h1>Kaya Poore</h1>
                </Link>
            </span>
            <div className='nav-right'>
                <span className='dropdown'>
                    <h3 className='dropdown-title'>Menu</h3>
                    <div className='dropdown-content'>
                        <Link to="/gallery"><h2>Gallery</h2></Link>
                        <Link to="/contact"><h2>Contact</h2></Link>
                        <Link to="/cart"><h2>Cart</h2></Link>
                    </div>
                </span>
            </div>
        </div>
    )
}

export default Nav