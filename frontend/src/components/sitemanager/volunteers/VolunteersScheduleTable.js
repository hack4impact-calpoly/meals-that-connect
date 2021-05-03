import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../../../css/totalMeals.css"
import holidays from '@date/holidays-us'

const Styles = styled.div`
  table {
    margin-left:-8px;
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

function VolunteersScheduleTable ({ columns, data, props }) {
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
                  return cellClass(cell, props) //returns a <td> element with a specific id depending on location for CSS purposes
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
  let columns = [
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
          Header: 'Monday',
          columns: [
            {
              Header: getDate(props.weekArr, 0),
              accessor: 'monday'
            }
          ]
        },
        {
          Header: 'Tuesday',
          // accessor: 'tuesday'
          columns: [
            {
              Header: getDate(props.weekArr, 1),
              accessor: 'tuesday'
            }
          ]
        },
        {
          Header: 'Wednesday',
          // accessor: 'wednesday'
          columns: [
            {
              Header: getDate(props.weekArr, 2),
              accessor: 'wednesday'
            }
          ]
        },
        {
          Header: 'Thursday',
          // accessor: 'thursday'
          columns: [
            {
              Header: getDate(props.weekArr, 3),
              accessor: 'thursday'
            }
          ]
        },
        {
          Header: 'Friday',
          // accessor: 'friday'
          columns: [
            {
              Header: getDate(props.weekArr, 4),
              accessor: 'friday'}
            ]
          },
        ],
      }
    ]

  // list contains objects with volunteer information for each day
  let routeList = []

  //routes is an Object
  let routesLength = Object.keys(props.routes).length
  let routesValues = Object.values(props.routes)
  
  // get routes volunteers
  for (let i =0; i < routesLength; i++) {
    console.log("here")
    var routeNum = Object.keys(props.routes)[i]
    // Get frozen data for each route
    let routeData = {
      route: routeNum,
      monday: routesValues[i][0],
      tuesday: routesValues[i][1],
      wednesday: routesValues[i][2],
      thursday: routesValues[i][3],
      friday: routesValues[i][4]
    }
    routeList.push(routeData)
  }

  // get mealPrep volunteers
  console.log(props.mealPrep)
  let meal = props.mealPrep
  let mealPrepData = {
    route: "Meal Prep",
    monday: meal[0],
    tuesday: meal[1],
    wednesday: meal[2],
    thursday: meal[3],
    friday: meal[4]
  }
  routeList.push(mealPrepData)

  // get computer volunteers
  console.log(props.computer)
  let computer = props.computer
  let computerData = {
    route: "Computer",
    monday: computer[0],
    tuesday: computer[1],
    wednesday: computer[2],
    thursday: computer[3],
    friday: computer[4]
  }
  routeList.push(computerData)

  // get staff volunteers
  console.log(props.staff)
  let staff = props.staff
  let staffData = {
    route: "Staff",
    monday: staff[0],
    tuesday: staff[1],
    wednesday: staff[2],
    thursday: staff[3],
    friday: staff[4]
  }
  routeList.push(staffData)

  const data = React.useMemo(() => routeList, [] )
  console.log(props.routes)
  return (
    <Styles>
      <VolunteersScheduleTable  columns={columns} data={routeList} props={props}/>
    </Styles>
  )
}

function getDate(weekArr, tableDay) {
  console.log("getting week days");
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

function getHolidayDate(holidayArr) {
  //let holidayArr = props.holidayArr
  let week = [];

  for (let i = 0; i < holidayArr.length; i++) {
    let day = new Date(holidayArr[i]);
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let year = day.getFullYear();
    let mdy = month + "/" + date + "/" + year;
    week.push(mdy);
  }
  return week;
}

function cellClass(cell, props) {
  // console.log("cell")
  // console.log(cell);
  let holidayDates = getHolidayDate(props.holidayArr);
  
  // if (cell['value'] !== " " && rowID === 2){
  //   return <td style={{backgroundColor: holidayDates.includes(cell['column'].Header) ? 'black' : null}} id="last-cell" {...cell.getCellProps()}>{cell.render('Cell')}</td>
  // }
  
  if (cell['column']['id'] === "route"){
      return <td id="last-cell-route" {...cell.getCellProps()}>{cell.render('Cell')}</td>
  }
  else {
    return <td id="last-cell-route" style={{backgroundColor: holidayDates.includes(cell['column'].Header) ? 'black' : null}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
  }
}

export default Table;