import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MakeupNavbar from "./components/Navbar/MakeupNavbar";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import Home from "./screen/Home/Home";
import MainPage from "./screen/MainPage";
import MakeupDetail from "./screen/MakeupDetail";
import Cart from "./screen/Cart/Cart";
import Error404 from "./screen/Error404";
import Footer from "./components/Footer/Footer";
import Registro from "./auth/Registro";
import InicioSesion from "./auth/Inicio-sesion";
import DetailView from "../src/components/Menu/DetailView";
import { useAppContext } from "./context/MakeupContext";
import PerfilUsuario from './auth/PerfilUsuario';
import Favoritos from './auth/favoritos/misfavoritos';

import PerfilAdmin from "./auth/PerfilAdmin";
import ListaTareas from "./auth/tareas/ListaTareas";
import FormularioProductos from './auth/tareas/Formulario';
import Publicaciones from './auth/tareas/Publicaciones';
import ListaUsuarios from './auth/tareas/ListaUsuarios';
import AtencionClientes from './auth/tareas/AtencionClientes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const { loggedIn, usuario, isAdmin } = useAppContext()

    console.log("----------------");
    console.log(localStorage.getItem('accessToken'));
    console.log(usuario);
    console.log(loggedIn);
    console.log(isAdmin);
    console.log("----------------");
    return (
        <div className="App">

            {/* Renderiza el Navbar correspondiente según el rol del usuario */}
            {loggedIn && usuario && usuario.rol === 'admin' ? (
                <AdminNavbar />
            ) : loggedIn && usuario && usuario.rol === 'usuario' ? (
                <MakeupNavbar />
            ) : false}
            <Routes>
                <Route index element={<MainPage />} />
                <Route path="/registrarse" element={<Registro />} />
                <Route path="/iniciarsesion" element={<InicioSesion />} />

                {loggedIn && usuario && usuario.rol === 'admin' ? (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/perfil-admin" element={<PerfilAdmin />} />
                        <Route path="/lista-tareas" element={<ListaTareas />} />
                        <Route path="/formulario" element={<FormularioProductos />} />
                        <Route path="/mis-publicaciones" element={<Publicaciones />} />
                        <Route path="/usuarios" element={<ListaUsuarios />} />
                        <Route path="/atencion-cliente" element={<AtencionClientes />} />
                    </>
                ) : loggedIn && usuario && usuario.rol === 'usuario' ? (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/perfil-usuario" element={<PerfilUsuario />} />
                        <Route path="/makeup/:id" element={<MakeupDetail />} />
                        <Route path="/category/:category" element={<DetailView />} />
                        <Route path="/carrito" element={<Cart />} />
                        <Route path="/favoritos" element={<Favoritos />} />
                    </>
                ) : <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/perfil-usuario" element={<PerfilUsuario />} />
                    <Route path="/makeup/:id" element={<MakeupDetail />} />
                    <Route path="/category/:category" element={<DetailView />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                </>}

                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />

        </div>
    );
}

export default App;

