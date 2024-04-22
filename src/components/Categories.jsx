import React, { useEffect, useState } from 'react'
import CategoryProducts from './CategoryProducts'
import cl from '../styles/Categories.module.css'
import axios from 'axios'
import Skeleton from './Skeleton'

const Categories = () => {
	const [categories, SetCategories] = useState([])
	const [categoriesName, SetCategoriesName] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const getCategories = async () => {
		try {
			setIsLoading(false)
			const resposne = await axios.get('https://script.google.com/macros/s/AKfycbxEsxAgzsvGmsJ8jomEacCNTILmgRfDp8pLkrPYXbWALZcaj6OrxmZJmfgqxTbJmGO0Ag/exec')

			SetCategoriesName(resposne.data.catalogs)
			SetCategories(resposne.data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(true)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	return (
		<section className={cl.menu}>
			{isLoading ?
				<div className={cl.categories}>
					{
						categoriesName.map(categoryName =>
							<CategoryProducts
								key={categoryName.name_en}
								categoryNames={categoryName}
								categoryID={categories[categoryName.name_en.toLowerCase()]}
							/>
						)
					}
				</div> : <Skeleton />
				}
		</section>
	)
}

export default Categories