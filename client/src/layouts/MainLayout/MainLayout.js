import React, { useState } from 'react';
import './MainLayout.scss';
import ActionBar from '../../components/ActionBar/ActionBar';
import ViewBar from '../../components/ViewBar/ViewBar';
import UploadForm from '../../components/UploadForm/UploadForm';

const MainLayout = () => {
    // state to manage component render
    const [page, setPage] = useState('view')
    return (
        <div className="layoutContainer">
            <div className="mainLeftContainer">
                <ActionBar page={page} setPage={setPage} />
            </div>
            <div className="mainMiddleContainer">
                {page === 'view' && <ViewBar />}
                {page === 'upload' && <UploadForm setPage={setPage} />}
            </div>
        </div>
    )
}

export default MainLayout