
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



export interface User {
  id: string;
  username: string;
  wilaya: string;
  commune: string;
  name: string;
}
