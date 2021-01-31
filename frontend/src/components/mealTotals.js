import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../css/mealTotals.css"
<<<<<<< HEAD
=======

>>>>>>> 6a2587b... Table test push
=======
>>>>>>> 80b7d61... manager overview build 1

const Styles = styled.div`
  margin-top: 250px;
  margin-left: 30px;
  width: 70%;
  table {
    border-spacing: 0;
    width: 100%; 
    border: solid 2px #142850;
    tr {  
      :last-child {
        td {
          border-bottom: 1;
<<<<<<< HEAD
=======
          border-bottom: 0;
>>>>>>> 6a2587b... Table test push
=======
>>>>>>> 80b7d61... manager overview build 1
          flex-direc  
        }
      }
    }
    th{
        background: aliceblue;
        color: black;
        border: solid 2px #142850;
        textAlign: column.textAlign;
        fontWeight: bold;
        minWidth: 80px;
        padding: 3px 20px;
        font-size: 20px;
    }
    td {
        padding: 3px 20px;
        border: solid 1px gray;
        background: white;
        overflow: auto;
        font-size: 18px;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function MealTotals({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data
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
        {rows.map((row, i) => {
          prepareRow(row)
<<<<<<< HEAD
          const info = row.cells[1]['value']
          const deliveryInfo = Object.keys(info)
          return (
            <tr {...row.getRowProps()}>
              <td>{row.cells[0].render('Cell')}</td>
              {deliveryInfo.map(key => {
                return(
                  <tr>
                    <td>{key}</td>
                    {info[key].map(num => {
                      return <td>{num}</td>
                    })}
                  </tr>
                )
=======
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if (cell['value'] === " "){
                  return <td {...cell.getCellProps()} className="emptyCell">{cell.render('Cell')}</td>
                }
                else {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }
>>>>>>> 6a2587b... Table test push
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function Table() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Meal Totals',
        columns: [
          {
            Header: 'Route',
            accessor: 'route',
            columns: [
              {
                Header: ' ',
                accessor: 'route'
              }
            ]
          },
          {
            Header: ' ',
            accessor: 'info',
            columns: [
              {
                Header: ' ',
                accessor: 'info'
              }
            ]
          },
          {
            Header: 'Monday',
            columns: [
              {
                Header: 'date',
                accessor: 'monday'
              }
            ]
          },
          {
            Header: 'Tuesday',
            // accessor: 'tuesday'
            columns: [
              {
                Header: 'date',
                accessor: 'tuesday'
              }
            ]
          },
          {
            Header: 'Wednesday',
            // accessor: 'wednesday'
            columns: [
              {
                Header: 'date',
                accessor: 'wednesday'
              }
            ]
          },
          {
            Header: 'Thursday',
            // accessor: 'thursday'
            columns: [
              {
                Header: 'date',
                accessor: 'thursday'
              }
            ]
          },
          {
            Header: 'Friday',
            // accessor: 'friday'
            columns: [
              {
                Header: 'date',
                accessor: 'friday'
              }
            ]
          },
        ],
      }
    ],
    []
<<<<<<< HEAD
=======
            accessor: 'route'
          },
          {
            Header: ' ',
            accessor: 'info'
          }
        ]
      }
    ]
>>>>>>> 6a2587b... Table test push
=======
>>>>>>> 80b7d61... manager overview build 1
  )
  
  const routes = [
    {
      route : "1",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "2",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "3",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "4A",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "4B",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "5",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "6",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "7",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "8",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    },
    {
      route : "9",
      info: {"Frozen": [1, 2, 3, 4, 5],
             "White bag": [1, 2, 3, 4, 5], 
             "# of Meals": [1, 2, 3, 4, 5]},
    }
<<<<<<< HEAD
=======
      info: "Frozen"
    },
    {
      route: "‎ ",
      info: "White bag"
    },
    {
      route: " ",
      info: "# of Meals"
    },

>>>>>>> 6a2587b... Table test push
=======
>>>>>>> 80b7d61... manager overview build 1
]

  const data = React.useMemo(() => routes, [])

  return (
    <Styles>
      <MealTotals columns={columns} data={data} />
    </Styles>
  )
}

export default Table;