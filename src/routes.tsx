import Navbar from 'components/Navbar/Navbar';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import DashboardPage from 'pages/Dashboard/Dashboard';
import HomePage from 'pages/Home/Home';
import LoginPage from 'pages/Login/Login';
import NamespacePage from 'pages/Namespace/Namespace';
import RegistrationPage from 'pages/Register/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const ClientRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/namespace/:namespaceId"
          element={
            <ProtectedRoute>
              <NamespacePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default ClientRoutes;
