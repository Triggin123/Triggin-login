import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../common/DataTable";
import TableHead from "../common/TableHead"
import { GetUsers, getUsers, SaveUser} from "../actions/users"
import moment from 'moment'
import { toast } from 'react-toastify';
import AddUserPopup from './AddUserPopup';
import LazyLoading from '../actions/loaders/LazyLoading'

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state?.user?.all);
  const [records, setRecords] = useState([])
  const save = useSelector(state => state?.user?.save)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  let [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(11);

  useEffect(() => {
    setRecords([]);
    dispatch(getUsers({page:page}))
  }, []);

  useEffect(() => {
    if (save?.success) {
      setRecords([]);
      setPage(1);
      dispatch(getUsers({page:1}))
      setOpen(false)
      toast.success(save?.msg)
      dispatch({
        type: SaveUser.RESET
      })
      if (selected?._id) {
        setSelected({})
      }
    } else if(save?.success === false){
      toast.error(save?.msg);
      dispatch({
        type: SaveUser.RESET
      })
    }
  }, [save]);

  React.useEffect(() => {
    return () => dispatch({
      type: GetUsers.RESET
    })
  }, []);

  useEffect(() =>{
    if (!users.loading) {
      let finalData = users && users.data && users.data.length > 0 ? users.data : [];
      setRecords([...records, ...finalData]);
      setTotalRecords(users && users.totalRecords ? users.totalRecords : 0);
    }
  },[users])

  const columns = [
    {
      title: "Name",
      cell: (row) => {
        return <span>{row?.name}{" "}</span>
      }
    },
    {
      title: "Email",
      cell: (row) => {
        return <span>{row?.email}</span>
      }
    },
    {
      title: "Mobile",
      cell: (row) => {
        return <span>{row?.phoneNumber}</span>
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
        return <span>{row?.modifiedBy?.fname}{" "}{row?.modifiedBy?.lname}</span>
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
      <TableHead addText={"Users"} setOpen={setOpen} count={records ? records.length: 0} totalCount={totalRecords ? totalRecords :0}/>
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
        data={records? records:[]}
        isLastPage={records?.length >= totalRecords}
        onPagination={() => {
          if (records?.length <= totalRecords) {
            setPage(p => p + 1);
            dispatch(getUsers({page:page+1}))
          }
        }}
      />
    </div>
  );
};

export default Users;