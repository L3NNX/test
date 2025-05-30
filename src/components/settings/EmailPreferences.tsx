import React, { useState } from 'react';
import { toast } from 'sonner';
import { Bell, Mail, Tag, Calendar, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface EmailPreference {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const preferences: EmailPreference[] = [
  {
    id: 'booking_updates',
    label: 'Booking Updates',
    description: 'Receive notifications about your consultation bookings',
    icon: <Calendar className="h-5 w-5 text-primary-600" />,
  },
  {
    id: 'promotions',
    label: 'Promotions',
    description: 'Stay updated with special offers and discounts',
    icon: <Tag className="h-5 w-5 text-primary-600" />,
  },
  {
    id: 'newsletters',
    label: 'Newsletters',
    description: 'Get the latest news about studying in Australia',
    icon: <Mail className="h-5 w-5 text-primary-600" />,
  },
  {
    id: 'review_responses',
    label: 'Review Responses',
    description: 'Get notified when someone responds to your reviews',
    icon: <Star className="h-5 w-5 text-primary-600" />,
  },
];

const EmailPreferences: React.FC = () => {
  const { user } = useAuth();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['booking_updates']);
  const [saving, setSaving] = useState(false);

  const handleTogglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev =>
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      // API call to save preferences would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Email preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update email preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Bell className="h-6 w-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold">Email Preferences</h2>
        </div>
        <p className="mt-2 text-gray-600">
          Choose which emails you'd like to receive. You can change these settings anytime.
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {preferences.map((preference) => (
            <div
              key={preference.id}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">{preference.icon}</div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={preference.id}
                    className="font-medium text-gray-900 cursor-pointer"
                  >
                    {preference.label}
                  </label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={selectedPreferences.includes(preference.id)}
                    onClick={() => handleTogglePreference(preference.id)}
                    className={`${
                      selectedPreferences.includes(preference.id)
                        ? 'bg-primary-600'
                        : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        selectedPreferences.includes(preference.id)
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                    />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">{preference.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSavePreferences}
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPreferences;