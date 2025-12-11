import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { LoginData, SignupData } from "@/dal/auth/auth.types";
import { env } from "process";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await axios.post(`${env.BACKEND_URL}/api/login`, data);
            return response.data;
        },
    });
};

export const useSignup = () => {
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: SignupData) => {
            const response = await axios.post("/api/signup", data);
            return response.data;
        },
    });
};