import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  Plane,
  Home,
  BookOpen,
  DollarSign,
  Briefcase,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTASection from '../components/shared/CTASection';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'applications',
    title: 'University Applications',
    description: 'We provide comprehensive guidance for selecting and applying to the right Australian universities based on your academic profile, career goals, and personal preferences.',
    icon: <FileCheck size={48} className="text-primary-600" />,
    image: 'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Personalized university selection based on your profile',
      'Application documentation preparation and review',
      'Personal statement and SOP editing assistance',
      'Scholarship application support',
      'Interview preparation for competitive programs',
      'Application tracking and follow-up with universities'
    ]
  },
  {
    id: 'visa',
    title: 'Visa Guidance',
    description: 'Our expert visa counselors provide comprehensive assistance with student visa applications, ensuring all requirements are met for a successful outcome.',
    icon: <Plane size={48} className="text-primary-600" />,
    image: 'https://images.pexels.com/photos/2647973/pexels-photo-2647973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Student visa eligibility assessment',
      'Documentation checklist and preparation help',
      'Guidance on financial requirements',
      'Assistance with health insurance arrangements',
      'Application submission and tracking',
      'Support for visa interview preparation'
    ]
  },
  {
    id: 'accommodation',
    title: 'Accommodation Support',
    description: 'We help you find suitable on-campus or off-campus accommodation options that match your preferences and budget for comfortable living during your studies.',
    icon: <Home size={48} className="text-primary-600" />,
    image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'On-campus housing application assistance',
      'Off-campus accommodation options',
      'Budget-friendly housing recommendations',
      'Roommate matching services',
      'Lease agreement review and guidance',
      'Temporary accommodation for initial arrival'
    ]
  },
  {
    id: 'orientation',
    title: 'Pre-departure Orientation',
    description: 'Prepare for life in Australia with our comprehensive briefings on culture, academic expectations, and practical living tips to ensure a smooth transition.',
    icon: <BookOpen size={48} className="text-primary-600" />,
    image: 'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Cultural adaptation workshops',
      'Academic system orientation',
      'Health and safety briefings',
      'Banking and financial setup guidance',
      'Transportation system overview',
      'Essential items packing checklist'
    ]
  },
  {
    id: 'financial',
    title: 'Financial Planning',
    description: 'Our financial advisors provide expert advice on budgeting, scholarship opportunities, and managing living expenses during your study in Australia.',
    icon: <DollarSign size={48} className="text-primary-600" />,
    image: 'https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Comprehensive cost estimation',
      'Scholarship and funding opportunities',
      'Part-time work information and regulations',
      'Budgeting and expense management tools',
      'Banking setup assistance',
      'Tax considerations for international students'
    ]
  },
  {
    id: 'career',
    title: 'Career Counseling',
    description: 'Get personalized guidance on career paths, industry connections, and post-study work opportunities in Australia to maximize your professional potential.',
    icon: <Briefcase size={48} className="text-primary-600" />,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    features: [
      'Industry-specific career pathway planning',
      'Resume and cover letter enhancement',
      'Interview skills workshops',
      'Post-study work visa information',
      'Networking opportunities with alumni',
      'Industry partner connections'
    ]
  }
];

const ServicesPage: React.FC = () => {
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    serviceRefs.current.forEach((section, index) => {
      if (section) {
        // Stagger animation for services
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: section,
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

  useEffect(() => {
  // Services animations
  serviceRefs.current.forEach((section, index) => {
    if (section) {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }
  });

  // Timeline animations
  timelineRefs.current.forEach((el, index) => {
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
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
        className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-16"
      >
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg max-w-2xl">
            We provide end-to-end support for students aspiring to study in Australia,
            from university selection to post-arrival assistance.
          </p>
        </div>
      </div>

      <div className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">Comprehensive Educational Services</h2>
            <p className="text-lg text-gray-600">
              At OEMS, we pride ourselves on providing holistic support through every step of your Australian education journey. Our services are designed to make your transition seamless and successful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 line-clamp-2">{service.description}</p>
                <div className="mt-4 inline-flex items-center text-primary-600 font-medium">
                  Learn More <ChevronRight size={16} className="ml-1" />
                </div>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold">Why Choose Our Services?</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Expert Guidance',
                  description: 'Our counselors have extensive experience and in-depth knowledge of Australian universities and visa processes.'
                },
                {
                  title: 'Personalized Approach',
                  description: 'We create customized plans based on your academic profile, preferences, and career aspirations.'
                },
                {
                  title: 'End-to-End Support',
                  description: 'From initial consultation to post-arrival assistance, we support you throughout your educational journey.'
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container-custom">
          {services.map((service, index) => (
            <div
              id={service.id}
              key={service.id}
              ref={el => serviceRefs.current[index] = el}
              className={`py-16 ${index !== services.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div
                  className="rounded-lg overflow-hidden shadow-lg"
                  style={{ height: '400px' }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle size={20} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="btn btn-primary"
                  >
                    Inquire About This Service
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Service Process</h2>
            <p className="text-lg text-gray-600 mb-12">
              We follow a structured yet flexible approach to ensure you receive the best support at every stage of your journey.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {[
                {
                  title: 'Initial Consultation',
                  description: 'We understand your academic background, goals, and preferences to develop a personalized plan.',
                  icon: <BookOpen size={24} className="text-primary-600" />
                },
                {
                  title: 'University Selection',
                  description: 'Based on your profile, we recommend suitable universities and programs that align with your career aspirations.',
                  icon: <FileCheck size={24} className="text-primary-600" />
                },
                {
                  title: 'Application Preparation',
                  description: 'We help prepare and review all application documents to ensure they meet university requirements.',
                  icon: <FileCheck size={24} className="text-primary-600" />
                },
                {
                  title: 'Visa Guidance',
                  description: 'Once accepted, we provide comprehensive assistance with student visa application and documentation.',
                  icon: <Plane size={24} className="text-primary-600" />
                },
                {
                  title: 'Pre-departure Support',
                  description: 'We prepare you for life in Australia through orientation sessions covering culture, accommodation, and more.',
                  icon: <BookOpen size={24} className="text-primary-600" />
                },
                {
                  title: 'Post-arrival Assistance',
                  description: 'Our support continues after you arrive in Australia, helping with settling in and addressing any concerns.',
                  icon: <Home size={24} className="text-primary-600" />
                }
              ].map((step, index) => (
                <div key={index} className="grid grid-cols-9 items-center" ref={el => timelineRefs.current[index] = el}>
                  {/* Left Content */}
                  {index % 2 === 0 ? (
                    <>
                      <div className="col-span-4 md:text-right pr-4">
                        <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      {/* Timeline Dot */}
                      <div className="col-span-1 flex justify-center relative z-10">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      {/* Empty Spacer */}
                      <div className="col-span-4"></div>
                    </>
                  ) : (
                    <>
                      {/* Empty Spacer */}
                      <div className="col-span-4"></div>
                      {/* Timeline Dot */}
                      <div className="col-span-1 flex justify-center relative z-10">
                        <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      {/* Right Content */}
                      <div className="col-span-4 pl-4">
                        <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default ServicesPage;