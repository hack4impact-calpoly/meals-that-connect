import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
  margin-top: 200px;
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
    var changedFlag = false;
    const date = cellProperties["date"];
    const hours = cellProperties["hours"];
    const key = cellProperties["column"]["id"];
    const [value, setValue] = React.useState(cellProperties["value"]);
    
    const handleChange = (targetValue) => {
    setValue(targetValue);
  }

//   const updateDatabase = async (firstNameD, lastNameD, keyD, valueD, changed) => {
//     if (changed !== false) {
//       console.log("yup")
//       const updateData = {
//         firstName: firstNameD,
//         lastName: lastNameD,
//         key: keyD,
//         value: valueD
//       }
//       await fetch(env.backendURL + 'volunteers/insertURL', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(updateData)
//       })
//     }
//     return 0
//   }

  return (
      <span><input style={{height: "30px", width:"100px", margin: '-5px'}} value={value} onChange={e => handleChange(e.target.value)}/></span>
    //   <span><input style={{width: width +20, margin: '-5px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(firstName, lastName, key, e.target.value, changedFlag)}/></span>
  )
};

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
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
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  
  const LogHours = (props) => {
    const columns = React.useMemo(
      () => [
        {
          Header: 'Date',
          accessor: 'date',
          Cell: (cellProperties) => EditableCell(cellProperties, 100),
        },
        {
          Header: 'Hours',
          accessor: 'hours',
          Cell: (cellProperties) => EditableCell(cellProperties, 100),
        },
      ],
      []
    )

    const filler = [
        {
            date: "John"
        }
    ]
  
    const data = React.useMemo(() => filler, [])
  
    return (
      <Styles>
        <div>
            <Table columns={columns} data={data} />
        </div>
      </Styles>
    )
  }

  export default LogHours;