import React, { Component } from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table'
import env from "react-dotenv";
import Moment from 'moment';

const Styles = styled.div`
  margin-left: 30px;
  width: 90%;
  table {
    border-spacing: 0;
    width: 100%; 
    border: solid 2px #142850;
    tr {  
      :last-child {
        td {
          border-bottom: 1;
          flex-direc  
        }
      }
    }
    th {
        background: #b7f8ac;
        color: black;
        border: solid 1px #142850;
        textAlign: column.textAlign;
        fontWeight: bold;
        text-align: center;
        minWidth: 80px;
        padding: 3px 20px;
        font-size: 24px;
    }
    td {
        padding: 3px 20px;
        border: solid 1px gray;
        background: white;
        overflow: auto;
        font-size: 22px;
      :last-child {
        border-right: 0;
      }
    }
  }
`

const EditableCell = (cellProperties, width) => {
    // We need to keep and update the state of the cell normally
    var changedFlag = false;
    let email = ""
    let column = cellProperties["column"]["Header"];
    const key = cellProperties["column"]["id"];
    const [value, setValue] = React.useState(cellProperties["value"]);
  
    const handleChange = (targetValue) => {
      setValue(targetValue);
    }
  
    const updateDatabase = async (emailD, keyD, valueD, changed) => {
      if (changed !== false) {
        const updateData = {
          email: emailD,
          key: keyD,
          value: valueD
        }
        await fetch(env.backendURL + 'volunteers/insertURL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
      }
      return 0
    }
    if (column == 'Date') {
      return (
          <span><input style={{width: width - 1.25, textAlign: 'center'}} type="date" defaultValue={value.slice(0,10)} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(email, key, e.target.value, changedFlag)}/></span>
      )
    }
    else {
      return (
        <span><input style={{width: width - 1.25, textAlign: 'center'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(email, key, e.target.value, changedFlag)}/></span>
    )
    }
}

function HourLog({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow} = useTable({
      columns,
      data,
      })
  
    // Render the UI for your table
    return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td>{cell.render('Cell', {value: cell["value"], original: row["original"], hours: row["original"]["_id"], key: cell["column"]["id"]})}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
   )
  }

const Table = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Hours Logged',
        columns: [
          {
            Header: 'Date',
            accessor: 'date',
            Cell: (cellProperties) => EditableCell(cellProperties, 300)
          },
          {
            Header: 'Hours',
            accessor: 'home',
            Cell: (cellProperties) => EditableCell(cellProperties, 300)
          },
        ],
      },          
      { Header: 'Delete',
        Cell: row => (<div style={{textAlign: 'center', alignItems: 'center'}} onClick={() => deleteLog(row.row.original, props)}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></div>)
    },
    ],
    []
  )

function deleteLog(data, props) {
  fetch(env.backendURL + 'hours/delete', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .catch(err => {
      console.log("Error")
  })
  window.location.reload();
}

  return (
    <Styles>
    <HourLog columns={columns} data={props.data} />
    </Styles>
  )
}

export default Table;