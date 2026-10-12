export interface SuccessFulAuthentication{
     username:string,
     email:string,
     token:string,
     expiresAt:any
}


export interface LoginCredentials{
     email:string
     password:string
}

export interface RegisterCredentials{
     email: string,
    username: string,
    password: string,
}