import React from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import {ReactComponent as SearchIcon} from "../../assets/search.svg"

function SearchInput({ onChange}) {
  return (
    <Paper variant="outlined" style={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
      <IconButton type="submit" aria-label="search" style={{ padding: '10px' }}>
        <SearchIcon/>
      </IconButton>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        style={{ marginLeft: '8px', flex: 1 }}
        onChange={onChange}
      />
    </Paper>
  );
}

export default SearchInput;
