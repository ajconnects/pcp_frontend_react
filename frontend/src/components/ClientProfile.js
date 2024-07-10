import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ClientProfile = () => {
    const { id } = useParams(); // Retrieve client ID from URL params
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/clients/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setClientData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchClientData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading client data: {error.message}</p>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Client Profile</h1>
            {clientData && (
                <div>
                    {clientData.profile_picture && (
                        <img
                            src={clientData.profile_picture}
                            alt="Profile"
                            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                        />
                    )}
                    <p><strong>Name:</strong> {clientData.user.name}</p>
                    <p><strong>Email:</strong> {clientData.user.email}</p>
                    <p><strong>Phone Number:</strong> {clientData.phone_number}</p>
                    <p><strong>Address:</strong> {clientData.address}</p>
                    <p><strong>Bio:</strong> {clientData.bio}</p>
                </div>
            )}
        </div>
    );
};

export default ClientProfile;