import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/MakeupContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './../screen/cartStyle.css';

export default function Cart() {
    const { cart, calculateTotalPrice, setCart } = useContext(AppContext);

    const decrementQuantity = (makeup) => {
        const updatedCart = [...cart];
        const makeupIndex = updatedCart.findIndex((item) => item.id === makeup.id);

        if (makeupIndex !== -1) {
            if (updatedCart[makeupIndex].quantity > 1) {
                updatedCart[makeupIndex].quantity -= 1;
            } else {
                // Si la cantidad es 1, simplemente elimina el producto del carrito si llega a 0.
                updatedCart.splice(makeupIndex, 1);
            }
            setCart(updatedCart);
        }
    };

    const incrementQuantity = (makeup) => {
        const updatedCart = [...cart];
        const makeupIndex = updatedCart.findIndex((item) => item.id === makeup.id);

        if (makeupIndex !== -1) {
            updatedCart[makeupIndex].quantity += 1;
        }
        setCart(updatedCart);
    };

    const formatTotalPrice = (price) => {
        // Formatear el precio sin decimales y con punto como separador de miles
        return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    };

    useEffect(() => {
        // Cada vez que el componente se monte o actualice, hacer scroll al principio de la página
        window.scrollTo(0, 0);
    }, []); // El array vacío como segundo argumento asegura que este efecto solo se ejecute una vez, después de que el componente se monte


    return (
        <div className='fondo'>
            <Card className="cart">
                <Card.Body className='cart-body'>
                    <Card.Title>Detalles del pedido:</Card.Title>
                    {cart.map((makeup, index) => (
                        <div key={index} className="makeup-cart">
                            <Row>
                                <Col xs={2}>
                                    <img src={makeup.img} alt={makeup.name} className="makeup-img" />
                                </Col>
                                <Col xs={7}>
                                    <div className="makeup-name-container">
                                        <p>{makeup.name.charAt(0).toUpperCase() + makeup.name.slice(1)}</p>
                                    </div>
                                </Col>
                                <Col xs={3}>
                                    <div className="quantity-control">
                                        <div className="makeup-price-container">
                                            <p>{formatTotalPrice(makeup.price * makeup.quantity)}</p>
                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => decrementQuantity(makeup)}>-</Button>
                                        <span>{makeup.quantity}</span>
                                        <Button variant="primary" size="sm" onClick={() => incrementQuantity(makeup)}>+</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    <Card.Text className='total-text'>Total: {formatTotalPrice(calculateTotalPrice())}</Card.Text>
                    <Button variant="success">Ir a pagar</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
