import React from 'react'
import cl from '../styles/Footer.module.css'

const Footer = () => {
	const handlerOnTop = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	return (
		<div className={cl.footer}>
			<div className={cl.top}>
				<div className={cl.logo}>
					<img src="./logo.svg" alt="logo" />
				</div>
				<div className={cl.privacy}>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate adipisci temporibus eligendi doloremque labore totam reiciendis laudantium, dolore id, aliquam possimus, excepturi vitae quo. Labore, sunt! Earum rerum natus voluptatibus.
				</div>
			</div>
			<div className={cl.middle}>Предлогаете ли что-то</div>
			<div className={cl.bottom}>
				<div className={cl.socials}>
					<ul>
						<li>
							<a href="https://www.instagram.com/sagecoffee.ge?igsh=NXkyNXNveHdpazdw">sagecoffee.ge</a>
						</li>
						<li>
							<a href="#">Ссылка куда-то ещё</a>
						</li>
					</ul>
				</div>
				<div className={cl.bottom_btn}>
					<button onClick={handlerOnTop}>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Footer