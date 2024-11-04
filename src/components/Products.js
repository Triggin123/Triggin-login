import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { getProductsOwn, saveProduct, GetProductsOwn, SaveProduct } from "../actions/products"
import { getCategoriesBasedOnIndustry, getSubCategoriesBasedOnCategory } from "../actions/master";
import moment from 'moment'
import { toast } from 'react-toastify';
import Select from "./form-components/Select";
import LazyLoading from '../actions/loaders/LazyLoading'
import { useFormik } from "formik";
import { Input2 } from "./form-components/Input";
import * as yup from 'yup';
import { getIndustryId } from '../utils';

const validationSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  weight: yup.string().required("Weight is required"),
  categoryId: yup.string().required("Catagory is required"),
  subCategoryId: yup.string().required("Sub catagory is required"),
  base_price: yup.string().required("Base  price is required"),
  min_order_qty: yup.string().required("Min order quantity is required"),
  max_order_qty: yup.string().required("Max order quantity is required"),
})

const Products = (props) => {
  const dispatch = useDispatch();
  const ownProducts = useSelector(state => state?.product?.all_own);
  const [records, setRecords] = useState([])
  const save = useSelector(state => state?.product?.save)
  const [selected, setSelected] = useState({});

  let [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showAddBtn, setShowAddBtn] = useState(true);

  const category_all = useSelector(state => state?.master?.category_based_industry);
  const sub_category_all = useSelector(state => state?.master?.subcategory_based_category);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([])


  useEffect(() => {
    setRecords([]);
    dispatch(getProductsOwn({ page: page, pageSize: 20 }))
  }, []);

  useEffect(() => {
    if (save?.suc) {
      setRecords([]);
      setPage(1);
      dispatch(getProductsOwn({ page: 1, pageSize: 20 }))
      toast.success(save?.msg)
      setShowAddBtn(true);
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


  useEffect(() => {
    if (category_all && !category_all?.loading) {
      if (category_all?.data && category_all?.data?.length > 0) {
        let list = category_all?.data?.map(itm => {
          return {
            label: itm.name,
            value: itm._id
          }
        })
        setCategoryList(list)
      } else {
        setCategoryList([])
      }
    }
  }, [category_all])


  useEffect(() => {
    if (sub_category_all && !sub_category_all?.loading) {
      if (sub_category_all?.data && sub_category_all?.data?.length > 0) {
        let list = sub_category_all?.data?.map(itm => {
          return {
            label: itm.name,
            value: itm._id
          }
        })
        setSubCategoryList(list)
      } else {
        setSubCategoryList([])
      }
    }
  }, [sub_category_all])


  useEffect(() => {
    if (selected && selected?._id) {
      formik?.setValues({
        name: selected?.name,
        categoryId: selected?.categoryId?._id || "",
        subCategoryId: selected?.subCategoryId?._id || "",
        weight: selected?.weight,
        gst: selected?.gst,
        base_price: selected?.base_price,
        landing_price: selected?.landing_price,
        min_order_qty: selected?.min_order_qty,
        images: selected?.images,
        max_order_qty: selected?.max_order_qty,
        _id: selected?._id || null
      })
      setShowAddBtn(false);
    }
  }, [selected])

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
      categoryId: "",
      subCategoryId: "",
      weight: "",
      gst: "",
      base_price: "",
      landing_price: "",
      min_order_qty: "",
      images: [],
      max_order_qty: "",
      _id: null
    },
    validationSchema: validationSchema,
    onSubmit: (vals) => {
      dispatch(saveProduct(vals));
    }
  })

  useEffect(() => {
    dispatch(getCategoriesBasedOnIndustry({
      industryTypeId: getIndustryId()
    }))
  }, [])

  useEffect(() =>{
    let amt = 0;
    if(formik?.values?.base_price){
      amt = amt + Number(formik?.values?.base_price);
    }
    if(formik?.values?.gst){
      let perVal = Number((amt * formik?.values?.gst)/100); 
      amt =amt + perVal;
    }
    formik?.setFieldValue("landing_price", amt)
  },[formik?.values?.base_price, formik?.values?.gst])

  useEffect(() => {
    if (formik?.values?.categoryId) {
      dispatch(getSubCategoriesBasedOnCategory({
        categoryId: formik?.values?.categoryId
      }))
    }
  }, [formik?.values?.categoryId])

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
        return <span>{row?.categoryId?.name}</span>
      }
    },
    {
      title: "Sub Category",
      cell: (row) => {
        return <span>{row?.subCategoryId?.name}</span>
      }
    },
    {
      title: "Currency",
      cell: (row) => {
        return <span>INR</span>
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
      title: "Actions",
      cell: (row) => {
        return <>
          <span className="btn btn-dark mr-2" onClick={() => { setSelected(row); }}>
            <i className="bi bi-pencil-square"></i>
          </span>
        </>
      }
    },
  ]
  return (
    <>
      {showAddBtn &&
        <div className='wrapper'>
          <button type="button" className="btn btn-primary" onClick={() => {
            formik?.resetForm();
            setShowAddBtn((pre) => !pre);
          }} >Add Product</button>
        </div>
      }
      {!showAddBtn &&
        <div className='wrapper'>
          <form onSubmit={formik.handleSubmit}>
            <div className="offcanvas-body">
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Input2
                    formik={formik}
                    name="name"
                    label={"Product name"}
                    placeholder="Enter product name"
                  />
                </div>
                <div className='w-50'>
                  <Input2
                    formik={formik}
                    name="weight"
                    label={"Weight"}
                    placeholder="Enter weight"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Select
                    formik={formik}
                    label={"Category name"}
                    options={categoryList ? [{ label: "-----Select------", value: "" }, ...categoryList] : []}
                    name="categoryId"
                  />
                </div>
                <div className='w-50'>
                  <Select
                    formik={formik}
                    label={"Sub Category name"}
                    options={subcategoryList ? [{ label: "-----Select------", value: "" }, ...subcategoryList] : []}
                    name="subCategoryId"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Input2
                    formik={formik}
                    name="base_price"
                    label={"Base price"}
                    placeholder="Enter base price"
                  />
                </div>
                <div className='w-50'>
                  <Input2
                    formik={formik}
                    name="gst"
                    label={"GST (%)"}
                    placeholder="Enter gst"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Input2
                    formik={formik}
                    name="landing_price"
                    disabled={true}
                    label={"Landing price"}
                    placeholder="Enter landing price"
                  />
                </div>
                <div className='w-50'>
                  <Input2
                    formik={formik}
                    name="min_order_qty"
                    label={"Min order quantity"}
                    placeholder="Enter min order quantity"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Input2
                    formik={formik}
                    name="max_order_qty"
                    label={"Max order quantity"}
                    placeholder="Enter max order quantity"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-15'>
                  <button type="submit" className={`btn btn-primary w-100`}> {selected && selected?._id ? "Update" : "Save"}</button>
                </div>
                <div className='w-15'>
                  <button type="button" className={`btn btn-primary w-100`} onClick={() => {
                    setShowAddBtn(true);
                    setSelected({})
                  }}>Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      }
      <div className='wrapper'>
        <TableHead count={records ? records.length : 0} totalRecords={totalRecords ? totalRecords : 0} />
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
    </>
  );
};

export default Products;