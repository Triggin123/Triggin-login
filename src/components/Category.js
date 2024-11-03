import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIndustries, GetIndustries, saveCategories, SaveCategories } from "../actions/master";
import DataTable from "../common/DataTable";
import { useFormik } from "formik";
import TableHead from "../common/TableHead"
import Select from "./form-components/Select";
import moment from 'moment'
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Input2 } from "./form-components/Input";
import LazyLoading from '../actions/loaders/LazyLoading'

const validationSchema = yup.object().shape({
    industryTypeId: yup.string().required("Industry is required"),
    name: yup.string().required("Name is required"),
})

const Category = (props) => {
    const dispatch = useDispatch();
    const industry_all = useSelector(state => state?.master?.industry_all);
    const [records, setRecords] = useState([])
    const save = useSelector(state => state?.master?.category_save)
    let [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selected, setSelected] = useState({});
    const [industryList, setIndustryList] = useState([])

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
            let list = industry_all?.data?.map(itm => {
                return {
                    label: itm.name,
                    value: itm._id
                }
            })
            setIndustryList(list);
        }
    }, [industry_all])

    const formik = useFormik({
        initialValues: {
            name: "",
            _id: null,
            industryTypeId: ""
        },
        validationSchema: validationSchema,
        onSubmit: (vals) => {
            let reqdata = {
                name: vals?.name,
                industryTypeId: vals?.industryTypeId || null
            }
            if (selected && selected?._id) {
                reqdata._id = selected?._id;
                dispatch(saveCategories(reqdata))
            } else {
                dispatch(saveCategories(reqdata))
            }
        }
    })

    useEffect(() => {
        if (save?.suc) {
            formik.resetForm()
            setRecords([]);
            setPage(1);
            dispatch(getIndustries({ page: 1, pageSize: 100 }))
            toast.success(save?.msg)
            dispatch({
                type: SaveCategories.RESET
            })
            if (selected?._id) {
                setSelected({})
            }
        } else if (save?.suc === false) {
            toast.error(save?.msg);
        }
    }, [save]);


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
                                <Select
                                    formik={formik}
                                    label={"Industry name"}
                                    options={industryList ? [{ label: "-----Select------", value: "" }, ...industryList] : []}
                                    name="industryTypeId"
                                />
                            </div>
                        </div>
                        {formik?.values?.industryTypeId &&
                            <>
                                <div className='d-flex gap1'>
                                    <div className='w-50'>
                                        <Input2
                                            formik={formik}
                                            name="name"
                                            label={"Category name"}
                                            placeholder="Enter category name"
                                        />
                                    </div>
                                </div>
                                <div className='d-flex gap1'>
                                    <div className='w-15'>
                                        <button type="submit" className={`btn btn-primary w-100`}> {selected && selected?._id ? "Update" : "Save"}</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </form>
            </div>
            {false &&
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
            }
        </>
    );
}
export default Category;