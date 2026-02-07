export interface UserRegister {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    major: string;
  };
  accessToken: string;
  refreshToken: string;
}
