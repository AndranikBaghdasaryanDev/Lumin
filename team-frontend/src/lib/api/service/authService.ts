
export const authService = {
    login: async (email: string, password: string) => {

        //Mock Api call for delegation 
        return {
            user: { id: 1, name: "John Doe", email: email, password: password },
            accessToken: "dummyAccessToken",
            refreshToken: "dummyRefreshToken"
        }
    },
    register: async (userData: any) => {
        return {
            user: { id: 2, ...userData },
            accessToken: "dummyAccessToken",
            refreshToken: "dummyRefreshToken",
        };
    }

}