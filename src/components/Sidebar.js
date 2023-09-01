import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText, createTheme } from '@mui/material'
import {ReactComponent as HomeIcon} from '../assets/home.svg';
import {ReactComponent as ClientsIcon} from '../assets/clients.svg';
import {ReactComponent as PaymentsIcon} from '../assets/clients.svg';
import {ReactComponent as TransaccionesIcon} from '../assets/receipts.svg';
import './Sidebar.css';
import { ThemeProvider} from '@mui/system';

const sidebarProps = [
    {
        label: 'Home',
        icon: HomeIcon,
        link: '/'
    },
    {
        label: 'Clientes',
        icon: ClientsIcon,
        link: '/Clientes',
        sublist: [
            {
                label: 'Nuevo Cliente',
                link: '/Clientes/NuevoCliente'
            },
            {
                label: 'Lista de Clientes',
                link: '/Clientes/Lista'
            },
        ]
    },
    {
        label: 'Pagos',
        icon: PaymentsIcon,
        link: '/Pagos'
    },
    {
        label: 'Transacciones',
        icon: TransaccionesIcon,
        link: '/Transacciones'
    },
]



const sideBarTheme = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#0f141e"
                }
            },
            variants: [
                {
                    props: {
                        variant: "permanent",
                        anchor: "left",
                    },
                }
            ]
        },
        MuiListItemText: {
            defaultProps: {
                primaryTypographyProps: {
                    fontFamily: 'Poppins-ExtraLight',
                    fontWeight: '600',
                    fontSize: '13px',
                    padding: '0px',
                    color: '#c9ccd8'
                }
            },
        },
        MuiListItemButton: {
            defaultProps: {
                style: {
                    display: 'flex,',
                    alignProperty: 'center',
                    paddingBottom: '10px',
                    width: '100%'
                } 
            },
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'grey'
                    }
                }
            }
        },
        MuiListItemIcon: {
            defaultProps: {
                sx: {
                    minWidth: '0px',
                    minHeight: '0px'
                }
            }
        }
    },
})

function SidebarV2() {
    return (
            <Box >
                <ThemeProvider theme={sideBarTheme}>
                <Drawer className="sidebar" variant="permanent">
                    <List>
                        {sidebarProps.map((data, index) => (
                            <React.Fragment key={index}>
                                <ListItemButton component={Link} to={data.link}>
                                        <ListItemIcon> <data.icon className="icon"/> </ListItemIcon>
                                        <ListItemText primary={data.label}/>
                                </ListItemButton>

                            {data.sublist && (
                                <Collapse in={true}>
                                    <List disablePadding>
                                        {data.sublist.map((subListItems) => (
                                            <ListItemButton sx={{paddingLeft: 8}} component={Link} to={subListItems.link}>
                                                        <ListItemText primary={subListItems.label}/>
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                            </React.Fragment>
                        ))}
                    </List>
                </Drawer>
                </ThemeProvider>
            </Box>
    )
}
export default SidebarV2