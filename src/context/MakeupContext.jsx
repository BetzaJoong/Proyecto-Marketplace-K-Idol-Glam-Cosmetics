import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default function MakeupContextProvider({ children }) {
    const [makeup, setMakeup] = useState([]);
    const [cart, setCart] = useState([]);

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

    return (
        <AppContext.Provider value={{ makeup, cart, setCart, calculateTotalPrice }}>
            {children}
        </AppContext.Provider>
    );
}




// import React, { createContext, useContext, useState, useEffect } from 'react';

// export const AppContext = createContext();

// export function useAppContext() {
//     return useContext(AppContext);
// }

// export default function MakeupContextProvider({ children }) {
//     const [makeup, setMakeup] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // Agregando isLoggedIn al estado

//     useEffect(() => {
//         fetch('/makeup.json') 
//             .then((response) => response.json())
//             .then((data) => setMakeup(data))
//             .catch((error) => console.error('Error loading makeup:', error));
//     }, []);

//     const calculateTotalPrice = () => {
//         const totalPrice = cart.reduce((total, makeup) => total + makeup.price * makeup.quantity, 0);
//         return totalPrice;
//     };

//     return (
//         <AppContext.Provider value={{ makeup, cart, setCart, calculateTotalPrice, isLoggedIn, setIsLoggedIn }}> {/* Incluyendo isLoggedIn en el valor proporcionado por el contexto */}
//             {children}
//         </AppContext.Provider>
//     );
// }
