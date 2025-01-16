
export interface LoginCredentials {
  username: string;
  password: string;
}




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






export interface LoginCredentials {
  username: string;
  password: string;
}

export interface DecodedToken {
  user: {
    id: string;
    username: string;
    wilaya: string;
    commune: string;
    name: string;
  };
  iat: number;
  exp: number;

}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
  refreshToken: string;

}

export interface Worker {
  id: number;
  fullname: string;
  organization_id: number;
  department: string;
  total_likes: number;
  total_dislikes: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  organization: {
    id: number;
    username: string;
    password: string;
    wilaya: string;
    commune: string;
    name: string;
    created_at: string;
    updated_at: string;
    isactive: boolean;
  };
}

export interface WorkerDistributionByDepartment {
  _count: number;
  department: string;
}

export interface WorkerByActiveStatus {
  _count: number;
  active: boolean;
}

export interface Stats {
  success: boolean;
  data: {
    workerDistributionByDepartment: WorkerDistributionByDepartment[];
    workerByActiveStatus: WorkerByActiveStatus[];
    totalWorkers: number;
    activeWorkers: number;
    inactiveWorkers: number;
    totalFeedback: number;
    engagementRate: number;
    topPerformingWorker: Worker | null;  // Top performing worker details
    mostDislikedWorker: Worker | null;   // Most disliked worker details
    feedbackThisMonth: number;
    newWorkersThisMonth: number;
  engagementHistory: {
    _count: number;
    created_at: string;
    is_liked: boolean;
  }[];
  };
}



export interface User {
  id: string;
  username: string;
  wilaya: string;
  commune: string;
  name: string;
}
