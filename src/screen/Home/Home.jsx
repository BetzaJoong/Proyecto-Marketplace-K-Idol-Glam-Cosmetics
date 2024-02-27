import React, { useContext, useState } from 'react';
import './homeStyle.css';
import { AppContext } from '../../context/MakeupContext';
import MakeupCard from '../../components/MakeupCard/MakeupCard';
// import LoadingCard from '../../components/MakeupCard/LoadingCard';
import Header from '../../components/Header/Header'; // Corregir la importación del componente Header

export default function Home() {
    const context = useContext(AppContext);
    const allMakeup = context.makeup;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');

    // Función para filtrar y ordenar las tarjetas de maquillaje
    const filteredAndSortedMakeup = allMakeup
        .filter(makeup => makeup.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'asc') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'desc') {
                return b.name.localeCompare(a.name);
            }
            return 0;
        });

    return (
        <div className="home">
            <Header />
            <section>
            <h3>Productos</h3> 
                <div className="search-and-sort">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="">Ordenar por...</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                {filteredAndSortedMakeup.length > 0 ? (
                    filteredAndSortedMakeup.map((makeup) => (
                        <MakeupCard key={makeup.id} makeup={makeup} />
                    ))
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </section>
        </div>
    );
}

