import React from 'react'
import cl from '../styles/Header.module.css'

const Header = () => {
	return (
		<header className={cl.header}>
			<div className={cl.wrapper}>
				<div className={cl.logo}>
					<a className={cl.logo__img} href='/'>
						<img src="./assets/logo-word.PNG" alt="logo" />
					</a>
				</div>
			</div>
		</header>
	)
}

export default Header