import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types";
import { encryption } from "@/const/encryption";
import { useAuth } from "../context/AuthContext";







class TokenManager {
  private static instance: TokenManager | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private userId: string | null = null;
  private userName: string | null = null;
  private userRole: string | null = null;
  private email: string | null = null;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }
  setAccessToken(accessToken: string): void {
    if (!accessToken) {
      console.error('Access token is required');
      return;
    }

    try {
      // Store the token in memory
      this.accessToken = accessToken;

      // Encrypt and store in cookie
      const encryptedAccessToken = encryption.encrypt(accessToken);
      if (!encryptedAccessToken) {
        throw new Error('Failed to encrypt access token');
      }

      // Verify decryption matches original token
      const decryptedToken = encryption.decrypt(encryptedAccessToken);
      if (decryptedToken !== accessToken) {
        throw new Error('Token encryption/decryption mismatch');
      }

      Cookies.set("accessToken", encryptedAccessToken, {
        expires: 7,
        secure: window.location.protocol === "https:",
        sameSite: "strict",
        path: "/",
      });

      // Decode and set user data from token
      const decoded = jwtDecode<DecodedToken>(accessToken);
      if (!decoded) {
        throw new Error('Failed to decode access token');
      }

      this.setUserId(decoded.id);
      this.setUserName(decoded.username); 
      this.setUserRole(decoded.role);
      this.setEmail(decoded.email);

    } catch (error) {
      console.error("Error processing access token:", error);
      // Clear any partially set data
      this.accessToken = null;
      Cookies.remove("accessToken");
      this.userId = null;
      this.userName = null; 
      this.userRole = null;
      this.email = null;
      Cookies.remove("userId");
      Cookies.remove("userName");
      Cookies.remove("userRole"); 
      Cookies.remove("email");
    }
  }

  ///////////////////// refreshToken
  
  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }

  setUserId(userId: string): void {
    this.userId = userId;
    Cookies.set("userId", userId, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }

  setUserName(userName: string): void {
    this.userName = userName;
    Cookies.set("userName", userName, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }

  setUserRole(userRole: string): void {
    this.userRole = userRole;
    Cookies.set("userRole", userRole, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }

  setEmail(email: string): void {
    this.email = email;
    Cookies.set("email", email, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }

  getAccessToken(): string | null {
    const encryptedAccessToken = Cookies.get("accessToken") || null;
    if (encryptedAccessToken) {
      const decryptedAccessToken = encryption.decrypt(encryptedAccessToken);
      return decryptedAccessToken;
    }
    return null;
  }

  getRefreshToken(): string | null {
    return this.refreshToken || Cookies.get("refreshToken") || null;
  }

  getUserId(): string | null {
    return this.userId || Cookies.get("userId") || null;
  }

  getUserName(): string | null {
    return this.userName || Cookies.get("userName") || null;
  }

  getUserRole(): string | null {
    return this.userRole || Cookies.get("userRole") || null;
  }

  getEmail(): string | null {
    return this.email || Cookies.get("email") || null;
  }

  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.userId = null;
    this.userName = null;
    this.userRole = null;
    this.email = null;

    Cookies.remove("refreshToken", {
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
    Cookies.remove("userId", {
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
    Cookies.remove("userName", {
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
    Cookies.remove("userRole", {
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
    Cookies.remove("email", {
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
    Cookies.remove("accessToken", {
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
    
    // console.log("Tokens cleared");
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      return true;
    }
    return false;
  }
}

// Create a singleton instance of TokenManager for centralized token management
export const tokenManagerInstance: TokenManager = TokenManager.getInstance();
