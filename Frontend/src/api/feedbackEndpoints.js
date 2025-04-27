import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const feedback_endpoints = {
  GET_FEEDBACK: `${BASE_URL}/show`,
  CREATE_FEEDBACK: `${BASE_URL}/create`,
  UPDATE_FEEDBACK: `${BASE_URL}/update`,
  DELETE_FEEDBACK: `${BASE_URL}/delete`
};

// Axios requests for each endpoint

export const get_all_feedback = async () => {
  const response = await axios.get(feedback_endpoints.GET_FEEDBACK)
  return response.data
}