import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from '../../context/MakeupContext'; 
import './detail.css'; 

const DetailView = () => {
    const { category } = useParams(); // Obtener la categoría de la URL
    const { agregarFavorito, favoritos } = useContext(AppContext); // Contexto para agregar productos a favoritos
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
    const [likedProducts, setLikedProducts] = useState(new Set()); // Estado para almacenar productos marcados como favoritos

    useEffect(() => {
        // Función para cargar los datos del JSON
        const fetchData = async () => {
            try {
                const response = await fetch('/makeup.json'); // Hacer la solicitud para obtener el JSON
                const data = await response.json(); // Convertir la respuesta a JSON
                setProducts(data); // Actualizar el estado con los datos obtenidos
                setLoading(false); // Marcar la carga como completada
            } catch (error) {
                console.error('Error loading makeup data:', error);
            }
        };

        fetchData(); // Llamar a la función de carga de datos al montar el componente
    }, []);

    // Función para marcar "Me Gusta" y agregar a favoritos
    const likeProduct = (product) => {
        if (!likedProducts.has(product.id)) { // Verificar si el producto ya ha sido marcado como favorito
            agregarFavorito(product); // Agregar producto a favoritos
            setLikedProducts(new Set(likedProducts).add(product.id)); // Agregar el producto a los marcados como favoritos
            alert(`Te gusta: ${product.name}`);
        } else {
            alert(`Ya te gusta: ${product.name}`);
        }
    };

    // Renderizar el contenido según la categoría
    const renderContent = () => {
        if (loading) {
            return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
        }

        if (category === "makeup") {
            return (
                <div className="detail-container">
                    <h1>Makeup</h1>
                    {products
                        .filter(product => product.category === "makeup")
                        .map(product => (
                            <div key={product.id} className="card-view">
                                <img src={product.img} alt={product.name} className="card-img" />
                                <div className="card-body">
                                    <h2>{product.name}</h2>
                                    <p>{product.desc}</p>
                                    <button onClick={() => likeProduct(product)}>💖Me Gusta</button>
                                </div>
                            </div>
                        ))}
                </div>
            );
        } else if (category === "skincare") {
            return (
                <div className="detail-container">
                    <h1 style={{ color: "black" }}>Skincare</h1>
                    {products
                        .filter(product => product.category === "skincare")
                        .map(product => (
                            <div key={product.id} className="card-view">
                                <img src={product.img} alt={product.name} className="card-img" />
                                <div className="card-body">
                                    <h2>{product.name}</h2>
                                    <p>{product.desc}</p>
                                    <button onClick={() => likeProduct(product)}>💖Me Gusta</button>
                                </div>
                            </div>
                        ))}
                </div>
            );
        } else {
            return (
                <div className="detail-container">
                    <p style={{ color: "red" }}>Categoría no reconocida.</p>
                </div>
            );
        }
    };

    return renderContent(); // Renderizar el contenido según el estado de carga y la categoría
};

export default DetailView;



