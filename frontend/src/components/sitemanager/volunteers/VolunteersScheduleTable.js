import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import env from "react-dotenv";

const TEXT_TYPE = "type";

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
      <span><input style={{width: width +20, margin: '-5px'}} value={value} onChange={e => handleChange(e.target.value)} /></span>
  )
};

const VolunteersScheduleTable = (props) => {
  const columns = React.useMemo(
    () => [
    {
        Header: '',
        accessor: 'signature',
        Cell: row => ( <div style={ { textAlign: 'left' } }>{row.row.original.signature.toString()}</div> ),
        Cell: (cellProperties) => EditableCell(cellProperties, 100),
    },
    {
        Header: 'MON',
        accessor: 'weekOneMon',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(0)}</div> ),
                accessor: 'weekOneMonDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekOneMonName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    }
                ],
            },
        ],
    },
    {
        Header: 'TUE',
        accessor: 'weekOneTue',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(1)}</div> ),
                accessor: 'weekOneTueDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekOneTueName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
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
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(2)}</div> ),
                accessor: 'weekOneWedDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekOneWedName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
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
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(3)}</div> ),
                accessor: 'weekOneThuDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekOneThuName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
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
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(4)}</div> ),
                accessor: 'weekOneFriDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekOneFriName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'MON',
        accessor: 'weekTwoMon',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(7)}</div> ),
                accessor: 'weekTwoMonDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekTwoMonName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'TUE',
        accessor: 'weekTwoTue',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(8)}</div> ),
                accessor: 'weekTwoTueDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekTwoTueName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'WED',
        accessor: 'weekTwoWed',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(9)}</div> ),
                accessor: 'weekTwoWedDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekTwoWedName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'THU',
        accessor: 'weekTwoThu',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(10)}</div> ),
                accessor: 'weekTwoThuDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekTwoThuName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'FRI',
        accessor: 'weekTwoFri',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(11)}</div> ),
                accessor: 'weekTwoFriDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekTwoFriName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'MON',
        accessor: 'weekThreeMon',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(14)}</div> ),
                accessor: 'weekThreeMonDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekThreeMonName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'TUE',
        accessor: 'weekThreeTue',
        columns: [
           {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(15)}</div> ),
                accessor: 'weekThreeTueDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekThreeTueName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'WED',
        accessor: 'weekThreeWed',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(16)}</div> ),
                accessor: 'weekThreeWedDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekThreeWedName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'THU',
        accessor: 'weekThreeThu',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(17)}</div> ),
                accessor: 'weekThreeThuDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekThreeThursName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'FRI',
        accessor: 'weekThreeFri',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(18)}</div> ),
                accessor: 'weekThreeFriDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekThreeFriName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'MON',
        accessor: 'weekFourMon',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(21)}</div> ),
                accessor: 'weekFourMonDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekFourMonName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'TUE',
        accessor: 'weekFourTue',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(22)}</div> ),
                accessor: 'weekFourTueDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekFourTueName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'WED',
        accessor: 'weekFourWed',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(23)}</div> ),
                accessor: 'weekFourWedDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekFourWedName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'THU',
        accessor: 'weekFourThu',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(24)}</div> ),
                accessor: 'weekFourThuDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekFourThurName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'FRI',
        accessor: 'weekFourFri',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(25)}</div> ),
                accessor: 'weekFourFriDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekFourFriName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'MON',
        accessor: 'weekFiveMon',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(28)}</div> ),
                accessor: 'weekFiveMonDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekFiveMonName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'TUE',
        accessor: 'weekFiveTue',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(29)}</div> ),
                accessor: 'weekFiveTueDate',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'weekFiveTueName',
                        width: 100,
                        Cell: (cellProperties) => EditableCell(cellProperties, 100, TEXT_TYPE, null),
                    },
                ],
            },
        ],
    },
    {
        Header: 'WED',
        accessor: 'weekFiveWed',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(30)}</div> ),
                accessor: 'weekFiveWedDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'weekFiveWedHome',
                        Cell: (cellProperties) => EditableCell(cellProperties, 45),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekFiveWedDining',
                        Cell: (cellProperties) => EditableCell(cellProperties, 45),
                    },
                ],
            },
        ],
    },
    {
        Header: 'THU',
        accessor: 'weekFiveThu',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(31)}</div> ),
                accessor: 'weekFiveThuDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'weekFiveThuHome',
                        Cell: (cellProperties) => EditableCell(cellProperties, 45),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekFiveThuDining',
                        Cell: (cellProperties) => EditableCell(cellProperties, 45),
                    },
                ],
            },
        ],
    },
    {
        Header: 'FRI',
        accessor: 'weekFiveFri',
        columns: [
            {
                Header: () => ( <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDate(32)}</div> ),
                accessor: 'weekFiveFriDate',
                columns: [
                    {
                        Header: 'Home',
                        accessor: 'weekFiveFriHome',
                        Cell: (cellProperties) => EditableCell(cellProperties, 45),
                    },
                    {
                        Header: 'Dining',
                        accessor: 'weekFiveFriDining',
                        Cell: (cellProperties) => EditableCell(cellProperties, 45),
                    },
                ],
            },
        ],
    },
    ],
    [] 
  )
   
  const data = React.useMemo(() => props.data, [])
  
  return (
  <Styles>
    <RouteTable columns={columns} data={data}/>
  </Styles>
  )
}

function RouteTable({ columns, data }) {
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

function getDate(tableDay) {
    let curr = new Date();
    let firstDay = new Date(curr.getFullYear(), curr.getMonth(), 1).getDay();
    let lastDay = new Date(curr.getFullYear(), curr.getMonth()+1, 0).getDate()
    let dates = [];

    for (let i = 0; i < firstDay - 1; i++) {
        dates.push(' ');
    }
  
    for (let i = firstDay; i <= lastDay; i++) {
        dates.push(i);
    }

    for (let i = dates.length - 1; i <= 35; i++) {
        dates.push(' ');
    }

    return dates[tableDay];
  }

export default VolunteersScheduleTable;
