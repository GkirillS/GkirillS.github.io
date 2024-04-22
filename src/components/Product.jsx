import React, { useEffect } from 'react'
import cl from '../styles/Product.module.css'
import { CAPACITY_EN_ML, CAPACITY_GE_ML, CURRENCY_GE, LANGUAGE } from '../helpers/const'

const Product = ({ product }) => {
	const IMG = require('./assets/image/' + product.img + '.jpg');

	return (
		<div className={cl.product}>
			<img src={IMG} alt={product.title_en} />
			<div className={cl.wrapper}>

			</div>
		</div>
	)
}

export default Product