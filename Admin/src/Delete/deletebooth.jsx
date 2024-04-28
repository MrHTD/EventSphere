import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBooth = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Define an asynchronous function to make the delete request
        const DeleteBooth = async () => {
            try {
                await axios.delete(`http://localhost:3000/deletebooth/${id}`);
                console.log(`${id} Deleted`);
                // Navigate to the desired route after successful deletion
                navigate('/booths');
            } catch (error) {
                console.error(error);
            }
        };

        // Call the asynchronous function
        DeleteBooth();
    }, [id, navigate]);

    return <div>User Deleted</div>
}

export default DeleteBooth