import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star, Upload, X, Loader } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { ReviewFormData } from '../../types';
import { supabase } from '../../lib/supabase';

interface ReviewFormProps {
  consultationId: string;
  onSuccess: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ consultationId, onSuccess }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<ReviewFormData>();
  const rating = watch('rating', 0);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 5)); // Limit to 5 images
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  
  const onSubmit = async (data: ReviewFormData) => {
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('consultationId', consultationId);
      formData.append('rating', data.rating.toString());
      formData.append('content', data.content);

      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      await axios.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      toast.success('Review submitted successfully!');
      onSuccess();

      // Reset form
      setValue('rating', 0);
      setValue('content', '');
      setSelectedImages([]);
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('rating', value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(null)}
              className="focus:outline-none"
            >
              <Star
                size={24}
                className={`${(hoveredRating !== null ? value <= hoveredRating : value <= rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
                  }`}
              />
            </button>
          ))}
        </div>
        <input
          type="number"
          {...register('rating', { required: 'Please select a rating' })}
          className="hidden"
        />
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          {...register('content', {
            required: 'Please write a review',
            minLength: { value: 50, message: 'Review must be at least 50 characters' },
            maxLength: { value: 1000, message: 'Review cannot exceed 1000 characters' }
          })}
          rows={4}
          className={`block w-full rounded-md border shadow-sm focus:border-primary-500 focus:ring-primary-500 ${errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="Share your experience..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Photos (optional)
        </label>
        <div className="mt-2 flex flex-wrap gap-4">
          {selectedImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {selectedImages.length < 5 && (
            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <Upload size={24} className="text-gray-400" />
            </label>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Upload up to 5 images (PNG, JPG, JPEG)
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="w-full btn btn-primary flex items-center justify-center"
      >
        {(isSubmitting || uploading) ? (
          <>
            <Loader size={20} className="animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </button>
    </form>
  );
};

export default ReviewForm;