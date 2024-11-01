import React from "react";

const TableHead = (props) => {
  return <div>
    <div className="d-flex justify-content-between align-items-center">
      {props.count} / {props.totalRecords}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
        props.setOpen(o => !o)
      }} >
        Add {props.addText}
      </button>
    </div>
  </div>
}

export default TableHead;