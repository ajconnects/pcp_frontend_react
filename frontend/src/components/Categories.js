import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FaCode, FaLaptopCode, FaCloud, FaUserCog, FaRobot, FaDocker } from 'react-icons/fa';
import { getCategories } from '../api';
import '../App.css'; // Import CSS file

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('Fetched categories:', response.data); // Inspect the data structure
        setCategories(response.data);
      } catch (error) {
        setError('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category.id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MDBContainer className="categories-container">
      <h2 className="categories-title">Find Talent by Category</h2>
      <MDBRow className="category-row">
        {categories.map(category => (
          <MDBCol key={category.id} xs="12" sm="6" md="4" className="mb-4">
            <div className="category-button" onClick={() => handleCategoryClick(category)}>
              <div className="category-icon">{getCategoryIcon(category.name)}</div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.buttonText ? category.buttonText.join(", ") : 'No technologies listed'}</p>
              </div>
            </div>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

// Function to return the correct icon for each category
const getCategoryIcon = (name) => {
  switch (name) {
    case "Frontend Developer":
      return <FaCode />;
    case "Backend Developer":
      return <FaLaptopCode />;
    case "DevOps":
      return <FaDocker />;
    case "DS/ML":
      return <FaRobot />;
    case "Cloud Services":
      return <FaCloud />;
    case "System Admin":
      return <FaUserCog />;
    default:
      return <FaCode />;
  }
};

export default Categories;