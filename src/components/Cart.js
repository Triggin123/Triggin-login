import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCartProducts, deleteCartProducts, DeleteCartProducts, GetCartProducts, AddCartProducts ,addCartProducts } from "../actions/carts";
import DotsLoader from '../actions/loaders/DotsLoader';
import { useNavigate } from 'react-router-dom';
import { getLoggedinId } from '../utils';
import { toast } from 'react-toastify';
import { PlaceOrder, placeOrder } from "../actions/order"

const Cart = (props) => {
    const dispatch = useDispatch();
    const all_cart_prods = useSelector(state => state?.cart?.all);
    const delte_cart_prods = useSelector(state => state?.cart?.delete);

    const save_order = useSelector(state => state?.order?.save);

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
        if (save_order?.suc) {
            toast.success("Order Placed");
            dispatch({type: GetCartProducts.RESET})
            dispatch({type: AddCartProducts.RESET})
            dispatch({type: PlaceOrder.RESET})
            navigate("/orders")
        } else if (save_order?.suc === false) {
            toast.success(save_order?.msg);
        }
    }, [save_order])


    useEffect(() => {
        if (delte_cart_prods) {
            if (delte_cart_prods?.suc) {
                toast.success(delte_cart_prods?.msg)
                dispatch({
                    type: DeleteCartProducts.RESET
                  })
                dispatch(getCartProducts({ userId: getLoggedinId() }));
            } else if (delte_cart_prods?.suc === false) {
                toast.error("Product not deleted")
                dispatch({
                    type: DeleteCartProducts.RESET
                  })
            }
        }
    }, [delte_cart_prods])


    function saveOrder(data){
        let seller_id= products?.map(itm => itm?.userId);
        let total = products?.map((itm) => itm?.landing_price);
        total = total.reduce((partialSum, a) => Number(partialSum) + Number(a), 0);
        let payload = {
            userId: getLoggedinId(),
            sellerId: seller_id && seller_id?.length >0 ?seller_id[0] : null,
            products: products,
            total,
            currency: "INR"
        }
        dispatch(placeOrder(payload));
    }
    


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
                <button type="submit" className={`btn btn-primary w-100`} onClick={(e) => saveOrder()}> Place order</button>
            }
        </>
    )
}
export default Cart;