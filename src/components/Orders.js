import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { useNavigate } from 'react-router-dom';
import { getOrders, GetOrders } from "../actions/order"
import moment from 'moment'
import { toast } from 'react-toastify';
import LazyLoading from '../actions/loaders/LazyLoading'
import DotsLoader from '../actions/loaders/DotsLoader';

const Orders = (props) => {
  const dispatch = useDispatch();
  const orders_redux = useSelector(state => state?.order?.all);
  const [records, setRecords] = useState([])
  const [selected, setSelected] = useState({});
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate()
  const [tabSel ,setTabSel] = useState("p");

  let [page, setPage] = useState(1);

  useEffect(() => {
    setRecords([]);
    dispatch(getOrders({ type: tabSel, page: page, pageSize: 100 }))
  }, [tabSel]);

  React.useEffect(() => {
    return () => dispatch({
      type: GetOrders.RESET
    })
  }, []);
  

  useEffect(() => {
    if (!orders_redux.loading) {
      let finalData = orders_redux && orders_redux.data && orders_redux.data.length > 0 ? orders_redux.data : [];
      setRecords([...records, ...finalData]);
      setTotalRecords(orders_redux && orders_redux.totalRecords ? orders_redux.totalRecords : 0);
    }
  }, [orders_redux])


  const columns = [
    {
      title: "Order Number",
      cell: (row) => {
        return <span>{row?.orderNum}</span>
      }
    },
    {
      title: "Price",
      cell: (row) => {
        return <span>{row?.total}{" "}{row?.currency}</span>
      }
    },
    {
      title: "Status",
      cell: (row) => {
        return <span>{row?.orderStatus}</span>
      }
    },
    {
      title: "Created Date",
      cell: (row) => {
        return <span>{moment(row?.createdDate).format("DD-MM-YYYY HH:mm")}</span>
      }
    },
    {
      title: "Actions",
      cell: (row) => {
        return <>
          <span className="btn btn-dark mr-2" onClick={(e) => { 
            navigate("/orders/"+row?._id)
          }}>
            <i className="bi bi-pencil-square"></i>
          </span>
        </>
      }
    },
  ]
  return (
    <>
      <div className='wrapper'>
        <button type="button" className="btn btn-primary" onClick={(e) => {
          setTabSel("p")
        }} >Placed</button>
         <button type="button" className="btn btn-primary" onClick={(e) => {
          setTabSel("r")
        }} >Received</button>
      </div>
      <div className='wrapper'>
        <>
          {orders_redux?.loading ?
            <DotsLoader /> :
            <>
              <TableHead addText={""} count={records ? records.length : 0} />
              <hr className='widget-separator'></hr>
              <DataTable loading={orders_redux?.loading} data={orders_redux?.data || []} columns={columns} />
              <LazyLoading
                loading={orders_redux?.loading}
                totalRecords={totalRecords}
                data={records ? records : []}
                isLastPage={records?.length >= totalRecords}
                onPagination={() => {
                  if (records?.length <= totalRecords) {
                    setPage(p => p + 1);
                    dispatch(getOrders({ page: page + 1, pageSize:100, type: tabSel }))
                  }
                }}
              />
            </>}
        </>
      </div>
    </>
  );
};

export default Orders;