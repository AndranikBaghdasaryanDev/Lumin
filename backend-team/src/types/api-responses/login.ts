type User = {
    id: string
    email: string
    firstName: string
    lastName: string
}

export interface Login {
    user: User
    accessToken: string
    refreshToken: string
}