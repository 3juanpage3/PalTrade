import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://paltrade.vercel.app";

// OAuth flow
export const initiateOAuth = () => {
  const clientId = "paltrade-overlay";
  const redirectUri = `${API_BASE_URL}/api/overlay/auth/callback`;
  const scope = "openid profile email";

  const oauthUrl = `${API_BASE_URL}/api/overlay/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  window.open(oauthUrl, "PalTrade Login", "width=500,height=600");
};

// Auth token management
export const getAuthToken = (): string | null => {
  return localStorage.getItem("paltrade_token");
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("paltrade_token", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("paltrade_token");
};

// API client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth header to requests
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Listings API
export const listingsApi = {
  getListings: (filters?: any) =>
    apiClient.get("/api/listings", { params: filters }),

  createListing: (data: any) => apiClient.post("/api/listings", data),

  createOffer: (listingId: string, offerData: any) =>
    apiClient.post(`/api/offers`, { listingId, ...offerData }),
};

// Notifications API
export const notificationsApi = {
  getNotifications: () => apiClient.get("/api/notifications"),

  markAsRead: (notificationId: string) =>
    apiClient.patch(`/api/notifications/${notificationId}`, { read: true }),
};

// Overlay-specific endpoints
export const overlayApi = {
  authenticateOverlay: (code: string) =>
    apiClient.post("/api/overlay/auth", { code }),

  getOverlayListings: () => apiClient.get("/api/overlay/listings"),

  quickListPal: (palData: any) =>
    apiClient.post("/api/overlay/quick-list", palData),
};

export default apiClient;
