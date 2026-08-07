const baseUrl = (import.meta.env.VITE_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

export const api = {
  signup: `${baseUrl}/api/user/signup`,
  login: `${baseUrl}/api/user/login`,
  home: `${baseUrl}/api/user/home`,
  logout: `${baseUrl}/api/user/logout`,
  deleteAccount: `${baseUrl}/api/user/delete`,
  aiCoach: `${baseUrl}/api/user/ai-coach`,
};
