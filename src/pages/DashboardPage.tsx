import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  Settings,
  CreditCard,
  Heart,
  ChevronRight,
  Bell,
  RefreshCw,
  Loader,
  Star,
  PenSquare
} from 'lucide-react';
import { DashboardStats } from '../types';
import ReviewForm from '../components/reviews/ReviewForm';

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchDashboardData();
      toast.success('Dashboard data refreshed');
    } finally {
      setRefreshing(false);
    }
  };

  const handleReviewSubmit = () => {
    setShowReviewForm(false);
    fetchDashboardData(); // Refresh dashboard data after review submission
    toast.success('Review submitted successfully');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={24} className="animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={24} className="animate-spin text-primary-600 mr-2" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
        <button
          onClick={handleRefresh}
          className="ml-4 text-primary-600 hover:text-primary-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.email}</h1>
            <p className="text-gray-600">Here's what's happening with your applications</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn btn-primary flex items-center"
            >
              <PenSquare size={20} className="mr-2" />
              Write a Review
            </button>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <RefreshCw size={20} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Write a Review</h2>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <ReviewForm
                consultationId="demo-consultation-id" // Replace with actual consultation ID
                onSuccess={handleReviewSubmit}
              />
            </div>
          </div>
        )}

        {stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Total Reviews',
                  value: stats.totalReviews,
                  icon: <Bell className="text-primary-600\" size={24} />,
                },
                {
                  title: 'Average Rating',
                  value: stats.averageRating.toFixed(1),
                  icon: <Star className="text-yellow-400" size={24} />,
                },
                {
                  title: 'Recent Reviews',
                  value: stats.recentReviews.length,
                  icon: <Clock className="text-green-600\" size={24} />,
                },
                {
                  title: 'Monthly Reviews',
                  value: stats.monthlyReviews[stats.monthlyReviews.length - 1]?.count || 0,
                  icon: <Calendar className="text-blue-600" size={24} />,
                },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg">{stat.icon}</div>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <h3 className="text-gray-600">{stat.title}</h3>
                </div>
              ))}
            </div>

            {/* Recent Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Recent Reviews</h2>
                  </div>
                  <div className="p-6">
                    {stats.recentReviews.length > 0 ? (
                      <div className="space-y-4">
                        {stats.recentReviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-100 pb-4">
                            <div className="flex items-center mb-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={16}
                                    className={`${
                                      star <= review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{review.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">No reviews yet. Share your experience!</p>
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="btn btn-primary"
                        >
                          Write Your First Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Quick Actions</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          icon: <Calendar size={20} />,
                          title: 'Book Consultation',
                          link: '/contact',
                        },
                        {
                          icon: <Settings size={20} />,
                          title: 'Account Settings',
                          link: '/settings',
                        },
                        {
                          icon: <CreditCard size={20} />,
                          title: 'Payment History',
                          link: '/payments',
                        },
                      ].map((action, index) => (
                        <a
                          key={index}
                          href={action.link}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="p-2 bg-white rounded-lg shadow mr-3">
                              {action.icon}
                            </span>
                            <span className="font-medium">{action.title}</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;