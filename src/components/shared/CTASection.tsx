import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="bg-accent-600 text-white py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Australian Education Journey?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Take the first step towards a world-class education experience. Our expert counselors are ready to guide you through every stage of the process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/contact" 
              className="btn bg-white text-accent-600 hover:bg-gray-100"
            >
              Book a Free Consultation <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link 
              to="/universities" 
              className="btn border-2 border-white text-white hover:bg-white/10"
            >
              Explore Universities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;