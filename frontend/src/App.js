
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/Signup';
import JobFormPage from './pages/JobFormPage';
import CreateInterview from './pages/CreateInterview';
import AuthContext from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="createinterview" element={<CreateInterview />} />
          <Route path="jobform" element={<JobFormPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
