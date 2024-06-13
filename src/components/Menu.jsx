import React, { useEffect, useState } from 'react'
// import CategoryProducts from './CategoryProducts'
import cl from '../styles/Menu.module.css'
import axios from 'axios'
import Skeleton from './Skeleton'
import { API_BAR, API_KITCHEN } from '../helpers/const'
import Department from './Department'

const Categories = () => {
	const [bar, setBar] = useState({})
	const [kitchen, setKitchen] = useState({})
	const [catalogBar, SetCatalogBar] = useState([])
	const [catalogKitchen, SetCatalogKitchen] = useState([])

	const [isLoading, setIsLoading] = useState(false)

	const getCategories = async () => {
		try {
			setIsLoading(false)
			const resposneBar = await axios.get(API_BAR)
			const resposneKitchen = await axios.get(API_KITCHEN)
			localStorage.setItem('catalogBar', JSON.stringify(resposneBar.data.catalogs))
			localStorage.setItem('catalogKitchen', JSON.stringify(resposneKitchen.data.catalogs))
			SetCatalogBar(resposneBar.data.catalogs)
			SetCatalogKitchen(resposneKitchen.data.catalogs)


			delete resposneBar.data.catalogs
			delete resposneKitchen.data.catalogs
			localStorage.setItem('bar', JSON.stringify(resposneBar.data))
			localStorage.setItem('kitchen', JSON.stringify(resposneKitchen.data))
			setBar(resposneBar.data)
			setKitchen(resposneKitchen.data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(true)
		}
	}

	const getCategoriesFormLocalStorage = () => {
		try {
			const bar = JSON.parse(localStorage.getItem('bar'))
			const catalogBar = JSON.parse(localStorage.getItem('catalogBar'))
			const kitchen = JSON.parse(localStorage.getItem('kitchen'))
			const catalogKitchen = JSON.parse(localStorage.getItem('catalogKitchen'))
			setBar(bar ?? {})
			setKitchen(kitchen ?? {})
			SetCatalogBar(catalogBar ?? [])
			SetCatalogKitchen(catalogKitchen ?? [])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCategoriesFormLocalStorage()
		getCategories()
	}, [])

	useEffect(() => {
		console.log(bar, kitchen)
	}, [bar, kitchen])
	useEffect(() => {
		console.log(catalogBar, catalogKitchen)
	}, [catalogBar, catalogKitchen])

	return (
		<section className={cl.menu}>
			<Department name={'Kitchen'} categories={catalogKitchen} products={kitchen} />
			<Department name={'Bar'} categories={catalogBar} products={bar} />
		</section>
	)
}

export default Categories