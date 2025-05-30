import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, Loader, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Review, ReviewFilters } from '../../types';

interface ReviewListProps {
  consultationId?: string;
  onReviewUpdate?: () => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ consultationId, onReviewUpdate }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ReviewFilters>({
    sort: 'newest',
    page: 1,
    limit: 10
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, [consultationId, filters]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (consultationId) params.append('consultationId', consultationId);
      if (filters.rating) params.append('rating', filters.rating.toString());
      if (filters.sort) params.append('sort', filters.sort);
      params.append('page', filters.page?.toString() || '1');
      params.append('limit', filters.limit?.toString() || '10');

      const response = await axios.get(`/api/reviews?${params.toString()}`);
      setReviews(response.data.reviews);
      setTotalPages(Math.ceil(response.data.total / (filters.limit || 10)));
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews. Please try again later.');
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (reviewId: string, type: 'helpful' | 'not-helpful') => {
    try {
      await axios.post(`/api/reviews/${reviewId}/vote`, { type });
      fetchReviews();
      toast.success('Vote recorded successfully');
    } catch (error) {
      console.error('Error voting on review:', error);
      toast.error('Failed to record vote');
    }
  };

  const handleReport = async (reviewId: string) => {
    try {
      await axios.post(`/api/reviews/${reviewId}/report`);
      toast.success('Review reported successfully');
    } catch (error) {
      console.error('Error reporting review:', error);
      toast.error('Failed to report review');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader size={24} className="animate-spin text-primary-600 mr-2" />
        <span>Loading reviews...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 text-red-600">
        <AlertCircle size={24} className="mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select
            value={filters.sort}
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value as ReviewFilters['sort'] }))}
            className="rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="newest">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating">Highest Rated</option>
          </select>

          <select
            value={filters.rating || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value ? Number(e.target.value) : undefined }))}
            className="rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={`${
                            star <= review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {review.verifiedPurchase && (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="font-medium">{review.userId}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{review.content}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex space-x-2 mb-4 overflow-x-auto">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.caption || `Review image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-4 text-sm">
                <button
                  onClick={() => handleVote(review.id, 'helpful')}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <ThumbsUp size={16} />
                  <span>{review.helpfulVotes}</span>
                </button>
                <button
                  onClick={() => handleVote(review.id, 'not-helpful')}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <ThumbsDown size={16} />
                  <span>{review.notHelpfulVotes}</span>
                </button>
                <button
                  onClick={() => handleReport(review.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                  <Flag size={16} />
                  <span>Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setFilters(prev => ({ ...prev, page }))}
              className={`px-4 py-2 rounded-md ${
                page === filters.page
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;