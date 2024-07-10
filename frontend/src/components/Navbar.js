import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton
} from '@coreui/react';
import Search from './search';
import '../App.css';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const menuItems = [
  {
    title: "Our Team",
    submenu: [
      {
        title: "Sami",
        description: "El Jefe, Backend and Frontend"
      },
      {
        title: "Aj",
        description: "Master in API"
      },
      {
        title: "Paula",
        description: "Only frontend"
      }
    ]
  },
  {
    title: "Our Product",
    submenu: [
      {
        title: "Find Work"
      },
      {
        title: "Why P.C.P"
      },
      {
        title: "News"
      }
    ]
  }
];

const Navbar = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const { isLoggedIn, userType, userId, logout } = useContext(AuthContext);

  const handleTeamMemberHover = (index) => {
    setSelectedTeamMember(index);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (userType === 'programmer') {
      navigate(`/programmer-profile/${userId}`);
    } else if (userType === 'client') {
      navigate(`/client-profile/${userId}`);
    }
  };

  return (
    <CNavbar expand="lg" className="bg-body-tertiary">
      <CContainer fluid>
        <CNavbarBrand>
          <Link to="/">
            <img src="/static/d.png" alt="" style={{ maxHeight: '80px', border: '2px solid #167D8F', borderRadius: '50%' }} />
          </Link>
        </CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav>
            <CDropdown
              isOpen={teamDropdownOpen}
              toggle={() => setTeamDropdownOpen(!teamDropdownOpen)}
              onMouseEnter={() => setTeamDropdownOpen(true)}
              onMouseLeave={() => setTeamDropdownOpen(false)}
            >
              <CDropdownToggle nav caret className="dropdown-toggle">
                Our Team
              </CDropdownToggle>
              <CDropdownMenu className="team-dropdown-menu">
                {menuItems[0].submenu.map((member, index) => (
                  <CDropdownItem
                    key={index}
                    onMouseEnter={() => handleTeamMemberHover(index)}
                  >
                    <div className="dropdown-item-content">
                      <div className="member-title">
                        {member.title}
                      </div>
                      {selectedTeamMember === index && (
                        <div className="member-description">
                          {member.description}
                        </div>
                      )}
                    </div>
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
            <CDropdown
              isOpen={productDropdownOpen}
              toggle={() => setProductDropdownOpen(!productDropdownOpen)}
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <CDropdownToggle nav caret className="dropdown-toggle">
                Our Product
              </CDropdownToggle>
              <CDropdownMenu className="product-dropdown-menu">
                {menuItems[1].submenu.map((product, index) => (
                  <CDropdownItem key={index}>
                    <div className="dropdown-item-content">
                      <div className="product-title">
                        {product.title}
                      </div>
                    </div>
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </CNavbarNav>
          <CNavbarNav className="ms-auto">
            <Search />
          </CNavbarNav>
          <CNavbarNav className="ms-auto">
            {isLoggedIn ? (
              <>
                <CButton style={{ backgroundColor: '#10A674', color: 'white', marginRight: '10px' }}
                onClick={handleProfileClick}>
                  My Profile
                </CButton>
                <CButton style={{ backgroundColor: '#f44336', color: 'white' }}
                onClick={handleLogout}>
                  Logout
                </CButton>
              </>
            ) : (
              <>
                <CDropdown>
                  <CDropdownToggle color="secondary">Sign up</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => navigate('/register-programmer')}>Programmer</CDropdownItem>
                    <CDropdownItem onClick={() => navigate('/register-client')}>Client</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CButton style={{ backgroundColor: '#1d899a', color: 'white' }} className="me-2" onClick={() => navigate('/login')}>
                  Login
                </CButton>
              </>
            )}
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

export default Navbar;