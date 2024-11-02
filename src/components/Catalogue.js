import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCatalogues, GetCatalogues, getCatalogueProducts, CatalogueProducts } from "../actions/catalogue"
import Card from 'react-bootstrap/Card';

const Catalogue = (props) => {
  const dispatch = useDispatch();
  const catalogues = useSelector(state => state?.catalogue?.all);
  const catalogue_products = useSelector(state => state?.catalogue?.catalogue_products);
  const [records, setRecords] = useState([]);
  const [products, setProducts] = useState([])
  const save = useSelector(state => state?.product?.save)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  
  const navigate = useNavigate()
  let [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(11);

  const [isSearchFound, setIssearchFound] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setRecords([]);
    dispatch(getCatalogues({ page: page }))
  }, []);

  useEffect(() =>{
    if(catalogues && catalogues?.sellers){
      setRecords(catalogues?.sellers)
    }else{
      setRecords([])
    }
  },[catalogues])

  useEffect(() =>{
    if(catalogue_products && catalogue_products?.data){
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

  return (
    <>
    <div className='wrapper'>
        {records && records?.length > 0 &&
          records?.map((itm) => {
            return (
              <Card style={{ width: '18rem' }} onClick={() => {
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

      {products && products.length > 0 &&
        <div className='wrapper'>
          <>
            <h3>Products</h3>
            {products?.map((prd) => {
              return (
                <>
                  <Card style={{ width: '18rem' }} onClick={(e) => {
                    navigate("/product/details/"+prd?._id)
                  }
                  }>
                    <Card.Body>
                      <Card.Title>{prd?.name}</Card.Title>
                      <Card.Text>
                        Price {prd?.base_price || prd?.landing_price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
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