import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct, GetProduct } from "../actions/products";
import DotsLoader from '../actions/loaders/DotsLoader';
import { useNavigate } from 'react-router-dom';
import { AddCartProducts, addCartProducts } from "../actions/carts"
import { getLoggedinId } from '../utils';
import { toast } from 'react-toastify';

const ProductDetails = (props) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const details = useSelector(state => state?.product?.detail);
    const [productDetails, setProductDetails] = useState("");
    const navigate = useNavigate();
    const cart_add_redux = useSelector(state => state?.cart?.add);

    useEffect(() => {
        if (productId) {
            dispatch(getProduct({ _id: productId }));
        }
    }, []);

    React.useEffect(() => {
        return () => dispatch({
            type: GetProduct.RESET
        })
    }, []);

    useEffect(() => {
        if (cart_add_redux) {
            if (cart_add_redux?.suc === true) {
                dispatch({ type: AddCartProducts.RESET })
                toast.success(cart_add_redux?.msg)
            } else if (cart_add_redux?.suc === false) {
                dispatch({ type: AddCartProducts.RESET })
                toast.error(cart_add_redux?.msg)
            }
        }
    }, [cart_add_redux])


    useEffect(() => {
        setProductDetails("")
        if (details && details?.suc) {
            setProductDetails(details?.data)
        }
    }, [details]);

    return (
        <>
            {details?.loading ?
                <DotsLoader /> :
                <>
                    {productDetails &&
                        <div className="offcanvas-body">
                            <div className='d-flex gap1'>
                                <div className='w-50'>
                                    Product name
                                </div>
                                <div className='w-50'>
                                    {productDetails?.name}
                                </div>
                            </div>
                            <div className='d-flex gap1'>
                                <div className='w-50'>
                                    Price
                                </div>
                                <div className='w-50'>
                                    {productDetails?.base_price}
                                </div>
                            </div>
                            <div className='d-flex gap1'>
                                <div className='w-15'>
                                    <button type="submit" className={`btn btn-primary w-100`} onClick={(e) => {
                                        dispatch(addCartProducts({
                                            userId: getLoggedinId(),
                                            quantity: 1,
                                            productId: productDetails?._id,
                                            sellerId: productDetails
                                        }))
                                    }}> Add to cart</button>
                                </div>
                                <div className='w-15'>
                                    <button type="button" className={`btn btn-primary w-100`} onClick={() => {
                                        navigate("/catalogue")
                                    }}>Back to products</button>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}
export default ProductDetails;