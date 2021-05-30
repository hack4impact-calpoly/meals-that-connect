import React, { useEffect } from 'react'
import { useTable } from 'react-table'
import "../../../css/volunteerScheduleTable.css"
import Select from 'react-select'
import { Styles } from '../../table-components'
import holidays from '@date/holidays-us'

const dayIndexTable = {
    "M": 0,
    "T": 1,
    "W": 2,
    "Th": 3,
    "F": 4
}

function updateValues (value, id, type, props, dayIndex){
    let val = {
        name: value,
        id: id
    }
    if (type === 'Staff') //update staff volunteer info
        props.staff[dayIndex] = val;
    else if (type === 'Computer') //update computer volunteer info
        props.computer[dayIndex] = val;
    else if (type === "Meal Prep") //update meal Prep volunteer info
        props.mealPrep[dayIndex] = val;
    else if (type === "Meal Prep 2") //update meal Prep volunteer info
        props.mealPrep2[dayIndex] = val;
    else if (type === "Meal Prep 3") //update meal Prep volunteer info
        props.mealPrep3[dayIndex] = val;
    else if (type === "Meal Prep 4") //update meal Prep volunteer info
        props.mealPrep4[dayIndex] = val;
    else if (type === "Meal Prep 5") //update meal Prep volunteer info
        props.mealPrep5[dayIndex] = val;
    else { //update route volunteer info
        for(let route in props.routes) {
            if(route === type) {
                props.routes[route][dayIndex] = val
            }
        }
    }
    props.handleSelect(localStorage.getItem("site"), props.weekArr[1], props)
}

function EditableCell (cellProperties, day, props, availability) {
    const val =  (cellProperties["value"] !== undefined && cellProperties["value"] !== null) ? cellProperties["value"]["name"] : cellProperties["value"] // value stored in backend
    const site = localStorage.getItem("site")
    const [value, setValue] = React.useState(val)
    
    let volunteers = {

    }

    // make sure that value is set without waiting for useState, so correct information shows up
    React.useEffect(() => {
    setValue(val)
    }, [val])

    let options = []
    for(let volunteer of availability[day]) {
        let entry = {
            value: volunteer.name,
            label: volunteer.name
        }
        options.push(entry)
        if(!(volunteer in volunteers)) {
            volunteers[volunteer.name] = volunteer.id;
        }
    }
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
        }),
        singleValue: (provided, state) => {
            const padding = 3;
        
            return { ...provided,  padding };
        },
        input: (provided, state) => ({
            ...provided,
            padding: 0,
            margin: 0,
        }),
    }
    return (
        <Select
            options={options} 
            styles={customStyles} 
            placeholder="Select" 
            defaultValue={{value: val, label: val}}
            onChange={e => updateValues(e.value, volunteers[e.value], cellProperties["row"]["route"], props, dayIndexTable[day])}
        />
    )
}

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
                    <th style={{"width": "200px"}} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                                return <td>{cell.render('Cell', {row:cell['row']['original']})}</td>
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
                Cell: (row) => EditableCell(row, "M", props, props.volunteers)
            }
            ]
        },
        {
            Header: 'Tuesday',
            // accessor: 'tuesday'
            columns: [
            {
                Header: getDate(props.weekArr, 1),
                accessor: 'tuesday',
                Cell: (row) => EditableCell(row, "T", props, props.volunteers)
            }
            ]
        },
        {
            Header: 'Wednesday',
            // accessor: 'wednesday'
            columns: [
            {
                Header: getDate(props.weekArr, 2),
                accessor: 'wednesday',
                Cell: (row) => EditableCell(row, "W", props, props.volunteers)
            }
            ]
        },
        {
            Header: 'Thursday',
            // accessor: 'thursday'
            columns: [
            {
                Header: getDate(props.weekArr, 3),
                accessor: 'thursday',
                Cell: (row) => EditableCell(row, "Th", props, props.volunteers)
            }
            ]
        },
        {
            Header: 'Friday',
            // accessor: 'friday'
            columns: [
            {
                Header: getDate(props.weekArr, 4),
                accessor: 'friday',
                Cell: (row) => EditableCell(row, "F", props, props.volunteers)
            }
            ]
            },
        ],
        }
    ]

    // list contains objects with volunteer information for each day
    let routeList = []

    //routes is an Object
    console.log(props.routes)
    let routesLength = Object.keys(props.routes).length
    let routesValues = Object.values(props.routes)

    // get routes volunteers
    for (let i = 0; i < routesLength; i++) {
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
        wednesday: meal3[2] ,
        thursday: meal3[3] ,
        friday: meal3[4] 
    }
    routeList.push(mealPrepData3)

    let meal4 = props.mealPrep4
    let mealPrepData4 = {
        route: "Meal Prep 4",
        monday: meal4[0] ,
        tuesday: meal4[1] ,
        wednesday: meal4[2] ,
        thursday: meal4[3] ,
        friday: meal4[4] 
    }
    routeList.push(mealPrepData4)

    let meal5 = props.mealPrep5
    let mealPrepData5 = {
        route: "Meal Prep 5",
        monday: meal5[0] ,
        tuesday: meal5[1] ,
        wednesday: meal5[2] ,
        thursday: meal5[3] ,
        friday: meal5[4] 
    }
    routeList.push(mealPrepData5)

    // get computer volunteers
    let computer = props.computer
    let computerData = {
        route: "Computer",
        monday: computer[0] ,
        tuesday: computer[1] ,
        wednesday: computer[2] ,
        thursday: computer[3] ,
        friday: computer[4] 
    }
    routeList.push(computerData)

    // get staff volunteers
    let staff = props.staff
    let staffData = {
        route: "Staff",
        monday: staff[0] ,
        tuesday: staff[1] ,
        wednesday: staff[2] ,
        thursday: staff[3] ,
        friday: staff[4] 
    }
    routeList.push(staffData)
    console.log(routeList)
    const data = React.useMemo(() => routeList, [] )
    return (
    <Styles>
        <VolunteersScheduleTable columns={columns} data={routeList} props={props}/>
    </Styles>
    )
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
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

  for (let holidays of holidayArr) {
    let day = new Date(holidays);
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let year = day.getFullYear();
    let mdy = month + "/" + date + "/" + year;
    week.push(mdy);
  }
  return week;
}

export default Table;