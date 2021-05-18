import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useFilters } from 'react-table'
import '../../../css/volunteerTable.css'
import { ColumnFilter } from '../columnFilter';
import DeleteCVPopup from '../DeleteCVPopup.js'

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
      background: #BDD3D2;
      color: black;
      fontWeight: bold;
    }
  }
`

const EditableCell = (cellProperties, width, type, dayAvailability, key) => {
  // We need to keep and update the state of the cell normally
  var useStateCall;
  let volunteerID = cellProperties.volunteerID

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

  let updateDatabase = (key, value) => {
      const updateData = {
          volunteerID: volunteerID, 
          key: key, 
          value: value
      }
      fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/update-field', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
      })
  }

  const updateCheckbox = () => {
    setSelected(!selected);
    if (key === 'availability') {
      let availability = cellProperties["original"]["availability"]
      availability[dayAvailability] = !selected
      updateDatabase(key, availability)
    }
    else {
      updateDatabase(key, !selected)
    }
  }

  if (type === "checkbox")
  {
    return (
        <input type={type} disabled={key === "digitalSytem"} style={{width: width-10, boxShadow: 'none'}} checked={selected} onChange={e => updateCheckbox()}/>
    )
  }
  else
  {
    return (
        <input type={type} style={{width: width,height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(key, value)}/>
    )
  }

}

const VolunteerOverviewData = (props) => {
  const columns = React.useMemo(
      () => [
      {
      Header: 'Volunteer Overview',
      columns: [
          { Header: 'Volunteer ID',
          accessor: 'volunteerID',
          Filter: ColumnFilter,
          filter: true,
          width: 200,
          Cell: (cellProperties) => EditableCell(cellProperties, 199, TEXT_TYPE, null, 'volunteerID')
          },
          { Header: 'First Name',
          accessor: 'firstName',
          Filter: ColumnFilter,
          filter: true,
          width: 200,
          Cell: (cellProperties) => EditableCell(cellProperties, 199, TEXT_TYPE, null, 'firstName')
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          Filter: ColumnFilter,
          filter: true,
          width: 200,
          Cell: (cellProperties) => EditableCell(cellProperties, 199, TEXT_TYPE, null, 'lastName')
          },
          { Header: 'Phone',
          accessor: 'phoneNumber',
          filter: false,
          width: 200,
          Cell: (cellProperties) => EditableCell(cellProperties, 199, "tel", null, 'phoneNumber')
          },
          { Header: 'Email',
          accessor: 'email',
          filter: false,
          width: 350,
          Cell: row => <div style={{width: 349}}>{row.value}</div>
          },
          { Header: 'Using Digital System',
          accessor: 'digitalSystem',
          filter: false,
          width: 100,
          Cell: row => <div style={{width: 100}}>{row.value === false ? "No" : "Yes"}</div>
          },
          { Header: 'M',
          accessor: 'monday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'M', 'availability')
          },
          { Header: 'T',
          accessor: 'tuesday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'T', 'availability')
          },
          { Header: 'W',
          accessor: 'wednesday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'W', 'availability')
          },
          { Header: 'Th',
          accessor: 'thursday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'Th', 'availability')
          },
          { Header: 'F',
          accessor: 'friday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'F', 'availability')
          },
          { Header: 'Volunteer Certificate Signed?',
          accessor: 'completedOrientation',
          filter: false,
          width: 130,
          Cell: (cellProperties) => EditableCell(cellProperties, 129, "checkbox", null, 'completedOrientation')
          },
          { Header: 'Notes',
          accessor: 'notes',
          filter: false,
          width: 270,
          Cell: (cellProperties) => EditableCell(cellProperties, 270, TEXT_TYPE, null, 'notes')
          },
          { Header: 'Remove Volunteer',
          width: 100,
          Cell: row => (<DeleteCVPopup person={row.row.original} type={"volunteer"}/>)
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
    useFilters,
    useBlockLayout,
    )

  // Render the UI for your table
  return (
  <table {...getTableProps()}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>{column.render('Header')}
                <div>{(column.canFilter && column.filter === true) ? column.render('Filter') : null}</div>
            </th>
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
              return <td>{cell.render('Cell', {volunteerID: row["original"]["volunteerID"], value: cell["value"], original: row["original"]})}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerOverviewData;
