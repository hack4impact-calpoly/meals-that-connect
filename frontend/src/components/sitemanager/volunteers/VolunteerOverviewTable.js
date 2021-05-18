import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useFilters } from 'react-table'
import '../../../css/volunteerTable.css'
import { ColumnFilter } from '../columnFilter';
import DeleteCVPopup from '../DeleteCVPopup.js'

const TEXT_TYPE = "text";
const CELL_HEIGHT = 55;
const BOOL_WIDTH = 70;
const days = ["M", "T", "W", "Th", "F"];

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
      border-left: 0px solid black;
      border-top: 0px solid black;
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

  const updateDatabase = async (cell, newValue, originalValue, volunteerID) => {
    if (newValue !== originalValue)
    {

      const key = cellProperties["column"]["id"]

      const updateData = {
        id: volunteerID,
        key: key,
        data: newValue
      }

      await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/update-volunteers', {

          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
      })
    }
  }

  const updateDatabaseDays = async (volunteerID) =>
        {
          const accessor = cellProperties["column"]["id"]; //availability
          const header = cellProperties["column"]["Header"]; //day (M/T/W/Th/F)
          const key = accessor.slice(0, accessor.length - header.length);
          const data = cellProperties["row"]["original"][key]; //{M: true, T: false}
          data[header] = !selected;
      
          const updateData = {
              id: volunteerID,
              key: key,
              data: data
            }
          await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/update-volunteers', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updateData)
          })
        }

  const updateCheckbox = async (volunteerID) => {
    setSelected(!selected);
    if(days.includes(cellProperties["column"]["Header"]))
    {
      updateDatabaseDays(volunteerID)
    }
    else
    {
      updateDatabase(cellProperties, !selected, selected, volunteerID);
    }
  }

  if (value === true || value === false)
  {
    return (
        <input type={type} style={{boxShadow: 'none', margin: 0, marginTop: 20}} checked={selected} onChange={e => updateCheckbox(cellProperties["row"]["original"]["volunteerID"])}/>
    )
  }
  else
  {
    return (
        <input type={type} style={{height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(cellProperties, e.target.value, cellProperties["value"], cellProperties["row"]["original"]["volunteerID"])}/>
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
          Filter: ColumnFilter,
          filter: true,
          width: 150,
          Cell: (cellProperties) => EditableCell(cellProperties, 150, TEXT_TYPE, null)
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          Filter: ColumnFilter,
          filter: true,
          width: 150,
          Cell: (cellProperties) => EditableCell(cellProperties, 150, TEXT_TYPE, null)
          },
          { Header: 'Phone',
          accessor: 'phoneNumber',
          filter: false,
          width: 150,
          Cell: (cellProperties) => EditableCell(cellProperties, 150, "tel", null)
          },
          { Header: 'Email',
          accessor: 'email',
          filter: false,
          width: 350,
          Cell: row => <div style={{width: 350-1.25, marginTop: 12}}>{row.row.original.email}</div>
          },
          { Header: 'M',
          accessor: 'availabilityM',
          filter: false,
          width: BOOL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_WIDTH, "checkbox", 'M')
          },
          { Header: 'T',
          accessor: 'availabilityT',
          filter: false,
          width: BOOL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_WIDTH, "checkbox", 'T')
          },
          { Header: 'W',
          accessor: 'availabilityW',
          filter: false,
          width: BOOL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_WIDTH, "checkbox", 'W')
          },
          { Header: 'Th',
          accessor: 'availabilityTh',
          filter: false,
          width: BOOL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_WIDTH, "checkbox", 'Th')
          },
          { Header: 'F',
          accessor: 'availabilityF',
          filter: false,
          width: BOOL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_WIDTH, "checkbox", 'F')
          },
          { Header: 'More Details',
            width: 100,
            Cell: row => (<div style={{paddingTop: '12px', width: 'auto', cursor: 'pointer'}} onClick={() => editVolunteer(row.row.original)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg></div>)
          },
          { Header: 'Remove Volunteer',
          width: 120,
          Cell: row => (<div style={{padding: '12px 0px 0px 10px'}}><DeleteCVPopup person={row.row.original} type={"volunteer"}/></div>)
          },
      ],},
      
      ],
      []
  )

  function editVolunteer(id) {
    console.log("Editing volunteer")
    props.showModal(id)
  } 
  
  const data = React.useMemo(() => props.data, []);

  return (
  <Styles height={CELL_HEIGHT}>
    <VolunteerOverviewTable columns={columns} data={data} showModal={props.showModal}/>
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
                return (
                  <td {...cell.getCellProps({style: {width: cell.column.width}})}>
                    {cell.render('Cell', {email: row["original"]["email"], value: cell["value"], original: row["original"]})}
                  </td>
                );
              })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerOverviewData;
