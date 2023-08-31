import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Collapse, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import {ReactComponent as HomeIcon} from '../assets/home.svg';
import {ReactComponent as ClientsIcon} from '../assets/clients.svg';
import {ReactComponent as PaymentsIcon} from '../assets/clients.svg';
import {ReactComponent as TransaccionesIcon} from '../assets/receipts.svg';
import './Sidebar.css';import { color, margin } from '@mui/system';
;

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

const linkStyles = {
    fontFamily: 'Poppins-ExtraLight',
    fontWeight: '600',
    fontSize: '13px',
    padding: '0px',
    color: '#c9ccd8'
}
const sublistStyle = ({
    pl: '30px',
})



function SidebarV2() {
    return (
            <Box >
                <Drawer className="sidebar" variant="permanent" anchor='left' PaperProps={{
                    sx: {
                        backgroundColor: "#0f141e"
                    }
                }}>
                    <List>
                        {sidebarProps.map((data, index) => (
                            <React.Fragment key={index}>
                            <ListItem key={data.label}>
                                <ListItemButton className="list-item-button" component={Link} to={data.link}>
                                        <ListItemIcon sx={{minWidth: 0}}> <data.icon className="icon"/> </ListItemIcon>
                                        <ListItemText primary={data.label}  primaryTypographyProps={linkStyles}/>
                                </ListItemButton>
                            </ListItem>

                            {data.sublist && (
                                <Collapse in={true}>
                                    <List disablePadding sx={sublistStyle}>
                                        {data.sublist.map((subListItems) => (
                                        <ListItem key={subListItems.label}>
                                            <ListItemButton className="list-item-button" component={Link} to={subListItems.link}>
                                                        <ListItemText primary={subListItems.label} primaryTypographyProps={linkStyles} />
                                            </ListItemButton>
                                        </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                            </React.Fragment>
                        ))}
                    </List>
                </Drawer>
            </Box>
    )
}
export default SidebarV2