export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  phone: string;
  dateOfBirth: string;
  studentProfile: StudentProfile | null;
}

export interface StudentProfile {
  jobTitle: string;
  learningGoal: string;
  learningInterests: string[];
  currentStreak: number;
  totalPoints: number;
}
