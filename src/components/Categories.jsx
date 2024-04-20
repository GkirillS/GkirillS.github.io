import React, { useEffect, useState } from 'react'
import CategoryProducts from './CategoryProducts'
import cl from '../styles/Categories.module.css'
import * as XLSX from 'xlsx';

const Categories = () => {
	const [categories, SetCategories] = useState([])

	useEffect(() => {
		fetch("./assets/data.xlsx")
			.then((res) => res.arrayBuffer())
			.then((ab) => {
				const wb = XLSX.read(ab, { type: "array" });

				const categoriesXLSX = wb.SheetNames.map(name => {
					return { name, products: XLSX.utils.sheet_to_json(wb.Sheets[name]) }
				})

				SetCategories(categoriesXLSX)
			});
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