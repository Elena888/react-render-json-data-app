import React from 'react'
import logo from '../logo.png'

const Header = () => {
    return(
        <header>
            <div className="container">
                <img src={logo} alt="logo"/>
                <h2>Test Project</h2>
            </div>
        </header>
    )
};

export default Header;