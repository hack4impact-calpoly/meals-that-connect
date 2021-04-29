import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout } from 'react-table'
import '../../../css/volunteerTable.css'

const TEXT_TYPE = "type";
const CELL_HEIGHT = 55;
const BOOL_HEIGHT = 70;

const Styles = styled.div`
 table {
   padding-right: 100;
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
     height: ${CELL_HEIGHT};
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
        <input type={type} style={{width: width-10, boxShadow: 'none'}} checked={selected} onChange={e => updateCheckbox()}/>
    )
  }
  else
  {
    return (
        <input type={type} style={{width: width,height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase()}/>
    )
  }

}

const VolunteerOverviewData = (props) => {
  const columns = React.useMemo(
      () => [
      {
      Header: 'Volunteer Overview',
      columns: [
          { Header: 'First Name',
          accessor: 'firstName',
          width: 200,
          Cell: (cellProperties) => EditableCell(cellProperties, 199, TEXT_TYPE, null)
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          width: 200,
          Cell: (cellProperties) => EditableCell(cellProperties, 199, TEXT_TYPE, null)
          },
          { Header: 'Org.',
          accessor: 'site',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 99, TEXT_TYPE, null)
          },
          { Header: 'Phone',
          accessor: 'phoneNumber',
          width: 300,
          Cell: (cellProperties) => EditableCell(cellProperties, 299, "tel", null)
          },
          { Header: 'Email',
          accessor: 'email',
          width: 350,
          Cell: row => <div style={{width: 349}}>{row.row.original.email}</div>
          },
          { Header: 'Using Digital System?',
          accessor: 'digitalSystem',
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 99, "checkbox", null)
          },
          { Header: 'M',
          accessor: 'monday',
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'M')
          },
          { Header: 'T',
          accessor: 'tuesday',
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'T')
          },
          { Header: 'W',
          accessor: 'wednesday',
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'W')
          },
          { Header: 'Th',
          accessor: 'thursday',
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'Th')
          },
          { Header: 'F',
          accessor: 'friday',
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'F')
          },
          { Header: 'Volunteer Certificate Signed?',
          accessor: 'completedOrientation',
          width: 130,
          Cell: (cellProperties) => EditableCell(cellProperties, 129, "checkbox", null)
          },
          { Header: 'Role',
          accessor: 'role',
          width: 130,
          Cell: (cellProperties) => EditableCell(cellProperties, 129, TEXT_TYPE, null)
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
  <Styles height={CELL_HEIGHT}>
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

  await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/volunteerDelete', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteData)
  })
  window.location.reload();
}

function VolunteerOverviewTable({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow} = useTable({
    columns,
    data,
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
