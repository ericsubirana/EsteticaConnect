import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import './choosecolandcat.css'


function ChooseColAndCat() {

    const [clickCol, setClickCol] = useState(false);
    const [clickCat, setClickCat] = useState(false);
    const [iconCol, setIconCol] = useState(<IoIosArrowDown />);
    const [iconCat, setIconCat] = useState(<IoIosArrowDown />);

    const CollectionsList = ['Shine Stop', 'Antioxidant', 'Pure Oxygen', 'Sensations',
        'Q10 Rescue', 'Hydra Lifting', 'RGnerin', 'Infinity', 'Urban Project',
        'Age Defense', 'Lightening', 'Sheel Mask Collection', 'Mask Kits Collection'];

    const CategoryList = ['Cuidado Solar', 'Limpiadores 3 en 1', 'Hidratantes',
        'Nutritivas', 'Serum', 'Ampollas Flash', 'Contorno de ojos',
        'Superconcentrados', 'Cremas con color', 'Bálsamo reparador',
        'Ácidos Cosméticos', 'Nutricosmética'];

    const navigation = useNavigate();


    const clicked = (m) => {
        if (m === "col") {
            if (!clickCol) {
                setIconCol(<IoIosArrowUp />);
                setClickCol(true);
            }
            else {
                setIconCol(<IoIosArrowDown />);
                setClickCol(false);
            }
        }
        else {
            if (!clickCat) {
                setIconCat(<IoIosArrowUp />);
                setClickCat(true);
            }
            else {
                setIconCat(<IoIosArrowDown />);
                setClickCat(false);
            }
        }
    }

    const moveToCollection = async (col) => {
        navigation(`/collection/${col.collection}`);
    }

    const moveToCategory = async (col) => {
      navigation(`/category/${col.category}`);
    }

    return (
        <div className='productMid'>
        <div className='prodcutsC'>
          <div className='coAndca'>
            <div className='colections'>
              <h2 onClick={() => clicked("col")}>COL.LECCIONS {iconCol} </h2>
              {clickCol && (
                <div className='margins'>
                  <div className='colectionsOpened'>
                    {CollectionsList.map((collection, index) => (
                      <div key={collection}>
                        <div className='singleCollection' onClick={() => moveToCollection({ collection })}> {collection} </div>
                        {index !== CollectionsList.length - 1 && <div className='lineColections'></div>}
                        {index === CollectionsList.length - 1 && <div className='margin'> </div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className='categories'>
              <h2 onClick={() => clicked("cat")}>CATEGORIES {iconCat} </h2>
              {clickCat && (
                <div className='margins'>
                  <div className='colectionsOpened'>
                    {CategoryList.map((category, index) => (
                      <div key={category}>
                        <div className='singleCollection' onClick={() => moveToCategory({ category })}> {category} </div>
                        {index !== CategoryList.length - 1 && <div className='lineColections'></div>}
                        {index === CategoryList.length - 1 && <div className='margin'> </div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='inputHalf'>
            <input type="text" placeholder='BUSCAR PRODUCTE' className='inputC' />
          </div>
        </div>
      </div>
    )
}

export default ChooseColAndCat