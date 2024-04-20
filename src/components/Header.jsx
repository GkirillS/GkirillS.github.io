import React from 'react'
import cl from '../styles/Header.module.css'

const Header = () => {
	return (
		<header className={cl.header}>
			<div className={cl.wrapper}>
				<div className={cl.number}>
					<a href="tel:+3754452144-58">
						+375 (44) 521-44-58
					</a>
				</div>
				<div className={cl.logo}>
					<a className={cl.logo__img} href='/'>
						<img src="./assets/logo.png" alt="logo" />
					</a>
				</div>
				<nav className={cl.menu}></nav>
			</div>
		</header>
	)
}

export default Header