import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(()=> {
        // console.log(products)
        const storedCart = getShoppingCart();
        const savedCart = [];
        // console.log(storedCart);
        for(const id in storedCart){            
            const addedProduct = products.find(product => product.id === id)
            // console.log(addedProduct);
            if(addedProduct){
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                console.log(addedProduct)
                savedCart.push(addedProduct)
            }
            
        }
        
        setCart(savedCart)
    }, [products])

    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product]
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }


        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}>
                    <Link to="/orders">
                       <button className='btn-proceed'>Review Order <FontAwesomeIcon  icon={faArrowCircleRight} /> </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;