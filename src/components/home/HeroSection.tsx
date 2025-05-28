import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect for background
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    parallaxTl.fromTo(
      heroRef.current,
      { backgroundPositionY: '0%' },
      { backgroundPositionY: '30%', ease: 'none' }
    );

    // Initial animation for text and overlay
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0.5 },
      { opacity: 0.7, duration: 1.5 }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );

    return () => {
      if (parallaxTl.scrollTrigger) {
        parallaxTl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
      }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gray-900 bg-opacity-60"
      ></div>

      <div className="container-custom relative z-10">
        <div ref={textRef} className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Path to Australian Education Excellence
          </h1>
          <p className="text-xl mb-8">
            We guide students through every step of their journey to study at Australia's premier universities.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/universities" className="btn bg-primary-600 hover:bg-primary-700 text-white">
              Explore Universities
            </Link>
            <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Book a Consultation <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a
          href="#stats"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById('stats');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
              // Remove the hash from the URL after scrolling
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
          className="text-white animate-bounce"
          aria-label="Scroll down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;