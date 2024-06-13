import React, { useState } from 'react'
import Product from './Product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cl from '../styles/Category.module.css'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Category = ({ category, products }) => {

	const [openCategory, setOpenCategory] = useState(false)

	return (
		<div className={cl.category}>
			<div
				className={cl.header}
				onClick={() => setOpenCategory(!openCategory)}
			>
				<div className={cl.title}>{category.name_en}</div>
				<div className={cl.icon}>
					<FontAwesomeIcon
						icon={faChevronUp}
						style={openCategory ? { transform: 'scaleY(-1)' } : null}
					/>
				</div>
			</div>
			<div
				className={[cl.container, openCategory && cl.containerOpen].join(' ')}
			>
				{
					products[category.name_en]?.map(product =>
						<Product
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