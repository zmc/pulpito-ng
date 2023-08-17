
const TEUTHOLOGY_API_SERVER = 
    import.meta.env.VITE_TEUTHOLOGY_API || "";

function login() {
    const url =  new URL("/login/", TEUTHOLOGY_API_SERVER).href;
    window.location.replace(url);
}

function logout() {
    const url =  new URL("/logout/", TEUTHOLOGY_API_SERVER).href;
    window.location.replace(url);
}

export {
    login,
    logout,
}