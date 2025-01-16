export interface WorkTime {
  day: string;
  from: string;
  to: string;
  _id: string;
}
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface DecodedToken {
  id: string;
  role: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
}
export interface User {
  id: string;
  username: string;
  email?: string;
  role: string;
  phone: string;
  wilaya: string;
  commune: string;
  workTime: WorkTime[];
  status: string;
  isAvailable: boolean;
  image: string;
  documents: string[];
}

export interface PaginatedResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface MotivationItem {
  id: string;
  name: string;
  productsRef: string[];
  incentive: number;
  status: string;
  startDate: string;
  endDate: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface AllproductIncentives {
  productRef: string;
  incentive: number;
}

export interface DateTimeFormatOptions {
  locale: string;
  showTime: boolean;
}

export interface DetailsModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  data: T;
  dateTimeFormatOptions: DateTimeFormatOptions; // Add this line
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  wilaya: string;
  commune: string;
  workTime: WorkTime[];
  status: string;
  isAvailable: boolean;
  image: string;
  documents?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkTime {
  day: string;
  from: string;
  to: string;
}

export interface UserData {
  username: string;
  password: string;
  email: string;
  phone: string;
  wilaya: string;
  commune: string;
  role: string;
  workTime: WorkTime[];
  image: string;
  termsAndConditions: boolean;
}

export type Order = {
  _id: string;
  userId: string;
  username: string;
  serviceType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  articles: Article[];
  clientName: string;
  clientPhoneNumber: string;
  clientWilaya: string; // Added clientWilaya
  clientCommune: string; // Added clientCommune
};

export type Article = {
  _id: string;
  serialNumber: string;
  image1: string;
  image2: string;
};

export interface Wilaya {
  id: string;
  code: string;
  name: string;
  ar_name: string;
  longitude: string;
  latitude: string;
}

export interface Commune {
  id: string;
  post_code: string;
  name: string;
  wilaya_id: string;
  ar_name: string;
  longitude: string;
  latitude: string;
}

export type Category = {
  id: number;
  name: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string;
  updatedBy: string;
};

export type SessionPayload = {
  id: string;
  email: string;
  role: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type LoginFormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

// ================================================================================================================================

interface CountByField {
  _id: string;
  count: number;
}

interface NearToExpireMotivation {
  _id: string;
  name: string;
}

export type StatsResponse = {
  usersByRoles: CountByField[];
  totalOrders: number;
  totalMotivations: number;
  usersByStatus: CountByField[];
  ordersByStatus: CountByField[];
  motivationsByStatus: CountByField[];
  ordersByDay: CountByField[]; // Note: _id here is a date string
  nearToExpireMotivations: NearToExpireMotivation[];
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface DecodedToken {
  userId: string;
  username: string;
  email: string;
  exp: number;
  role: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
}
