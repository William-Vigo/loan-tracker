import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GridApi } from "ag-grid-community";

function ListaDeClientes() {
    const [rowData, setRowData] = useState();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [columnDefs] = useState([
        { field: "fullName", headerName: "Nombre" },
        { field: "documentType", headerName: "Documento"},
        { field: "documentID", headerName: "No. Documento"},
        { field: "address", headerName: "Address"},
        { field: "email", headerName: "Correo"},
        { field: "cellNumber", headerName: "Telefono"},
    ]);
     const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };
  useEffect(() => {
    const fetchData = async() => {
        const sql = "SELECT * FROM Clients";
        // setup listener
        const result = await window.electron.invoke('get-all-clients', {
            query: sql
        });
        setRowData(result)
    }
    fetchData();
  }, []);

  return (
    <>
    <input type="text"  placeholder="Busca..." onChange={(e) => gridApi.setQuickFilter(e.target.value)}></input>
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact onGridReady={onGridReady} rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
    </>
  );
}

export default ListaDeClientes