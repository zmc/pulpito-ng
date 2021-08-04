import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const useStyles = makeStyles((theme) => ({
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
  drawerPaper: {
    width: "150px",
  },
  drawerLink: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    padding: "10px 20px",
    fontSize: "16px",
  },
}));

export default function Drawer(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <SwipeableDrawer
      open={props.drawerOpen}
      onOpen={() => {
        props.setDrawerOpen(true);
      }}
      onClose={() => {
        props.setDrawerOpen(false);
      }}
      style={{
        height: "100%",
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbarIcon}>
        <IconButton
          onClick={() => {
            props.setDrawerOpen(false);
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <RouterLink to="/queue" className={classes.drawerLink}>
        Queue
      </RouterLink>
      <RouterLink to="/runs" className={classes.drawerLink}>
        Runs
      </RouterLink>
    </SwipeableDrawer>
  );
}
