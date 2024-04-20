import React from 'react'
import cl from '../styles/CategoryProducts.module.css'
import Product from './Product'

const CategoryProducts = ({ category }) => {
	return (
		<div className={cl.category}>
			<div className={cl.title}>{category.name}</div>
			<div className={cl.products}>
				{
					category.products.map(product =>
						<Product product={product} />
					)
				}
			</div>
		</div>
	)
}

export default CategoryProducts