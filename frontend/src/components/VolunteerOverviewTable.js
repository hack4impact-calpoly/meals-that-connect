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

const EditableCell = (cellProperties) => {
  // We need to keep and update the state of the cell normally
  var changedFlag = false;
  const email = cellProperties["email"]
  const key = cellProperties["column"]["id"]
  const [value, setValue] = React.useState(cellProperties["value"])

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
      <input value={value} onChange={e => setValue(e.target.value)} onBlur={e => updateDatabase(email, key, e.target.value, changedFlag)}/>
  )
}

const VolunteerOverviewData = (props) => {
  const columns = React.useMemo(
      () => [
      {
      Header: 'Volunteer Overview',
      columns: [
          { Header: 'First Name',
          accessor: 'firstName',
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Org.',
          accessor: 'org',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Phone',
          accessor: 'phoneNumber',
          width: 300,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Email',
          accessor: 'email',
          width: 300,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Using Digital System?',
          accessor: 'digitalSystem',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'M',
          accessor: 'monday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'T',
          accessor: 'tuesday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'W',
          accessor: 'wednesday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Th',
          accessor: 'thursday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'F',
          accessor: 'friday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Volunteer Certificate Signed?',
          accessor: 'completedOrientation',
          width: 130,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Role',
          accessor: 'role',
          width: 130,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          { Header: 'Notes',
          accessor: 'notes',
          width: 270,
          Cell: (cellProperties) => EditableCell(cellProperties)
          },
          
      ],},
      
      ],
      []
  )
  
  const data = React.useMemo(() => props.data, []);

  return (
  <Styles>
    <VolunteerOverviewTable columns={columns} data={data}/>
  </Styles>
  )
}

function VolunteerOverviewTable({ columns, data }) {
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
