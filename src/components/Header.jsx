import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import cl from '../styles/Header.module.css'
import { Corn } from '../helpers/icons'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Header = () => {
	const IMG = useMemo(() => {
		return require('../assets/image/backgrounds/header_bg.jpg')
	})

	const count_corn = Array.from({ length: 50 }, () => '')

	function getRandomInt(min, max) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
	}

	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	const [windowWidth, setWindowWidth] = useState(0)
	const [windowHeight, setWindowHeight] = useState(0)


	const cornRef = createRef();
	cornRef.current = []
	const headerRef = useRef();
	const backgroundRef = useRef();

	useEffect(() => {

		try {
			const { width } = document.body?.getBoundingClientRect()
			const { height } = headerRef.current?.getBoundingClientRect()
			setWindowHeight(height)
			setWindowWidth(width)
			gsapTrigger(width, height)

		} catch (error) {
			console.log(error)
		}


		window.addEventListener('resize', () => {
			try {
				const { width } = document.body?.getBoundingClientRect()
				const { height } = headerRef.current?.getBoundingClientRect()
				setWindowHeight(height)
				setWindowWidth(width)
				gsapTrigger(width, height)
			} catch (error) {
				console.log(error)
			}
		})

	}, [])

	const gsapTrigger = (width, height) => {
		cornRef.current.forEach((el) => {
			gsap.fromTo(el,
				{
					transform: `
						translate(${getRandomInt(1, width)}px, ${getRandomInt(1, height)}px)
						rotate(${getRandomInt(0, 180)}deg)
						scale(0)
					`,
					duration: 1,
				},
				{
					transform: `
						translate(${getRandomInt(1, width)}px, ${getRandomInt(1, height)}px)
						rotate(${getRandomInt(0, 180)}deg)
						scale(${getRandomArbitrary(0.5, 1.5)})
					`,
					duration: 2.5,
					scrollTrigger: {
						trigger: backgroundRef.current,
						start: "bottom -= -10",
						toggleActions: "play none none reverse"
					}
				})
		})
	}

	const addtoRefs = (el) => {
		if (el && !cornRef.current.includes(el)) {
			cornRef.current.push(el);
		}
	}

	return (
		<>
			<header
				className={cl.header}
			>
				<div
					ref={backgroundRef}
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
				ref={headerRef}
				className={[cl.header, cl.headerRef].join(' ')}
				style={{
					background: 'var(--beige)',
					height: '103px',
					marginBottom: '297px',
					position: 'sticky',
					top: '0',
					zIndex: '100',
					overflow: 'hidden'
				}}
			>
				<div className={cl.wrapper}>
					<div className={cl.logo}>
						<a className={cl.logo__img} href='/'>
							<span>SAGE</span>
							<span>coffee</span>
						</a>
					</div>
				</div>
				{
					count_corn.map((_, i) =>
						<Corn
							setRef={addtoRefs}
							key={i}
							style={{
								width: '10px',
								height: '20px',
								position: 'absolute',
							}} />
					)
				}
			</header>
		</>
	)
}

export default Header