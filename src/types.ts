export interface University {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  ranking: number;
  website: string;
  programs: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  course: string;
  image: string;
  content: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredUniversity?: string;
  preferredCourse?: string;
}

export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  consultationType: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  nationality?: string;
  created_at: string;
}

export interface Application {
  id: string;
  userId: string;
  universityId: string;
  programName: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  submissionDate: string;
  documents: Document[];
  notes: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}


export interface Review {
  id: string;
  userId: string;
  consultationId: string;
  rating: number;
  content: string;
  images: {
    url: string;
    caption: string;
  }[];
  verifiedPurchase: boolean;
  helpfulVotes: number;
  notHelpfulVotes: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalReviews: number;
  averageRating: number;
  reviewsByRating: {
    [key: number]: number;
  };
  recentReviews: Review[];
  monthlyReviews: {
    month: string;
    count: number;
    averageRating: number;
  }[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface ReviewFormData {
  consultationId: string;
  rating: number;
  content: string;
  images?: FileList;
}

export interface ReviewFilters {
  rating?: number;
  sort?: 'newest' | 'helpful' | 'rating';
  page?: number;
  limit?: number;
}