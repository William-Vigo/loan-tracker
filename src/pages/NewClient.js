import { Box, Grid, TextField,  Autocomplete, Button  } from "@mui/material";

const fields = [
    {
        label: "Nombre completeo",
        placeHolder: "Ever Vigo"
    },
    {
        label: "Documento",
        isDropDown: true,
        options: [
            {
                label: "DNI",
                value: "dni",
            },
            {
                label: "Passaporte",
                value: "passport",
            },
            {
                label: "Licencia",
                value: "license",
            },
        ]
    },
    {
        label: "Numero de documento",
        placeHolder: "123456789"
    },
    {
        label: "Direccion",
        placeHolder: "1 main st Orange PA, 07928"
    },
    {
        label: "Correo",
        placeHolder: "john@gmail.com"
    },
    {
        label: "Numero de telefono",
        placeHolder: "976 555 123"
    },
]

export function NewClientV2() {
    return (
        <Box display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        >
        <form>
            <Grid 
            container 
            direction="column"
            border={"1px solid #ccc"}
            borderRadius="10px"
            boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"}
            padding={"20px"}
            gap={2}
            >
                {fields.map((field, index) => (
                    <Grid width={"300px"} item key={index}>
                        {field.isDropDown ? (
                           <Autocomplete 
                            disablePortal
                            options={field.options}
                            renderInput={(params) => <TextField variant="standard" placeholder="documento" {...params} label={field.label}/>}
                           />
                        ) : (
                            <TextField placeholder={field.placeHolder} fullWidth variant="standard" label={field.label} InputLabelProps={{
                                style: {
                                    fontSize: "13px", 
                                    fontFamily: 'Poppins-ExtraLight',
                                    fontWeight: "1000",
                                }
                            }} inputProps={{
                                style: {
                                    fontSize: "15px", 
                                    fontFamily: 'Poppins-ExtraLight',
                                    fontWeight: "900",
                                }}}/>
                        )}
                    </Grid>
                ))}
                <Grid container direction="row" justifyContent="center" gap={2}>
                    <Grid item>
                        <Button  variant="outlined" color="error">Cancelar</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="success">Guardar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
        </Box>
    )
}