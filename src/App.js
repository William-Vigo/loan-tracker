import { Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Pagos from "./pages/Pagos";
import Transacciones from "./pages/Transacciones";
import "./App.css"
import SidebarV2 from './components/sidebar/Sidebar';
import ClientesHome from './pages/ClientesHome';
import { NewClientV2 } from './pages/NuevoCliente';
import { Box } from '@mui/material';
import ListaDeClientes from './pages/ListaDeClientes';

function App() {
  return  (
    <div className="app-container">
      <SidebarV2 />
  
      <Box className="content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Clientes" element={<ClientesHome />} />
            <Route path="/Clientes/NuevoCliente" element={<NewClientV2 />} />
            <Route path="/Clientes/Lista" element={<ListaDeClientes />} />
            <Route path="/Pagos" element={<Pagos />} />
            <Route path="/Transacciones" element={<Transacciones />} />
        </Routes>
      </Box>
    </div>
  )
}

export default App;
