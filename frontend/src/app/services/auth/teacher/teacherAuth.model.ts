export interface Teacher {
  id: string;
  email: string;
  name: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: Teacher;
}
