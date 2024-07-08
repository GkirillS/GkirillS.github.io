import React, { useEffect, useMemo, useState } from 'react'
import cl from '../styles/Product.module.css'
import { CAPACITY_EN_ML, CURRENCY, } from '../helpers/const'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product, language }) => {
	const [isDefault, setIsDefault] = useState(false);

	const IMG = useMemo(() => {
		try {
			console.log('this`')
			const img = require('../assets/image/products/' + product.img + '.jpg')
			console.log(img)
			setIsDefault(false)
			return img
		} catch (error) {
			const defaultIMG = require('../assets/image/default.jpg')
			setIsDefault(true)
			return defaultIMG;
		}
	}, [product])
	
	const title = useMemo(() => {
		if (!product.capacity) return product[`title_` + language]
		const capacity = '(' + product.capacity + ' ' + CAPACITY_EN_ML + ')'
		return product[`title_` + language] + ' ' + capacity.replaceAll(' ', '\u00A0')
	}, [product, language])

	const [isBeat, setIsBeat] = useState(false);
	const [isOpenProduct, setIsOpenProduct] = useState(false);

	const handlerOpenCloseIcon = (e) => {
		e.stopPropagation()
		setIsOpenProduct(!isOpenProduct)
	}

	const handlerClickOpenProductMobile = (e) => {
		if (document.body.getBoundingClientRect().width <= 480) {
			if (!product[`descriptinon_${language}`]) return;
			handlerOpenCloseIcon(e)
		}
	}

	const [isFlip, setIsFlip] = useState(false)

	return (
		<div
			className={cl.product}
			onClick={(e) => handlerClickOpenProductMobile(e)}
		>
			<div
				className={[cl.wrapper, isOpenProduct && cl.flip].join(' ')}
			>
				<div
					className={[cl.front, cl.face].join(' ')}
				>
					<img
						src={IMG}
						alt={product.img}
						style={{
							filter: isDefault ? 'blur(2px)' : ''
						}}
						loading="lazy"
					/>
					<div
						className={[cl.price, cl.container].join(' ')}
						style={isOpenProduct ? { opacity: '0' } : { opacity: '1' }}
					>
						{product.price + ' ' + CURRENCY}
					</div>
					{product[`descriptinon_${language}`] ?
					<div
						className={[cl.arrow, cl.container].join(' ')}
						onMouseOver={() => setIsBeat(true)}
						onMouseOut={() => setIsBeat(false)}
						onClick={(e) => handlerOpenCloseIcon(e)}
						style={isOpenProduct ? { opacity: '0' } : { opacity: '1' }}
					>
							<FontAwesomeIcon beat={isBeat} icon={faUpRightAndDownLeftFromCenter} />
					</div>
					: null}
					<div
						className={[cl.title, cl.container].join(' ')}
						style={isOpenProduct ? { opacity: '0' } : { opacity: '1' }}
					>
						{title}
					</div>
				</div>




				<div
					className={[cl.back, cl.face].join(' ')}
				>
					{product[`descriptinon_${language}`] ?
					<div
						className={[cl.arrow, cl.container].join(' ')}
						onMouseOver={() => setIsBeat(true)}
						onMouseOut={() => setIsBeat(false)}
						onClick={(e) => handlerOpenCloseIcon(e)}
						style={isOpenProduct ? { opacity: '1', zIndex: '1' } : { opacity: '0' }}
					>
							<FontAwesomeIcon beat={isBeat} icon={faDownLeftAndUpRightToCenter} />
					</div>
					: null}
					<img
						src={IMG}
						alt={product.img}
						style={{
							filter: isDefault ? 'blur(2px)' : ''
						}}
						loading="lazy"
					/>
					<div
						style={isOpenProduct ? { opacity: '1' } : { opacity: '0' }}
						className={[cl.description, cl.container].join(' ')}
					>
						{product[`descriptinon_${language}`]}
					</div>
				</div>
			</div>
		</div >
	)
}

export default Product