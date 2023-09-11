import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import IconButton from '@mui/material/IconButton';
import {ReactComponent as DeleteIcon} from '../assets/delete.svg';
import { documentTypes } from "../constants";
import { Box, Input, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SearchInput from "../components/search/search";

function documentTypeGetDisplayValue(params) {
  const mapping = {
    [documentTypes.Passport.value]:documentTypes.Passport.displayValue,
    [documentTypes.DNI.value]: documentTypes.DNI.displayValue,
    [documentTypes.License.value]: documentTypes.License.displayValue,
  }
  return mapping[params.data.documentType]
}

function documentTypeSetDisplayValue(params) {
  const mapping = {
      [documentTypes.Passport.displayValue]: documentTypes.Passport.value,
      [documentTypes.DNI.displayValue]: documentTypes.DNI.value,
      [documentTypes.License.displayValue]: documentTypes.License.value,
    };
    params.data.documentType = mapping[params.newValue];
    return params.data.documentType
}

function onCellEditingStopped(params) {
  console.log(params)
  if (!params.valueChanged) {
    console.log("no change")
    return
  }
  if (params.colDef.field === "documentType") {
    // validate that the new document number doesn't exist in the db
  }
  
  // update any other value
}

function onDeleteRow(params) {
  console.log("deleted",params)
  // once deleted from the db, update the state of the rows
}

const containerStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px"
  };

function ListaDeClientes() {
  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [, setGridColumnApi] = useState(null);
  const [columnDefs] = useState([
      {
        field:"fullName",
        headerName: "Nombre",
        editable: true,
        sortable: true,
      },
      {
        field:"documentType",
        headerName: "Documento",
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [
            documentTypes.DNI.displayValue,
            documentTypes.Passport.displayValue,
            documentTypes.License.displayValue,
          ]
        },
        valueGetter: documentTypeGetDisplayValue, // shows how value should be displayed on the grid
        valueSetter: documentTypeSetDisplayValue, // takes value and parses it to appropriate format
        sortable: true,
      },
      {
        field:"documentID",
        headerName: "No. Documento",
        editable: true,
        sortable: true,
      },
      {
        field:"address",
        headerName: "Address",
        editable: true,
        sortable: true,
      },
      {
        field:"email",
        headerName: "Correo",
        editable: true,
        sortable: true,
      },
      {
        field:"cellNumber",
        headerName: "Telefono",
        editable: true,
        sortable: true,
      },
      {
        field: "actions",
        headerName: "actions",
        width: 100,
        cellRenderer: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <IconButton aria-label="delete" size="small">
              <DeleteIcon/>
            </IconButton>
            </div>
        )
      }
  ]);
    const onGridReady = (params) => {
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
  };
  useEffect(() => {
    const fetchData = async() => {
        const sql = "SELECT * FROM Clients";
        const result = await window.electron.invoke('get-all', {
            query: sql
        });
        setRowData(result)
    }
    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
    >
      <Grid2 container justifyContent={"center"} gap={4} >
        <Grid2 xs={11}>
          <div style={containerStyle}><p>hello</p></div>
        </Grid2>
        <Grid2 xs={11}>
          <div style={containerStyle}>
            <Grid2 container direction={"column"} gap={2}>
              <Grid2 xs={12}>
                <Grid2 container direction={"row"} justifyContent={"space-between"} alignItems={"flex-end"}>
                  <Grid2 xs={2}>
                    <Typography variant={"h4"}>Clientes</Typography>
                  </Grid2>
                  <Grid2 xs={2}>
                    <SearchInput onChange={(e) => gridApi.setQuickFilter(e.target.value)}/>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 xs={12}>
              <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                <AgGridReact
                onGridReady={onGridReady}
                rowData={rowData}
                columnDefs={columnDefs}
                onCellEditingStopped={onCellEditingStopped}
                editType={'fullRow'}
                rowSelection={'single'}
                animateRows={true}
                />
              </div>
              </Grid2>
            </Grid2>
            </div>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default ListaDeClientes