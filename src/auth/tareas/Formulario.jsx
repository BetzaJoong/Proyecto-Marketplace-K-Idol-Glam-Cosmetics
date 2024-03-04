import React, { useState } from 'react';
import "./form.css"; 

function FormularioPublicacion({ cancelar, crearPublicacion }) {
    const [producto, setProducto] = useState('');
    const [marca, setMarca] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar los datos antes de enviarlos
        if (!producto || !marca || !categoria || !precio || !descripcion || !imagen) {
            alert('Por favor, complete todos los campos');
            return;
        }
        
        const nuevaPublicacion = {
            producto,
            marca,
            categoria,
            precio,
            descripcion,
            imagen
        };
        crearPublicacion(nuevaPublicacion);
    };

    return (
        <div className="formulario-publicacion">
            <h2>Crea una nueva publicación</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Producto:
                    <input type="text" value={producto} onChange={(e) => setProducto(e.target.value)} />
                </label>
                <label>
                    Marca:
                    <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
                </label>
                <label>
                    Categoría:
                    <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </label>
                <label>
                    Precio:
                    <input type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </label>
                <label>
                    Descripción:
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </label>
                <label>
                    Imagen:
                    <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                </label>
                <button type="submit">Crear</button>
                <button onClick={cancelar}>Cancelar</button>
            </form>
        </div>
    );
}

export default FormularioPublicacion;
