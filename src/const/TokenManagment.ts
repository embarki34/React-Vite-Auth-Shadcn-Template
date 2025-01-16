import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, User } from "@/types";
import { encryption } from "@/const/encryption";
import { useAuth } from "../context/AuthContext";







class TokenManager {
  private static instance: TokenManager | null = null;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private userId: string | null = null;
  private userName: string | null = null;
  private userOrganization: string | null = null;
  private userRole: string | null = null;
  private email: string | null = null;
  private userwilaya: string | null = null;
  private usercommune: string | null = null;
  private user: User | null = null;


  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }
  setToken(token: string): void {
    if (!token) {
      console.error('Access token is required');
      return;
    }

    try {
      // Store the token in memory
      this.token = token;

      // Encrypt and store in cookie
      const encryptedAccessToken = encryption.encrypt(token);
      if (!encryptedAccessToken) {
        throw new Error('Failed to encrypt access token');
      }

      // Verify decryption matches original token
      const decryptedToken = encryption.decrypt(encryptedAccessToken);
      if (decryptedToken !== token) {
        throw new Error('Token encryption/decryption mismatch');
      }

      Cookies.set("token", encryptedAccessToken, {
        expires: 7,
        secure: window.location.protocol === "https:",
        sameSite: "strict",
        path: "/",
      });

      // Decode and set user data from token
      const decoded = jwtDecode<DecodedToken>(token);
      if (!decoded) {
        throw new Error('Failed to decode access token');
      }

      // this.setUserId(decoded.user.id);
      this.setUserName(decoded.user.username); 
      this.setUserwilaya(decoded.user.wilaya);
      this.setUsercommune(decoded.user.commune);
      this.setUserOrganization(decoded.user.name);


    } catch (error) {
      console.error("Error processing access token:", error);
      // Clear any partially set data
      this.token = null;
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

  setUser(user: User): void {
    this.user = user;
    Cookies.set("user", JSON.stringify(user), {
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

  setUserwilaya(userwilaya: string): void {
    this.userwilaya = userwilaya;
    Cookies.set("userwilaya", userwilaya, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }

  setUsercommune(usercommune: string): void {
    this.usercommune = usercommune;
    Cookies.set("usercommune", usercommune, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }
  setUserOrganization(userOrganization: string): void {
    this.userOrganization = userOrganization;
    Cookies.set("userOrganization", userOrganization, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "strict",
      path: "/",
    });
  }

  getToken(): string | null {
    const encryptedAccessToken = Cookies.get("token") || null;
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
  getUser(): User | null {
    const userString = Cookies.get("user") || null;
    if (userString) {
      return JSON.parse(userString) as User;
    }
    return null;
  }

  clearTokens(): void {
    this.token = null;
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
    const accessToken = this.getToken();
    if (accessToken) {
      return true;
    }
    return false;
  }
}

// Create a singleton instance of TokenManager for centralized token management
export const tokenManagerInstance: TokenManager = TokenManager.getInstance();
