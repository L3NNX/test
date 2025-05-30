
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import UniversitiesPage from './pages/UniversitiesPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>

    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />
              <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
        </Routes>
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
}

export default App;