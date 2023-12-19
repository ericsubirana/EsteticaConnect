import React, { useEffect, useState } from 'react';
import { changeImage } from '../../api/auth';
import { useAuth } from '../../context/AuthContext.js';
import './profile.css';

function ProfileUser() {
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const { user, changePhoto } = useAuth();

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            if (file) {
                console.log(file)
                formData.append('file', file);
                const result = await changeImage(formData);
                setImage(result.data.image);
                changePhoto(); //fem un update de la variable global user per agaafar la imatge nova
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setImage(user.image);
    }, [user.image]);

    return (
        <div className='profile'>
            {image && (
                <div className='imgSizeProfile'>
                    <img className='imgProfile' src={`http://localhost:5000/images/${image}`} alt='' />
                </div>
            )}
            <input type='file' onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default ProfileUser;
