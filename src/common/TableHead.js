import React, { useState } from "react";

const TableHead = (props) => {
  let [search, setSearch] = useState("");
  return <div>
    <div className="d-flex justify-content-between align-items-center">
      {/* <div class="search d-flex">
        <i class="fa fa-search"></i>
        <input type="text" className="form-control col-md-12" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
        <button class="btn btn-primary" style={{
          position: "relative",
          right: 50
        }} onClick={(e) => props.searchItem(search)}>Search</button>
      </div> */}
      {props.count} / {props.totalCount}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() =>{ 
        props.setOpen(o => !o)}} >
        Add {props.addText}
      </button>
    </div>
  </div>
}

export default TableHead;