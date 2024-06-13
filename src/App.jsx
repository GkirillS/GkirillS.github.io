import React, { useEffect, useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';


const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Menu />
      </main>
      <Footer />
    </div>
  )
}

export default App