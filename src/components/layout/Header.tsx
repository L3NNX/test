import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from '../auth/UserMenu';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="https://oemseducation.com/wp-content/uploads/2022/08/omes.png"
              alt="AussieEdu Logo"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {['Services', 'Universities', 'About', 'Contact'].map((item) => (
              <NavLink
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600'
                      : isScrolled
                      ? 'text-gray-800 hover:text-primary-600'
                      : 'text-black hover:text-primary-200'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  to="/auth"
                  className="font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className={`btn ${
                    isScrolled
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu
                size={24}
                className={isScrolled ? 'text-gray-800' : 'text-white'}
              />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in bg-white">
            <nav className="flex flex-col space-y-4">
              {['Home', 'Services', 'Universities', 'About', 'Contact'].map(
                (item) => (
                  <NavLink
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block font-medium py-2 ${
                        isActive
                          ? 'text-primary-600'
                          : 'text-gray-800 hover:text-primary-600'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </NavLink>
                )
              )}
              {!user && (
                <>
                  <Link
                    to="/auth"
                    className="block font-medium py-2 text-gray-800 hover:text-primary-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth"
                    className="btn btn-primary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;