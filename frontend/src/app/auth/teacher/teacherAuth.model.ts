export interface User {
  id: string;
  email: string;
  name: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}
