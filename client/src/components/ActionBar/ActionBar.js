import React from 'react';
import './ActionBar.scss';
import Logo from '../Logo/Logo';

import uploadNew from '../../assets/icons/uploadnew.png'
import viewAll from '../../assets/icons/viewall.png'

const ActionBar = ({ page, setPage }) => {
    return (
        <div className="actionContainer">
            <div className="actionTop">
                <Logo />
            </div>
            <div className="actionMenu">
                <div className={`menuOption ${page === 'view' ? 'active' : ''}`} onClick={() => setPage('view')}>
                    <img className="menuIcon" src={viewAll} alt=''></img>
                    <label className="optionLabel">All</label>
                </div>
                <div className={`menuOption ${page === 'upload' ? 'active' : ''}`} onClick={() => setPage('upload')}>
                    <img className="menuIcon" src={uploadNew} alt=''></img>
                    <label className="optionLabel">Upload New</label>
                </div>
            </div>
        </div>
    )
}

export default ActionBar