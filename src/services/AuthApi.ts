import { isAxiosError } from "axios";
import api from "../lib/axios";
import type { createUserFormData, loginFormData, User } from "../types";

export const createUser = async (formData: createUserFormData) => {
    try {
        const { data } = await api.post("/auth/create-user", formData);
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.message);
        }
    }
}

export const confirmUser = async (token: string) => {
    try {
        const { data } = await api.post("/auth/confirm-user", { token });
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.message);
        }
    }
}

export const login = async (formData: loginFormData) => {
    try {
        const { data } = await api.post("/auth/login", formData);
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.message);
        }
    }
}

export const getUser = async () => {
    try {
        const { data } = await api.get<User>("/auth/user");
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            throw new Error(error.response?.data.message || error.message);
        }
    }
}