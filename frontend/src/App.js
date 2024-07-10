import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import MarketingMessage from './components/MarketingMessage';
import Categories from './components/Categories';
import CategoryProgrammers from './components/CategoryProgrammers';
import ProgrammerForm from './components/ProgrammerForm';
import ProgrammerList from './components/ProgrammerList';
import ClientForm from './components/ClientForm';
import ClientProfile from './components/ClientProfile';
import ProgrammerProfile from './components/ProgrammerProfile';
import Login from './components/Login';
import { AuthProvider } from './components/AuthContext';
import UserTypeSelection from './components/UserTypeSelection';
import Footer from './components/footer'; // Import the footer

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <AuthProvider>
    <Router>
      <div className="d-flex flex-column min-vh-100"> {/* Updated class names */}
        <Navbar visible={visible} setVisible={setVisible} />
        <div className="flex-grow-1 main-content"> {/* Updated class names */}
          <MDBContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/category/:id" element={<CategoryProgrammers />} />
              <Route path="/register-programmer" element={<ProgrammerForm />} />
              <Route path="/programmer-profile/:id" element={<ProgrammerProfile />} />
              <Route path="/programmer" element={<ProgrammerList />} />
              <Route path="/register-client" element={<ClientForm />} />
              <Route path="/client-profile/:id" element={<ClientProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/select-user-type" element={<UserTypeSelection />} />
            </Routes>
          </MDBContainer>
        </div>
        <Footer /> {/* Footer is here */}
      </div>
    </Router>
    </AuthProvider>
  );
}

// Example home component to display MarketingMessage and Categories
const Home = () => (
  <>
    <MarketingMessage />
    <Categories />
  </>
);

export default App;
