import React from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import {ReactComponent as SearchIcon} from "../../assets/search.svg"

function SearchInput({ onChange}) {
  return (
    <Paper variant="outlined" style={{ display: 'flex', alignItems: 'center', padding: '2px', borderColor: "lightgray"}}>
        <SearchIcon type="submit" style={{ padding: '5px' }}/>
        <InputBase
            placeholder="Busca . . ."
            style={{ marginLeft: '8px', flex: 1}}
            onChange={onChange}
        />
    </Paper>
  );
}

export default SearchInput;
