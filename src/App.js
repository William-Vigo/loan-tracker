import { Route, Routes} from 'react-router-dom';
import NewClient from "./pages/NuevoCliente";
import Home from "./pages/Home";
import Pagos from "./pages/Pagos";
import Transacciones from "./pages/Transacciones";
import "./App.css"
import SidebarV2 from './components/Sidebar';
import ClientesHome from './pages/ClientesHome';
import { NewClientV2 } from './pages/NewClient';
import { Box } from '@mui/material';

function App() {
  return  (
    <div className="app-container">
      <SidebarV2 />
  
      <Box className="content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Clientes" element={<ClientesHome />} />
            <Route path="/Clientes/NuevoCliente" element={<NewClient />} />
            <Route path="/Clientes/Lista" element={<NewClientV2 />} />
            <Route path="/Pagos" element={<Pagos />} />
            <Route path="/Transacciones" element={<Transacciones />} />
        </Routes>
      </Box>
    </div>
  )
}

export default App;
