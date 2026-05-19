// API Configuration
const API_BASE_URL = "http://localhost:8080/api/v1";

// Response types
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  email: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

interface RegisterResponse {
  email: string;
  fullName: string;
}

// Error handling
export class ApiError extends Error {
  public statusCode: number;
  public data?: any;

  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

// Auth API calls
export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: ApiResponse<LoginResponse> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.statusCode || response.status,
          data.message || "Login failed",
          data.data
        );
      }

      // Store tokens in localStorage
      if (data.data) {
        localStorage.setItem("accessToken", data.data.token);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("userEmail", data.data.email);
      }

      return data.data || ({} as LoginResponse);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error or server unavailable", error);
    }
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data: ApiResponse<RegisterResponse> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.statusCode || response.status,
          data.message || "Registration failed",
          data.data
        );
      }

      return data.data || ({} as RegisterResponse);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error or server unavailable", error);
    }
  },

  logout: async (hashRefreshToken: string): Promise<void> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/logout?hashRefreshToken=${encodeURIComponent(
          hashRefreshToken
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data: ApiResponse<void> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.statusCode || response.status,
          data.message || "Logout failed",
          data.data
        );
      }

      // Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userEmail");
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error or server unavailable", error);
    }
  },

  verifyToken: async (accessToken: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/verify-token?accessToken=${encodeURIComponent(
          accessToken
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: ApiResponse<boolean> = await response.json();

      if (!response.ok) {
        return false;
      }

      return data.data || false;
    } catch (error) {
      return false;
    }
  },

  refreshToken: async (hashRefreshToken: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/refresh?hashRefreshToken=${encodeURIComponent(
          hashRefreshToken
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data: ApiResponse<LoginResponse> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.statusCode || response.status,
          data.message || "Token refresh failed",
          data.data
        );
      }

      // Update tokens in localStorage
      if (data.data) {
        localStorage.setItem("accessToken", data.data.token);
        localStorage.setItem("refreshToken", data.data.refreshToken);
      }

      return data.data || ({} as LoginResponse);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error or server unavailable", error);
    }
  },

  getGoogleOAuthUrl: async (): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/oauth/google-url`);
      const data: ApiResponse<string> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.statusCode || response.status,
          data.message || "Failed to get Google OAuth URL",
          data.data
        );
      }

      return data.data || "";
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error or server unavailable", error);
    }
  },

  getFacebookOAuthUrl: async (): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/oauth/facebook-url`);
      const data: ApiResponse<string> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.statusCode || response.status,
          data.message || "Failed to get Facebook OAuth URL",
          data.data
        );
      }

      return data.data || "";
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error or server unavailable", error);
    }
  },
};

// Utility functions for token management
export const tokenUtils = {
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  getUserEmail: (): string | null => {
    return localStorage.getItem("userEmail");
  },

  clearTokens: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },
};
