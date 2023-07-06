import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { darken, lighten } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import { colorTint } from "../../lib/utils";

function getThemePaletteMode(palette) {
  return palette.mode;
}

const useStyles = makeStyles((theme) => {
  const statusColors = {
    pass: colorTint(theme.palette.success.main, 20),
    fail: colorTint(theme.palette.error.main, 15),
    running: colorTint(theme.palette.warning.main, 20),
    waiting: colorTint(theme.palette.info.main, 20),
    dead: colorTint(theme.palette.error.main, 10),
    // queued is neutral color
  };
  const getSelectedColor = (color) => {
    const newColor =
      getThemePaletteMode(theme.palette) === "dark"
        ? darken(color, 0.3)
        : lighten(color, 0.3);
    return newColor + " !important";
  };
  const getHoverColor = (color) => {
    const newColor =
      getThemePaletteMode(theme.palette) === "dark"
        ? lighten(color, 0.3)
        : darken(color, 0.3);
    return newColor + " !important";
  };
  return {
    root: {
      fontSize: 12,
      "& .MuiDataGrid-columnHeaderTitle": {
        overflow: "visible",
      },
      "& .MuiSvgIcon-root": {
        width: "0.75em",
        height: "0.75em",
      },
      "& .MuiDataGrid-row": {
        "&.Mui-selected": {
          borderColor: theme.palette.secondary.main,
          borderStyle: "solid",
          borderWidth: "1px",
        },
        "&.status-pass": {
          backgroundColor: statusColors.pass,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(statusColors.pass),
          },
          "&:hover": {
            backgroundColor: getHoverColor(statusColors.pass),
          },
        },
        "&.status-fail": {
          backgroundColor: statusColors.fail,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(statusColors.fail),
          },
          "&:hover": {
            backgroundColor: getHoverColor(statusColors.fail),
          },
        },
        "&.status-dead": {
          backgroundColor: statusColors.dead,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(statusColors.dead),
          },
          "&:hover": {
            backgroundColor: getHoverColor(statusColors.dead),
          },
        },
        "&.status-running": {
          backgroundColor: statusColors.running,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(statusColors.running),
          },
          "&:hover": {
            backgroundColor: getHoverColor(statusColors.running),
          },
        },
        "&.status-waiting": {
          backgroundColor: statusColors.waiting,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(statusColors.waiting),
          },
          "&:hover": {
            backgroundColor: getHoverColor(statusColors.waiting),
          },
        },
      },
    },
  };
});

export default function DataGrid(props) {
  const classes = useStyles();
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <MuiDataGrid
            autoHeight
            className={classes.root}
            density="compact"
            rowsPerPageOptions={[25, 50, 100]}
            {...props}
          />
        </div>
      </div>
    </div>
  );
}
