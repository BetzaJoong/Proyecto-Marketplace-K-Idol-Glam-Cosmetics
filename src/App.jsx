import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screen/Home/Home";
import MainPage from "./screen/MainPage";
import MakeupDetail from "./screen/MakeupDetail";
import Cart from "./screen/Cart";
import Error404 from "./screen/Error404";
import AppContext from "./context/MakeupContext";
import MakeupNavbar from "./components/Navbar/MakeupNavbar";
import Footer from "./components/Footer/Footer";
import Registro from "./auth/Registro";
import InicioSesion from "./auth/Inicio de sesion";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <AppContext>
      <div className="App">
        <MakeupNavbar />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/makeup/:id" element={<MakeupDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/registrarse" element={<Registro />} />
          <Route path="/iniciar-sesion" element={<InicioSesion />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer /> 
      </div>
    </AppContext>
  );
}

export default App;


