import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    university: 'University of Melbourne',
    course: 'Master of Business Administration',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: 'OEMS made my dream of studying in Australia come true. Their guidance throughout the university selection and visa process was invaluable. I highly recommend their services to anyone looking to study in Australia.'
  },
  {
    id: 2,
    name: 'Raj Patel',
    university: 'University of Sydney',
    course: 'Bachelor of Engineering',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: 'The team at OEMS went above and beyond to help me secure admission and a scholarship at the University of Sydney. Their personalized approach and deep knowledge of the Australian education system made all the difference.'
  },
  {
    id: 3,
    name: 'Li Wei',
    university: 'Australian National University',
    course: 'PhD in Computer Science',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: 'From application to arrival, OEMS supported me every step of the way. Their detailed pre-departure orientation helped me settle into Australian life seamlessly. Their post-arrival support was exceptional.'
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    university: 'Monash University',
    course: 'Master of Public Health',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: 'I was overwhelmed by the process of applying to Australian universities until I found OEMS. Their expert counselors simplified everything and helped me find the perfect program. Now I\'m thriving at Monash University!'
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
        <div 
          className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 transform translate-x-10' : 'opacity-100 transform translate-x-0'}`}
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <div 
                className="h-64 md:h-full bg-cover bg-center" 
                style={{ backgroundImage: `url(${testimonials[currentIndex].image})` }}
              ></div>
            </div>
            
            <div className="md:w-2/3 p-8 md:p-12 relative">
              <Quote size={40} className="absolute top-6 right-6 text-gray-200" />
              
              <p className="text-lg text-gray-600 italic mb-8">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div>
                <h3 className="text-xl font-semibold">{testimonials[currentIndex].name}</h3>
                <p className="text-primary-600">{testimonials[currentIndex].course}</p>
                <p className="text-gray-500">{testimonials[currentIndex].university}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevSlide}
          className="flex items-center text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
          disabled={isAnimating}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== currentIndex) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="flex items-center text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
          disabled={isAnimating}
          aria-label="Next testimonial"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;