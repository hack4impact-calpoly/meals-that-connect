import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import env from "react-dotenv";
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
                  return cellClass(cell) //returns a <td> element with a specific id depending on location for CSS purposes
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
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
                Header: getDate(0),
                accessor: 'monday'
              }
            ]
          },
          {
            Header: 'Tuesday',
            // accessor: 'tuesday'
            columns: [
              {
                Header: getDate(1),
                accessor: 'tuesday'
              }
            ]
          },
          {
            Header: 'Wednesday',
            // accessor: 'wednesday'
            columns: [
              {
                Header: getDate(2),
                accessor: 'wednesday'
              }
            ]
          },
          {
            Header: 'Thursday',
            // accessor: 'thursday'
            columns: [
              {
                Header: getDate(3),
                accessor: 'thursday'
              }
            ]
          },
          {
            Header: 'Friday',
            // accessor: 'friday'
            columns: [
              {
                Header: getDate(4),
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
      monday: getTableData("1"), 
      tuesday: "1",
      wednesday: "1",
      thursday: "1",
      friday: "1",
    },
    {
      route: "1", 
      info: "White Bag", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
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

function getDate(tableDay) {
  let curr = new Date();
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first));
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let year = day.getFullYear();
    let mdy = month + "/" + date + "/" + year;
    week.push(mdy);
  }

  return week[tableDay];
}

function getTableData(route) {
  const req = {
    site: 'SLO',
    route: route
  }
  fetch(env.backendURL + 'clients/' + 'routeSiteClients', 
    {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    }
  )
    .then(res => res.json())
    .then(data => console.log(data))

  return "0"
}

export default Table;