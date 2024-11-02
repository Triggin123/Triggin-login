import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { GetUsers, getUsers, SaveUser, UpdateUser } from "../actions/users"
import moment from 'moment'
import { toast } from 'react-toastify';
import AddUserPopup from './AddUserPopup';
import LazyLoading from '../actions/loaders/LazyLoading'
import DotsLoader from '../actions/loaders/DotsLoader'

/**
 * @author Praveen Varma
 * @description Home page
 * @returns 
 */
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state?.user?.all);
  const [records, setRecords] = useState([])
  const save = useSelector(state => state?.user?.save)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  let [page, setPage] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const update = useSelector(state => state?.user?.update);

  useEffect(() => {
    setRecords([]);
    dispatch(getUsers({ page: page,  pageSize: pageSize }))
  }, []);

  useEffect(() => {
    if (save?.suc) {
      setRecords([]);
      setPage(1);
      dispatch(getUsers({ page: 1, pageSize:10 }))
      setOpen(false)
      toast.success(save?.msg)
      dispatch({
        type: SaveUser.RESET
      })
      if (selected?._id) {
        setSelected({})
      }
    } else if (save?.suc === false) {
      toast.error(save?.msg);
      dispatch({
        type: SaveUser.RESET
      })
    }
  }, [save]);

  useEffect(() =>{
    if(update){
      if(update?.suc){
        setOpen(false);
        toast.success(update?.msg);
        dispatch({
          type: UpdateUser.RESET
        })
        setRecords([]);
        setPage(1);
        dispatch(getUsers({ page: 1, pageSize:10 }))
        if (selected?._id) {
          setSelected({})
        }
      }else if(update?.suc === false){
        toast.error(update?.msg || "Error");
      }
    }
  }, [update])

  React.useEffect(() => {
    return () => dispatch({
      type: GetUsers.RESET
    })
  }, []);

  useEffect(() => {
    if (users && !users.loading) {
      let finalData = users && users.data && users.data.length > 0 ? users.data : [];
      setRecords([...records, ...finalData]);
      setTotalRecords(users && users.totalRecords ? users.totalRecords : 0);
    }
  }, [users])

  const columns = [
    {
      title: "Name",
      cell: (row) => {
        return <span>{row?.lname ? row?.fname+" "+row?.lname : row?.fname}</span>
      }
    },
    {
      title: "Email",
      cell: (row) => {
        return <span>{row?.email}</span>
      }
    },
    {
      title: "Phone number",
      cell: (row) => {
        return <span>{row?.phoneNumber}</span>
      }
    },
    {
      title: "Business name",
      cell: (row) => {
        return <span>{row?.businessName}</span>
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
      title: "Created By",
      cell: (row) => {
        return <span>{row?.createdBy?.fname}{" "}{row?.createdBy?.lname}</span>
      }
    },
    {
      title: "Modified By",
      cell: (row) => {
        return <span>{row?.updatedBy?.fname}{" "}{row?.updatedBy?.lname}</span>
      }
    },
    {
      title: "Status",
      cell: (row) => {
        return <span>{row?.active === true ? "Active" : "In active"}</span>
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
      {users?.loading ?
        <DotsLoader /> :
        <>
          <TableHead addText={"Users"} setOpen={setOpen} count={records ? records.length : 0} totalRecords={totalRecords ? totalRecords : 0} />
          <hr className='widget-separator'></hr>
          <DataTable loading={users?.loading} data={users?.data || []} columns={columns} />
          {open && (
            <AddUserPopup width={500} setOpen={setOpen} selected={selected} clearSelected={() => {
              setSelected({})
            }} />
          )}
          <LazyLoading
            loading={users?.loading}
            totalRecords={totalRecords}
            data={records ? records : []}
            isLastPage={records?.length >= totalRecords}
            onPagination={() => {
              if (records?.length <= totalRecords) {
                setPage(p => p + 1);
                dispatch(getUsers({ page: page + 1, pageSize }))
              }
            }}
          />
        </>
      }
    </div>
  );
};

export default Users;