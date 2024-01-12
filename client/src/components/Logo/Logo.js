import React from 'react';
import './Logo.scss';
import westreamLogo from '../../assets/icons/westream.png';

const Logo = () => {
    return (
        <div className="logoContainer">
            <img className="appLogo" src={westreamLogo} alt=''></img>
            <label className="logoLabel">westream</label>
        </div>
    )
}

export default Logo;