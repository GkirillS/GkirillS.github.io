import React from 'react'
import clCategory from '../styles/Skeleton.module.css'
import clProduct from '../styles/Skeleton.module.css'
import cl from '../styles/Skeleton.module.css'

const Skeleton = () => {
    const array = Array.from({ length: 10 }, (v, k) => k)
    return (
        <>
            {array.map(() =>
                <div className={[clCategory.category, cl.skeleton_category].join(' ')}>
                    <div className={[clCategory.title, cl.skeleton_title_category].join(' ')}></div>
                    <div className={[clCategory.products, cl.skeleton_products].join(' ')}>
                        {array.map(() =>
                            <div className={[clProduct.product, cl.skeleton_product].join(' ')}>
                                <div className={[clProduct.wrapper, cl.skeleton_wrapper].join(' ')}>
                                    <div className={[clProduct.description, cl.skeleton_description].join(' ')}>
                                        <div className={[clProduct.title, cl.skeleton_title].join(' ')}>
                                            <div className={[clProduct.price, cl.skeleton_price].join(' ')}></div>
                                            <div className={[clProduct.currency, cl.skeleton_currency].join(' ')}>

                                            </div>
                                        </div>
                                        <div className={[clProduct.subtitle, cl.skeleton_subtitle].join(' ')}>

                                        </div>
                                    </div>
                                    <div className={[clProduct.watermark, cl.skeleton_watermark].join(' ')}>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Skeleton