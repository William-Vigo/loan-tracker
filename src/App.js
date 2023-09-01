import { Route, Routes} from 'react-router-dom';
//import Sidebar from "./components/Sidebar";
import NewClient from "./pages/NuevoCliente";
import Home from "./pages/Home";
import Pagos from "./pages/Pagos";
import ListDeClientes from "./pages/ListaDeClientes";
import Transacciones from "./pages/Transacciones";
import "./App.css"
import SidebarV2, { sideBarWidth } from './components/Sidebar';
import ClientesHome from './pages/ClientesHome';
import { NewClientV2 } from './pages/NewClient';
import { Box } from '@mui/material';

const width = `${sideBarWidth}px`

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
