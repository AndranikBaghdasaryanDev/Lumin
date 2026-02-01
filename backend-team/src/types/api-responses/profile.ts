export interface profile {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  profileImage: string;
  studentProfile: {
    jobTitle: string;
    learningGoal: string;
    learningInterests: string[];
  };
}
