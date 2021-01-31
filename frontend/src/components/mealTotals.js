import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../css/mealTotals.css"

const Styles = styled.div`
  margin-left: 30px;
  width: 90%;
  table {
    border-spacing: 0;
    width: 100%; 
    border: solid 2px #142850;
    tr {  
      :last-child {
        td {
          border-bottom: 1;
          flex-direc  
        }
      }
    }
    th {
        background: #b7f8ac;
        color: black;
        border: solid 1px #142850;
        textAlign: column.textAlign;
        fontWeight: bold;
        minWidth: 80px;
        padding: 3px 20px;
        font-size: 24px;
    }
    td {
        padding: 3px 20px;
        border: solid 1px gray;
        background: white;
        overflow: auto;
        font-size: 22px;
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
    <div id='tables'>
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
                  return cellClass(cell)
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function cellClass(cell) {
  const rowID = (+(cell['row']['id'])) % 3;
  if (cell['value'] !== " " && rowID === 2){
    return <td id="last-cell" {...cell.getCellProps()}>{cell.render('Cell')}</td>
  }
  if (cell['column']['id'] === "route"){
    if (cell['value'] === " " && rowID === 2){
      return <td id="last-cell-route" {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
    else if (cell['value'] === " " && rowID === 0) {
      return <td id="top-cell-route" {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
    else {
      return <td id="middle-cell-route" {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
  }
  else {
    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
  }
}

function Table() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Meal Totals',
        columns: [
          {
            Header: ' ',
            accessor: 'route',
            columns: [
              {
                Header: 'Route',
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
  )
  
  const routes = [
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "1", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "2", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "3", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },

    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "4A", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "4B", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "5", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "6", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },  
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "7-Frozen", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "8", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "9", 
      info: "White Bag", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: "1", 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
]

  const data = React.useMemo(() => routes, [])

  return (
    <Styles>
      <MealTotals columns={columns} data={data} />
    </Styles>
  )
}

export default Table;