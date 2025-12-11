export interface User {
  id: string;
  email: string;
  name: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  // optional: token if you don't use HttpOnly cookie
  // token: string;
}
