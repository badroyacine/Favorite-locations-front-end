export interface User {
    name: string,
    email: string,
    id?: string,
    photo?: string,
    password?:string,
    passwordConfirm?:string
}