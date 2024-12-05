import React, { useMemo } from 'react'
import cl from '../styles/Department.module.css'
import Category from './Category'

const Department = ({ name, selectedCategory, categories, products, language, setSelectedCategory }) => {
	const category = useMemo(() => {
		return categories.filter(item => item.name_en === selectedCategory)
	}, [categories, selectedCategory])
	return (
		<div className={cl.department}>
				{
					categories.map(category =>
						<Category
							key={category.name_en}
							setSelectedCategory={setSelectedCategory}
							category={category}
							products={products}
							language={language}
						/>
					)
				}
		</div>
	)
}

export default Department