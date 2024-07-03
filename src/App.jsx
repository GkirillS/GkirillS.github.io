import React, { useEffect, useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import ModalLanguage from './components/ModalLanguage';

const App = () => {
  const [language, setLanguage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModalLanguage, setIsOpenModalLanguage] = useState(false);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('language'))
    if (local) setLanguage(local)
    document.body.style.overflow = 'hidden'
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (language) {
      localStorage.setItem('language', JSON.stringify(language));
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
      setIsLoading(true)
    }
    setIsOpenModalLanguage(false)
  }, [language])

  return (
    <div>
      <Header />
      <main>
        <Menu
          language={language}
        />
      </main>
      <Footer 
        language={language}
        setIsOpenModalLanguage={setIsOpenModalLanguage}
      />
      {isLoading ?
        language && !isOpenModalLanguage? null :
          <ModalLanguage
            language={language}
            setLanguage={setLanguage}
          />
        : null}
    </div>
  )
}

export default App