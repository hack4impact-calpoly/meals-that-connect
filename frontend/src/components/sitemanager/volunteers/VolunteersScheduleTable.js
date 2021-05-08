import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../../../css/volunteerScheduleTable.css"
import holidays from '@date/holidays-us'

const Styles = styled.div`
  table {
    margin-left:5px;
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

function updateValues (value, type, props, dayIndex){
  console.log('here')
  console.log(type)
  let val = []
  val.push(value)
  if (type == 'Staff') //update staff volunteer info
      props.staff[dayIndex] = val;
  else if (type == 'Computer') //update computer volunteer info
      props.computer[dayIndex] = val;
  else if (type == "Meal Prep") //update meal Prep volunteer info
      props.mealPrep[dayIndex] = val;
  else { //update route volunteer info
    let routesLength = Object.keys(props.routes).length
    let routesValues = Object.values(props.routes)
    
    // get routes volunteers
    for (let i =0; i < routesLength; i++) {
      //console.log("here")
      var routeNum = Object.keys(props.routes)[i]
      console.log(routeNum)
      //console.log("type" + type)
      
      if (routeNum == type){
        routesValues[i][dayIndex] = val;
        break;
      }
    }
    console.log(Object.values(props.routes))
  }
}

function EditableCell (cellProperties, width, props) {
    var changedFlag = false;
    //console.log(cellProperties)

    const startDate = props.weekArr[1]; // index 1 is monday
    const site = localStorage.getItem("site");
    const type = cellProperties['row']['original']['route']; // route # or meal prep or staff or computer
    const key = cellProperties["row"]["id"];
    const val = cellProperties["value"]
    //console.log(type);
    //console.log(cellProperties['column']['id'])
    console.log(val);
    console.log(cellProperties)

    const [value, setValue] = React.useState(val);
    //let value = val;
    //const [value, setValue] = React.useState(val);
    console.log(value);

    // const DoSome = (targetValue) => {
    //   useEffect(() => ( setValue(targetValue), ""));
    // }
    
    const HandleChange = (targetValue) => {
     // useEffect(() => ( setValue(targetValue), ""));
      console.log('handle change')
      const today = 0;
      changedFlag = true;

      setValue(targetValue);
      //DoSome(targetValue);

      //value = value + targetValue
      
      console.log(type)

      if (cellProperties['column']['id'] == 'monday')
          updateValues(targetValue, type, props, 0);
      else if (cellProperties['column']['id'] == 'tuesday')
          updateValues(targetValue, type, props, 1);
      else if (cellProperties['column']['id'] == 'wednesday')
          updateValues(targetValue, type, props, 2);
      else if (cellProperties['column']['id'] == 'thursday')
          updateValues(targetValue, type, props, 3);
      else if (cellProperties['column']['id'] == 'friday')
          updateValues(targetValue, type, props, 4);
      
    }

  const updateDatabase = async (siteD, startDateD) => {
    // console.log(changed)
    // if (changed !== false) {
      console.log("yup")
      //console.log(props.routes)

      const updateData = {
        site: siteD,
        startDate: startDateD,
        routes: props.routes,
        mealPrep: props.mealPrep,
        staff: props.staff,
        computer: props.computer
      }
      await fetch(process.env.REACT_APP_SERVER_URL + 'schedules/update', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
      })
    //}
    return 0
  }

  return (
      <span><input key="input-cell" type="text" style={{width: width +100, margin: '-5px'}} value={value && value} onChange={e => HandleChange(e.target.value)} onBlur={e => updateDatabase(site, startDate)}/></span>
  )
};

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
      Header: 'Volunteer Schedule',
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
              accessor: 'monday',

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

  console.log(props)
  // list contains objects with volunteer information for each day
  let routeList = []

  //routes is an Object
  let routesLength = Object.keys(props.routes).length
  let routesValues = Object.values(props.routes)

  // get routes volunteers
  for (let i =0; i < routesLength; i++) {
    //console.log("here")
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
  //console.log(props.mealPrep)
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
  //console.log(props.computer)
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
  //console.log(props.staff)
  let staff = props.staff
  let staffData = {
    route: "Staff",
    monday: staff[0],
    tuesday: staff[1],
    wednesday: staff[2],
    thursday: staff[3],
    friday: staff[4]
  }
  console.log("staff fri: " + staff[4])
  routeList.push(staffData)

  const data = React.useMemo(() => routeList, [] )
  //console.log(props.routes)
  return (
    <Styles>
      <VolunteersScheduleTable  columns={columns} data={routeList} props={props}/>
    </Styles>
  )
}

function getDate(weekArr, tableDay) {
  //console.log("getting week days");
  let curr;
  //console.log(weekArr)

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
  let holidayDates = getHolidayDate(props.holidayArr);

  if (cell['column']['id'] === "route"){
      return <td id="last-cell-route" {...cell.getCellProps()}>{cell.render('Cell')}</td>
  }
  else {
    // return <td id="last-cell-route" {...EditableCell({...cell.getCellProps()}, 20)}>{cell.render('Cell')}</td>
    return <td id="last-cell-route" style={{width: 500}}>{EditableCell(cell, 60, props)}</td>
  }
}

export default Table;