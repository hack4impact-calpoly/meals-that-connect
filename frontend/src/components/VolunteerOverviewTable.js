import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout } from 'react-table'
import '../css/volunteerTable.css'
import env from "react-dotenv";

const Styles = styled.div`
  table {
    margin-top: 100px;
    border-spacing: 0;
    border: 1px solid black;
    font-family: 'Mulish', sans-serif;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;
      font-size: 20px;

      :last-child {
        border-right: 0;
      }
    }
    th {
      padding: 0.5rem;
      background: #D4D4D4;
      color: black;
      fontWeight: bold;
    }
  }
`

const EditableCell = ({
  cellProperties,
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  console.log(cellProperties)
  return <input value={value}/>
}

const VolunteerOverviewData = (props) => {
  const columns = React.useMemo(
      () => [
      {
      Header: 'Volunteer Overview',
      columns: [
          { Header: 'First Name',
          accessor: 'firstName',
          Cell: (cellProperties) => { EditableCell(cellProperties) }
            // var changedFlag = false;
            // const email = cellProperties["email"]
            // const key = cellProperties["column"]["id"]
            // console.log(cellProperties)
            // const [value, setValue] = React.useState(cellProperties["value"])
            // return (
            //     <input id="name" value={value} onChange={e => setValue(e.target.value)} onBlur={e => updateDatabase(email, key, e.target.value, changedFlag)}/>
            // )
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
                <input id="name" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'Org.',
          accessor: 'org',
          width: 100,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="data" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'Phone',
          accessor: 'phoneNumber',
          width: 300,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="contact" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'Email',
          accessor: 'email',
          width: 300,
          Cell: (cellProperties) => {
            const [value] = React.useState(cellProperties["value"])
            return (
              <input id="contact" value={value} readOnly/>
            )
          }
          },
          { Header: 'Using Digital System?',
          accessor: 'digitalSystem',
          width: 100,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="data" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'M',
          accessor: 'monday',
          width: 100,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="data" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'T',
          accessor: 'tuesday',
          width: 100,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="data" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'W',
          accessor: 'wednesday',
          width: 100,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="data" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'Th',
          accessor: 'thursday',
          width: 100,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="data" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'F',
          accessor: 'friday',
          width: 100,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="data" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'Volunteer Certificate Signed?',
          accessor: 'completedOrientation',
          width: 130,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="role" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'Role',
          accessor: 'role',
          width: 130,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="role" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          { Header: 'Notes',
          accessor: 'notes',
          width: 270,
          Cell: (cellProperties) => {
            const [value, setValue] = React.useState(cellProperties["value"])
            return (
              <input id="contact" value={value} onChange={e => setValue(e.target.value)} onBlur={updateDatabase()}/>
            )
          }
          },
          
      ],},
      
      ],
      []
  )

  const updateDatabase = async (email, key, value, changed) => {
    if (changed !== false) {
      const updateData = {
        email: email,
        key: key,
        value: value
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
  
  const data = React.useMemo(() => props.data, []);

  return (
  <Styles>
    <VolunteerOverviewTable columns={columns} data={data}/>
  </Styles>
  )
}

function VolunteerOverviewTable({ columns, data}) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 10,
      width: 200,
      maxWidth: 270,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow} = useTable({
    columns,
    data,
    defaultColumn,
    },
    useBlockLayout
    )

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
              return <td>{cell.render('Cell', {email: row["original"]["email"], value: cell["value"]})}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerOverviewData;
