import axios from 'axios';

// Fallback to localhost if environment variable isn't configured yet
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const triageAPI = {
  // Post triage data to FastAPI backend
  submitTriage: async (patientData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/triage`, patientData);
      return response.data;
    } catch (error) {
      console.error("API error submitting patient context:", error);
      throw new Error(error.response?.data?.detail || "Connection to triage server failed.");
    }
  },

  // Fetch running patient queue for the dashboard
  getQueue: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patients`);
      return response.data;
    } catch (error) {
      console.error("API error fetching doctor queue:", error);
      throw new Error("Could not retrieve current ER queue.");
    }
  }
};