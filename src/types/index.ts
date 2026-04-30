export type UserType = 'admin' | 'user';

export interface User {
  userId: string;
  email: string;
  userType: UserType;
}

export interface LoginResponse {
  access_token: string;
}

export interface Registration {
  id: string;
  name: string;
  contact: string;
  projectDescription: string;
  githubUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
