import React from "react";
import {NavLink, Link} from 'react-router-dom'
import Logo from '../../pictures/logo-nobg.png'
import './header.css'

const Header = () => {
    return(
        <nav>
            <div className='header-div'>
                <div className='header-logo-div'>
                    <img src={Logo} alt='logo' className='header-logo-img' />
                </div>
                <div className='navTabs-div'>
                    <ul>
                        <li>Projects</li>
                        <li>Tasks</li>
                        <li>Profile</li>
                        <li>Settings</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;