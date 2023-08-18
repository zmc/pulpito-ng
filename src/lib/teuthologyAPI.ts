
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

export {
    useLogin,
    useLogout,
}