import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, GraduationCap, Globe, BookOpen, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTASection from '../components/shared/CTASection';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate sections when they come into view
    const sections = [missionRef, valuesRef, teamRef];
    
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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <div 
        className="bg-cover bg-center py-20 relative"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' 
        }}
      >
        <div className="absolute inset-0 bg-primary-900 bg-opacity-70"></div>
        <div className="container-custom relative z-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About OEMS</h1>
          <p className="text-lg max-w-2xl">
            We're dedicated to helping students achieve their educational dreams in Australia through personalized guidance and support.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                AussieEdu was founded in 2013 by a team of education enthusiasts who recognized the challenges international students face when pursuing education in Australia.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Having experienced these challenges firsthand, our founders were determined to create a consultancy that provides comprehensive, honest, and personalized guidance to students.
              </p>
              <p className="text-lg text-gray-700">
                Over the years, we've grown from a small team to a leading education consultancy with a proven track record of successfully placing thousands of students in top Australian universities.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="OEMS team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={missionRef} className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              To empower students with the guidance, resources, and support they need to access quality education in Australia and build successful global careers.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <Users size={40} className="text-primary-600 mx-auto mb-4" />,
                  title: 'Student-Centered',
                  description: "We put students' needs and aspirations at the center of everything we do."
                },
                {
                  icon: <Award size={40} className="text-primary-600 mx-auto mb-4" />,
                  title: 'Excellence',
                  description: 'We strive for excellence in our services and the outcomes we achieve for students.'
                },
                {
                  icon: <Globe size={40} className="text-primary-600 mx-auto mb-4" />,
                  title: 'Global Perspective',
                  description: 'We embrace diversity and foster a global mindset in our approach.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={valuesRef} className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Integrity',
                description: 'We maintain the highest ethical standards in our advice and services, providing honest guidance that serves students\' best interests.',
                color: 'bg-primary-50 border-primary-500'
              },
              {
                title: 'Innovation',
                description: 'We continuously evolve our services and approach to meet the changing needs of students and the education landscape.',
                color: 'bg-secondary-50 border-secondary-500'
              },
              {
                title: 'Empathy',
                description: 'We understand the challenges and anxieties students face, providing compassionate support throughout their journey.',
                color: 'bg-accent-50 border-accent-500'
              },
              {
                title: 'Excellence',
                description: 'We are committed to delivering exceptional service and achieving outstanding results for every student we work with.',
                color: 'bg-primary-50 border-primary-500'
              },
              {
                title: 'Collaboration',
                description: 'We work closely with students, universities, and partners to create the best possible outcomes through teamwork.',
                color: 'bg-secondary-50 border-secondary-500'
              },
              {
                title: 'Cultural Respect',
                description: 'We celebrate diversity and promote cross-cultural understanding in all our interactions and services.',
                color: 'bg-accent-50 border-accent-500'
              }
            ].map((value, index) => (
              <div key={index} className={`p-6 rounded-lg ${value.color} border-l-4`}>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="py-20 bg-cover bg-center relative"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' 
        }}
      >
        <div className="absolute inset-0 bg-accent-900 bg-opacity-80"></div>
        <div className="container-custom relative z-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '5,000+', label: 'Students Placed' },
              { number: '30+', label: 'University Partners' },
              { number: '98%', label: 'Visa Success Rate' },
              { number: '12+', label: 'Years of Experience' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={teamRef} className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Expert Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Founder & CEO',
                bio: 'With over 15 years of experience in international education, Sarah leads our team with passion and vision.',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                name: 'Michael Zhang',
                role: 'Senior Education Consultant',
                bio: 'Michael specializes in graduate admissions and has helped over 500 students secure placements in top universities.',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                name: 'Priya Patel',
                role: 'Visa Specialist',
                bio: "Priya's expertise in visa regulations ensures our students have the highest success rate in securing student visas.",
                image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                name: 'James Wilson',
                role: 'Scholarship Advisor',
                bio: 'James works tirelessly to identify and secure scholarship opportunities for deserving students.',
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                name: 'Rebecca Chen',
                role: 'Career Counselor',
                bio: 'Rebecca helps students align their education choices with their long-term career goals and aspirations.',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              },
              {
                name: 'Ahmed Hassan',
                role: 'Pre-departure Coordinator',
                bio: 'Ahmed ensures students are well-prepared for their journey to Australia with comprehensive orientation sessions.',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
            ].map((member, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
              <p className="text-lg text-gray-700 mb-6">
                We're always looking for passionate individuals to join our team of education consultants. If you're dedicated to helping students achieve their educational dreams, we'd love to hear from you.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <GraduationCap size={24} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Experience in international education or study abroad advising</span>
                </div>
                <div className="flex items-start">
                  <BookOpen size={24} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Knowledge of Australian education system and universities</span>
                </div>
                <div className="flex items-start">
                  <Users size={24} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Strong communication and interpersonal skills</span>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary flex items-center w-fit">
                Contact Us <ChevronRight size={20} className="ml-2" />
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Join our team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default AboutPage;