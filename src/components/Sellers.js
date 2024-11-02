import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { getSellers, searchSeller, saveSeller, SaveSeller, GetSellers, SearchSeller } from "../actions/sellers"
import moment from 'moment'
import { toast } from 'react-toastify';
import LazyLoading from '../actions/loaders/LazyLoading'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Input2 } from "./form-components/Input";
import DotsLoader from '../actions/loaders/DotsLoader';

const validationSellerSearch = yup.object().shape({
  phoneNumber: yup.string().required("Phonenumber is required"),
})

const validationSellerAdd = yup.object().shape({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  phoneNumber: yup.string().required("Phonenumber is required"),
  businessName: yup.string().required("Business name is required"),
})

const Sellers = (props) => {
  const dispatch = useDispatch();
  const sellers = useSelector(state => state?.seller?.all);
  const [records, setRecords] = useState([])
  const save = useSelector(state => state?.seller?.save)
  const [selected, setSelected] = useState({});

  let [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const search_seller = useSelector(state => state?.seller?.search);

  const [showAddBtn, setShowAddBtn] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    setRecords([]);
    dispatch(getSellers({ page: page, pageSize: 10 }))
  }, []);


  useEffect(() => {
    if (search_seller) {
      if (search_seller?.suc) {
        setShowAddBtn(false);
        setIsSearch(true)
        formikAdd.setValues({
          fname: search_seller?.data?.fname,
          lname: search_seller?.data?.lname,
          phoneNumber: search_seller?.data?.phoneNumber,
          email: search_seller?.data?.email,
          businessName: search_seller?.data?.businessName,
          _id: search_seller?.data?._id || null
        });
      } else if (search_seller?.suc === false) {
        setShowAddBtn(false);
        setIsSearch(true)
        formikAdd.setValues({
          fname: "",
          lname: "",
          phoneNumber: formik?.values?.phoneNumber,
          businessName: "",
          email: "",
          _id: null
        })
      }
    }

  }, [search_seller])

  useEffect(() => {
    if (save?.suc) {
      setRecords([]);
      setPage(1);
      setShowAddBtn(true);
      setIsSearch(false);
      dispatch(getSellers({ page: 1, pageSize: 10 }))
      toast.success(save?.msg)
      dispatch({
        type: SaveSeller.RESET
      })
      dispatch({
        type: SearchSeller.RESET
      })
      if (selected?._id) {
        setSelected({})
      }
    } else if (save?.suc === false) {
      toast.error(save?.msg);
      dispatch({
        type: SaveSeller.RESET
      })
      dispatch({
        type: SearchSeller.RESET
      })
    }
  }, [save]);

  React.useEffect(() => {
    return () => dispatch({
      type: GetSellers.RESET
    })
  }, []);

  useEffect(() => {
    if (!sellers.loading) {
      let finalData = sellers && sellers.data && sellers.data.length > 0 ? sellers.data : [];
      setRecords([...records, ...finalData]);
      setTotalRecords(sellers && sellers.totalRecords ? sellers.totalRecords : 0);
    }
  }, [sellers])


  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: validationSellerSearch,
    onSubmit: (vals) => {
      let reqdata = {
        phoneNumber: vals?.phoneNumber
      }
      dispatch(searchSeller(reqdata));
    }
  })

  const formikAdd = useFormik({
    initialValues: {
      phoneNumber: "",
      businessName: "",
      email: "",
      fname: "",
      lname: "",
      _id: null
    },
    validationSchema: validationSellerAdd,
    onSubmit: (vals) => {
      let reqdata = {
        ...vals
      }
      dispatch(saveSeller(reqdata));
    }
  })

  const columns = [
    {
      title: "Name",
      cell: (row) => {
        return <span>{row?.sellerId?.fname}{" "}{row?.buyerId?.lname || ""}</span>
      }
    },
    {
      title: "Email",
      cell: (row) => {
        return <span>{row?.sellerId?.email}</span>
      }
    },
    {
      title: "Mobile",
      cell: (row) => {
        return <span>{row?.sellerId?.phoneNumber}</span>
      }
    },
    {
      title: "Business name",
      cell: (row) => {
        return <span>{row?.sellerId?.businessName}</span>
      }
    },
    {
      title: "Created Date",
      cell: (row) => {
        return <span>{moment(row?.createdDate).format("DD-MM-YYYY HH:mm")}</span>
      }
    },
    {
      title: "Status",
      cell: (row) => {
        return <span>{row?.sellerId?.active ? "Active" : "In active"}</span>
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
            setShowAddBtn((pre) => !pre);
          }} >Add Seller</button>
        </div>
      }
      {!showAddBtn &&
        <div className='wrapper'>
          <form onSubmit={formik.handleSubmit}>
            <div className="offcanvas-body">
              <div className='d-flex gap1'>
                <div className='w-15'>
                  <Input2
                    formik={formik}
                    name="phoneNumber"
                    label={"Search Seller"}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-15'>
                  <button type="submit" className={`btn btn-primary w-15`}>Search</button>
                </div>
                <div className='w-15'>
                  <button type="button" className={`btn btn-primary w-15`} onClick={() => {
                    setShowAddBtn(true);
                    setIsSearch(false);
                  }}>Cancel</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      }


      {isSearch &&
        <div className='wrapper'>
          <form onSubmit={formikAdd.handleSubmit}>
            <div className="offcanvas-body">
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Input2
                    formik={formikAdd}
                    disabled={formikAdd?.values?._id}
                    name="fname"
                    label={"First name"}
                    placeholder="Enter first name"
                  />
                </div>
                <div className='w-50'>
                  <Input2
                    formik={formikAdd}
                    disabled={formikAdd?.values?._id}
                    name="lname"
                    label={"Last name"}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Input2
                    formik={formikAdd}
                    disabled={formikAdd?.values?._id}
                    name="email"
                    label={"Email"}
                    placeholder="Enter email"
                  />
                </div>
                <div className='w-50'>
                  <Input2
                    formik={formikAdd}
                    disabled={formikAdd?.values?._id || (search_seller?.suc === false && formik?.values?.phoneNumber)}
                    name="phoneNumber"
                    label={"Mobile"}
                    placeholder="Enter mobile"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-50'>
                  <Input2
                    formik={formikAdd}
                    disabled={formikAdd?.values?._id}
                    name="businessName"
                    label={"Business name"}
                    placeholder="Enter business name"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-15'>
                  <button type="submit" className={`btn btn-primary w-20`}>Add</button>
                </div>
                <div className='w-15'>
                  <button type="button" className={`btn btn-primary w-20`} onClick={() => {
                    setShowAddBtn(true);
                    setIsSearch(false);
                  }}>Cancel</button>
                </div>
              </div>
            </div>
          </form>

        </div>
      }

      <div className='wrapper'>
        <>
          {sellers?.loading ?
            <DotsLoader /> :
            <>
              <TableHead addText={""} count={records ? records.length : 0} totalRecords={totalRecords ? totalRecords : 0} />
              <hr className='widget-separator'></hr>
              <DataTable loading={sellers?.loading} data={sellers?.data || []} columns={columns} />

              <LazyLoading
                loading={sellers?.loading}
                totalRecords={totalRecords}
                data={records ? records : []}
                isLastPage={records?.length >= totalRecords}
                onPagination={() => {
                  if (records?.length <= totalRecords) {
                    setPage(p => p + 1);
                    dispatch(getSellers({ page: page + 1 }))
                  }
                }}
              />
            </>}
        </>
      </div>
    </>
  );
};

export default Sellers;