import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Plus, Minus } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What services do you provide for students?",
    answer: "We provide guidance on university selection, application assistance, visa processing, scholarship support, and pre-departure briefing.",
  },
  {
    question: "How do I apply for a student visa?",
    answer: "Our experts guide you through the entire visa application process, including document preparation and submission.",
  },
  {
    question: "Can you help with scholarship applications?",
    answer: "Yes, we assist in identifying scholarship opportunities and preparing strong applications.",
  },
  {
    question: "What universities do you partner with?",
    answer: "We have partnerships with top Australian universities, offering a wide range of courses and study options.",
  },
  {
    question: "Do you offer pre-departure assistance?",
    answer: "Absolutely, we conduct pre-departure sessions to help students prepare for life and studies in Australia.",
  },
  {
    question: "What is the cost of your services?",
    answer: "Our services are competitively priced, and we offer free initial consultations to assess your needs.",
  },
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // First item open by default
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const toggleItem = (index: number) => {
    if (activeIndex === index) {
      gsap.to(contentRefs.current[index]!, {
        height: 0,
        duration: 0.3,
        ease: "power2.inOut",
        opacity: 0,
        onComplete: () => setActiveIndex(null)
      });
    } else {
      if (activeIndex !== null) {
        gsap.to(contentRefs.current[activeIndex]!, {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
          opacity: 0,
          onComplete: () => {
            setActiveIndex(index);
            openItem(index);
          }
        });
      } else {
        setActiveIndex(index);
        openItem(index);
      }
    }
  };

  const openItem = (index: number) => {
    if (contentRefs.current[index]) {
      gsap.fromTo(
        contentRefs.current[index]!,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  };

  return (
    <section className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Everything you need to know about studying in Australia.
        </p>

        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="border-b border-gray-200 pb-4"
            >
              <button
                type="button"
                aria-expanded={activeIndex === idx}
                onClick={() => toggleItem(idx)}
                className="w-full text-left flex justify-between items-center py-2"
              >
                <span className="text-base font-medium text-gray-900">
                  {item.question}
                </span>
                <span className="ml-6 flex-shrink-0">
                  {activeIndex === idx ? (
                    <div className="rounded-full bg-purple-100 p-1">
                      <Minus size={16} className="text-primary-700" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-gray-200 p-1">
                      <Plus size={16} className="text-gray-600" />
                    </div>
                  )}
                </span>
              </button>
              <div
                ref={(el) => (contentRefs.current[idx] = el)}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="mt-2 text-gray-600 text-sm pr-6">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        {/* <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex -space-x-2">
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                alt="Support team"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                alt="Support team"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                alt="Support team"
              />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
          <p className="text-gray-500 mb-4 text-sm">
            Can't find the answer you're looking for? Chat with our friendly team.
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
          >
            Get in touch
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default FAQSection;
