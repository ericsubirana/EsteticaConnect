import React, { useEffect, useState } from 'react';
import { changeImage } from '../../api/auth';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext.js';
import {updateProfile} from '../../api/auth.js'
import './profile.css';

function ProfileUser() {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const { user, updateUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            if (file) {
                console.log(file)
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
            const response = await updateProfile({ values, id: user.id });
            console.log(response.data)
            await updateUser();
            console.log('ep')
        } catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        setImage(user.image);
    }, [user.image]);

    return (
        <div className='profileUserMenu'>
            <div className='slideProfile'>
                <div>
                    {image && (
                        <div className='imgSizeProfile'>
                            <img className='imgProfile' src={`http://localhost:5000/images/${image}`} alt='' />
                        </div>
                    )}
                    <input type='file' onChange={e => setFile(e.target.files[0])} />
                    <button onClick={handleUpload}>Upload</button>
                </div>
                <form onSubmit={handleSubmit(async (values) => {
                    profileUserUpdate(values)})}>
                    <h3>Username</h3>
                    <input type="text" placeholder={user.username} {...register('username', { required: false })}   />
                    <h3>Dirección</h3>
                    <input type="text" placeholder={user.direction} {...register('direction', { required: false })} />
                    <h3>Nombre</h3>
                    <input type="text" placeholder={user.name} {...register('name', { required: false })} />
                    <h3>Apellidos</h3>
                    <input type="text" placeholder={user.surname} {...register('surname', { required: false })} />

                    <button type='submit' className='button-53'> Guardar cambios </button>
                </form>
            </div>
        </div>
    );
}

export default ProfileUser;
