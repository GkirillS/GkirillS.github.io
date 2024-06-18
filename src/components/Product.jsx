import React, { useEffect, useMemo, useState } from 'react'
import cl from '../styles/Product.module.css'
import { CAPACITY_EN_ML, CURRENCY_GE, LANGUAGE } from '../helpers/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product, language }) => {
	const [isDefault, setIsDefault] = useState(false);

	const IMG = useMemo(() => {
		try {
			const img = require('../assets/image/' + product.img + '.jpg')
			setIsDefault(false)
			return img
		} catch (error) {
			const defaultIMG = require('../assets/image/default.jpg')
			setIsDefault(true)
			return defaultIMG;
		}
	}, [product])

	// useEffect(() => {
	// 	console.log(product)
	// }, [])
	//
	const title = useMemo(() => {
		if (!product.capacity) return product[`title_` + language]
		const capacity = '(' + product.capacity + ' ' + CAPACITY_EN_ML + ')'
		return product[`title_` + language] + ' ' + capacity.replaceAll(' ', '\u00A0')
	}, [product])

	const [isBeat, setIsBeat] = useState(false);
	const [isOpenProduct, setIsOpenProduct] = useState(false);

	return (
		<div className={cl.product}>
			<div
				className={[cl.wrapper, cl.front].join(' ')}
				style={
					isOpenProduct ? {
						transform: 'perspective(600px) rotateY(-180deg) translate(50%, -50%)',
						zIndex: '1'
					} : {
						transform: 'perspective(600px) rotateY(0) translate(-50%, -50%)',
						zIndex: '2'
					} 
				}
			>
				<img
					src={IMG}
					alt={product.title_en}
					style={{
						filter: isDefault ? 'blur(2px)' : ''
					}}
					loading="lazy"
				/>
				<div className={[cl.price, cl.container].join(' ')}>
					{product.price + ' ' + CURRENCY_GE}
				</div>
				<div
					className={[cl.arrow, cl.container].join(' ')}
					onMouseOver={() => setIsBeat(true)}
					onMouseOut={() => setIsBeat(false)}
					onClick={() => setIsOpenProduct(!isOpenProduct)}
				>
					{isOpenProduct ?
						<FontAwesomeIcon beat={isBeat} icon={faDownLeftAndUpRightToCenter} />
						:
						<FontAwesomeIcon beat={isBeat} icon={faUpRightAndDownLeftFromCenter} />
					}
				</div>
				<div className={[cl.title, cl.container].join(' ')}>
					{title}
				</div>
			</div>
			<div
				className={[cl.wrapper, cl.back].join(' ')}
				style={
					isOpenProduct ? {
						transform: 'perspective(600px) rotateY(0) translate(-50%, -50%)',
						zIndex: '2'
					} : {
						transform: 'perspective(600px) rotateY(180deg) translate(50%, -50%)',
						zIndex: '1'
					} 
				}
			>
				
				<div
					className={[cl.arrow, cl.container].join(' ')}
					onMouseOver={() => setIsBeat(true)}
					onMouseOut={() => setIsBeat(false)}
					onClick={() => setIsOpenProduct(!isOpenProduct)}
				>
					{isOpenProduct ?
						<FontAwesomeIcon beat={isBeat} icon={faDownLeftAndUpRightToCenter} />
						:
						<FontAwesomeIcon beat={isBeat} icon={faUpRightAndDownLeftFromCenter} />
					}
				</div>
				<img
					src={IMG}
					alt={product.title_en}
					style={{
						filter: isDefault ? 'blur(2px)' : ''
					}}
					loading="lazy"
				/>
				<div
					className={[cl.description, cl.container].join(' ')}
				>
					{product.descriptinon_en}
				</div>
			</div>
		</div >
	)
}

export default Product