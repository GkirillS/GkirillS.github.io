import React, { useEffect } from 'react'
import cl from '../styles/Product.module.css'
import { CAPACITY_EN_ML, CAPACITY_GE_ML, CURRENCY_GE, LANGUAGE } from '../helpers/const'

const Product = ({ product }) => {

	useEffect(() => {

		console.log(product.img)
		console.log()
	}, [])

	return (
		<>
			{product.img ?
				<div className={cl.product}>

					<img src={'https://lh3.google.com/u/0/d/' + product.img.slice(32, product.img.indexOf('/view'))} alt={product.title_en} />
					<div className={cl.wrapper}>

					</div>
				</div> : null}
		</>

	)
}

export default Product