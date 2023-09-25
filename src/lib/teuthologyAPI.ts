import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import type { UseQueryResult } from "@tanstack/react-query";

const TEUTHOLOGY_API_SERVER = 
    import.meta.env.VITE_TEUTHOLOGY_API || "https://teuthology-api.com";
const GH_USER_COOKIE = "GH_USER";

function useLogin() {
    const url =  new URL("/login/", TEUTHOLOGY_API_SERVER).href;
    window.location.href = url;
}

function useLogout() {
    const cookies = new Cookies();
    cookies.remove(GH_USER_COOKIE);
    
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
        retry: 1,
    });
    return query;
}

function useUserData(): Map<string, string> {
    const cookies = new Cookies();
    const cookie = cookies.get(GH_USER_COOKIE);
    if (cookie) {
        const cookie_ = cookie.replace(/\\073/g, ';');
        let cookieMap: Map<string, string> = new Map();
        let cookieSegments = cookie_.split(";");
        cookieSegments.map((cookie: string) => {
            let [key, value] = cookie.split("=");
            cookieMap.set(key.trim(), value.trim());
        })
        return cookieMap;
    };
    return new Map();
}

export {
    useLogin,
    useLogout,
    useSession,
    useUserData
}