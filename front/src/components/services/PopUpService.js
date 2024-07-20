import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import "./PopUpService.css"
import MultiplesImages from '../saveImages/MultiplesImages';
import { IoIosArrowDown } from "react-icons/io";
import { addService, updateService, removeService } from '../../api/services';
import axios from '../../api/axios';

function PopUpService(props) {

    const [title, setTitle] = useState(props.serviceClicked?.name);
    const [description, setDescription] = useState(props.serviceClicked?.description);
    const [image, setImage] = useState(props.serviceClicked?.image);
    const [category, setCategory] = useState(props.serviceClicked?.category);
    const [isHovered, setIsHovered] = useState(false);
    const [clickCat, setClickCat] = useState(false);
    const [categoryList, setCategoryList] = useState("");

    useEffect(() => {
        const apiCalls = async () => {
            await getServeiCategories();
        }

        apiCalls();
    }, [])

    const borrarServei = async () => {
        const res = await removeService(props.serviceClicked?._id);
        if (res.status == '200')
            console.log('SERVICE UPDATED')
        else
            console.log('SERVICE ERROR AT UPDATEING')
        props.setTrigger();
    }

    const updateServei = async () => {
        const service = { id: props.serviceClicked?._id, name: title, description: description, image: image, category: category }
        const res = await updateService(service);
        if (res.status == '200')
            console.log('SERVICE UPDATED')
        else
            console.log('SERVICE ERROR AT UPDATEING')
        props.setTrigger();
    }

    const addServei = async () => {
        const service = { name: title, description: description, image: image, category: category }
        const res = await addService(service);
        if (res.status == '200')
            console.log('SERVICE INSERTED')
        else
            console.log('SERVICE ERROR AT INSERTING')
        props.setTrigger();
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleCategoriaChange = (category) => {
        setCategory(category)
        setClickCat(false);
    }
    const changeImage = (file) => {
        setImage(file);
    }

    const getServeiCategories = async () => {
        try {
            const res = await axios.get('/allServeiCategories');
            if (res.data.length === 0) {
                console.log('NO CATEGORIES FOUND');
            }
            else {
                setCategoryList(res.data);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="popup">
            {props.operationResult == 'EDITAR' ? (
                <div className="popup-inner">
                    <div >
                        <form className='editService' onSubmit={updateServei}>
                            <textarea onChange={handleTitleChange} className='textAreaTitleService' style={{ marginBottom: '15px' }} value={title}></textarea >
                            <textarea className='textAreaDescService' onChange={handleDescriptionChange} value={description.replace(/\n/g, '<br>')}></textarea>
                            <div style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
                                {isHovered && (
                                    <div
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        style={{
                                            marginTop: '30px', borderRadius: '10px', width: '500px',
                                            height: '300px',
                                            cursor: 'pointer', position: 'absolute', zIndex: 20, background: 'rgba(128, 128, 128, 0.3)'
                                        }}
                                    >
                                        <MultiplesImages type='service' changeImage={changeImage} />
                                    </div>
                                )}
                                <img className='photoService' style={{ marginTop: '30px' }} src={image} alt=''
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)} />
                            </div>
                            <button onClick={updateServei} style={{ 'marginTop': '20px', 'height': '50px' }} className='addCart' type='submit'>EDITAR</button>
                        </form>
                    </div>
                    <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
                </div>
            ) : props.operationResult === 'ADD' && (
                <div>
                    <div className="popup-inner">
                        <div >
                            <form className='editService' onSubmit={addServei}>
                                <div className='titolServei'>
                                    <h2 style={{ 'margin': '0px' }}>Título: </h2>
                                    <textarea required onChange={handleTitleChange} className='textAreaTitleService' value={title}></textarea >
                                </div>
                                <div className='descripcioServeri'>
                                    <h2 style={{ 'margin': '0px' }}>Descripción: </h2>
                                    <textarea required className='textAreaDescService' onChange={handleDescriptionChange} value={description?.replace(/\n/g, '<br>')}></textarea>
                                </div>
                                <div className='categoraServei'>
                                    <h2 style={{ 'margin': '0px' }}>Categoria: </h2>
                                    <h4 className='onSelect' onClick={async () => { if (!clickCat); setClickCat(!clickCat) }}> Sel. categoria extistente:  <IoIosArrowDown /></h4>
                                    {clickCat && (
                                        <div className='margins' style={{ 'marginTop': '0px' }}>
                                            <div className='colectionsOpened'>
                                                {categoryList?.map((category, index) => (
                                                    <div key={category}>
                                                        <div className='singleCollection' onClick={() => handleCategoriaChange(category)}> {category} </div>
                                                        {index !== categoryList.length - 1 && <div className='lineColections'></div>}
                                                        {index === categoryList.length - 1 && <div className='margin'> </div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <textarea readOnly required className='textAreaCategory' value={category} ></textarea>
                                </div>
                                <div style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
                                    {isHovered && (
                                        <div
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            style={{
                                                marginTop: '30px', borderRadius: '10px', width: '500px',
                                                height: '300px',
                                                cursor: 'pointer', position: 'absolute', zIndex: 20, background: 'rgba(128, 128, 128, 0.3)'
                                            }}
                                        >
                                            <MultiplesImages type='service' changeImage={changeImage} />
                                        </div>
                                    )}
                                    <img className='photoService' style={{ marginTop: '30px' }} src={image} alt=''
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)} />
                                </div>
                                <button style={{ 'margin-top': '20px', 'height': '50px' }} className='addCart' type='submit'>AÑADIR</button>
                            </form>
                        </div>
                        <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
                    </div>
                </div>
            )}

            {props.operationResult == 'BORRAR' && (
                <div className="popup-inner">
                    <form onSubmit={borrarServei}>
                        <h2>Estas seguro/a que quieres borrar el servicio?</h2>
                        <button type='submit' style={{ 'margin-top': '20px' }} className='addCart'>
                            <p>BORRAR</p>
                        </button>
                        <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
                    </form>
                </div>
            )}
        </div>
    )
}

export default PopUpService;