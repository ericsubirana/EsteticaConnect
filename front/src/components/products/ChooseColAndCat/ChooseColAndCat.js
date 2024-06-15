import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import axios from '../../../api/axios'
import { debounce } from 'lodash';
import { useAuth } from '../../../context/AuthContext'

import './choosecolandcat.css'


function ChooseColAndCat(props) {

  const [clickCol, setClickCol] = useState(false);
  const [clickCat, setClickCat] = useState(false);
  const [iconCol, setIconCol] = useState(<IoIosArrowDown />);
  const [iconCat, setIconCat] = useState(<IoIosArrowDown />);
  const menuRef = useRef(null);
  const [hemPassat, setHemPassat] = useState(false);
  const {user, isAuthenticated, loading} = useAuth();

  const CollectionsList = ['Shine Stop', 'Antioxidant', 'Pure Oxygen', 'Sensations',
    'Q10 Rescue', 'Hydra Lifting', 'RGnerin', 'Infinity', 'Urban Project',
    'Age Defense', 'Lightening', 'Sheel Mask Collection', 'Mask Kits Collection'];

  const CategoryList = ['Cuidado Solar', 'Limpiadores 3 en 1', 'Hidratantes',
    'Nutritivas', 'Serum', 'Ampollas Flash', 'Contorno de ojos',
    'Superconcentrados', 'Cremas con color', 'Bálsamo reparador',
    'Ácidos Cosméticos', 'Nutricosmética'];

  const navigation = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHemPassat(true);
        setClickCol(false);
        setClickCat(false);
        setIconCol(<IoIosArrowDown />);
        setIconCat(<IoIosArrowDown />);
      }
      else{
        setHemPassat(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const clicked = (m) => {
    if (m === "col") {
      if (!hemPassat){
        if (!clickCol) {
          setIconCol(<IoIosArrowUp />);
          setClickCol(true);
          setClickCat(false);
        }
        else {
          setIconCol(<IoIosArrowDown />);
          setClickCol(false);
        }
      }
      setHemPassat(false);
    }
    else {
      if(!hemPassat){
        if (!clickCat) {
          setIconCat(<IoIosArrowUp />);
          setClickCat(true);
          setClickCol(false);
        }
        else {
          setIconCat(<IoIosArrowDown />);
          setClickCat(false);
        }
      }
      setHemPassat(false);
    }
  }

  const afegirProductes = () => {
    props.onAddProduct(true)
  }

  const moveToCollection = async (col) => {  
    setClickCol(false);
    setClickCat(false);
    navigation(`/collection/${col.collection}`); 
  }

  const moveToCategory = async (col) => {
    setClickCat(false);
    setClickCol(false);
    navigation(`/category/${col.category}`);
  }

  const handleChange = async (productName) => {
    if (productName === '') 
    {
      props.onSearchResults(''); //IMPORTANTÍSSIM PER TORNAR ALS PRODUCTES ANTERIORS
    } 
    else 
    {
      try {
        const res = await axios.post('/searchProducts', {
          name: productName,
        });
        if(res.data.length === 0){
          props.onSearchResults('NO PRODUCTS FOUND'); 
        }
        else{
          props.onSearchResults(res.data);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  const debouncedSearch = debounce((e) => {
    handleChange(e.target.value)
  }, 800);

  return (
    <div className='productMid'>
      <div className='prodcutsC'>
        <div className='coAndca'>
          <div className='colections'>
            <h2 onClick={() => clicked("col")}>COLECCIONES {iconCol} </h2>
            {clickCol && (
              <div className='margins' ref={menuRef}>
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
            <h2 onClick={() => clicked("cat")}>CATEGORIAS {iconCat} </h2>
            {clickCat && (
              <div className='margins' ref={menuRef}>
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
          <input type="text" placeholder='BUSCAR PRODUCTE' className='inputC' onChange={(e) => debouncedSearch(e)} />
        </div>
      </div>
      {user?.admin ? (
        <div className='addProductButtonDiv'> 
          <button onClick={afegirProductes} className='button-53'>+</button>
        </div>
      ) : (<div></div>)}
    </div>
  )
}

export default ChooseColAndCat
