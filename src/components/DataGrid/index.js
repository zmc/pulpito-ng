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
    "& .statusCell-pass": {
      backgroundColor: theme.palette.success.light,
      color: "black",
    },
    "& .statusCell-fail": {
      backgroundColor: theme.palette.error.light,
      color: "black",
    },
    "& .statusCell-running": {
      backgroundColor: theme.palette.warning.light,
      color: "black",
    },
    "& .statusCell-waiting": {
      backgroundColor: theme.palette.info.light,
      color: "black",
    },
  },
}));

export default function DataGrid(props) {
  const classes = useStyles();
  return (
    <div style={{ height: 800, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <MuiDataGrid className={classes.root} density="compact" {...props} />
        </div>
      </div>
    </div>
  );
}
