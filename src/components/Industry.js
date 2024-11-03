import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIndustries, GetIndustries, saveIndustries, SaveIndustries } from "../actions/master";
import DataTable from "../common/DataTable";
import { useFormik } from "formik";
import TableHead from "../common/TableHead"
import moment from 'moment'
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Input2 } from "./form-components/Input";
import LazyLoading from '../actions/loaders/LazyLoading'

const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
})

const Industry = (props) => {
    const dispatch = useDispatch();
    const industry_all = useSelector(state => state?.master?.industry_all);
    const [records, setRecords] = useState([])
    const save = useSelector(state => state?.master?.industry_save)
    let [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selected, setSelected] = useState({});

    useEffect(() => {
        setRecords([]);
        dispatch(getIndustries({ page: page, pageSize: 100 }))
    }, []);

    React.useEffect(() => {
        return () => dispatch({
            type: GetIndustries.RESET
        })
    }, [])

    useEffect(() => {
        if (!industry_all.loading) {
            let finalData = industry_all && industry_all.data && industry_all.data.length > 0 ? industry_all.data : [];
            setRecords([...records, ...finalData]);
            setTotalRecords(industry_all && industry_all.totalRecords ? industry_all.totalRecords : 0);
        }
    }, [industry_all]);


    useEffect(() => {
        if (save?.suc) {
            formik.resetForm()
            setRecords([]);
            setPage(1);
            dispatch(getIndustries({ page: 1, pageSize: 100 }))
            toast.success(save?.msg)
            dispatch({
                type: SaveIndustries.RESET
            })
            if (selected?._id) {
                setSelected({})
            }
        } else if (save?.suc === false) {
            toast.error(save?.msg);
            dispatch({
                type: SaveIndustries.RESET
            })
        }
    }, [save]);

    const formik = useFormik({
        initialValues: {
            name: "",
            _id: null
        },
        validationSchema: validationSchema,
        onSubmit: (vals) => {
            let reqdata = {
                name: vals?.name,
            }
            if (selected && selected?._id) {
                reqdata._id = selected?._id;
                dispatch(saveIndustries(reqdata))
            } else {
                dispatch(saveIndustries(reqdata))
            }
        }
    })

    useEffect(() => {
        if (selected?._id) {
            formik.setValues({
                _id: selected?._id,
                name: selected?.name,
            });
        }
    }, [selected]);

    const columns = [
        {
            title: "Name",
            cell: (row) => {
                return <span>{row?.name}</span>
            }
        },
        {
            title: "Created Date",
            cell: (row) => {
                return <span>{moment(row?.createdDate).format("DD-MM-YYYY HH:mm")}</span>
            }
        },
        {
            title: "Updated Date",
            cell: (row) => {
                return <span>{moment(row?.updatedDate).format("DD-MM-YYYY HH:mm")}</span>
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
            <div className='wrapper'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="offcanvas-body">
                        <div className='d-flex gap1'>
                            <div className='w-50'>
                                <Input2
                                    formik={formik}
                                    name="name"
                                    label={"Industry name"}
                                    placeholder="Enter industry name"
                                />
                            </div>
                        </div>
                        <div className='d-flex gap1'>
                            <div className='w-15'>
                                <button type="submit" className={`btn btn-primary w-100`}> {selected && selected?._id ? "Update" : "Save"}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='wrapper'>
                <TableHead addText={""} count={records ? records.length : 0} totalRecords={totalRecords ? totalRecords : 0} />
                <hr className='widget-separator'></hr>
                <DataTable loading={industry_all?.loading} data={industry_all?.data || []} columns={columns} />
                <LazyLoading
                    loading={industry_all?.loading}
                    totalRecords={totalRecords}
                    data={records ? records : []}
                    isLastPage={records?.length >= totalRecords}
                    onPagination={() => {
                        if (records?.length <= totalRecords) {
                            setPage(p => p + 1);
                            dispatch(getIndustries({ page: page + 1 }))
                        }
                    }}
                />
            </div>
        </>
    );
}
export default Industry;