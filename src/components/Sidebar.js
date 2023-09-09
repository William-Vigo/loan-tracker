import React from 'react';
import { Link } from 'react-router-dom';
import {  Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText, createTheme } from '@mui/material'
import {ReactComponent as HomeIcon} from '../assets/home.svg';
import {ReactComponent as ClientsIcon} from '../assets/clients.svg';
import {ReactComponent as PaymentsIcon} from '../assets/clients.svg';
import {ReactComponent as TransaccionesIcon} from '../assets/receipts.svg';
import './Sidebar.css';
import { ThemeProvider} from '@mui/system';

export const sideBarWidth = 180

const sideBarTheme = createTheme({
    components: {
        MuiPaper: {
            defaultProps: {
                style: {
                    backgroundColor: "#0f141e",
                    width: `${sideBarWidth}px`,
                }
            }
        },
        MuiDrawer: {
            defaultProps: {
                style: {
                    width: `${sideBarWidth}px`,
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
    const [open, setOpen] = React.useState(true);

    const HandleClick = () => {
        setOpen(!open);
    }
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
        ],
        onClickFunc: () => HandleClick()
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
    return (
            <ThemeProvider theme={sideBarTheme}>
                <Drawer  variant="permanent" >
                    <List>
                        {sidebarProps.map((data, index) => (
                            <React.Fragment key={index}>
                                <ListItemButton component={Link} to={data.link} onClick={data.sublist ? HandleClick: undefined}>
                                        <ListItemIcon> <data.icon className="icon"/> </ListItemIcon>
                                        <ListItemText primary={data.label}/>
                                </ListItemButton>

                            {data.sublist && (
                                <Collapse in={open}>
                                    <List disablePadding>
                                        {data.sublist.map((subListItems, subListIndex) => (
                                            <ListItemButton key={subListIndex}sx={{paddingLeft: 6}} component={Link} to={subListItems.link}>
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
    )
}
export default SidebarV2