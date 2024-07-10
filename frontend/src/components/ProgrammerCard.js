import React from 'react';

const ProgrammerCard = ({ programmer, onSeeMore }) => {
  console.log('Programmer in ProgrammerCard:', programmer); // Debugging

  const profilePicture = programmer.profile_picture
    ? programmer.profile_picture
    : 'http://127.0.0.1:8000/media/programmer_pictures/default_image.jpg';

  const userName = programmer.user && programmer.user.name ? programmer.user.name : programmer.name;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-img-container">
        <img
          src={profilePicture}
          className="card-img-top"
          alt={userName ? userName : 'Programmer'}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'http://127.0.0.1:8000/media/programmer_pictures/default_image.jpg';
          }}
        />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{userName ? userName : 'Programmer'}</h5>
        <p className="card-text"><strong>{programmer.categories && programmer.categories.name ? programmer.categories.name : programmer.categories}</strong></p>
        <p className="card-text"><strong>Skills:</strong> {programmer.skills}</p>
      </div>
      <div className="card-footer text-center">
        <button
          className="btn btn-primary w-100"
          style={{ backgroundColor: '#1d899a', color: '#fff', border: 'none' }}
          onClick={() => {
            console.log('Clicked programmer id:', programmer.user ? programmer.user.id : programmer.id); // Debugging
            onSeeMore(programmer.user ? programmer.user.id : programmer.id);
          }}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProgrammerCard;