import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./screen/Home/Home";
import MainPage from "./screen/MainPage";
import MakeupDetail from "./screen/MakeupDetail";
import Cart from "./screen/Cart";
import Error404 from "./screen/Error404";
import AppContext from "./context/MakeupContext";
import MakeupNavbar from "./components/Navbar/MakeupNavbar";
import Footer from "./components/Footer/Footer";
import Registro from "./auth/Registro";
import InicioSesion from "./auth/Inicio-sesion";
import DetailView from "../src/components/Menu/DetailView";

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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [usuario, setUsuario] = useState(null); // Estado para almacenar la información del usuario
    const [loggedIn, setLoggedIn] = useState(false); // Estado de inicio de sesión

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Obtener perfil del usuario
            fetch('/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                setUsuario(data);
                setLoggedIn(true);
            })
            .catch(error => console.error('Error al obtener perfil de usuario:', error));
        }
    }, []);

    return (
        <AppContext>
            <div className="App">
                <MakeupNavbar onCategoryChange={handleCategoryChange} perfilImage={usuario && usuario.perfilImage} usuario={usuario} />
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="/registrarse" element={<Registro />} />
                    <Route path="/iniciarsesion" element={<InicioSesion />} />

                    {loggedIn && usuario && usuario.rol === 'admin' ? (
                        <>
                            <Route path="/home" element={<Home />} />
                            <Route path="/perfil-administrador" element={<PerfilAdmin />} />
                            <Route path="/lista-tareas" element={<ListaTareas />} />
                            <Route path="/agregar-productos" element={<FormularioProductos />} />
                            <Route path="/mis-publicaciones" element={<Publicaciones />} />
                            <Route path="/usuarios" element={<ListaUsuarios />} />
                            <Route path="/atencion-cliente" element={<AtencionClientes />} />
                        </>
                    ) : (
                        <>
                            <Route path="/home" element={<Home />} />
                            <Route path="/perfil-usuario" element={<PerfilUsuario />} />
                            <Route path="/makeup/:id" element={<MakeupDetail />} />
                            <Route path="/category/:category" element={<DetailView />} />
                            <Route path="/carrito" element={<Cart />} />
                            <Route path="/favoritos" element={<Favoritos />} />
                        </>
                    )}

                    <Route path="*" element={<Error404 />} />
                </Routes>
                <Footer />
            </div>
        </AppContext>
    );
}

export default App;
