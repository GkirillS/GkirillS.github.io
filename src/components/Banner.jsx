import React from 'react'
import cl from '../styles/Banner.module.css'
const Banner = () => {
	return (
		<section className={cl.banner}>
			{/* <div className={cl.img}></div>
			<div className={cl.img}></div> */}
			<div className={cl.wrapper} >
				<div className={cl.path}>
					Главная /
				</div>
				<div className={cl.title}>
					Расцветай с SAGE
				</div>
				<div className={cl.subtittle}>
					Новое весеннее меню SAGE
				</div>
				<button className={cl.button}>
					Узнать подробнее
				</button>
			</div>
		</section>
	)
}

export default Banner