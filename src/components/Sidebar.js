import React from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import App from '../App';
import {ReactComponent as HomeIcon} from '../assets/home.svg';
import {ReactComponent as ClientsIcon} from '../assets/clients.svg';
import {ReactComponent as PaymentsIcon} from '../assets/clients.svg';
import {ReactComponent as TransaccionesIcon} from '../assets/receipts.svg';
import './Sidebar.css';;

function Sidebar() {
    return (
        <div className="sidebar">
            <div>
                <ul>
                    <li className="group-title"><h5>Overview</h5></li>
                    <li className="sidebar-link"><Link to="/"><HomeIcon className="sidebar-icon"/><span>Home</span></Link></li>
                    <li className="sidebar-link"><Link to="/Clientes"><ClientsIcon className="sidebar-icon"/><span>Clientes</span></Link>
                        <ul id="sidebar-sublist">
                            <li className="sidebar-sublist-link"><Link to="/Clientes/NeuvoCliente"><span>Nuevo Cliente</span></Link></li>
                            <li className="sidebar-sublist-link"><Link to="/Clientes/Lista"><span>Lista de Clientes</span></Link></li>
                        </ul>
                    </li>
                    <li className="sidebar-link"><Link to="/Pagos"><PaymentsIcon className="sidebar-icon"/><span>Pagos</span></Link></li>
                    <li className="sidebar-link"><Link to="/Transacciones"><TransaccionesIcon className="sidebar-icon"/><span>Transacciones</span></Link></li>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Clientes" element={<App />} />
                <Route path="/Clientes/NeuvoCliente" element={<App />} />
                <Route path="/Clientes/Lista" element={<App />} />
                <Route path="/Pagos" element={<App />} />
                <Route path="/Transacciones" element={<App />} />
            </Routes>
        </div>
    );
}
export default Sidebar