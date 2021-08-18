import { DataGrid as MuiDataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";

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
      backgroundColor: theme.palette.success.light,
      color: "black",
    },
    "& .status-fail": {
      backgroundColor: theme.palette.error.light,
      color: "black",
    },
    "& .status-running": {
      backgroundColor: theme.palette.warning.light,
      color: "black",
    },
    "& .status-waiting": {
      backgroundColor: theme.palette.info.light,
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
