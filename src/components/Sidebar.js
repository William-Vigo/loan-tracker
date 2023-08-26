import React from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import App from '../App';
import homeIcon from '../assets/home.png';
import clientsIcon from '../assets/clients.png';
import paymentsIcon from '../assets/clients.png';
import transaccionesIcon from '../assets/receipts.png';
import './Sidebar.css';;

function Sidebar() {
    return (
        <div className="sidebar">
            <div>
                <ul>
                    <li><Link to="/"><img className="sidebar-icon" src={homeIcon}/>Home</Link></li>
                    <li><Link to="/Clientes"><img className="sidebar-icon" src={clientsIcon}/>Clientes</Link>
                        <ul id="sidebar-sublist">
                            <li><Link to="/Clientes/NeuvoCliente">Nuevo Cliente</Link></li>
                            <li><Link to="/Clientes/Lista">Lista de Clientes</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/Pagos"><img className="sidebar-icon" src={paymentsIcon}/>Pagos</Link></li>
                    <li><Link to="/Transacciones"><img className="sidebar-icon" src={transaccionesIcon}/>Transacciones</Link></li>
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