import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCatalogues, GetCatalogues, getCatalogueProducts, CatalogueProducts } from "../actions/catalogue"

import { addCartProducts } from "../actions/carts"
import Card from 'react-bootstrap/Card';
import { getLoggedinId } from '../utils';

const Catalogue = (props) => {
  const dispatch = useDispatch();
  const catalogues = useSelector(state => state?.catalogue?.all);
  const catalogue_products = useSelector(state => state?.catalogue?.catalogue_products);
  const [records, setRecords] = useState([]);
  const [products, setProducts] = useState([])
  const [catagoriesList, setCatagoriesList] = useState([]);

  const cart_add_redux = useSelector(state => state?.cart?.add);


  const [seller_id, setSellerId] = useState("");
  
  const navigate = useNavigate()
  let [page, setPage] = useState(1);


  useEffect(() => {
    setRecords([]);
    dispatch(getCatalogues({ page: page }))
  }, []);

  useEffect(() =>{
    if(catalogues && catalogues?.sellers){
      setRecords(catalogues?.sellers);
    }else{
      setRecords([])
    }
  },[catalogues])

  useEffect(() =>{
    if(catalogue_products && catalogue_products?.data){
      let catList = catalogue_products?.data?.map(itm => {
        return {
          label: itm?.categoryId?.name,
          value: itm?.categoryId?._id
        }
      })
      setCatagoriesList(catList)
      setProducts(catalogue_products?.data)
    }else{
      setProducts([])
    }
  },[catalogue_products])

  React.useEffect(() => {
    return () => dispatch({
      type: GetCatalogues.RESET
    })
  }, []);

  React.useEffect(() => {
    return () => dispatch({
      type: CatalogueProducts.RESET
    })
  }, []);

  useEffect(() =>{

    if(cart_add_redux){
      
    }

  }, [cart_add_redux])

  return (
    <>
    <div className='wrapper'>
        {records && records?.length > 0 &&
          records?.map((itm) => {
            return (
              <Card style={{ width: '18rem' }} onClick={() => {
                setSellerId(itm?.userId?._id)
                dispatch(getCatalogueProducts({ userId: itm?.userId?._id }));
              }
              }>
                <Card.Body>
                  <Card.Title>{itm?.userId?.fname}{" "}{itm?.userId?.lname || ""}</Card.Title>
                  <Card.Text>{itm?.userId?.businessName || ""}</Card.Text>
                </Card.Body>
              </Card>
            )
          })
        }
    </div>

    {catagoriesList && catagoriesList.length > 0 &&
        <div className='wrapper'>
          <>
            <h3>Catagories</h3>
            {catagoriesList?.map((cat) => {
              return (
                <>
                  <Card style={{ width: '18rem' }} onClick={(e) => {
                      let filter_prd = products?.filter(itm => itm?.categoryId?._id === cat?.value);
                      let non_filter_prd = products?.filter(itm => itm?.categoryId?._id !== cat?.value);
                      setProducts([...filter_prd, ...non_filter_prd]);
                  }
                  }>
                    <Card.Body>
                      <Card.Title>{cat?.label}</Card.Title>
                    </Card.Body>
                  </Card>
                </>
              )
            })}
          </>
        </div>
      }

      {products && products.length > 0 &&
        <div className='wrapper'>
          <>
            <h3>Products</h3>
            {products?.map((prd) => {
              return (
                <>
                  <Card style={{ width: '18rem' }} onClick={(e) => {
                    navigate("/product/details/" + prd?._id)
                  }
                  }>
                    <Card.Body>
                      <Card.Title>{prd?.name}</Card.Title>
                      <Card.Text>
                        Price {prd?.base_price || prd?.landing_price} {"INR"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <div className='w-15'>
                        <button type="submit" className={`btn btn-primary w-100`} onClick={(e) =>{
                          dispatch(addCartProducts({
                            userId: getLoggedinId(),
                            quantity: 1,
                            productId: prd?._id,
                            sellerId: seller_id
                          }))
                        }}> Add to cart</button>
                      </div>
                </>
              )
            })}
          </>
        </div>
      }
    </>

  );
};

export default Catalogue;