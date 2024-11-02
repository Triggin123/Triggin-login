import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { getBuyers, searchBuyer, saveBuyer, SaveBuyer, GetBuyers, SearchBuyer } from "../actions/buyers"
import moment from 'moment'
import { toast } from 'react-toastify';
import LazyLoading from '../actions/loaders/LazyLoading'
import { useFormik } from "formik";
import * as yup from 'yup';
import { Input2 } from "./form-components/Input";
import DotsLoader from '../actions/loaders/DotsLoader';

const validationBuyyerSearch = yup.object().shape({
  phoneNumber: yup.string().required("Phonenumber is required"),
})

const validationBuyyerAdd = yup.object().shape({
  fname:yup.string().required("First name is required"),
  lname:yup.string().required("Last name is required"),
  email:yup.string().required("Email is required"),
  phoneNumber: yup.string().required("Phonenumber is required"),
  businessName:yup.string().required("Business name is required"),
})

const Buyers = (props) => {
  const dispatch = useDispatch();
  const buyers = useSelector(state => state?.buyer?.all);
  const [records, setRecords] = useState([])
  const save = useSelector(state => state?.buyer?.save)
  const [selected, setSelected] = useState({});

  let [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const search_buyer = useSelector(state => state?.buyer?.search);

  const [showAddBtn, setShowAddBtn] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    setRecords([]);
    dispatch(getBuyers({ page: page, pageSize: 10 }))
  }, []);


  useEffect(() => {
    if (search_buyer) {
      if (search_buyer?.suc) {
        setShowAddBtn(false);
        setIsSearch(true)
        formikAdd.setValues({
          fname: search_buyer?.data?.fname,
          lname: search_buyer?.data?.lname,
          phoneNumber: search_buyer?.data?.phoneNumber,
          email: search_buyer?.data?.email,
          businessName: search_buyer?.data?.businessName,
          _id: search_buyer?.data?._id || null
        });
      } else if (search_buyer?.suc === false) {
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
  }, [search_buyer])

  useEffect(() => {
    if (save?.suc) {
      setRecords([]);
      setPage(1);
      setShowAddBtn(true);
      setIsSearch(false);
      dispatch(getBuyers({ page: 1, pageSize:10 }))
      toast.success(save?.msg)
      dispatch({
        type: SearchBuyer.RESET
      })
      dispatch({
        type: SaveBuyer.RESET
      })
      if (selected?._id) {
        setSelected({})
      }
    } else if (save?.suc === false) {
      toast.error(save?.msg);
      dispatch({
        type: SaveBuyer.RESET
      })
      dispatch({
        type: SearchBuyer.RESET
      })
    }
  }, [save]);

  React.useEffect(() => {
    return () => dispatch({
      type: GetBuyers.RESET
    })
  }, []);

  useEffect(() => {
    if (!buyers.loading) {
      let finalData = buyers && buyers.data && buyers.data.length > 0 ? buyers.data : [];
      setRecords([...records, ...finalData]);
      setTotalRecords(buyers && buyers.totalRecords ? buyers.totalRecords : 0);
    }
  }, [buyers])


  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: validationBuyyerSearch,
    onSubmit: (vals) => {
      let reqdata = {
        phoneNumber: vals?.phoneNumber
      }
      dispatch(searchBuyer(reqdata));
    }
  })

  const formikAdd = useFormik({
    initialValues: {
      phoneNumber: "",
      businessName: "",
      email: "",
      fname: "",
      lname:"",
      _id: null
    },
    validationSchema : validationBuyyerAdd,
    onSubmit: (vals) => {
      let reqdata = {
        ...vals
      }
      dispatch(saveBuyer(reqdata));
    }
  })

  const columns = [
    {
      title: "Name",
      cell: (row) => {
        return <span>{row?.buyerId?.fname}{" "}{row?.buyerId?.lname || ""}</span>
      }
    },
    {
      title: "Email",
      cell: (row) => {
        return <span>{row?.buyerId?.email}</span>
      }
    },
    {
      title: "Mobile",
      cell: (row) => {
        return <span>{row?.buyerId?.phoneNumber}</span>
      }
    },
    {
      title: "Business name",
      cell: (row) => {
        return <span>{row?.buyerId?.businessName}</span>
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
        return <span>{row?.buyerId?.active ? "Active" : "In active"}</span>
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

          }} >Add Buyer</button>

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
                    label={"Search Buyer"}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className='d-flex gap1'>
                <div className='w-15'>
                  <button type="submit" className={`btn btn-primary w-15`}>Search</button>
                </div>
                <div className='w-15'>
                  <button type="button" className={`btn btn-primary w-15`} onClick={() =>{
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
                    disabled={formikAdd?.values?._id || (search_buyer?.suc === false && formik?.values?.phoneNumber)}
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
          {buyers?.loading ?
            <DotsLoader /> :
            <>
              <TableHead addText={""} count={records ? records.length : 0} totalRecords={totalRecords ? totalRecords : 0} />
              <hr className='widget-separator'></hr>
              <DataTable loading={buyers?.loading} data={buyers?.data || []} columns={columns} />
              <LazyLoading
                loading={buyers?.loading}
                totalRecords={totalRecords}
                data={records ? records : []}
                isLastPage={records?.length >= totalRecords}
                onPagination={() => {
                  if (records?.length <= totalRecords) {
                    setPage(p => p + 1);
                    dispatch(getBuyers({ page: page + 1 }))
                  }
                }}
              />
            </>}
        </>
      </div>
    </>
  );
};

export default Buyers;