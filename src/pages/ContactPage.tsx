import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react';
import axios from 'axios';
import { Inquiry } from '../types';

const ContactPage: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<Inquiry>();

  const onSubmit = async (data: Inquiry) => {
    try {
      await axios.post('/api/inquiries', data);
      reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-primary-600 text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl">
            Have questions about studying in Australia? Our education consultants are here to help you navigate every step of your journey.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card p-6 text-center">
              <Phone size={32} className="mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">Mon-Fri 9am-6pm</p>
              <a href="tel:+61212345678" className="text-primary-600 font-medium">
                +61 2 1234 5678
              </a>
            </div>

            <div className="card p-6 text-center">
              <Mail size={32} className="mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">24/7 Support</p>
              <a href="info@oemseducation.com" className="text-primary-600 font-medium">
                info@aussieedu.com
              </a>
            </div>

            <div className="card p-6 text-center">
              <MapPin size={32} className="mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Our Office</p>
              <p className="text-primary-600 font-medium">
                123 Education Street, Sydney
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {isSubmitSuccessful && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                  Thank you for your inquiry! We'll get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your full name"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your email address"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your phone number"
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredUniversity" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred University (optional)
                    </label>
                    <input
                      type="text"
                      id="preferredUniversity"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="University of interest"
                      {...register('preferredUniversity')}
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredCourse" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Course (optional)
                    </label>
                    <input
                      type="text"
                      id="preferredCourse"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Course of interest"
                      {...register('preferredCourse')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Tell us how we can help you"
                    {...register('message', { required: 'Message is required' })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full md:w-auto flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Book a Consultation</h2>
              <p className="text-gray-600 mb-6">
                Schedule a personalized consultation with our education experts to discuss your study options in Australia. We offer in-person, virtual, and phone consultations.
              </p>

              <div className="card p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar size={24} className="mr-2 text-primary-600" />
                  Consultation Hours
                </h3>
                <ul className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
                    { day: 'Sunday', hours: 'Closed' }
                  ].map((schedule, index) => (
                    <li key={index} className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <a
                  href="#booking"
                  className="btn btn-primary inline-flex items-center"
                >
                  Book Now <Calendar size={18} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 h-96 w-full">
        <iframe
          title="Office Location"
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13251.144631369422!2d151.20149424678338!3d-33.86882176130803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDUyJzA3LjgiUyAxNTHCsDEyJzE3LjQiRQ!5e0!3m2!1sen!2sau!4v1603248171895!5m2!1sen!2sau"
          frameBorder="0"
          allowFullScreen={true}
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;