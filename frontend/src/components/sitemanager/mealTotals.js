import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../../css/totalMeals.css"

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
        text-align: center;
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

  console.log("in MealsTotals")

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

  let routeList = []
  for (let i =0; i < props.routes.length; i++) {
    var routeNum = props.routes[i]
    // Get frozen data for each route
    let frozenData = {
      route: '',
      info: 'Frozen',
      monday: props.data[i]['frozen'][0],
      tuesday: props.data[i]['frozen'][1],
      wednesday: props.data[i]['frozen'][2],
      thursday: props.data[i]['frozen'][3],
      friday: props.data[i]['frozen'][4]
    }
    // Get white bag data for each route, placeholder for now
    let whiteBagData = {
      route: routeNum,
      info: "-", 
      monday: "-", 
      tuesday: "-",
      wednesday: "-",
      thursday: "-",
      friday: "-",
    }
    // Get meal data for each route
    let mealData = {
      route: " ", 
      info: "# of Meals", 
      monday: props.data[i]['meals'][0],
      tuesday: props.data[i]['meals'][1],
      wednesday: props.data[i]['meals'][2],
      thursday: props.data[i]['meals'][3],
      friday: props.data[i]['meals'][4]
    }
    routeList.push(frozenData)
    routeList.push(whiteBagData)
    routeList.push(mealData)
  }

  const data = React.useMemo(() => routeList, [] )

  return (
    <Styles>
      <MealTotals columns={columns} data={data}/>
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
  let weekArr = localStorage.getItem('week').split(',');
  //console.log(weekArr);
  let curr;
  if (weekArr.length === 1)
  {
    curr = new Date();
  }
  else
  {
    curr = new Date(weekArr[0]);
  }
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

export default Table;