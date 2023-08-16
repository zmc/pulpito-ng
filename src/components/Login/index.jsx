import { useCookies } from "react-cookie";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { githubLogin } from "../../lib/teuthologyAPI";


const GH_USER_COOKIE = "GH_USER";


export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies([GH_USER_COOKIE]);

  const getCookieData = () => {
    // ISO-8859-1 octal string -> char string
    const authcookies = (cookies[GH_USER_COOKIE].replace(/\\073/g, ';'));

    if (authcookies) {
      let cookie_dict = {};
      let cookies_ = authcookies.split(";");
      cookies_.map((cookie) => {
        let [key, value] = cookie.split("=");
        cookie_dict[key.trim()] = value.trim();
      })
      return cookie_dict;
    }
  }

  const getUsername = () => {
    const cookieData = getCookieData();
    return cookieData["username"] || "";
  }

  const login = () => {
    githubLogin();
  }

  return (
    <div>
      {cookies[GH_USER_COOKIE]
        ? <Typography variant="button" display="block" gutterBottom>
          Hey, {getUsername()} !
        </Typography>
        : <Button variant="outlined" onClick={login}>Login</Button>
      }
    </div>
  );
}
