import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import Sidebar from './components/Sidebar';
import {BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Sidebar />
    </BrowserRouter>
  </React.StrictMode>
);