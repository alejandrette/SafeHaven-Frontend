import { useQuery } from "@tanstack/react-query"
import { getUser } from "../services/AuthApi"

export const useAuth = () => {
    const { data, isError, isLoading} = useQuery({
        queryKey: ["auth"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}