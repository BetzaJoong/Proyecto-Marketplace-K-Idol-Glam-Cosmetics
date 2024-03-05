import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default function MakeupContextProvider({ children }) {
    const [makeup, setMakeup] = useState([]);
    const [cart, setCart] = useState([]);
    const [favoritos, setFavoritos] = useState(new Set()); // Estado para almacenar los favoritos

    useEffect(() => {
        fetch('/makeup.json') 
            .then((response) => response.json())
            .then((data) => setMakeup(data))
            .catch((error) => console.error('Error loading makeup:', error));
    }, []);

    const calculateTotalPrice = () => {
        const totalPrice = cart.reduce((total, makeup) => total + makeup.price * makeup.quantity, 0);
        return totalPrice;
    };

    // Función para agregar un producto a los favoritos
    const agregarFavorito = (producto) => {
        const newFavoritos = new Set(favoritos);
        newFavoritos.add(producto);
        setFavoritos(newFavoritos);
    };

    // Función para eliminar un producto de los favoritos
    const eliminarFavorito = (producto) => {
        const newFavoritos = new Set(favoritos);
        newFavoritos.delete(producto);
        setFavoritos(newFavoritos);
    };

    return (
        <AppContext.Provider value={{ makeup, cart, setCart, calculateTotalPrice, favoritos, agregarFavorito, eliminarFavorito }}>
            {children}
        </AppContext.Provider>
    );
}
