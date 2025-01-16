import { jwtDecode } from "jwt-decode";
import { baseUrl } from "./const";
import Cookies from "js-cookie";
import { tokenManagerInstance } from "./TokenManagment";
import { LoginCredentials, LoginResponse, DecodedToken } from "@/types";




export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${baseUrl}/identity/login`, {
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
    console.log(data)

    // tokenManagerInstance.setUserName(data.user.username);
    // tokenManagerInstance.setUserwilaya(data.user.wilaya);
    // tokenManagerInstance.setUserId(data.user.id);
    // tokenManagerInstance.setUsercommune(data.user.commune);
    // tokenManagerInstance.setUserOrganization(data.user.name);
    tokenManagerInstance.setRefreshToken(data.refreshToken);
    tokenManagerInstance.setToken(data.token);
    tokenManagerInstance.setUser(data.user);

    window.location.href = "/dashboard";
    return data;

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
};

  export const logout = (): void => {

      tokenManagerInstance.clearTokens();
      Cookies.remove("token");
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  const token = Cookies.get("token");
  return !!token;
};

export const getAccessToken = (): string | null => {
  return Cookies.get("token") || null;
};

export const getRefreshToken = (): string | null => {
  return Cookies.get("refreshToken") || null;
};

export const getUserId = (): string | null => {
  return Cookies.get("userId") || null;
};
