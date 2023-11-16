import React from 'react'

import './collections.css'

function CollectionComponent(props) {

    const {products} = props;

    return (
        <div className='collectionComponent'>
            <div className='imgCollection' />
            {!products && (
                <div>
                    ....Loading
                </div>
            )}
            {products && ( 
                <div className='collection'>
                    {products.map((product, index) =>(
                        <div key={index}>
                            <img src={product['img-src']} alt="" height={320} width={320}/>
                            <h3>{product.title}</h3>
                        </div>
                    ))}
                    
                </div>
            )}
        </div>
    )
}

export default CollectionComponent