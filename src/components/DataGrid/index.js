import { DataGrid as MuiDataGrid } from "@material-ui/data-grid";

export default function DataGrid(props) {
  return (
    <div style={{ height: 800, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <MuiDataGrid {...props} density="compact" />
        </div>
      </div>
    </div>
  );
}
