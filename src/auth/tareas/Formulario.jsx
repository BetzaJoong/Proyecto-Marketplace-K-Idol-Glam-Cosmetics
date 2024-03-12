import React, { useState } from 'react';
import "./form.css"; 

function FormularioPublicacion({ cancelar }) {
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [id_producto, setIdProducto] = useState('');
    const [img, setImg] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [precio, setPrecio] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Formatear los ingredientes como un array
        const ingredientesArray = ingredientes.split(',').map(ingrediente => ingrediente.trim());

        // Construir el objeto de producto
        const nuevoProducto = {
            categoria,
            descripcion,
            id_producto,
            img,
            ingredients: ingredientesArray,
            name: nombre,
            marca,
            precio: parseFloat(precio)
        };

        try {
            const response = await fetch('http://localhost:5003/publicaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto)
            });

            console.log('Respuesta del servidor:', response);

            if (response.ok) {
                console.log('Producto agregado con éxito');
                alert('Producto agregado con éxito');
                // Limpiar los campos después de agregar con éxito
                setCategoria('');
                setDescripcion('');
                setIdProducto('');
                setImg('');
                setIngredientes('');
                setNombre('');
                setMarca('');
                setPrecio('');
            } else {
                console.error('Error al agregar el producto:', response.statusText);
                alert('Error al agregar el producto');
            }
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
            alert('Error al agregar el producto');
        }
    };

    return (
        <div className="formulario-publicacion">
            <h2>Crea una nueva publicación</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Categoría:
                    <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </label>
                <label>
                    Descripción:
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </label>
                <label>
                    ID Producto:
                    <input type="text" value={id_producto} onChange={(e) => setIdProducto(e.target.value)} />
                </label>
                <label>
                    Imagen:
                    <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
                </label>
                <label>
                    Ingredientes:
                    <textarea value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
                </label>
                <label>
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </label>
                <label>
                    Marca:
                    <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
                </label>
                <label>
                    Precio:
                    <input type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </label>
                <button type="submit">Crear</button>
                <button onClick={cancelar}>Cancelar</button>
            </form>
        </div>
    );
}

export default FormularioPublicacion;

