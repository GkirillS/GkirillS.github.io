import React from 'react'
import cl from '../styles/ModalLanguage.module.css'

const ModalLanguage = ({language, setLanguage}) => {    
    
  return (
    <div className={cl.wrapper}>
        <div className={cl.modal}>
            <div className={cl.container}>
                <div
                    className={[cl.language, language === 'en' && cl.active].join(' ')}
                    onClick={() => setLanguage('en')}
                >EN</div>
                <div
                    className={[cl.language, language === 'ru' && cl.active].join(' ')}
                    onClick={() => setLanguage('ru')}
                >RU</div>
            </div>
        </div>
    </div>
  )
}

export default ModalLanguage