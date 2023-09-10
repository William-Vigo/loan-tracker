import { Box, Grid, TextField,  Autocomplete, Button, Typography, createTheme, ThemeProvider  } from "@mui/material";
import React from "react";
import { Controller, useForm} from "react-hook-form";
import {v4 as uuidv4} from "uuid"
import { documentTypes } from "../constants";

const fields = [
    {
        label: "Nombre completeo",
        placeHolder: "Ever Vigo",
        key: "fullName",
    },
    {
        label: "Documento",
        isDropDown: true,
        key: "documentType",
        options: [
            {
                label: documentTypes.DNI.displayValue,
                value: documentTypes.DNI.value,
            },
            {
                label: documentTypes.Passport.displayValue,
                value: documentTypes.Passport.value,
            },
            {
                label: documentTypes.License.displayValue,
                value: documentTypes.License.value,
            },
        ]
    },
    {
        label: "Numero de documento",
        placeHolder: "123456789",
        key: "documentID",
    },
    {
        label: "Direccion",
        placeHolder: "1 main st Orange PA, 07928",
        key: "address",
    },
    {
        label: "Correo",
        placeHolder: "john@gmail.com",
        key: "email",
    },
    {
        label: "Numero de telefono",
        placeHolder: "976 555 123",
        key: "cellNumber",
    },
]

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins-ExtraLight',
        fontWeightLight: 1000,
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                input: { //input props
                    fontSize: "15px", 
                    fontWeight: "1000"
                },
                option: { // options
                    fontSize: "13px", 
                    fontWeight: "1000"
                }
            }
        },
        MuiInput: {  // for InputProps
            defaultProps: {
                inputProps: {
                style: {
                    fontSize: "15px",
                    fontFamily: 'Poppins-ExtraLight',
                    fontWeight: "1000",
                }
                }
            }
        },
        MuiInputLabel: {  // for InputLabelProps
            defaultProps: {
                style: {
                fontSize: "13px",
                fontWeight: "1000",
                }
            }
        },
    }
})

export function NewClientV2() {
  const { control, register, handleSubmit, reset, formState: {errors}} = useForm();
  const [autoCompleteData, setAutoCompleteData] = React.useState({});

  const handleCancel = event => {
    reset();
    setAutoCompleteData({})
  }

  const onSubmit = data => {
    console.log(data); //TODO: remove
    const sql = "INSERT INTO Clients (_id, fullName, documentType, documentID, address, email, cellNumber) VALUES (?,?, ?, ?, ?, ?, ?)";
    window.electron.send('insert-new-client', {
      query: sql,
      values: [
        uuidv4(),
        data.fullName,
        data.documentType,
        data.documentID,
        data.address,
        data.email,
        data.cellNumber,
      ]
    });

    reset();
    setAutoCompleteData({})
  }
    return (
        <Box display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        >
        <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid 
            container 
            direction="column"
            border={"1px solid #ccc"}
            borderRadius="10px"
            boxShadow={"0 4px 6px rgba(0, 0, 0, 0.1)"}
            padding={"20px"}
            gap={2}
            >
                {fields.map((prop, index) => (
                    <Grid width={"300px"} item key={index}>
                        {prop.isDropDown ? (
                            <Controller
                            name={prop.key}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Autocomplete
                                    {...field}
                                    value={autoCompleteData[prop.key] || null}
                                    onChange={(_, data) => {
                                        field.onChange(data ? data.value : "")
                                        setAutoCompleteData(prevData => ({
                                            ...prevData,
                                            [prop.key]: data || null
                                        }))
                                    }}
                                    onBlur={field.onBlur}
                                    disablePortal
                                    options={prop.options}
                                    renderOption={(option, data) => (
                                        <Box component="li" {...option} key={option.key}>{data.label}</Box>
                                    )}
                                    renderInput={(params) => (
                                    <TextField {...params} variant="standard" placeholder="documento" label={prop.label} error={Boolean(errors[prop.key])}
                                    />)}
                                />
                            )}
                           />
                        ) : (
                            <Controller
                                name={prop.key}
                                control={control}
                                defaultValue=""
                                rules={{required: true}}
                                render={({field}) => (
                                    <TextField 
                                        {...field}
                                        error={Boolean(errors[prop.key])} 
                                        style={{
                                            borderColor: errors[prop.key] ? 'red' : 'default'
                                        }}
                                        placeholder={prop.placeHolder}
                                        fullWidth 
                                        variant="standard" 
                                        label={prop.label} 
                                    />
                                    )}
                            />
                        )}
                    </Grid>
                ))}
                <Grid container direction="row" justifyContent="center" gap={2}>
                    <Grid item>
                        <Button  type="button" onClick={handleCancel} variant="outlined" color="error">Cancelar</Button>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="outlined" color="success">Guardar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
        </ThemeProvider>
        </Box>
    )
}