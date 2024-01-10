import React, { useEffect, useState } from 'react';
import './styles/index.scss';
import MainLayout from './layouts/MainLayout/MainLayout';
import Logo from './components/Logo/Logo';

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <div className="App">
      {loading === true ?
        <div className="logoLoad">
          <Logo />
        </div> :
        <>
          <MainLayout />
        </>}
          <div className="footer">Designed and Developed By <a href='https://github.com/avinasdube' alt=''> Avinash Dubey</a></div>
    </div>
  )
}

export default App;
