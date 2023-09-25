import { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useLogin, useLogout, useSession, useUserData } from "../../lib/teuthologyAPI";


export default function Login() {
  const sessionQuery = useSession();
  const userData = useUserData();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {sessionQuery.data?.session
        ? <div>
            <Avatar
              alt={userData.get("username") || ""} 
              src={userData.get("avatar_url") || ""}
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
              <MenuItem onClick={useLogout}>Logout</MenuItem>
            </Menu>
        </div>
        : <Button 
            variant="contained" 
            onClick={useLogin} 
            startIcon={<GitHubIcon fontSize="small" /> }
            disabled={sessionQuery.isError}
          >
            Login 
          </Button>
      }
    </div>
  );
}
