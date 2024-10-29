import React from "react";

const DataTable = ({ data, columns, loading }) => {
	return <div className="table-responsive mt-4">
		{/* {loading ? <div className="no-data">
			loading...
		</div> :
			<table className="table table-striped">
				<thead>
					<tr>
						{columns?.map(ele => <th>{ele.title}</th>)}
					</tr>
				</thead>
				<tbody>
					{data?.map(itm => <tr>{columns?.map(ele => <td>{ele.cell ? ele.cell(itm) : itm[ele.key]}</td>)}</tr>)}
				</tbody>
			</table>} */}

<table className="table table-striped">
				<thead>
					<tr>
						{columns?.map(ele => <th>{ele.title}</th>)}
					</tr>
				</thead>
				<tbody>
					{data?.map(itm => <tr>{columns?.map(ele => <td>{ele.cell ? ele.cell(itm) : itm[ele.key]}</td>)}</tr>)}
				</tbody>
			</table>
	</div>
}

export default DataTable;