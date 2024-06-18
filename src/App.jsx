import React, { useEffect, useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import ModalLanguage from './components/ModalLanguage';

const App = () => {
  const [ language, setLanguage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
      const local = JSON.parse(localStorage.getItem('language'))
      if (local) setLanguage(local) 
      document.body.style.overflow = 'hidden'
      setIsLoading(true)
  }, [ ])
  
  useEffect(() => {
      localStorage.setItem('language', JSON.stringify(language));
      document.body.style.overflow = 'auto'
  }, [language])
  
  return (
    <div>
      <Header />
      <main>
        <Menu
          language={language}
        />
      </main>
      <Footer />
      {isLoading ? 
        language ? null : 
          <ModalLanguage
              language={language}
              setLanguage={setLanguage}
          />
      : null}
    </div>
  )
}

export default App