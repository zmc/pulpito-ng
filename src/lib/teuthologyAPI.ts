import { useQuery } from "@tanstack/react-query";

const TEUTHOLOGY_API_SERVER = 
    import.meta.env.VITE_TEUTHOLOGY_API || "";

function githubLogin() {
    window.location.replace(`${TEUTHOLOGY_API_SERVER}/login`);
}

export {
    githubLogin,
}