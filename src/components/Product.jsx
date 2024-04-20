import React, { useEffect } from 'react'
import cl from '../styles/Product.module.css'
import { CAPACITY_EN_ML, CAPACITY_GE_ML, CURRENCY_GE } from '../helpers/const'

const Product = ({ product }) => {
	const IMG = require(`./../assets/webp/${product.img.slice(5)}`)
	return (
		<div className={cl.product}>
			<img src={IMG} alt={product.title_en} />
			<div className={cl.wrapper}>
				<div className={cl.price}>{product.price + ' ' + CURRENCY_GE}</div>
				<div className={cl.link}>+</div>
				<div className={cl.title}>
					<span>{product.title_en} ({product.capacity + ' ' + CAPACITY_EN_ML})</span><br />
					<span>{product.title_ge} ({product.capacity + ' ' + CAPACITY_GE_ML})</span>
				</div>
			</div>
		</div>
	)
}

export default Product