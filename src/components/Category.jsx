import React, { useEffect, useState } from 'react'
import Product from './Product'
import cl from '../styles/Category.module.css'

const Category = ({ category, products, language }) => {

	return (
		<div className={cl.category}>
			<a
				className={cl.anchor}
				name={category.name_en}
			></a>
			<div
				className={cl.header}
			>
				<div className={cl.title}>
					<a href={'#' + category.name_en}>
					{category.name_en}
					</a>
				</div>
			</div>
			<div
				className={[cl.container].join(' ')}
			>
				{
					products[category.name_en.toLowerCase()]?.map(product =>
						<Product
							language={language}
							key={product.title_en}
							product={product}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Category