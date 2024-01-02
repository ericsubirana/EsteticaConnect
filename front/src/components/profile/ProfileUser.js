import React, { useEffect, useState } from 'react';
import { changeImage } from '../../api/auth';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext.js';
import { updateProfile } from '../../api/auth.js'
import './profile.css';
import { FaUser, FaAt } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";

function ProfileUser() {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const { user, updateUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
                const result = await changeImage(formData);
                setImage(result.data.image);
                updateUser(); //fem un update de la variable global user per agaafar la imatge nova
            }
        } catch (error) {
            console.log(error);
        }
    };

    const profileUserUpdate = async (values) => {
        try {
            await handleUpload(); //penjar imatge bd i backend
            await updateProfile({ values, id: user.id }); // bd
            await updateUser(); //variable global front
        } catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        setImage(user.image);
    }, [user.image]);


    return (
        <div className='profileUserMenu'>
            <div className='SquareBack'></div>
            <div className='slideProfile'>
                <div className='imageBehindSideBar'>
                    {image && (
                        <div className='imgSizeProfile'>
                            <img className='imgProfile' src={`http://localhost:3050/images/${image}`} alt='' />
                        </div>
                    )}
                    <input type="file" name="file" id="file" class="inputfile" onChange={e => setFile(e.target.files[0])} />
                    <label for="file">Seleccionar foto</label>
                    <div className='aboluteProfile'>
                        {file && (
                            <span>
                                Archivo seleccionado: {file.name}
                            </span>
                        )}
                    </div>
                </div>
                <form className='profileForm' onSubmit={handleSubmit(async (values) => {
                    profileUserUpdate(values)
                })}>
                    <div className='profileFormDivide'>
                        <div>
                            <div className='nameSurnameProfiile'>
                                <FaUser />
                                <h3>Username</h3>
                            </div>
                            <input type="text" placeholder={user.username} {...register('username', { required: false })} />
                        </div>
                        <div>
                            <div className='nameSurnameProfiile'>
                                <SiGooglemaps />
                                <h3>Dirección</h3>
                            </div>
                            <input type="text" placeholder={user.direction} {...register('direction', { required: false })} />
                        </div>
                    </div>
                    <div className='profileFormDivide'>
                        <div>
                            <div className='nameSurnameProfiile'>
                                <FaAt />
                                <h3>Nombre</h3>
                            </div>
                            <input type="text" placeholder={user.name} {...register('name', { required: false })} />
                        </div>
                        <div className='profileFormDivide2'>
                            <div className='nameSurnameProfiile'>
                                <FaAt />
                                <h3>Apellidos</h3>
                            </div>
                            <input type="text" placeholder={user.surname} {...register('surname', { required: false })} />
                        </div>
                    </div>
                    <div className='buttonProfile'>
                        <button type='submit' className='button-53'> Guardar cambios </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileUser;
