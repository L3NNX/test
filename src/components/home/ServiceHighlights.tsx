import React from 'react';
import { 
  FileCheck, 
  Plane, 
  Home, 
  BookOpen, 
  DollarSign, 
  Briefcase 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'University Applications',
    description: 'Expert guidance for selecting and applying to the right Australian universities based on your academic profile and career goals.',
    icon: <FileCheck size={36} className="text-primary-600" />,
    link: '/services#applications'
  },
  {
    id: 2,
    title: 'Visa Guidance',
    description: 'Comprehensive assistance with student visa applications, ensuring all requirements are met for a successful outcome.',
    icon: <Plane size={36} className="text-primary-600" />,
    link: '/services#visa'
  },
  {
    id: 3,
    title: 'Accommodation Support',
    description: 'Help with finding suitable on-campus or off-campus accommodation options that match your preferences and budget.',
    icon: <Home size={36} className="text-primary-600" />,
    link: '/services#accommodation'
  },
  {
    id: 4,
    title: 'Pre-departure Orientation',
    description: 'Prepare for life in Australia with comprehensive briefings on culture, academic expectations, and practical living tips.',
    icon: <BookOpen size={36} className="text-primary-600" />,
    link: '/services#orientation'
  },
  {
    id: 5,
    title: 'Financial Planning',
    description: 'Expert advice on budgeting, scholarship opportunities, and managing living expenses during your study in Australia.',
    icon: <DollarSign size={36} className="text-primary-600" />,
    link: '/services#financial'
  },
  {
    id: 6,
    title: 'Career Counseling',
    description: 'Guidance on career paths, industry connections, and post-study work opportunities in Australia.',
    icon: <Briefcase size={36} className="text-primary-600" />,
    link: '/services#career'
  }
];

const ServiceHighlights: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <Link 
          key={service.id} 
          to={service.link}
          className="card group hover:border-l-4 hover:border-l-primary-600 transition-all p-6"
        >
          <div className="mb-4">{service.icon}</div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-600">
            {service.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ServiceHighlights;