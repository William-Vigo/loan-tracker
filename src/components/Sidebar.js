import React from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import App from '../App';
import Test from './test';


function Sidebar() {
    return (
        <>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
                <ul>
                    <li><Link to="/Clientes">Clientes</Link></li>
                </ul>
                <ul>
                    <li><Link to="/Pagos">Pagos</Link></li>
                </ul>
                <ul>
                    <li><Link to="/Transacciones">Transacciones</Link></li>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Clientes" element={<App />} />
                <Route path="/Pagos" element={<App />} />
                <Route path="/Transacciones" element={<App />} />
            </Routes>
        </>
    );
}
export default Sidebar