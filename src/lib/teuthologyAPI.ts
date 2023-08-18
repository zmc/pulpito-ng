import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

const TEUTHOLOGY_API_SERVER = 
    import.meta.env.VITE_TEUTHOLOGY_API || "";

function useLogin() {
    const url =  new URL("/login/", TEUTHOLOGY_API_SERVER).href;
    window.location.href = url;
}

function useLogout() {
    const url =  new URL("/logout/", TEUTHOLOGY_API_SERVER).href;
    window.location.href = url;
}

function useSession(): UseQueryResult {
    const url =  new URL("/", TEUTHOLOGY_API_SERVER).href;
    const query = useQuery({
        queryKey: ['ping-api', { url }],
        queryFn: () => (
            axios.get(url, {
                withCredentials: true
            }).then((resp) => resp.data)
        ),
    });
    return query;
}

export {
    useLogin,
    useLogout,
    useSession,
}