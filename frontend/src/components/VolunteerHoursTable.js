import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const Styles = styled.div`
 table {
   margin-top: 10px;
   margin-left: 5px;
   margin-right: 5px;
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

const dynamicCol = (data) =>
{
    var columnArray = [];
    var currentDate = new Date()
    var d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    var days = d.getDate();

    for (var i = 0; i < days; i++)
    {
        var column = {};
        var subColumn = {};
        var subSubColumnHome = {};
        var subSubColumnDining = {};
        var daysIndex = i % 7;
        
        if (daysIndex === 5 || daysIndex === 6)
        {
            continue;
        }
        //lowest level
        subSubColumnHome["Header"] = "Home";
        subSubColumnHome["accessor"] = `${DAYS[daysIndex]}${i}HOME`;
        if (getDateHeader(i) === 1)
        {
          subSubColumnHome["Cell"] = "0";
        }

        subSubColumnDining["Header"] = "Dining";
        subSubColumnDining["accessor"] = `${DAYS[daysIndex]}${i}DINING`;

        //medium level
        subColumn["Header"] = <div style={ { textAlign: 'right', marginRight: '20px' } }>{getDateHeader(i)}</div>;
        subColumn["accessor"] = `${DAYS[daysIndex]}${i}DATE`;
        subColumn["columns"] = [subSubColumnHome, subSubColumnDining];

        //highest level
        column["Header"] = DAYS[daysIndex];
        column["columns"] = [subColumn];
        columnArray.push(column);
    }
    return columnArray
}

const VolunteerHoursTable = (props) => {
    var datesArray = dynamicCol(props.data[0])
    var infoArray = [
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
                            Cell: row => ( <div style={ { textAlign: 'left' } }>Yes</div> ),
                        }
                    ]
    var combinedArray = infoArray.concat(datesArray)
    
    const columns = React.useMemo(
        () => combinedArray
    )

    const data = React.useMemo(() => props.data[0], [])
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
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

function getDateHeader(tableDay) {
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

export default VolunteerHoursTable;