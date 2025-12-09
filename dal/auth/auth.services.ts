import axios from "axios";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { LoginData, SignupData } from "@/dal/auth/auth.types";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await axios.post("/api/login", data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
          },
    });
};

export const useSignup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: SignupData) => {
            const response = await axios.post("/api/signup", data);
            return response.data;
        },
    });
    queryClient.invalidateQueries({ queryKey: ['todos'] })
};