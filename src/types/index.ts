export type createUserFormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export type loginFormData = Pick<createUserFormData, "email" | "password">;

export type User = {
    id: string;
    name: string;
    email: string;
}