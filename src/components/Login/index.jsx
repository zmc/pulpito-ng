import { useState } from "react";
import { useCookies } from "react-cookie";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useLogin, useLogout } from "../../lib/teuthologyAPI";


const GH_USER_COOKIE = "GH_USER";


export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies([GH_USER_COOKIE]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const githubLogout = () => {
    removeCookie(GH_USER_COOKIE);
    useLogout();
  }

  return (
    <div>
      {cookies[GH_USER_COOKIE]
        ? <div>
            <Avatar 
              alt={getCookieData()["username"]} 
              src={getCookieData()["avatar_url"]} 
              onClick={handleClick} 
              aria-controls={open ? 'basic-menu' : undefined} 
              aria-expanded={open ? 'true' : undefined} 
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={githubLogout}>Logout</MenuItem>
            </Menu>
        </div>
        : <Button 
            variant="contained" 
            onClick={useLogin} 
            startIcon={<GitHubIcon fontSize="small" /> }
          >
            Login 
          </Button>
      }
    </div>
  );
}
