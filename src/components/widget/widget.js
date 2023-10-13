import { Box,Paper, ThemeProvider, Typography, createTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const customTheme = createTheme({
    typography: {
        fontFamily: "Poppins-ExtraLight"
    }
})

function Widget({Icon, size}) {
    return (
        <ThemeProvider theme={customTheme}>
            <Grid2 xs={size}>
                <Grid2 container direction={"row"}>
                        <Grid2 xs={6}>
                            <Box
                            display="flex" 
                            alignItems="center" 
                            justifyContent="center" 
                            >
                                <Icon width="70px" height="70px"/>
                            </Box>
                        </Grid2>
                        <Grid2 xs={6}>
                            <Box>
                                <Typography textAlign="center" variant="subtitle2">Clientes totales</Typography>
                            </Box> 
                            <Box>
                                <Typography textAlign="center" variant="h4" fontWeight={"1000"}>100</Typography>
                            </Box> 
                        </Grid2>
                </Grid2> 
            </Grid2>
        </ThemeProvider>
    )
}

export default Widget