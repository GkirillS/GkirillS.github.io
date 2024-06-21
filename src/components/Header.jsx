import React, { useMemo } from 'react'
import cl from '../styles/Header.module.css'

const Header = () => {
	const IMG = useMemo(() => {
		return require('../assets/image/backgrounds/header_bg.jpg')
	})
	return (
		<>
			<header
				className={cl.header}
			>	
				<div
					className={cl.background}
					style={{
						background: `url(${IMG})`,
						backgroundPosition: 'center center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover'
					}}
				>

				</div>
			</header>
			<header
				className={cl.header}
				style={{
					background: 'var(--beige)',
					height: '103px',
					marginBottom: '297px',
					position: 'sticky',
					top: '0',
					zIndex: '100',
				}}
			>
				<div className={cl.wrapper}>
					<div className={cl.logo}>
						<a className={cl.logo__img} href='/'>
							<img src="./assets/image/logo/word-black.PNG" alt="logo" />
						</a>
					</div>
				</div>
			</header>
		</>
	)
}

export default Header