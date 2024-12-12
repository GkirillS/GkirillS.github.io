import React, { useEffect, useState } from 'react'
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import ModalLanguage from './components/ModalLanguage';
import { API_BAR, API_KITCHEN, API_SPECIAL } from './helpers/const';
import axios from 'axios';

const App = () => {
  const [language, setLanguage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModalLanguage, setIsOpenModalLanguage] = useState(false);
  const [bar, setBar] = useState({})
	const [kitchen, setKitchen] = useState({})
	const [special, setSpecial] = useState({})
	const [catalogBar, SetCatalogBar] = useState([])
	const [catalogKitchen, SetCatalogKitchen] = useState([])
	const [catalogSpecial, SetCatalogSpecial] = useState([])
	const [selectedCatalog, setSelectedCatalog] = useState('special')
	const [selectedCategory, setSelectedCategory] = useState(null)

	const [isLoadingBar, setIsLoadingBar] = useState(false)
	const [isLoadingKitchen, setIsLoadingKitchen] = useState(false)
	const [isLoadingSpecial, setIsLoadingSpecial] = useState(false)

	const getKitchen = async () => {
		try {
			const resposneKitchen = await axios.get(API_KITCHEN)
			localStorage.setItem('catalogKitchen', JSON.stringify(resposneKitchen.data.catalogs))
			SetCatalogKitchen(resposneKitchen.data.catalogs)
			setSelectedCategory(resposneKitchen.data.catalogs[0].name_en)
			delete resposneKitchen.data.catalogs
			localStorage.setItem('kitchen', JSON.stringify(resposneKitchen.data))
			setKitchen(resposneKitchen.data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoadingBar(false)
		}
	}

	const getSpecial = async () => {
		try {
			const resposneSpecial = await axios.get(API_SPECIAL)
			localStorage.setItem('catalogSpecial', JSON.stringify(resposneSpecial.data.catalogs))
			SetCatalogSpecial(resposneSpecial.data.catalogs)
			setSelectedCategory(resposneSpecial.data.catalogs[0].name_en)
			delete resposneSpecial.data.catalogs
			localStorage.setItem('special', JSON.stringify(resposneSpecial.data))
			setSpecial(resposneSpecial.data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoadingSpecial(false)
		}
	}

	const getBar = async () => {
		try {
			const resposneBar = await axios.get(API_BAR)
			localStorage.setItem('catalogBar', JSON.stringify(resposneBar.data.catalogs))
			SetCatalogBar(resposneBar.data.catalogs)
			delete resposneBar.data.catalogs
			localStorage.setItem('bar', JSON.stringify(resposneBar.data))
			setBar(resposneBar.data)
			
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoadingKitchen(false)
		}
	}
	const getCategories = () => {
		getSpecial()
		getKitchen()
		getBar()
	}

	const getCategoriesFromLocalStorage = () => {
		try {
			const bar = JSON.parse(localStorage.getItem('bar'))
			const catalogBar = JSON.parse(localStorage.getItem('catalogBar'))
			const kitchen = JSON.parse(localStorage.getItem('kitchen'))
			const catalogKitchen = JSON.parse(localStorage.getItem('catalogKitchen'))
			const special = JSON.parse(localStorage.getItem('special'))
			const catalogSpecial = JSON.parse(localStorage.getItem('catalogSpecial'))
			setBar(bar ?? {})
			setKitchen(kitchen ?? {})
			setSpecial(special ?? {})
			SetCatalogBar(catalogBar ?? [])
			SetCatalogKitchen(catalogKitchen ?? [])
			SetCatalogSpecial(catalogSpecial ?? [])
			if (catalogSpecial) setSelectedCategory(catalogSpecial[0].name_en)
			if (!catalogBar) setIsLoadingBar(true)
			if (!catalogSpecial) setIsLoadingSpecial(true)
			if (!catalogKitchen) setIsLoadingKitchen(true)
		} catch (error) {
			console.log(error)
		}
	}
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('language'))
    if (local) setLanguage(local)
    document.body.style.overflow = 'hidden'
    setIsLoading(true)
    getCategoriesFromLocalStorage()
		getCategories()
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

	useEffect(() => {
	document.body.style.overflow = isOpenModalLanguage ? 'hidden' : 'auto'
	}, [isOpenModalLanguage])

  return (
    <div>
      <Header
        setIsOpenModalLanguage={setIsOpenModalLanguage}
        catalogBar={catalogBar}
				language={language}
				catalogKitchen={catalogKitchen}
				catalogSpecial={catalogSpecial}
				setSelectedCatalog={setSelectedCatalog}
				setSelectedCategory={setSelectedCategory}
				selectedCatalog={selectedCatalog}
				selectedCategory={selectedCategory}
      />
      <main>
        <Menu
          language={language}
          bar={bar}
          kitchen={kitchen}
          special={special}
          catalogBar={catalogBar}
          catalogKitchen={catalogKitchen}
          catalogSpecial={catalogSpecial}
					selectedCatalog={selectedCatalog}
					selectedCategory={selectedCategory}
					isLoadingBar={isLoadingBar}
					isLoadingKitchen={isLoadingKitchen}
					setSelectedCategory={setSelectedCategory}
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