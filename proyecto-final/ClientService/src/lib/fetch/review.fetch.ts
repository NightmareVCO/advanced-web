import { API_URL } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

const REVIEW_ENDPOINT = EndpointEnum.Reviews;
const REVIEW_URL = `${API_URL}${REVIEW_ENDPOINT}`;

const HEADERS = {
  'Content-Type': 'application/json',
};

export type Review = {
  title: string;
  bookId: string;
  userId: string;
  comment: string;
  rating: number;
  createdAt: string;
};

export type ReviewWithUser = {
  title: string;
  bookId: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
  };
  comment: string;
  rating: number;
  createdAt: string;
};

export type ReviewRating = {
  oneStar: number;
  twoStar: number;
  threeStar: number;
  fourStar: number;
  fiveStar: number;
  totalRatings: number;
  averageRating: number;
};

export type ReviewResult = {
  bookId: string;
  reviews: Review[];
  rating: ReviewRating;
};

export type ReviewResultWithUsers = {
  bookId: string;
  reviews: ReviewWithUser[];
  rating: ReviewRating;
};

export type GetReviewsProperties = {
  bookId: string;
};

export const getBookReviews = async ({
  bookId,
}: GetReviewsProperties): Promise<ReviewResult | null> => {
  try {
    const response = await fetch(`${REVIEW_URL}book/${bookId}`, {
      method: 'GET',
      headers: HEADERS,
      cache: 'no-cache',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
	  return null;
  }
}