/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react'
import cl from '../styles/Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faAt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { LOCALES } from '../locales';
const Footer = ({language, setIsOpenModalLanguage}) => {
	const handleClickChangeLang = () => {
		setIsOpenModalLanguage(true);
	};

	useEffect(() => {
		console.log(LOCALES)
	}, [])
	return (
		<div className={cl.footer}>
			<div className={cl.left}>
				<div className={cl.body_left}>
					<ul className={cl.links}>
						<li className={cl.link}>
							<a rel="noreferrer" href="https://www.instagram.com/sagecoffee.ge?igsh=bnl2aG9hNTBzdXR5&utm_source=qr" target='_blank'>
								<FontAwesomeIcon
									size='xl'
									icon={faInstagram}
								/>
							</a>
						</li>
						<li className={cl.link}>
							<a rel="noreferrer" href="https://t.me/Sage_coffee" target='_blank'>
								<FontAwesomeIcon
									size='xl'
									icon={faTelegram}
								/>
							</a>
						</li>
						<li className={cl.link}>
							<a rel="noreferrer" href="https://www.tiktok.com/@sagecoffee.ge?_t=8nH85LoH434&_r=1" target='_blank'>
								<FontAwesomeIcon
									size='xl'
									icon={faTiktok}
								/>
								
							</a>
						</li>
						<li className={cl.link}>
							<a rel="noreferrer" href="mailto:sgsageproject@gmail.com" target='_blank'>
								<FontAwesomeIcon
									size='xl'
									icon={faAt}
								/>
							</a>
						</li>
					</ul>
					<div className={cl.description_job}>
						<p>
							<span>{LOCALES[language]?.footer?.timeWork}</span>
							<span>{LOCALES[language]?.footer?.everyday} 09:00-21:00</span>
						</p>
						<p>
							<span>{LOCALES[language]?.footer?.address}</span>
							<span>{LOCALES[language]?.footer?.addresStreet}</span>
						</p>
						<p>
							<span>{LOCALES[language]?.footer?.question}</span>
							<span>
								<a rel="noreferrer" href="mailto:sgsageproject@gmail.com" target='_blank'>
									sgsageproject@gmail.com
								</a>
							</span>
						</p>
						<p>
							<span>{LOCALES[language]?.footer?.language}</span>
							<span style={{cursor: 'pointer'}} onClick={handleClickChangeLang}>
								<FontAwesomeIcon
									size='xl'
									icon={faLanguage}
								/>
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className={cl.right}>
				<div className={cl.map}>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.5138587186543!2d41.62766497667447!3d41.64463837126842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4067875dcab8548b%3A0x7513e639e92c0ed7!2sSAGE%20coffee!5e0!3m2!1sru!2sby!4v1718695702769!5m2!1sru!2sby"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade">
					</iframe>
				</div>
			</div>
		</div>
	)
}

export default Footer