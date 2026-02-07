export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage: string;
  phone: string;
  dateOfBirth: string;
  studentProfile: StudentProfile | null;
  instructorProfile: string
}

export interface StudentProfile {
  id: string;
  userId: string;
  age: number;
  major: string;
}
