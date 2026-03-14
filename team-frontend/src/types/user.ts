export interface UserProfile {
  phone?: string;
  dateOfBirth?: string;
  profileImage?: string;
  studentProfile?: {
    age?: number;
    major?: string;
  };
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profile?: UserProfile;
}