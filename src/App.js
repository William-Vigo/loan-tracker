import { Route, Routes} from 'react-router-dom';
//import Sidebar from "./components/Sidebar";
import NewClient from "./pages/NuevoCliente";
import Home from "./pages/Home";
import Pagos from "./pages/Pagos";
import ListDeClientes from "./pages/ListaDeClientes";
import Transacciones from "./pages/Transacciones";
import "./App.css"
import SidebarV2 from './components/Sidebar';
//import SidebarV2 from './components/test';

function App() {
  return  (
    <div className="app-container">
      <SidebarV2 />
      <div className="content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Clientes" element={<Home />} />
            <Route path="/Clientes/NuevoCliente" element={<NewClient />} />
            <Route path="/Clientes/Lista" element={<ListDeClientes />} />
            <Route path="/Pagos" element={<Pagos />} />
            <Route path="/Transacciones" element={<Transacciones />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
