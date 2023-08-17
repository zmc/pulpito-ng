
const TEUTHOLOGY_API_SERVER = 
    import.meta.env.VITE_TEUTHOLOGY_API || "";

function githubLogin() {
    const url =  new URL("/login/", TEUTHOLOGY_API_SERVER).href;
    window.location.replace(url);
}

export {
    githubLogin,
}