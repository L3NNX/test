import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CalendarClock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../components/home/HeroSection';
import StatisticsSection from '../components/home/StatisticsSection';
import UniversitySlider from '../components/home/UniversitySlider';
import TestimonialSlider from '../components/home/TestimonialSlider';
import ServiceHighlights from '../components/home/ServiceHighlights';
import CTASection from '../components/shared/CTASection';
import FAQSection from '../components/home/FAQ';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const universityRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate sections when they come into view
    const sections = [servicesRef, statsRef, universityRef, testimonialRef];

    sections.forEach((sectionRef) => {
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />

      <div ref={statsRef}>
        <StatisticsSection />
      </div>

      <div ref={servicesRef} className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Our Services</h2>
          <ServiceHighlights />
          <div className="mt-12 text-center">
            <Link to="/services" className="btn btn-outline">
              View All Services <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      <div ref={universityRef} className="section bg-white">
        <div className="container-custom ">
          <h2 className="section-title">Top Australian Universities</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Partner with leading universities across Australia offering world-class education across diverse fields of study.
          </p>
          <UniversitySlider />
        </div>
      </div>

      {/* <div
        className="py-24 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        }}
      >
        <div className="absolute inset-0 bg-primary-900 bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Australia?</h2>
            <p className="mb-8">
              Australia offers world-renowned education, a vibrant multicultural society, and excellent post-study work opportunities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Award size={40} className="mb-3 text-accent-500" />
                <span className="font-medium">Quality Education</span>
              </div>
              <div className="flex flex-col items-center">
                <Landmark size={40} className="mb-3 text-accent-500" />
                <span className="font-medium">Global Recognition</span>
              </div>
              <div className="flex flex-col items-center">
                <BookOpen size={40} className="mb-3 text-accent-500" />
                <span className="font-medium">Research Opportunities</span>
              </div>
              <div className="flex flex-col items-center">
                <Map size={40} className="mb-3 text-accent-500" />
                <span className="font-medium">Cultural Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

       <div className="section bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events & Webinars</h2>
              <p className="mb-8">
                Join our informative sessions to learn more about studying in Australia, visa processes, and scholarship opportunities.
              </p>
              <Link to="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Register Now
              </Link>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Australian Education Fair 2025',
                  date: 'March 15, 2025',
                  location: 'Virtual Event',
                },
                {
                  title: 'Scholarship Opportunities Webinar',
                  date: 'April 5, 2025',
                  location: 'Zoom Session',
                },
                {
                  title: 'Student Visa Workshop',
                  date: 'April 20, 2025',
                  location: 'In-Person & Online',
                }
              ].map((event, index) => (
                <div key={index} className="bg-primary-700 p-4 rounded-lg flex items-start">
                  <CalendarClock size={24} className="mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <p className="text-primary-200">{event.date} • {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={testimonialRef} className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Student Success Stories</h2>
          <TestimonialSlider />
        </div>
      </div>

      <FAQSection />

      <CTASection />
    </div>
  );
};

export default HomePage;