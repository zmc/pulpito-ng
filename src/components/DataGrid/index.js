import { DataGrid as MuiDataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";

import { colorTint } from "../../lib/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 12,
    "& .MuiDataGrid-columnHeaderTitle": {
      overflow: "visible",
    },
    "& .MuiSvgIcon-root": {
      width: "0.75em",
      height: "0.75em",
    },
    "& .status-pass": {
      backgroundColor: colorTint(theme.palette.success.main, 35),
      color: "black",
    },
    "& .status-fail": {
      backgroundColor: colorTint(theme.palette.error.main, 30),
      color: "black",
    },
    "& .status-running": {
      backgroundColor: colorTint(theme.palette.warning.main, 35),
      color: "black",
    },
    "& .status-waiting": {
      backgroundColor: colorTint(theme.palette.info.main, 35),
      color: "black",
    },
  },
}));

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
