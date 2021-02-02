import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

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

const RoutePage = (props) => {
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

  console.log(data)

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

export default RoutePage;


// async function RoutePage() {
//   var testData = await fetchClients(1)
//   await console.log(testData)
//   //var new_data = await React.useMemo(() => fetchClients(1), []);
//   //console.log(new_data);
  // const data = React.useMemo(() =>
  // [
  //   {
  //     firstName:"Micah",
  //     lastName:"Wibowo",
  //     address:"random address st E SLO CA 93405",
  //     frozenNumber:5,
  //     phoneNumber:"2353251245",
  //     emergencyContact: "Joe",
  //     emergencyPhone: "5422351351",
  //     noMilk:false,
  //     mealNumber:5,
  //     foodDays: {
  //       M: true,
  //       T: false,
  //       W: true,
  //       Th: false,
  //       F: true
  //     },
  //     specialInstructions:"None",
  //     clientC2:false,
  //     NE: "N",
  //     email:"micah@gmail.org",
  //     holidayFrozen:false,
  //   },
  //   {
  //   firstname: 'Kim',
  //   lastname: 'Parrish',
  //   address: '637 Kyle Street, Fullerton, NE 68638',
  //   date: '07/11/2020',
  //   order: '58418278790810',
  //   },
  //   {
  //   firstname: 'Kim',
  //   lastname: 'Parrish',
  //       address: '906 Hart Country Lane, Toccoa, GA 30577',
  //   date: '07/10/2020',
  //   order: '81534454080477',
  //   },
  //   {
  //   firstname: 'Kim',
  //   lastname: 'Parrish',
  //       address: '2403 Edgewood Avenue, Fresno, CA 93721',
  //   date: '07/09/2020',
  //   order: '20452221703743',
  //   },
  //   {
  //   firstname: 'Kim',
  //   lastname: 'Parrish',
  //   address: '882 Hide A Way Road, Anaktuvuk Pass, AK 99721',
  //   date: '07/07/2020',
  //   order: '22906126785176',
  //   },
  //   {
  //   firstname: 'Kim',
  //   lastname: 'Parrish',
  //   address: '796 Bryan Avenue, Minneapolis, MN 55406',
  //   date: '07/07/2020',
  //   order: '87574505851064',
  //   },
  // ],
  // []
  // )
//   return (
//   <Styles>
//     <Table columns={FormTable(1)} data={data} />
//   </Styles>
//   )
// }



/*<Table columns={FormTable(2)} data={data} />
<Table columns={FormTable(3)} data={data} />
<Table columns={FormTable(4)} data={data} />
<Table columns={FormTable(5)} data={data} />
<Table columns={FormTable(6)} data={data} />
<Table columns={FormTable(7)} data={data} />
<Table columns={FormTable(8)} data={data} />
<Table columns={FormTable(9)} data={data} /> */