import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
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
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <GraduationCap size={32} className="text-primary-600" />
            <span className={`font-heading font-bold text-xl ${
              isScrolled || isOpen ? 'text-gray-800' : 'text-white'
            }`}>
              AussieEdu
            </span>
          </Link> */}

          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src="https://oemseducation.com/wp-content/uploads/2022/08/omes.png"
              alt="AussieEdu Logo"
              className="h-10 w-auto"
            />
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Services', 'Universities', 'About', 'Contact'].map((item) => (
              <NavLink
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-medium transition-colors ${isActive
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

          <div className="hidden md:block">
            <Link
              to="/contact"
              className={`btn ${isScrolled
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-white text-primary-600 hover:bg-gray-100'
                }`}
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in bg-white">
            <nav className="flex flex-col space-y-4">
              {['Home', 'Services', 'Universities', 'About', 'Contact'].map((item) => (
                <NavLink
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `block font-medium py-2 ${isActive
                      ? 'text-primary-600'
                      : 'text-gray-800 hover:text-primary-600'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="btn btn-primary w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Book Consultation
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;