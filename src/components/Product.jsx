import React, { useEffect } from 'react'
import cl from '../styles/Product.module.css'
import { LANGUAGE } from '../helpers/const'

const Product = ({ product }) => {
	useEffect(() => {
		console.log(product)
	}, [])

	return (
		<div className={cl.product}>
			<img src={'./assets/image/' + product.img + '.jpg'} alt={product.title_en} />
			<div className={cl.wrapper}>
				<div className={cl.description}>
					<div className={cl.title}>
						<div className={cl.price}>{product.price}</div>
						<div className={cl.currency}>
							<span>g</span>
							<span>e</span>
							<span>l</span>
						</div>
					</div>
					<div className={cl.subtitle}>
						{product['title_' + LANGUAGE]}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product