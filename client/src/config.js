// Central configuration for API and environment variables.
// Use 'import.meta.env.PROD' to determine the host.

export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://cellquiz-server.onrender.com' // Replace this with your URL once Render gives it to you.
  : 'http://localhost:5001'

export const API_ENDPOINTS = {
  SUBMIT_QUIZ: `${API_BASE_URL}/api/quiz/submit`,
  FETCH_LEADS: `${API_BASE_URL}/api/quiz/leads`,
}

export const LEADS_URL = API_ENDPOINTS.FETCH_LEADS 

export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || ''
export const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID || ''
