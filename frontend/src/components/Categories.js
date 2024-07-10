import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FaCode, FaLaptopCode, FaCloud, FaUserCog, FaRobot, FaDocker  } from 'react-icons/fa';
import '../App.css'; // Import CSS file

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Frontend Developer",
      buttonText: ["JavaScript", "HTML/CSS", "React"].join(", "),
      icon: <FaCode />
    },
    {
      id: 2,
      name: "Backend Developer",
      buttonText: ["Python", "Java", "C #" ].join(", "),
      icon: <FaLaptopCode />
    },
    {
      id: 3,
      name: "DevOps",
      buttonText: ["Docker", "Git", "Kubernetes"].join(", "),
      icon: <FaDocker />
    },
    {
      id: 4,
      name: "DS/ML",
      buttonText: ["PyTorch", "TensorFlow", "Pandas"].join(", "),
      icon: <FaRobot />
  
    },
    {
      id: 5,
      name: "Cloud Services",
      buttonText: ["AWS", "Google Cloud", "IBM Cloud"].join(", "),
      icon: <FaCloud />
    },
    {
      id: 6,
      name: "System Admin",
      buttonText: ["Linux/Unix", "PowerShell", "Ansible"].join(", "),
      icon: <FaUserCog />
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`);
  };

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