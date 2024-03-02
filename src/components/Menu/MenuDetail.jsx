import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MenuDetail() {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        // Fetching data from the JSON file
        fetch('/makeup.json')
            .then(response => response.json())
            .then(data => setCategories(data.categories))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="menu-detail-container">
            {Object.entries(categories).map(([category, products]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <Link to={`/makeup/${category}/${product.id}`}>{product.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
