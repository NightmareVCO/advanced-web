import { API_URL } from '@lib/constants/api.constants';
import { EndpointEnum } from '@lib/constants/endpoints.constants';

const USER_ENDPOINT = EndpointEnum.Reviews;
const USER_URL = `${API_URL}${USER_ENDPOINT}`;

const HEADERS = {
  'Content-Type': 'application/json',
};

export type UserForComments = {
  id: string;
  firstName: string;
  lastName: string;
}

type UserForCommentsResult = {
  ids: string[];
}

export const getUsersForCommentsById = async ({
  ids,
}: UserForCommentsResult): Promise<UserForComments[] | null> => {
  try {
    const response = await fetch(`${USER_URL}for-comments/`, {
      method: 'POST',
      headers: HEADERS,
      cache: 'no-cache',
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}