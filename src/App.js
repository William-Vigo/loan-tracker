import { Route, Routes} from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import NewClient from "./pages/NuevoCliente";
import Home from "./pages/Home";
import Pagos from "./pages/Pagos";
import ListDeClientes from "./pages/ListaDeClientes";
import Transacciones from "./pages/Transacciones";
import "./App.css"

function App() {
  return  (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Clientes/NeuvoCliente" element={<NewClient />} />
            <Route path="/Clientes/Lista" element={<ListDeClientes />} />
            <Route path="/Pagos" element={<Pagos />} />
            <Route path="/Transacciones" element={<Transacciones />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
