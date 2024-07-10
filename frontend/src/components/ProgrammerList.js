import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProgrammerCard from './ProgrammerCard';

const ProgrammerList = () => {
  const [programmers, setProgrammers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgrammers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/programmers/');
        setProgrammers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programmers:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProgrammers();
  }, []);

  const handleSeeMore = (id) => {
    console.log('Navigating to programmer profile with ID:', id); // Debugging
    navigate(`/programmer-profile/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading programmers: {error.message}</p>;

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">List of Programmers</h1>
      <div className="container mt-4">
        <div className="row">
          {programmers.map(programmer => (
            <div key={programmer.id} className="col-lg-4 col-md-6 mb-4">
              <ProgrammerCard programmer={programmer} onSeeMore={handleSeeMore} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgrammerList;