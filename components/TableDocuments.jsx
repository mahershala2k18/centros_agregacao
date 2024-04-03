import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import _ from "lodash";
import Link from "next/link";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";

const columns = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "assoc_name",
    headerName: "Associação",
    width: 280,
    renderCell: ({ value }) => (
      <>
        <Tooltip
          title={value}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="bottom-start"
        >
          <Typography variant="body2">{value}</Typography>
        </Tooltip>
      </>
    ),
  },
  {
    field: "doc_type",
    headerName: "Tipo Documento",
    width: 280,
  },
  {
    field: "authority",
    headerName: "Autoridade Emissora",
    width: 300,
    renderCell: ({ value }) => (
      <>
        <Tooltip
          title={value}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="bottom-start"
        >
          <Typography variant="body2">{value}</Typography>
        </Tooltip>
      </>
    ),
  },
  {
    field: "date",
    headerName: "Date (M/D/Y)",
    type: "dateTime",
    width: 150,
    valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
  },
  {
    field: "doc_img",
    headerName: "Documento",
    renderCell: ({ value }) => (
      <Button variant="outlined" size="small">
        <Link href={value} target="_blank">
          {" "}
          Ver documento{" "}
        </Link>
      </Button>
    ),
    width: 150,
  },
  {
    field: "obs",
    headerName: "Observação",
    width: 300,
    renderCell: ({ value }) => (
      <>
        <Tooltip
          title={value}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="bottom-start"
        >
          <Typography variant="body2">{value}</Typography>
        </Tooltip>
      </>
    ),
  },
];

export default function DataGridDemo({ _documents, _activeItem }) {
  const rows = _documents
    .filter((element) => {
      return _.lowerCase(element.project) === _.lowerCase(_activeItem);
    })
    .map(
      (
        { project, tec_name, assoc_name, authority, doc_type, date, url2, obs },
        index
      ) => {
        return {
          id: index,
          assoc_name: assoc_name,
          doc_type: doc_type,
          authority: authority,
          date: date,
          doc_img: url2,
          obs: obs,
          creator: "mahershala2k18",
        };
      }
    );
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <>
        {" "}
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize={true}
          density="standard"
          rowsPerPageOptions={[25]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </>
    </Box>
  );
}

// .MuiDataGrid-toolbarContainer
