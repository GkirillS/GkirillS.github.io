import React, { useEffect, useState } from 'react'
import cl from '../styles/CategoryProducts.module.css'
import Product from './Product'
import { LANGUAGE } from '../helpers/const'
import axios from 'axios'

const CategoryProducts = ({ categoryID, categoryNames }) => {

	return (
		<div className={cl.category}>
			<div className={cl.title}>{categoryNames[`name_${LANGUAGE}`]}</div>
			{categoryID.length ?
				<div className={cl.products}>
					{
						categoryID.map(product =>
							<Product key={product[`name_${LANGUAGE}`]} product={product} />
						)
					}
				</div> : null}
		</div>
	)
}

export default CategoryProducts