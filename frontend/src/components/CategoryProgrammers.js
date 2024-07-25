import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import ProgrammerCard from './ProgrammerCard';
import { getCategoryProgrammers } from '../api'; // Ensure this API call is correct


function CategoryProgrammers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programmers, setProgrammers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgrammers = async () => {
      try {
        const response = await getCategoryProgrammers(id); // Use the API call from api.js
        setProgrammers(response.data);
      } catch (error) {
        setError('Error fetching programmers');
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammers();
  }, [id]);

  const handleSeeMore = (programmerId) => {
    navigate(`/programmer-profile/${programmerId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MDBContainer>
      <h2>Programmers in Category</h2>
      <MDBRow>
        {programmers.map(programmer => (
          <ProgrammerCard key={programmer.id} programmer={programmer} onSeeMore={handleSeeMore} />
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default CategoryProgrammers;