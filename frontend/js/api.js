/**
 * api.js — Indian Space Explorer
 * Handles all fetch calls to the backend REST API
 */

const API_BASE = '/api';

const getToken = () => localStorage.getItem('token');

const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  }
};

const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authorizedFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = options.headers || {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'same-origin',
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const message = errorBody?.message || res.statusText || 'API request failed';
    throw new Error(`API error ${res.status}: ${message}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'Unknown API error');
  }
  return json.data;
};

const fetchData = async (endpoint) => {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${res.statusText} ${text}`);
  }
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'Unknown API error');
  }
  return json.data;
};

/**
 * Fetch all ISRO missions.
 * @returns {Promise<Array>}
 */
const getMissions = () => fetchData('/missions');

/**
 * Fetch all space photos.
 * @returns {Promise<Array>}
 */
const getPhotos = () => fetchData('/photos');

/**
 * Fetch all mission videos.
 * @returns {Promise<Array>}
 */
const getVideos = () => fetchData('/videos');

/**
 * Fetch ISRO statistics.
 * @returns {Promise<Object>}
 */
const getStats = () => fetchData('/stats');

/**
 * Submit contact form data.
 * @param {{ name: string, email: string, subject: string, message: string }} formData
 * @returns {Promise<{ success: boolean, message: string }>}
 */
const submitContact = async (formData) => {
  const res = await authorizedFetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return res;
};

const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || `Login failed: ${res.statusText}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'Login failed');
  }

  setToken(json.token);
  localStorage.setItem('user', JSON.stringify(json.user));
  return json;
};

const register = async (payload) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || `Registration failed: ${res.statusText}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error(json.message || 'Registration failed');
  }

  setToken(json.token);
  localStorage.setItem('user', JSON.stringify(json.user));
  return json;
};

const isLoggedIn = () => Boolean(getToken());

const logout = () => {
  removeToken();
};

// Expose globally for use in main.js (plain JS modules)
window.SpaceAPI = {
  getMissions,
  getPhotos,
  getVideos,
  getStats,
  submitContact,
  login,
  register,
  authorizedFetch,
  getToken,
  isLoggedIn,
  logout,
};
