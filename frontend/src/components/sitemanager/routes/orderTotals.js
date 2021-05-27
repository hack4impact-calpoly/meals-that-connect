import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../../../css/totalMeals.css"
import holidays from '@date/holidays-us'

const Styles = styled.div`
  table {
    margin-left:-8px;
    margin-top: 30px;
    border-spacing: 0;
    width: 100%; 
    border: solid 2px #142850;
    th {
        background: #BDD3D2;
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

function OrderTotals({ columns, data, props }) {
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
      Header: 'Order Totals',
      columns: [
        {
          Header: ' ',
          accessor: ' ',
          columns: [
            {
              Header: 'Meals',
              width: 200,
              accessor: 'info'
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
          columns: [
            {
              Header: getDate(props.weekArr, 1),
              accessor: 'tuesday'
            }
          ]
        },
        {
          Header: 'Wednesday',
          columns: [
            {
              Header: getDate(props.weekArr, 2),
              accessor: 'wednesday'
            }
          ]
        },
        {
          Header: 'Thursday',
          columns: [
            {
              Header: getDate(props.weekArr, 3),
              accessor: 'thursday'
            }
          ]
        },
        {
          Header: 'Friday',
          columns: [
            {
              Header: getDate(props.weekArr, 4),
              accessor: 'friday'}
            ]
          },
        {
          Header: ' ',
          columns: [
            {
              Header: 'Total',
              accessor: 'weekTotals'}
            ]
          },
        ],
      }
    ]


    let routeList = []
    // Get frozen data for the weekly orders
    let frozenTotal = {
      route: ' ',
      info: 'Frozen',
      monday: props.data['frozen'][0],
      tuesday: props.data['frozen'][1],
      wednesday: props.data['frozen'][2],
      thursday: props.data['frozen'][3],
      friday: props.data['frozen'][4],
      weekTotals: props.data['frozen'].reduce((a, b) => a + b, 0)
    }
    // Get white bag data for the weekly orders
    let whiteBagTotal = {
      route: ' ',
      info: "White Bags", 
      monday: props.data['whitebag'][0], 
      tuesday: props.data['whitebag'][1],
      wednesday: props.data['whitebag'][2],
      thursday: props.data['whitebag'][3],
      friday: props.data['whitebag'][4],
      weekTotals: props.data['whitebag'].reduce((a, b) => a + b, 0)
    }
    // Get brown bag data for the weekly orders
    let brownBagTotal = {
      route: " ", 
      info: "Brown Bags", 
      monday: props.data['brownbag'][0],
      tuesday: props.data['brownbag'][1],
      wednesday: props.data['brownbag'][2],
      thursday: props.data['brownbag'][3],
      friday: props.data['brownbag'][4],
      weekTotals: props.data['brownbag'].reduce((a, b) => a + b, 0)
    }
    routeList.push(frozenTotal)
    routeList.push(whiteBagTotal)
    routeList.push(brownBagTotal)

    return (
        <Styles>
            <OrderTotals columns={columns} data={routeList} props={props}/>
        </Styles>
    )
}

function deconstructRouteList(routeList, data, name) {
    for (let row of routeList) {
      if (row.info === name) {
        data['monday'] += row['monday']
        data['tuesday'] += row['tuesday']
        data['wednesday'] += row['wednesday']
        data['thursday'] += row['thursday']
        data['friday'] += row['friday']

        data['weekTotals'] += row['monday']
        data['weekTotals'] += row['tuesday']
        data['weekTotals'] += row['wednesday']
        data['weekTotals'] += row['thursday']
        data['weekTotals'] += row['friday']
      }
    }
}

export function getDate(weekArr, tableDay) {
  //let weekArr = props.weekArr
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

  for (let holiday of holidayArr) {
    let day = new Date(holiday);
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let year = day.getFullYear();
    let mdy = month + "/" + date + "/" + year;
    week.push(mdy);
  }
  return week;
}

function cellClass(cell, props) {
  let holidayDates = getHolidayDate(props.holidayArr);
  const rowID = (+(cell['row']['id'])) % 3;
  let width = cell.column.Header === "Orders" ? 200 : 'auto'
  
  if (cell['value'] !== " " && rowID === 2){
    return <td style={{backgroundColor: holidayDates.includes(cell['column'].Header) ? 'black' : null, width: width}} id="last-cell" {...cell.getCellProps()}>{cell.render('Cell')}</td>
  }
  
  if (cell['column']['id'] === "route"){
    if (cell['value'] === " " && rowID === 2){
      return <td id="last-cell-route" style={{width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
    else if (cell['value'] === " " && rowID === 0) {
      return <td id="top-cell-route" style={{width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
    else {
      return <td id="middle-cell-route" style={{width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
  }
  else {
    return <td style={{backgroundColor: holidayDates.includes(cell['column'].Header) ? 'black' : null, width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
  }
}

export default Table;
