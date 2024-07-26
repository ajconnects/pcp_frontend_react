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

  const staticCategories = [
    {
      name: "Frontend Developer",
      buttonText: ["JavaScript", "HTML/CSS", "React"],
      icon: <FaCode />
    },
    {
      name: "Backend Developer",
      buttonText: ["Python", "Java", "C#"],
      icon: <FaLaptopCode />
    },
    {
      name: "DevOps",
      buttonText: ["Docker", "Git", "Kubernetes"],
      icon: <FaDocker />
    },
    {
      name: "DS/ML",
      buttonText: ["PyTorch", "TensorFlow", "Pandas"],
      icon: <FaRobot />
    },
    {
      name: "Cloud Services",
      buttonText: ["AWS", "Google Cloud", "IBM Cloud"],
      icon: <FaCloud />
    },
    {
      name: "System Admin",
      buttonText: ["Linux/Unix", "PowerShell", "Ansible"],
      icon: <FaUserCog />
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('Fetched categories:', response.data); // Inspect the data structure

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format');
        }

        const fetchedCategories = response.data.map(category => {
          const staticCategory = staticCategories.find(staticCat => staticCat.name === category.name);
          return {
            ...category,
            buttonText: staticCategory ? staticCategory.buttonText.join(", ") : 'No technologies listed',
            icon: staticCategory ? staticCategory.icon : <FaCode />
          };
        });

        console.log('Merged categories:', fetchedCategories); // Inspect merged data
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching or processing categories:', error);
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
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.buttonText}</p>
              </div>
            </div>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default Categories;
