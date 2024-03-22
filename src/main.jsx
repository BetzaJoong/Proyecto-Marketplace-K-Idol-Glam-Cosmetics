import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import MakeupContextProvider from "./context/MakeupContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <MakeupContextProvider>

      <AuthProvider> {/* Envuelve App con AuthProvider */}
        <App />
      </AuthProvider>

    </MakeupContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

