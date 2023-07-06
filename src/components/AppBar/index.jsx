import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbarIcon: {
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
}));

export default function AppBar(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <MuiAppBar position="static" className={classes.appBar}>
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
        <IconButton onClick={props.toggleDarkMode} size="large">
          {props.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}
