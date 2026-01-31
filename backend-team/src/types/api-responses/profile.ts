export interface userProfile {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    profileImage: string,
    phone: string,
    dateOfBirth: string,
    studentProfile: {
      jobTitle: string
      learningGoal: string,
      learningInterests: string[],
      currentStreak: number,
      totalPoints: number
    }
}