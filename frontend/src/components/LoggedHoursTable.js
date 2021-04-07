import React, { Component } from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table'
import env from "react-dotenv";

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
    const email = cellProperties["email"];
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
  
    return (
        <span><input style={{width: width - 1.25}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(email, key, e.target.value, changedFlag)}/></span>
    )
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
            Cell: (cellProperties) => EditableCell(cellProperties, 200)
          },
          {
            Header: 'Hours',
            accessor: 'hours',
            Cell: (cellProperties) => EditableCell(cellProperties, 200)
          },
        ],
      }
    ],
    []
  )
    
const data = React.useMemo(() => props.data, [] )

  return (
    <Styles>
    <HourLog columns={columns} data={props.data} />
    </Styles>
  )
}

export default Table;