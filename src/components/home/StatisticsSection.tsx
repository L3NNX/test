import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, GraduationCap, Award, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    id: 1, 
    icon: <Users size={36} className="text-primary-600" />, 
    value: '5,000+', 
    label: 'Students Placed', 
    description: 'Successfully placed in Australian universities'
  },
  { 
    id: 2, 
    icon: <GraduationCap size={36} className="text-primary-600" />, 
    value: '98%', 
    label: 'Success Rate', 
    description: 'Visa and university admission success'
  },
  { 
    id: 3, 
    icon: <Building size={36} className="text-primary-600" />, 
    value: '30+', 
    label: 'University Partners', 
    description: 'Top Australian universities in our network'
  },
  { 
    id: 4, 
    icon: <Award size={36} className="text-primary-600" />, 
    value: '12+', 
    label: 'Years Experience', 
    description: 'Helping students achieve their dreams'
  },
];

const StatisticsSection: React.FC = () => {
  const countersRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  useEffect(() => {
    const counters = counterRefs.current;
    
    if (countersRef.current && counters.length) {
      // Animate counter values on scroll
      ScrollTrigger.create({
        trigger: countersRef.current,
        start: 'top 80%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            if (counters[index]) {
              const value = stat.value.replace(/[^0-9.]/g, '');
              const hasPlus = stat.value.includes('+');
              const hasPercent = stat.value.includes('%');
              
              gsap.fromTo(
                counters[index],
                { innerText: '0' },
                {
                  innerText: value,
                  duration: 2,
                  ease: 'power2.out',
                  snap: { innerText: 1 },
                  modifiers: {
                    innerText: (value) => {
                      let result = Math.ceil(Number(value)).toString();
                      if (hasPlus) result += '+';
                      if (hasPercent) result += '%';
                      return result;
                    }
                  }
                }
              );
            }
          });
        },
        once: true
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="stats" className="section bg-white">
      <div className="container-custom">
        <h2 className="section-title">Our Impact in Numbers</h2>
        
        <div 
          ref={countersRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.id} className="card p-6 text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold mb-2">
                <span 
                  ref={(el) => counterRefs.current[index] = el}
                  className="counter"
                >
                  0
                </span>
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</p>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;