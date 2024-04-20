import React, { useEffect, useState } from 'react'
import CategoryProducts from './CategoryProducts'
import cl from '../styles/Categories.module.css'
import * as XLSX from 'xlsx';

const Categories = () => {
	const [categories, SetCategories] = useState([])

	useEffect(() => {

		// Sort results by id in descending order, take two
		// and return the age as an integer.

		fetch('https://sheetdb.io/api/v1/tew8gu5w39788?sheets')
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, [])

	return (
		<section className={cl.menu}>
			<div className={cl.categories}>
				{
					categories.map(category =>
						<CategoryProducts category={category} />
					)
				}
			</div>
		</section>
	)
}

export default Categories