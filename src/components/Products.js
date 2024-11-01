import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { getProductsOwn, saveProduct, getProductsSupplier, getProduct, GetProductsOwn, GetProductsSupplier, SaveProduct, GetProduct } from "../actions/products"
import moment from 'moment'
import { toast } from 'react-toastify';
import LazyLoading from '../actions/loaders/LazyLoading'
import { useFormik } from "formik";
import { Input2 } from "./form-components/Input";

const Products = (props) => {
  const dispatch = useDispatch();
  const ownProducts = useSelector(state => state?.product?.all_own);
  const [records, setRecords] = useState([])
  const save = useSelector(state => state?.product?.save)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  let [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(11);

  const [isSearchFound, setIssearchFound] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setRecords([]);
    dispatch(getProductsOwn({ page: page }))
  }, []);


  useEffect(() => {
    if (save?.suc) {
      setRecords([]);
      setPage(1);
      dispatch(getProductsOwn({ page: 1 }))
      setOpen(false)
      toast.success(save?.msg)
      dispatch({
        type: SaveProduct.RESET
      })
      if (selected?._id) {
        setSelected({})
      }
    } else if (save?.suc === false) {
      toast.error(save?.msg);
      dispatch({
        type: SaveProduct.RESET
      })
    }
  }, [save]);

  React.useEffect(() => {
    return () => dispatch({
      type: GetProductsOwn.RESET
    })
  }, []);

  useEffect(() => {
    if (!ownProducts.loading) {
      let finalData = ownProducts && ownProducts.data && ownProducts.data.length > 0 ? ownProducts.data : [];
      setRecords([...records, ...finalData]);
      setTotalRecords(ownProducts && ownProducts.totalRecords ? ownProducts.totalRecords : 0);
    }
  }, [ownProducts])


  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId:"",
      subCategoryId:"",
      weight:"",
      gst:"",
      base_price:"",
      landing_price:"",
      min_order_qty:"",
      images:[],
      max_order_qty:"",
    },
    onSubmit: (vals) => {
      dispatch(saveProduct(vals));
    }
  })

  const columns = [
    {
      title: "Name",
      cell: (row) => {
        return <span>{row?.name}{" "}</span>
      }
    },
    {
      title: "Category",
      cell: (row) => {
        return <span>{row?.categoryId}</span>
      }
    },
    {
      title: "Sub Category",
      cell: (row) => {
        return <span>{row?.subCategoryId}</span>
      }
    },
    {
      title: "Base price",
      cell: (row) => {
        return <span>{row?.base_price}</span>
      }
    },
    {
      title: "GST",
      cell: (row) => {
        return <span>{row?.gst}</span>
      }
    },
    {
      title: "Landing price",
      cell: (row) => {
        return <span>{row?.landing_price}</span>
      }
    },
    {
      title: "Created Date",
      cell: (row) => {
        return <span>{moment(row?.createdDate).format("DD-MM-YYYY HH:mm")}</span>
      }
    },
    {
      title: "Modified Date",
      cell: (row) => {
        return <span>{moment(row?.modifiedDate).format("DD-MM-YYYY HH:mm")}</span>
      }
    },
    {
      title: "Status",
      cell: (row) => {
        return <span>{row?.is_active ? "Active" : "In active"}</span>
      }
    },
    {
      title: "Actions",
      cell: (row) => {
        return <>
          <span className="btn btn-dark mr-2" onClick={() => { setSelected(row); setOpen(true); }}>
            <i className="bi bi-pencil-square"></i>
          </span>
        </>
      }
    },
  ]
  return (
    <div className='wrapper'>
      <form onSubmit={formik.handleSubmit}>
        <div className="">
          <div className='gap1'>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="name"
                label={"Product name"}
                placeholder="Enter product name"
              />
              <Input2
                formik={formik}
                name="weight"
                label={"Weight"}
                placeholder="Enter Weight"
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="categoryId"
                label={"Category name"}
                placeholder="Enter Category name"
              />
              <Input2
                formik={formik}
                name="subCategoryId"
                label={"Subcategory"}
                placeholder="Enter subcategory"
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="base_price"
                label={"Base price"}
                placeholder="Enter baseprice"
              />
              <Input2
                formik={formik}
                name="gst"
                label={"GST"}
                placeholder="Enter gst"
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="landing_price"
                label={"Landing price"}
                placeholder="Enter landing price"
              />
              <Input2
                formik={formik}
                name="min_order_qty"
                label={"Min order quantity"}
                placeholder="Enter min order"
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="max_order_qty"
                label={"Max order quantity"}
                placeholder="Enter max order"
              />
            </div>
            <div className='w-50'>
              <button type="submit" className={`btn btn-primary w-100`}>Save</button>
            </div>
          </div>
        </div>
      </form>
      <hr />

      <TableHead setOpen={setOpen} count={records ? records.length : 0} totalCount={totalRecords ? totalRecords : 0} />
      <hr className='widget-separator'></hr>
      <DataTable loading={ownProducts?.loading} data={ownProducts?.data || []} columns={columns} />

      <LazyLoading
        loading={ownProducts?.loading}
        totalRecords={totalRecords}
        data={records ? records : []}
        isLastPage={records?.length >= totalRecords}
        onPagination={() => {
          if (records?.length <= totalRecords) {
            setPage(p => p + 1);
            dispatch(getProductsOwn({ page: page + 1 }))
          }
        }}
      />
    </div>
  );
};

export default Products;