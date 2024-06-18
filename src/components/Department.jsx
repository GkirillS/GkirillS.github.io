import React, { useEffect, useState } from 'react'
import cl from '../styles/Department.module.css'
import Category from './Category'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTurnDown } from '@fortawesome/free-solid-svg-icons'

const Department = ({ nameRevert, name, categories, products, language }) => {

	const revert = async () => {
		document.querySelector(`[attr-link="${nameRevert}"]`).click()
	};

	return (
		<div className={cl.department}>
			<a
				name={name}
				className={cl.anchor}
			></a>
			<div className={cl.header}>
				<div className={cl.title}>
					{/* <span className={cl.revert}>
						{nameRevert}
					</span> */}
					<a attr-link={name} href={'#' + name}>
						{name}
					</a>
					<div
						onClick={revert}
						className={cl.icon}
					>
						<FontAwesomeIcon
							size='xs'
							icon={faTurnDown}
						/>
					</div>
				</div>
			</div>
			<div className={[cl.departmentCategoris].join(' ')}>
				{
					categories.map(category =>
						<Category
							key={category.name_en}
							category={category}
							products={products}
							language={language}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Department