import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetOrderDetails, getOrderDetails } from "../actions/order"
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const OrderDetails = (props) => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const details_redux = useSelector(state => state?.order?.details);
    const [order_info, setOrderInfo] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getOrderDetails({ orderId }))
    }, [orderId])

    useEffect(() => {
        if (details_redux?.suc) {
            setOrderInfo(details_redux?.data)
        } else if (details_redux?.suc === false) {
            setOrderInfo("")
        }
    }, [details_redux])


    React.useEffect(() => {
        return () => dispatch({
            type: GetOrderDetails.RESET
        })
    }, []);

    return (
        <>
            {order_info ? <>
                <div>
                    <p>Total :{order_info?.total}{" "}{order_info?.currency} </p>
                    <p>Order Sattus :{order_info?.orderStatus} </p>
                    <p>Order Ref Num :{order_info?.orderNum} </p>
                    <p>Created Date :{moment(order_info?.createdDate).format("DD-MM-YYYY HH:mm")} </p>
                </div><hr />
                <div>
                    <h4>Product details</h4>
                    {order_info?.products?.map((itm) => {
                        return (
                            <>
                                <div>                      <ul>
                                    <li>Product name: {itm?.name}</li>
                                    <li>Product Quantity: {itm?.quantity || 1}</li>
                                    <li>Product Price: {itm?.base_price} {" "}{itm?.currency}</li>
                                </ul>
                                </div><hr />
                            </>

                        )
                    })}
                </div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={(e) => {
                        navigate("/orders")
                    }} >Back to Orders</button></div>

            </> : ""}
        </>
    )
}
export default OrderDetails;