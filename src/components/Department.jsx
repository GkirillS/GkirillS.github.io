import React, { useEffect, useState } from 'react'
import cl from '../styles/Department.module.css'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Category from './Category'

const Department = ({ name, categories, products }) => {
	const [openDepartment, setOpenDepartment] = useState(false)

	return (
		<div className={cl.department}>
			<div className={cl.header} onClick={() => setOpenDepartment(!openDepartment)}>
				<div className={cl.title}>{name}</div>
				<div className={cl.icon}>
					<FontAwesomeIcon
						icon={faChevronUp}
						style={openDepartment ? { transform: 'scaleY(-1)' } : null}
					/>
				</div>
			</div>
			<div className={[cl.departmentCategoris, openDepartment && cl.departmentCategorisOpened].join(' ')}>
				{
					categories.map(category =>
						<Category
							key={category.name_en}
							category={category}
							products={products}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Department