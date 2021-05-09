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
  let val = []
  val.push(value)
  if (type == 'Staff') //update staff volunteer info
      props.staff[dayIndex] = val;
  else if (type == 'Computer') //update computer volunteer info
      props.computer[dayIndex] = val;
  else if (type == "Meal Prep") //update meal Prep volunteer info
      props.mealPrep[dayIndex] = val;
  else if (type == "Meal Prep 2") //update meal Prep volunteer info
      props.mealPrep2[dayIndex] = val;
  else if (type == "Meal Prep 3") //update meal Prep volunteer info
      props.mealPrep3[dayIndex] = val;
  else if (type == "Meal Prep 4") //update meal Prep volunteer info
      props.mealPrep4[dayIndex] = val;
  else if (type == "Meal Prep 5") //update meal Prep volunteer info
      props.mealPrep5[dayIndex] = val;
  else { //update route volunteer info
    let routesLength = Object.keys(props.routes).length
    let routesValues = Object.values(props.routes)
    
    // get routes volunteers
    for (let i =0; i < routesLength; i++) {
      
      var routeNum = Object.keys(props.routes)[i]
      
      if (routeNum == type){
        routesValues[i][dayIndex] = val;
        break;
      }
    }
  }
}

function EditableCell (cellProperties, width, props) {
    var changedFlag = false;

    const startDate = props.weekArr[1]; // index 1 is monday
    const site = localStorage.getItem("site");
    const type = cellProperties['row']['original']['route']; // route # or meal prep or staff or computer
    //const key = cellProperties["row"]["id"];
    const val = cellProperties["value"] // value stored in backend
   
    const [value, setValue] = React.useState(val); 
    
    const HandleChange = (targetValue) => {
      console.log('handle change')
      const today = 0;
      changedFlag = true;

      setValue(targetValue);
      
      console.log(type)

      // also update backend with the correct value
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

    // make sure that value is set without waiting for useState, so correct information shows up
    React.useEffect(() => {
      setValue(val)
    }, [val])

  const updateDatabase = async (siteD, startDateD) => {
      console.log("yup")
      console.log(props.mealPrep3)

      const updateData = {
        site: siteD,
        startDate: startDateD,
        routes: props.routes,
        mealPrep: props.mealPrep,
        mealPrep2: props.mealPrep2,
        mealPrep3: props.mealPrep3,
        mealPrep4: props.mealPrep4,
        mealPrep5: props.mealPrep5,
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

  // list contains objects with volunteer information for each day
  let routeList = []

  //routes is an Object
  let routesLength = Object.keys(props.routes).length
  let routesValues = Object.values(props.routes)

  // get routes volunteers
  for (let i =0; i < routesLength; i++) {

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

  let meal2 = props.mealPrep2
  let mealPrepData2 = {
    route: "Meal Prep 2",
    monday: meal2[0],
    tuesday: meal2[1],
    wednesday: meal2[2],
    thursday: meal2[3],
    friday: meal2[4]
  }
  routeList.push(mealPrepData2)

  let meal3 = props.mealPrep3
  let mealPrepData3 = {
    route: "Meal Prep 3",
    monday: meal3[0],
    tuesday: meal3[1],
    wednesday: meal3[2],
    thursday: meal3[3],
    friday: meal3[4]
  }
  routeList.push(mealPrepData3)

  let meal4 = props.mealPrep4
  let mealPrepData4 = {
    route: "Meal Prep 4",
    monday: meal4[0],
    tuesday: meal4[1],
    wednesday: meal4[2],
    thursday: meal4[3],
    friday: meal4[4]
  }
  routeList.push(mealPrepData4)

  let meal5 = props.mealPrep5
  let mealPrepData5 = {
    route: "Meal Prep 5",
    monday: meal5[0],
    tuesday: meal5[1],
    wednesday: meal5[2],
    thursday: meal5[3],
    friday: meal5[4]
  }
  routeList.push(mealPrepData5)

  // get computer volunteers
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
  return (
    <Styles>
      <VolunteersScheduleTable  columns={columns} data={routeList} props={props}/>
    </Styles>
  )
}

function getDate(weekArr, tableDay) {
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