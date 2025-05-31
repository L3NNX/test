import React, { useState, useEffect } from 'react';
import { Mail, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { Inquiry } from '../types';

const NotificationsPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inquiries');
      setInquiries(response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader size={24} className="animate-spin text-primary-600 mr-2" />
        <span>Loading inquiries...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center text-red-600">
        <AlertCircle size={24} className="mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container-custom py-8">
        <div className="flex items-center mb-6">
          <Mail size={24} className="text-primary-600 mr-3" />
          <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No inquiries found
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inquiry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inquiry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inquiry.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inquiry.preferredUniversity || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {inquiry.preferredCourse || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">
                          {inquiry.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;