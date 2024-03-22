// import React, { createContext, useContext, useState, useEffect } from 'react';

// export const AppContext = createContext();

// export function useAppContext() {
//     return useContext(AppContext);
// }

// export default function MakeupContextProvider({ children }) {
//     const [makeup, setMakeup] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [favoritos, setFavoritos] = useState(new Set());
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [usuario, setUsuario] = useState(null); // Nuevo estado para almacenar la información del usuario
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         fetch('/makeup.json')
//             .then((response) => response.json())
//             .then((data) => setMakeup(data))
//             .catch((error) => console.error('Error loading makeup:', error));
//     }, []);

//     useEffect(() => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             fetch('/perfil', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 if (response.status === 401) {
//                     throw new Error('Usuario no autenticado');
//                 }
//                 throw new Error('Error al obtener el perfil del usuario');
//             })
//             .then(data => {
//                 setUsuario(data);
//                 setLoggedIn(true);
//                 setIsAdmin(data.rol === 'admin'); // Establecer el estado de isAdmin según el rol del usuario
//             })
//             .catch(error => {
//                 console.error('Error al obtener perfil de usuario:', error.message);
//                 setLoggedIn(false);
//                 setUsuario(null);
//                 setIsAdmin(false);
//             });
//         } else {
//             setLoggedIn(false);
//             setUsuario(null);
//             setIsAdmin(false);
//         }
//     }, []);

//     const calculateTotalPrice = () => {
//         const totalPrice = cart.reduce((total, makeup) => total + makeup.price * makeup.quantity, 0);
//         return totalPrice;
//     };

//     const agregarFavorito = (producto) => {
//         const newFavoritos = new Set(favoritos);
//         newFavoritos.add(producto);
//         setFavoritos(newFavoritos);
//     };

//     const eliminarFavorito = (producto) => {
//         if (favoritos.has(producto)) {
//             const newFavoritos = new Set(favoritos);
//             newFavoritos.delete(producto);
//             setFavoritos(newFavoritos);
//         }
//     };

//     return (
//         <AppContext.Provider value={{ 
//             makeup, 
//             cart, 
//             setCart, 
//             calculateTotalPrice, 
//             favoritos, 
//             agregarFavorito, 
//             eliminarFavorito,
//             loggedIn, 
//             setLoggedIn, 
//             usuario, 
//             isAdmin, 
//             setIsAdmin 
//         }}>
//             {children}
//         </AppContext.Provider>
//     );
// }



import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default function MakeupContextProvider({ children }) {
    const [makeup, setMakeup] = useState([]);
    const [cart, setCart] = useState([]);
    const [favoritos, setFavoritos] = useState(new Set());
    const [loggedIn, setLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState(null); // Nuevo estado para almacenar la información del usuario
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuCategories, setMenuCategories] = useState([]); // Nuevo estado para almacenar las categorías del menú

    useEffect(() => {
        fetch('/makeup.json')
            .then((response) => response.json())
            .then((data) => setMakeup(data))
            .catch((error) => console.error('Error loading makeup:', error));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log("ESTOY EN EL USE EFFECTO DEL TOKEN :", token)
        if (token) {
            fetch('http://localhost:5003/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
        
                if (response.ok) {
                    return response;
                }
                if (response.status === 401) {
                    throw new Error('Usuario no autenticado');
                }
                throw new Error('Error al obtener el perfil del usuario');
            })
            .then(async data => {
                let dataJson = await data.json()
                console.log("----------DATA---------------")
                console.log("----------DATA---------------")
          
                console.log(dataJson)

                console.log("----------DATA---------------")
                console.log("----------DATA---------------")
                setUsuario(dataJson);
                setLoggedIn(true);
                setIsAdmin(dataJson.rol === 'admin'); // Establecer el estado de isAdmin según el rol del usuario
            })
            .catch(error => {
                console.error('Error al obtener perfil de usuario:', error.message);
                setLoggedIn(false);
                setUsuario(null);
                setIsAdmin(false);
            });
        } else {
            setLoggedIn(false);
            setUsuario(null);
            setIsAdmin(false);
        }
    }, []);

    useEffect(() => {
        fetch('/makeup.json')
            .then((response) => response.json())
            .then((data) => {
                const categories = data.reduce((acc, current) => {
                    if (!acc.includes(current.category)) {
                        acc.push(current.category);
                    }
                    return acc;
                }, []);
                setMenuCategories(categories);
            })
            .catch((error) => {
                console.error('Error loading menu categories:', error);
            });
    }, []);



    const logout = () => {
        setLoggedIn(false);
        setUsuario(null);
        setIsAdmin(false);
        localStorage.removeItem('accessToken');
    };

    const calculateTotalPrice = () => {
        const totalPrice = cart.reduce((total, makeup) => total + makeup.price * makeup.quantity, 0);
        return totalPrice;
    };

    const agregarFavorito = (producto) => {
        const newFavoritos = new Set(favoritos);
        newFavoritos.add(producto);
        setFavoritos(newFavoritos);
    };

    const eliminarFavorito = (producto) => {
        if (favoritos.has(producto)) {
            const newFavoritos = new Set(favoritos);
            newFavoritos.delete(producto);
            setFavoritos(newFavoritos);
        }
    };

    return (
        <AppContext.Provider value={{ 
            makeup, 
            cart, 
            setCart, 
            calculateTotalPrice, 
            favoritos, 
            agregarFavorito, 
            eliminarFavorito,
            loggedIn, 
            setLoggedIn, 
            usuario, 
            isAdmin, 
            setIsAdmin,
            setUsuario,
            menuCategories,
            setMenuCategories,
            logout
        }}>
            {children}
        </AppContext.Provider>
    );
}
