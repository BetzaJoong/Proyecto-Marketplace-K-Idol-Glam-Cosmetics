import React from 'react';
import './acliente.css';

function AtencionClientes({ volver }) {
    return (
        <div className="atencion-clientes">
            <h2>Atención al Cliente</h2>
            <table>
                <thead>
                    <tr>
                        <th>Envíos</th>
                        <th>Pedidos</th>
                        <th>Reembolso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Datos de envíos aquí</td>
                        <td>Datos de pedidos aquí</td>
                        <td>Datos de reembolso aquí</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AtencionClientes;
