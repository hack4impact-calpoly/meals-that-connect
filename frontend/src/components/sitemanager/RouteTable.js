import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

const Styles = styled.div`
 table {
   margin: 0px 20px 50px 0px;
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
     padding: 0.5rem;
     text-align: center;
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

const RouteTable = (props) => {
  const columns = React.useMemo(
    () => [
    {
    Header: 'Route '+ props.routenum,
    columns: [
      { Header: 'First Name',
      accessor: 'firstName'},
      { Header: 'Last Name',
      accessor: 'lastName' },
      { Header: 'Address',
      accessor: 'address'},
      { Header: 'M',
      accessor: 'foodDaysM',
      Cell: row => 
        (<div>{row.row.original.foodDays['M'].toString()}</div>)
      },
      { Header: 'T',
      accessor: 'foodDaysT',
      Cell: row => 
        (<div>{row.row.original.foodDays['T'].toString()}</div>)
      },
      { Header: 'W',
      accessor: 'foodDaysW',
      Cell: row => 
        (<div>{row.row.original.foodDays['W'].toString()}</div>)
      },
      { Header: 'Th',
      accessor: 'foodDaysTh',
      Cell: row => 
        (<div>{row.row.original.foodDays['Th'].toString()}</div>)
      },
      { Header: 'F',
      accessor: 'foodDaysF',
      Cell: row => 
        (<div>{row.row.original.foodDays['F'].toString()}</div>)
      },
      ],},
    {
    Header: 'Frozen Days',
    columns: [
      { Header: 'Frozen',
      accessor: 'frozenNumber',
      },
      { Header: 'M',
        accessor: 'frozenDaysM',
        Cell: row => 
          (<div>{row.row.original.frozenDay['M'].toString()}</div>)
        },
      { Header: 'T',
        accessor: 'frozenDaysT',
        Cell: row => 
          (<div>{row.row.original.frozenDay['T'].toString()}</div>)
        },
      { Header: 'W',
        accessor: 'frozenDaysW',
        Cell: row => 
          (<div>{row.row.original.frozenDay['W'].toString()}</div>)
        },
      { Header: 'Th',
        accessor: 'frozenDaysTh',
        Cell: row => 
          (<div>{row.row.original.frozenDay['Th'].toString()}</div>)
        },
      { Header: 'F',
        accessor: 'frozenDaysF',
        Cell: row => 
          (<div>{row.row.original.frozenDay['F'].toString()}</div>)
      },],},
    {
    Header: 'Phone',
    accessor: 'phoneNumber',
    },
    {
    Header: 'Emergency Contact',
    accessor: 'emergencyContact',
    },
    {
    Header: 'E. Contact Phone',
    accessor: 'emergencyPhone',
    },
    {
    Header: 'No Milk',
    accessor: 'noMilk',
    Cell: row => 
      (<div>{row.row.original.noMilk.toString()}</div>)
    },
    {
    Header: 'Num. of Meals',
    accessor: 'mealNumber',
    },
    {
    Header: 'Special Instructions',
    accessor: 'specialInstructions',
    },
    {
    Header: 'C2 Client',
    accessor: 'clientC2',
    Cell: row => 
      (<div>{row.row.original.clientC2.toString()}</div>)
    },
    {
    Header: 'N/E',
    accessor: 'NE',
    },
    {
    Header: 'Email Address',
    accessor: 'email',
    },
    {
    Header: 'Holiday Frozen',
    accessor: 'holidayFrozen',
    Cell: row => 
      (<div>{row.row.original.holidayFrozen.toString()}</div>)
    }
    ],
    []
  )

  const data = React.useMemo(() => props.data, [])

  return (
  <Styles>
    <Table columns={columns} data={data}/>
  </Styles>
  )
}

function Table({ columns, data }) {
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

export default RouteTable;
