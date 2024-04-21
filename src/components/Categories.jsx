import React, { useEffect, useState } from 'react'
import CategoryProducts from './CategoryProducts'
import cl from '../styles/Categories.module.css'
import axios from 'axios'

const Categories = () => {
	const [categories, SetCategories] = useState([])
	const [categoriesName, SetCategoriesName] = useState([])

	const getCategories = async () => {
		try {
			const resposne = await axios.get('https://script.google.com/macros/s/AKfycbxEsxAgzsvGmsJ8jomEacCNTILmgRfDp8pLkrPYXbWALZcaj6OrxmZJmfgqxTbJmGO0Ag/exec')

			SetCategoriesName(resposne.data.catalogs)
			SetCategories(resposne.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	return (
		<section className={cl.menu}>
			{categoriesName.length ?
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
				</div> : null}
		</section>
	)
}

export default Categories