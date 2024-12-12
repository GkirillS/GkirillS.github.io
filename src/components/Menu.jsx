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
	setSelectedCategory,
	special,
	catalogSpecial
}) => {
	const catalog = useMemo(() => {
		if (selectedCatalog === 'kitchen') return catalogKitchen
		if (selectedCatalog === 'bar') return catalogBar
		if (selectedCatalog === 'special') return catalogSpecial
	}, [selectedCatalog, catalogKitchen, catalogBar, catalogSpecial])
	const products = useMemo(() => {
		if (selectedCatalog === 'kitchen') return kitchen
		if (selectedCatalog === 'bar') return bar
		if (selectedCatalog === 'special') return special
	}, [bar, kitchen, selectedCatalog, special])
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