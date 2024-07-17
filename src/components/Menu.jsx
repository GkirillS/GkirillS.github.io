import React, { useEffect, useState } from 'react'
// import CategoryProducts from './CategoryProducts'
import cl from '../styles/Menu.module.css'
import axios from 'axios'
import Skeleton from './Skeleton'
import { API_BAR, API_KITCHEN } from '../helpers/const'
import Department from './Department'
import LoaderMenu from './LoaderMenu'

const Categories = ({language}) => {
	const [bar, setBar] = useState({})
	const [kitchen, setKitchen] = useState({})
	const [catalogBar, SetCatalogBar] = useState([])
	const [catalogKitchen, SetCatalogKitchen] = useState([])

	const [isLoadingBar, setIsLoadingBar] = useState(false)
	const [isLoadingKitchen, setIsLoadingKitchen] = useState(false)

	const getKitchen = async () => {
		try {
			const resposneKitchen = await axios.get(API_KITCHEN)
			localStorage.setItem('catalogKitchen', JSON.stringify(resposneKitchen.data.catalogs))
			SetCatalogKitchen(resposneKitchen.data.catalogs)
			delete resposneKitchen.data.catalogs
			localStorage.setItem('kitchen', JSON.stringify(resposneKitchen.data))
			setKitchen(resposneKitchen.data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoadingBar(false)
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
		getKitchen()
		getBar()
	}

	const getCategoriesFromLocalStorage = () => {
		try {
			const bar = JSON.parse(localStorage.getItem('bar'))
			const catalogBar = JSON.parse(localStorage.getItem('catalogBar'))
			const kitchen = JSON.parse(localStorage.getItem('kitchen'))
			const catalogKitchen = JSON.parse(localStorage.getItem('catalogKitchen'))
			setBar(bar ?? {})
			setKitchen(kitchen ?? {})
			SetCatalogBar(catalogBar ?? [])
			SetCatalogKitchen(catalogKitchen ?? [])
			if (!catalogBar) setIsLoadingBar(true)
			if (!catalogKitchen) setIsLoadingKitchen(true)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCategoriesFromLocalStorage()
		getCategories()
	}, [])

	return (
		<section className={cl.menu}>
						<LoaderMenu
				className={cl.loader}
			/>
			{!isLoadingBar ?
			<Department
				nameRevert={'bar'}
				name={'kitchen'}
				categories={catalogKitchen}
				language={language}
				products={kitchen}
			/> :
			<LoaderMenu 
				className={cl.loader}
			/>
			}
			{!isLoadingKitchen ?
			<Department
				nameRevert={'kitchen'}
				name={'bar'}
				categories={catalogBar}
				products={bar}
				language={language}
			/> :
			<LoaderMenu
				className={cl.loader}
			/>
			}
			
		</section>
	)
}

export default Categories