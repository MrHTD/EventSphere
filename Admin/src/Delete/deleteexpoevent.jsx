import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

const DeleteExpoEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Define an asynchronous function to make the delete request
        const DeleteExpoEvent = async () => {
            try {
                await axios.delete(`http://localhost:3000/deleteexpoevent/${id}`);
                console.log(`${id} Deleted`);
                navigate('/expo');
            } catch (error) {
                console.error(error);
            }
        };

        // Call the asynchronous function
        DeleteExpoEvent();
    }, [id, navigate]);

    return <div>User Deleted</div>
}

export default DeleteExpoEvent