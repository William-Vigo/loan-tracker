import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import IconButton from '@mui/material/IconButton';
import {ReactComponent as DeleteIcon} from '../assets/delete.svg';
import { documentTypes } from "../constants";
import { Input } from "@mui/material";

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
    <>
    <Input placeholder="Busca ..." onChange={(e) => gridApi.setQuickFilter(e.target.value)}/>
    <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
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
    </>
  );
}

export default ListaDeClientes