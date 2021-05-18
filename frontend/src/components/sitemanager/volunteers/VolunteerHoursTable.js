import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { getDate} from '../routes/mealTotals'

const Styles = styled.div`
 table {
   margin: 10px 30px 30px 10px;
   border-spacing: 0;
   border: 1px solid black;
   background-color: #f2fff0;
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
     padding: 0.5rem;
     border-bottom: 1px solid black;
     border-right: 1px solid black;
     font-size: 20px;

     :last-child {
       border-right: 0;
     }
   }
   th {
     background: #D4D4D4;
     color: black;
     fontWeight: bold;
   }
 }
`

const EditableCell = (cellProperties, width) => {
    var changedFlag = false;
    const firstName = cellProperties["firstName"];
    const lastName = cellProperties["lastName"];
    const key = cellProperties["column"]["id"];
    const [value, setValue] = React.useState(cellProperties["value"]);
    
    const handleChange = (targetValue) => {
    setValue(targetValue);
  }

  const updateDatabase = async (firstNameD, lastNameD, keyD, valueD, changed) => {
    if (changed !== false) {
      console.log("yup")
      const updateData = {
        firstName: firstNameD,
        lastName: lastNameD,
        key: keyD,
        value: valueD
      }
      await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/insertURL', {
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
      <span><input style={{width: width +20, margin: '-5px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(firstName, lastName, key, e.target.value, changedFlag)}/></span>
  )
};

const VolunteerHoursTable = (props) => {
  const columns = [
    {
        Header: 'Volunteer Name',
        columns: [
        {                 
            accessor: 'lastName',
            Header: () => ( <div style={ { textAlign: 'left' } }>Last</div> ),
            Cell: row => ( <div style={ { textAlign: 'left' } }>{row.row.original.lastName.toString()}</div> ),
        }, 
        {                 
            accessor: 'firstName',
            Header: () => ( <div style={ { textAlign: 'left' } }>First</div> ),
            Cell: row => ( <div style={ { textAlign: 'left' } }>{row.row.original.firstName.toString()}</div> ),
        },
        ],
    },
    {
        Header: 'Volunteer Signature (I received newsletter)',
        accessor: 'signature',
        Cell: row => ( <div style={ { textAlign: 'left' } }>{row.row.original.signature.toString()}</div> ),
        Cell: (cellProperties) => EditableCell(cellProperties, 100),
    },
    {
        Header: 'MON',
        accessor: 'weekOneMon',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(props.weekArr, 0)}</div> ),
                accessor: 'weekOneMonDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'hours',

                        Cell: (cellProperties) => EditableCell(cellProperties, 55),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'dinner',
                         
                        Cell: (cellProperties) => EditableCell(cellProperties, 60),
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
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(props.weekArr, 1)}</div> ),
                accessor: 'weekOneTueDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'weekOneTueHome',
                        Cell: (cellProperties) => EditableCell(cellProperties, 55),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneTueDining',
                        Cell: (cellProperties) => EditableCell(cellProperties, 60),
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
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(props.weekArr, 2)}</div> ),
                accessor: 'weekOneWedDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'weekOneWedHome',
                        Cell: (cellProperties) => EditableCell(cellProperties, 55),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneWedDining',
                        Cell: (cellProperties) => EditableCell(cellProperties, 60),
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
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(props.weekArr, 3)}</div> ),
                accessor: 'weekOneThuDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'weekOnThuHome',
                        Cell: (cellProperties) => EditableCell(cellProperties, 55),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneThuDining',
                        Cell: (cellProperties) => EditableCell(cellProperties, 60),
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
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(props.weekArr, 4)}</div> ),
                accessor: 'weekOneFriDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'weekOneFriHome',
                        Cell: (cellProperties) => EditableCell(cellProperties, 55),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekOneFriDining',
                        Cell: (cellProperties) => EditableCell(cellProperties, 60),
                    },
                ],
            },
        ],
    },
    ]
   
  const data = React.useMemo(() => props.data, [])
  
  return (
  <Styles>
    <RouteTable columns={columns} data={data}/>
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
              return <td>{cell.render('Cell', {firstName: row["original"]["firstName"], value: cell["value"], lastName: row["original"]["lastName"], value: cell["value"]})}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerHoursTable;
