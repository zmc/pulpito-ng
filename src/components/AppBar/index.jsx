import { Link as RouterLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";

import { githubLogin } from "../../lib/teuthologyAPI"


const PREFIX = 'index';

const classes = {
  appBar: `${PREFIX}-appBar`,
  title: `${PREFIX}-title`,
  toolbarIcon: `${PREFIX}-toolbarIcon`,
  loginButton: `${PREFIX}-loginButton`,
};

const StyledMuiAppBar = styled(MuiAppBar)((
  {
    theme
  }
) => ({
  [`&.${classes.appBar}`]: {
    zIndex: theme.zIndex.drawer + 1,
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
  },

  [`& .${classes.toolbarIcon}`]: {
    ...theme.mixins.toolbar,
    position: "sticky",
    top: "0",
    zIndex: theme.zIndex.drawer + 1,
    background: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
  },

  [`& .${classes.loginButton}`]: {
    // TODO: add theme
    marginLeft: "12px",
  }

}));

export default function AppBar(props) {
  const theme = useTheme();
  const [cookies, setCookie, removeCookie] = useCookies(["pulpitosession"]);


  const getCookieData = () => {
     // ISO-8859-1 octal string -> char string
    const authcookies = (cookies["pulpitosession"].replace(/\\073/g, ';'))

    if (authcookies){
      let cookie_dict = {}
      let cookies_ = authcookies.split(";")
      cookies_.map((cookie) => {
        let [key, value] = cookie.split("=");
        cookie_dict[key.trim()] = value.trim();
      })
      return cookie_dict
    }
  }

  const getUsername = () => {
    const cookieData = getCookieData();
    return cookieData["username"];
  }

  const login = () => {
    githubLogin();
  }

  return (
    <StyledMuiAppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            props.setDrawerOpen(true);
          }}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          <RouterLink
            to="/"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              marginLeft: "12px",
            }}
          >
            Pulpito
          </RouterLink>
        </Typography>
        <div>
          { cookies["pulpitosession"]
              ? <Typography variant="button" display="block" gutterBottom>
                    Hey, {getUsername()} !
                </Typography> 
              : <Button variant="outlined" onClick={login} className={classes.loginButton}>Login</Button> 
          }
        </div>
        <IconButton onClick={props.toggleDarkMode} size="large">
          {props.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </StyledMuiAppBar>
  );
}
