import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCartProducts, deleteCartProducts } from "../actions/carts";
import DotsLoader from '../actions/loaders/DotsLoader';
import { useNavigate } from 'react-router-dom';
import { getLoggedinId } from '../utils';

const Cart = (props) => {
    const dispatch = useDispatch();
    const all_cart_prods = useSelector(state => state?.cart?.all);
    const delte_cart_prods = useSelector(state => state?.cart?.delete);

    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        dispatch(getCartProducts({ userId: getLoggedinId() }));
    }, []);


    useEffect(() => {
        setProducts([]);
        if (all_cart_prods?.suc) {
            setProducts(all_cart_prods?.data || []);
        }
    }, [all_cart_prods])


    useEffect(() => {
        if (delte_cart_prods?.suc) {
            dispatch(getCartProducts({ userId: getLoggedinId() }));
        }
    }, [delte_cart_prods])
    


    return (
        <>
            <h3>Cart Products</h3><br />
            {products && products.length > 0 &&
                products?.map((prd) => {
                    return (
                        <pre>
                            Name: {prd?.name}
                            Price: {prd?.landing_price}<hr />
                            <button type="submit" className={`btn btn-primary w-100`}
                            onClick={() =>{
                                dispatch(deleteCartProducts({
                                    quantity:1,
                                    productId: prd?._id,
                                    userId: getLoggedinId(),
                                    sellerId: prd?.userId
                                }))
                            }}
                            > Delete Item</button>
                        </pre>
                    )
                })
            }
            {products && products.length > 0 &&
                <button type="submit" className={`btn btn-primary w-100`}> Plcae order</button>
            }
        </>
    )
}
export default Cart;