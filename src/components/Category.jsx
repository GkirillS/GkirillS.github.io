import React, { useEffect, useRef } from 'react'
import Product from './Product'
import cl from '../styles/Category.module.css'

const Category = ({ category, products, language, setSelectedCategory }) => {
	useEffect(() => {
	}, [category, products, language, setSelectedCategory ])
	const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
			setSelectedCategory(category.name_en)
    }
  })
}

const options = {
  // root: по умолчанию window,
  // но можно задать любой элемент-контейнер
  rootMargin: '0px 0px 75px 0px',
  threshold: 0,
}
	const observer = new IntersectionObserver(callback, options)
	const categoryRef = useRef(null)

	useEffect(() => {
if (categoryRef.current) {
	observer.observe(categoryRef.current)
}
	}, [categoryRef])
	return (
		<div className={cl.category} ref={categoryRef} >
						<a
				className={cl.anchor}
				name={category.name_en}
			></a>
			<div
				className={[cl.container].join(' ')}
			>
					{
						products[category.name_en.toLowerCase()]?.map(product =>
								<Product
									language={language}
									product={product}
								/>
						)
					}
			</div>
		</div>
	)
}

export default Category