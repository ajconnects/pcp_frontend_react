import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgrammerCard from './ProgrammerCard';
const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: [] };
  return (
    <div className="container">
      <div className="row">
        {results.map((programmer) => (
          <div className="col-md-4" key={programmer.id}>
            <ProgrammerCard
              programmer={programmer}
              onSeeMore={(id) => navigate(`/programmer-profile/${id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchResults;