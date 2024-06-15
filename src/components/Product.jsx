import React, { useEffect, useMemo, useState } from 'react'
import cl from '../styles/Product.module.css'
import { LANGUAGE } from '../helpers/const'

const Product = ({ product }) => {
	const [isDefault, setIsDefault] = useState(false);

	const IMG = useMemo(() => {
		try {
			const img = require('../assets/image/' + product.img + '.jpg')
			setIsDefault(false)
			return img
		} catch (error) {
			const defaultIMG = require('../assets/image/default.png')
			setIsDefault(true)
			return defaultIMG;
		}
	}, [product])

	// useEffect(() => {
	// 	console.log(product)
	// }, [])

	return (
		<div className={cl.product}>
			<img
				src={IMG}
				alt={product.title_en}
				style={{
					filter: isDefault ? 'blur(2px)' : ''
				}}
				loading="lazy"
			/>

			< div className={cl.wrapper}>
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
		</div >
	)
}

export default Product