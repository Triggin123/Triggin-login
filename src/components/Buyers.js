import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { getBuyers, searchBuyer, saveBuyer, SaveBuyer, GetBuyers } from "../actions/buyers"
import moment from 'moment'
import { toast } from 'react-toastify';
import LazyLoading from '../actions/loaders/LazyLoading'
import { useFormik } from "formik";
import { Input2 } from "./form-components/Input";

const Buyers = (props) => {
  const dispatch = useDispatch();
  const buyers = useSelector(state => state?.buyer?.all);
  const [records, setRecords] = useState([])
  const save = useSelector(state => state?.user?.save)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  let [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(11);

  const search_user = useSelector(state => state?.buyer?.search);

  const [isSearchFound, setIssearchFound] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setRecords([]);
    dispatch(getBuyers({page:page}))
  }, []);


  useEffect(() => {
    if(search_user){
      if (search_user?.suc) {
        setShowAdd(true)
        formikAdd.setValues({
          name: search_user?.data?.name,
          phoneNumber: search_user?.data?.phoneNumber,
          email: search_user?.data?.email,
          _id:search_user?.data?._id
        });
      } else {
        setShowAdd(true)
        formikAdd.setValues({
          name: "",
          phoneNumber: "",
          email: "",
          _id:""
        })
      }
    }
    
  }, [search_user])

  useEffect(() => {
    if (save?.suc) {
      setRecords([]);
      setPage(1);
      dispatch(getBuyers({ page: 1 }))
      setOpen(false)
      toast.success(save?.msg)
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
      businessName:"",
      email:"",
      name:"",
      _id:""
    },
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
        return <span>{row?.buyerId?.name}{" "}</span>
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
                name="phoneNumber"
                label={"Search Buyer"}
                placeholder="Enter phone number"
              />
            </div>
            <div className='w-50'>
              <button type="submit" className={`btn btn-primary w-100`}>Search</button>
            </div>
          </div>
        </div>
      </form>
      <hr/>
      {showAdd &&
        <form onSubmit={formikAdd.handleSubmit}>
          <div className="">
            <div className='d-flex gap1'>
              <div className='w-50'>
                <Input2
                  formik={formikAdd}
                  disabled={formikAdd?.values?._id}
                  name="phoneNumber"
                  label={"Mobile"}
                  placeholder="Enter mobile"
                />
              </div>
              <div className='w-50'>
                <Input2
                  formik={formikAdd}
                  disabled={formikAdd?.values?._id}
                  name="name"
                  label={"Name"}
                  placeholder="Enter name"
                />
              </div>
              <div className='w-50'>
                <Input2
                  formik={formikAdd}
                  disabled={formikAdd?.values?._id}
                  name="email"
                  label={"Email"}
                  placeholder="Enter Email"
                />
              </div>
              <div className='w-50'>
                <Input2
                  formik={formikAdd}
                  name="businessName"
                  label={"Business name"}
                  placeholder="Enter Businessname"
                />
              </div>
              <div className='w-50'>
                <button type="submit" className={`btn btn-primary w-100`}>Add</button>
              </div>
            </div>
          </div>
        </form>
      }

      <TableHead addText={"Buyers"} setOpen={setOpen} count={records ? records.length : 0} totalCount={totalRecords ? totalRecords : 0} />
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
    </div>
  );
};

export default Buyers;