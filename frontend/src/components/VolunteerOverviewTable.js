import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout } from 'react-table'
import '../css/volunteerTable.css'
import env from "react-dotenv";

const TEXT_TYPE = "type";

const Styles = styled.div`
 table {
   margin-top: 30px;
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

const EditableCell = (cellProperties, width, type, dayAvailability) => {
  // We need to keep and update the state of the cell normally
  var useStateCall;
  const email = cellProperties["email"];

  if (dayAvailability != null)
  {
    if (cellProperties["original"]["availability"] === null)
    {
      useStateCall = cellProperties["value"];
    }
    else
    {
      useStateCall = cellProperties["original"]["availability"][dayAvailability];
    }
  }
  else
  {
    useStateCall = cellProperties["value"];
  }

  const [value, setValue] = React.useState(useStateCall);
  var [selected, setSelected] = React.useState(value);

  const handleChange = (targetValue) => {
    setValue(targetValue);
  }

  const updateDatabase = async () => {
    return 0
  }

  const updateCheckbox = async () => {
    setSelected(!selected);
  }

  if (type === "checkbox")
  {
    return (
        <span><input type={type} style={{width: width - 1}} checked={selected} onChange={e => updateCheckbox()}/></span>
    )
  }
  else
  {
    return (
        <span><input type={type} style={{width: width - 1}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase()}/></span>
    )
  }

}

const VolunteerOverviewData = (props) => {
  const columns = React.useMemo(
      () => [
      {
      Header: 'Volunteer Overview',
      columns: [
          {
            Header: 'Remove Volunteer',
            width: 100,
            Cell: (cellProperties) => <div style={{width: 99, cursor: 'pointer'}} onClick={e => deleteVolunteer(cellProperties)}>Remove</div> 
          },
          { Header: 'First Name',
          accessor: 'firstName',
          Cell: (cellProperties) => EditableCell(cellProperties, 200, TEXT_TYPE, null)
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          Cell: (cellProperties) => EditableCell(cellProperties, 200, TEXT_TYPE, null)
          },
          { Header: 'Org.',
          accessor: 'site',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null)
          },
          { Header: 'Phone',
          accessor: 'phoneNumber',
          width: 300,
          Cell: (cellProperties) => EditableCell(cellProperties, 300, "tel", null)
          },
          { Header: 'Email',
          accessor: 'email',
          width: 300,
          Cell: row => <div style={{width: 299}}>{row.row.original.email}</div>
          },
          { Header: 'Using Digital System?',
          accessor: 'digitalSystem',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 90, "checkbox", null)
          },
          { Header: 'M',
          accessor: 'monday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 90, "checkbox", 'M')
          },
          { Header: 'T',
          accessor: 'tuesday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 90, "checkbox", 'T')
          },
          { Header: 'W',
          accessor: 'wednesday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 90, "checkbox", 'W')
          },
          { Header: 'Th',
          accessor: 'thursday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 90, "checkbox", 'Th')
          },
          { Header: 'F',
          accessor: 'friday',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 90, "checkbox", 'F')
          },
          { Header: 'Volunteer Certificate Signed?',
          accessor: 'completedOrientation',
          width: 130,
          Cell: (cellProperties) => EditableCell(cellProperties, 120, "checkbox", null)
          },
          { Header: 'Role',
          accessor: 'role',
          width: 130,
          Cell: (cellProperties) => EditableCell(cellProperties, 130, TEXT_TYPE, null)
          },
          { Header: 'Notes',
          accessor: 'notes',
          width: 270,
          Cell: (cellProperties) => EditableCell(cellProperties, 270, TEXT_TYPE, null)
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

async function deleteVolunteer(cellProperties)
{
  const email = cellProperties["email"]
  const deleteData = {
    email: email,
  }

  await fetch(env.backendURL + 'volunteers/volunteerDelete', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteData)
  })
  window.location.reload();
}

function VolunteerOverviewTable({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 10,
      width: 200,
      maxWidth: 300,
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
              return <td>{cell.render('Cell', {email: row["original"]["email"], value: cell["value"], original: row["original"]})}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerOverviewData;
