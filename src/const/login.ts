import { jwtDecode } from "jwt-decode";
import { baseUrl } from "./const";
import Cookies from "js-cookie";
import { tokenManagerInstance } from "./TokenManagment";
import { LoginCredentials, LoginResponse, DecodedToken } from "@/types";




export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();

    const decoded = jwtDecode<DecodedToken>(data.accessToken);
    if (decoded.role === "admin") {
      tokenManagerInstance.setRefreshToken(data.refreshToken);
      tokenManagerInstance.setAccessToken(data.accessToken);

      window.location.href = "/dashboard";
    } else {
      throw new Error(
        "Installers are not allowed to login through this interface"
      );
    }

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
};

  export const logout = (): void => {

      tokenManagerInstance.clearTokens();
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  const token = Cookies.get("accessToken");
  return !!token;
};

export const getAccessToken = (): string | null => {
  return Cookies.get("accessToken") || null;
};

export const getRefreshToken = (): string | null => {
  return Cookies.get("refreshToken") || null;
};

export const getUserId = (): string | null => {
  return Cookies.get("userId") || null;
};
