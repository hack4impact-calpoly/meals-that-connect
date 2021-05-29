import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { getDate} from '../routes/mealTotals'

const HOUR_WIDTH = 100

const Styles = styled.div`
 table {
   margin: 0px 30px 30px 10px;
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
     padding: 0.5rem 1.0rem ;
     border-bottom: 1px solid black;
     border-right: 1px solid black;
     font-size: 20px;

     :last-child {
       border-right: 0;
     }
   }
   th {
     background: #BDD3D2;
     color: black;
     fontWeight: bold;
   }
 }
`

const EditableCell = (cellProperties, width, day) => {
    const firstName = cellProperties["firstName"];
    const lastName = cellProperties["lastName"];
    const key = cellProperties["column"]["id"];
    const [value, setValue] = React.useState(cellProperties["value"]);
    
    const handleChange = (targetValue) => {
      setValue(targetValue);
    }

    const updateDatabase = async (firstNameD, lastNameD, keyD, valueD) => {
      console.log(day)
      const updateData = {
        key: keyD,
        value: valueD,
        volunteerID: cellProperties.volunteerID,
        site: localStorage.getItem("site"),
        date: day,
        token: localStorage.getItem("token")
      }
      await fetch(process.env.REACT_APP_SERVER_URL + 'hours/edit-site-manager', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
      })
      return 0
    }

  return (
      <input style={{margin: '-5px -10px', textAlign: 'center', width: width}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(firstName, lastName, key, e.target.value)}/>
  )
};

const VolunteerHoursTable = (props) => {
  const columns = [
    {
        Header: ' ',
        columns: [
        {                 
            accessor: 'lastName',
            width: 120,
            Header: () => ( <div style={ { textAlign: 'left', width: 200 } }>Volunteer Name</div> ),
            Cell: row => ( <div style={ { textAlign: 'left' } }>{row.row.original.firstName.toString() + " " + row.row.original.lastName.toString()}</div> ),
        }, 
        ],
    },
    {
        Header: 'MON',
        accessor: 'weekOneMon',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'center' } }>{getDate(props.weekArr, 0)}</div> ),
                accessor: 'weekOneMonDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'M',

                        Cell: (cellProperties) => EditableCell(cellProperties, HOUR_WIDTH, getDate(props.weekArr, 0)),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'dinner',
                        Cell: row => <div style={{width: HOUR_WIDTH-20}}>0</div>,
                    },
                ],
            },
        ],
    },
    {
        Header: 'TUE',
        accessor: 'weekOneTue',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'center' } }>{getDate(props.weekArr, 1)}</div> ),
                accessor: 'weekOneTueDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'T',
                        Cell: (cellProperties) => EditableCell(cellProperties, HOUR_WIDTH, getDate(props.weekArr, 1)),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneTueDining',
                        Cell: row => <div style={{width: HOUR_WIDTH-20}}>0</div>,
                    },
                ],
            },
        ],
    },
    {
        Header: 'WED',
        accessor: 'weekOneWed',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'center' } }>{getDate(props.weekArr, 2)}</div> ),
                accessor: 'weekOneWedDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'W',
                        Cell: (cellProperties) => EditableCell(cellProperties, HOUR_WIDTH, getDate(props.weekArr, 2)),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneWedDining',
                        Cell: row => <div style={{width: HOUR_WIDTH-20}}>0</div>,
                    },
                ],
            },
        ],
    },
    {
        Header: 'THU',
        accessor: 'weekOneThu',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'center' } }>{getDate(props.weekArr, 3)}</div> ),
                accessor: 'weekOneThuDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'Th',
                        Cell: (cellProperties) => EditableCell(cellProperties, HOUR_WIDTH, getDate(props.weekArr, 3)),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneThuDining',
                        Cell: row => <div style={{width: HOUR_WIDTH-20}}>0</div>,
                    },
                ],
            },
        ],
    },
    {
        Header: 'FRI',
        accessor: 'weekOneFri',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'center' } }>{getDate(props.weekArr, 4)}</div> ),
                accessor: 'weekOneFriDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'F',
                        Cell: (cellProperties) => EditableCell(cellProperties, HOUR_WIDTH, getDate(props.weekArr, 4)),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneFriDining',
                        Cell: row => <div style={{width: HOUR_WIDTH-20}}>0</div>
                    },
                ],
            },
        ],
    },
    ]
   
  const data = React.useMemo(() => props.data, [])
  
  return (
  <Styles>
    <RouteTable columns={columns} data={props.data}/>
  </Styles>
  )
}

function RouteTable({ columns, data, props }) {
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
              return <td>{cell.render('Cell', {volunteerID: row["original"]["volunteerID"], firstName: row["original"]["firstName"], value: cell["value"], lastName: row["original"]["lastName"], value: cell["value"]})}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerHoursTable;
