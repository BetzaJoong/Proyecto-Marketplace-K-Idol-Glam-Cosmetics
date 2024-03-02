import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './detail.css'; // Importa el archivo CSS

const DetailView = () => {
    const { category } = useParams(); // Obtener la categoría de la URL
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

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

    // Función para marcar "Me Gusta"
    const likeProduct = (product) => {
        // Aquí puedes implementar la lógica para marcar el producto como "Me gusta"
        alert(`Te gusta: ${product.name}`);
    };

    // Renderizar el contenido según la categoría
    const renderContent = () => {
        if (loading) {
            return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
        }

        if (category === "makeup") {
            return (
                <div className="detail-container">
                    <h1 style={{ color: "black" }}>Makeup</h1>
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


