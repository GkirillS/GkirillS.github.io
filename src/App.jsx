import React, { useEffect, useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Banner from './components/Banner';
import Product from './components/Product';
import Categories from './components/Categories';
import * as XLSX from 'xlsx';


const App = () => {
  return (
    <div style={{ height: '1000px' }}>
      <Header />
      <main>
        <Banner />
        <Categories />
      </main>
      <Footer />
    </div>
  )
}

export default App