import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { darken, lighten } from "@mui/material/styles";

import { colorTint } from "../../lib/utils";

const PREFIX = "index";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("div")(({ theme }) => {
  const nodeStatusColors = {
    available: colorTint(theme.palette.success.main, 20),
    down: colorTint(theme.palette.error.main, 15),
    locked: colorTint(theme.palette.warning.main, 20),
  };
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
    [`& .${classes.root}`]: {
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
        "&.node-down": {
          backgroundColor: nodeStatusColors.down,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(nodeStatusColors.down),
          },
          "&:hover": {
            backgroundColor: getHoverColor(nodeStatusColors.down),
          },
        },
        "&.node-locked": {
          backgroundColor: nodeStatusColors.locked,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(nodeStatusColors.locked),
          },
          "&:hover": {
            backgroundColor: getHoverColor(nodeStatusColors.locked),
          },
        },
        "&.node-available": {
          backgroundColor: nodeStatusColors.available,
          color: "black",
          "&.Mui-selected": {
            backgroundColor: getSelectedColor(nodeStatusColors.available),
          },
          "&:hover": {
            backgroundColor: getHoverColor(nodeStatusColors.available),
          },
        },
        '.MuiDataGrid-booleanCell[data-value="true"]': {
          color: "black"
        },
        '.MuiDataGrid-booleanCell[data-value="false"]': {
          color: "black"
        },
      },
    },
  };
});

function getThemePaletteMode(palette) {
  return palette.mode;
}

export default function DataGrid(props) {
  return (
    <Root style={{ width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <MuiDataGrid
            autoHeight
            className={classes.root}
            density="compact"
            initialState={props.initialState}
            pageSizeOptions={[25, 50, 100]}
            paginationMode={props.paginationMode}
            paginationModel={{
              page: Number(props.page) || 0,
              pageSize: Number(props.pageSize) || 25,
            }}
            onPaginationModelChange={props.onPaginationModelChange}
            loading={props.loading}
            rows={props.rows}
            rowCount={props.rowCount || 9999}
            getRowId={props.getRowId}
            getRowClassName={props.getRowClassName}
            filterMode={props.filterMode}
            filterModel={props.filterModel}
            onFilterModelChange={props.onFilterModelChange}
            columns={props.columns}
            hideFooter={props.hideFooter}
          />
        </div>
      </div>
    </Root>
  );
}
