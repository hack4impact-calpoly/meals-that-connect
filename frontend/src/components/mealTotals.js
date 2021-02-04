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

const Table = (props) => {
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
      monday: getData(props.data, "1", "M", 'frozen'), 
      tuesday: getData(props.data, "1", "T", 'frozen'),
      wednesday: getData(props.data, "1", "W", 'frozen'),
      thursday: getData(props.data, "1", "Th", 'frozen'),
      friday: getData(props.data, "1", "F", 'frozen'),
    },
    {
      route: "1", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "1", "M", 'meals'), 
      tuesday: getData(props.data, "1", "T", 'meals'),
      wednesday: getData(props.data, "1", "W", 'meals'),
      thursday: getData(props.data, "1", "Th", 'meals'),
      friday: getData(props.data, "1", "F", 'meals'),
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "2", "M", 'frozen'), 
      tuesday: getData(props.data, "2", "T", 'frozen'),
      wednesday: getData(props.data, "2", "W", 'frozen'),
      thursday: getData(props.data, "2", "Th", 'frozen'),
      friday: getData(props.data, "2", "F", 'frozen'),
    },
    {
      route: "2", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "2", "M", 'meals'), 
      tuesday: getData(props.data, "2", "T", 'meals'),
      wednesday: getData(props.data, "2", "W", 'meals'),
      thursday: getData(props.data, "2", "Th", 'meals'),
      friday: getData(props.data, "2", "F", 'meals'),
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "3", "M", 'frozen'), 
      tuesday: getData(props.data, "3", "T", 'frozen'),
      wednesday: getData(props.data, "3", "W", 'frozen'),
      thursday: getData(props.data, "3", "Th", 'frozen'),
      friday: getData(props.data, "3", "F", 'frozen'),
    },
    {
      route: "3", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "3", "M", 'meals'), 
      tuesday: getData(props.data, "3", "T", 'meals'),
      wednesday: getData(props.data, "3", "W", 'meals'),
      thursday: getData(props.data, "3", "Th", 'meals'),
      friday: getData(props.data, "3", "F", 'meals'),
    },

    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "4", "M", 'frozen'), 
      tuesday: getData(props.data, "4", "T", 'frozen'),
      wednesday: getData(props.data, "4", "W", 'frozen'),
      thursday: getData(props.data, "4", "Th", 'frozen'),
      friday: getData(props.data, "4", "F", 'frozen'),
    },
    {
      route: "4A", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "4", "M", 'meals'), 
      tuesday: getData(props.data, "4", "T", 'meals'),
      wednesday: getData(props.data, "4", "W", 'meals'),
      thursday: getData(props.data, "4", "Th", 'meals'),
      friday: getData(props.data, "4", "F", 'meals'),
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "4", "M", 'frozen'), 
      tuesday: getData(props.data, "4", "T", 'frozen'),
      wednesday: getData(props.data, "4", "W", 'frozen'),
      thursday: getData(props.data, "4", "Th", 'frozen'),
      friday: getData(props.data, "4", "F", 'frozen'),
    },
    {
      route: "4B", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "4", "M", 'meals'), 
      tuesday: getData(props.data, "4", "T", 'meals'),
      wednesday: getData(props.data, "4", "W", 'meals'),
      thursday: getData(props.data, "4", "Th", 'meals'),
      friday: getData(props.data, "4", "F", 'meals'),
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "5", "M", 'frozen'), 
      tuesday: getData(props.data, "5", "T", 'frozen'),
      wednesday: getData(props.data, "5", "W", 'frozen'),
      thursday: getData(props.data, "5", "Th", 'frozen'),
      friday: getData(props.data, "5", "F", 'frozen'),
    },
    {
      route: "5", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "5", "M", 'meals'), 
      tuesday: getData(props.data, "5", "T", 'meals'),
      wednesday: getData(props.data, "5", "W", 'meals'),
      thursday: getData(props.data, "5", "Th", 'meals'),
      friday: getData(props.data, "5", "F", 'meals'),
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "6", "M", 'frozen'), 
      tuesday: getData(props.data, "6", "T", 'frozen'),
      wednesday: getData(props.data, "6", "W", 'frozen'),
      thursday: getData(props.data, "6", "Th", 'frozen'),
      friday: getData(props.data, "6", "F", 'frozen'),
    },
    {
      route: "6", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "6", "M", 'meals'), 
      tuesday: getData(props.data, "6", "T", 'meals'),
      wednesday: getData(props.data, "6", "W", 'meals'),
      thursday: getData(props.data, "6", "Th", 'meals'),
      friday: getData(props.data, "6", "F", 'meals'),
    },  
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "7", "M", 'frozen'), 
      tuesday: getData(props.data, "7", "T", 'frozen'),
      wednesday: getData(props.data, "7", "W", 'frozen'),
      thursday: getData(props.data, "7", "Th", 'frozen'),
      friday: getData(props.data, "7", "F", 'frozen'),
    },
    {
      route: "7-Frozen", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "7", "M", 'meals'), 
      tuesday: getData(props.data, "7", "T", 'meals'),
      wednesday: getData(props.data, "7", "W", 'meals'),
      thursday: getData(props.data, "7", "Th", 'meals'),
      friday: getData(props.data, "7", "F", 'meals'),
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "8", "M", 'frozen'), 
      tuesday: getData(props.data, "8", "T", 'frozen'),
      wednesday: getData(props.data, "8", "W", 'frozen'),
      thursday: getData(props.data, "8", "Th", 'frozen'),
      friday: getData(props.data, "8", "F", 'frozen'),
    },
    {
      route: "8", 
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    },
    {
      route: " ", 
      info: "# of Meals", 
      monday: getData(props.data, "8", "M", 'meals'), 
      tuesday: getData(props.data, "8", "T", 'meals'),
      wednesday: getData(props.data, "8", "W", 'meals'),
      thursday: getData(props.data, "8", "Th", 'meals'),
      friday: getData(props.data, "8", "F", 'meals'),
    },
    {
      route: " ", 
      info: "Frozen", 
      monday: getData(props.data, "9", "M", 'frozen'), 
      tuesday: getData(props.data, "9", "T", 'frozen'),
      wednesday: getData(props.data, "9", "W", 'frozen'),
      thursday: getData(props.data, "9", "Th", 'frozen'),
      friday: getData(props.data, "9", "F", 'frozen'),
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
      monday: getData(props.data, "9", "M", 'meals'), 
      tuesday: getData(props.data, "9", "T", 'meals'),
      wednesday: getData(props.data, "9", "W", 'meals'),
      thursday: getData(props.data, "9", "Th", 'meals'),
      friday: getData(props.data, "9", "F", 'meals'),
    },
  ]

  const data = React.useMemo(() => routes, [] )

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

function getData(data, route, day, category) {
  var dayNum = encodeDay(day);
  var dataIndex = ((+(route) - 1) * 5) + dayNum;
  return data[dataIndex][category];
}

function encodeDay(day){
  switch (day) {
    case "M":
      return 0;
    case "T":
      return 1;
    case "W":
      return 2;
    case "Th":
      return 3;
    case "F":
      return 4;
    default:
      return -1;
  }
}

export default Table;