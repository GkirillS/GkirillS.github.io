import React, { useMemo } from 'react'
// import CategoryProducts from './CategoryProducts'
import cl from '../styles/Menu.module.css'
import Department from './Department'
import LoaderMenu from './LoaderMenu'

const Categories = ({
	language,
	bar,
	kitchen,
	catalogBar,
	catalogKitchen,
	isLoadingBar,
	isLoadingKitchen,
	selectedCatalog,
	selectedCategory,
	setSelectedCategory
}) => {
	const catalog = useMemo(() => {
		if (selectedCatalog === 'kitchen') return catalogKitchen
		if (selectedCatalog === 'bar') return catalogBar
	}, [selectedCatalog, catalogKitchen, catalogBar])
	const products = useMemo(() => {
		if (selectedCatalog === 'kitchen') return kitchen
		if (selectedCatalog === 'bar') return bar
	}, [bar, kitchen, selectedCatalog])
	return (
		<section className={cl.menu}>
			{!isLoadingKitchen ?
			<Department
				categories={catalog}
				products={products}
				language={language}
				setSelectedCategory={setSelectedCategory}
				selectedCategory={selectedCategory}
			/> :
			<LoaderMenu
				className={cl.loader}
			/>
			}
			
		</section>
	)
}

export default Categories