import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../../css/totalMeals.css"
import holidays from '@date/holidays-us'

import fetchMealTotals from '../sitemanager/SiteManagerHomepage'
import { printDocument } from '../sitemanager/SiteManagerHomepage'
import SiteManagerHomepage from '../sitemanager/SiteManagerHomepage'

//var sitemanager = new SiteManagerHomepage;

const Styles = styled.div`
  table {
    margin-left:-8px;
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

function VolunteerScheduleTable ({ columns, data, props }) {
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
                            return cellClass(cell, props)
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
    //console.log(props.weekArr);
    let columns = [
    {
        Header: 'Volunteer Driver Schedule',
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
                    accessor: 'tuesday',
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
                }
                ]
                },
            ],
        }
    ]

    // list contains objects with volunteer information for each day
    let routeList = []
    let notEmpty = false;
    let displayRoute = false;

    //routes is an Object
    let routesLength = Object.keys(props.routes).length
    let routesValues = Object.values(props.routes)
    console.log(routesLength)

    let currUserID = props.personalData.id

    // get routes volunteers
    for (let i = 0; i < routesLength; i++) {
        var routeNum = Object.keys(props.routes)[i]
        //console.log(routeNum)

        let mon = "", tue = "", wed = "", thu = "", fri = "";

        // for each route check each day of the week to see if user is assigned
        for (let j = 0; j <5; j++){

            if ( ( (routesValues[i][j] != null) && (routesValues[i][j][0] != (""))) 
                && (currUserID == routesValues[i][j].id)){

                if (j == 0){
                    mon = "assigned"
                    notEmpty = true;
                    displayRoute = true;
                    props.updatePDF("mon");
                }
                else if (j == 1){
                    tue = "assigned"
                    notEmpty = true;
                    displayRoute = true;
                    props.updatePDF("tue");
                }
                else if (j == 2){
                    wed = "assigned"
                    notEmpty = true;
                    displayRoute = true;
                    props.updatePDF("wed");
                }
                else if (j == 3){
                    thu = "assigned"
                    notEmpty = true;
                    displayRoute = true;
                    props.updatePDF("thu");
                }
                else{
                    fri = "assigned"
                    notEmpty = true;
                    displayRoute = true;
                    props.updatePDF("fri");
                }
            }

        }

        // Get assigned for each route
        let routeData = {
            route: routeNum,
            monday: mon,
            tuesday: tue,
            wednesday: wed,
            thursday: thu,
            friday: fri
        }
        
        if (displayRoute == true){ // only add assigned routes to table/routeList
            routeList.push(routeData)
            displayRoute = false;
        }
    }

    console.log(routeList);

    return (
        <Styles>
          {notEmpty ? <VolunteerScheduleTable columns={columns} data={routeList} props={props}/> : <div style={{marginLeft: "125px"}}> You have no routes assigned or you are not a driver </div>}
        </Styles>
      )
}

export function getDate(weekArr, tableDay) {
    //let weekArr = props.weekArr
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

function cellClass(cell, props) {
    //console.log(cell)
    let width = cell.column.Header === "Meals" ? 200 : 'auto'
    let route = cell.row.original.route
    
    if (cell['column']['id'] === "route"){
        return <td id="last-cell" style={{width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
    else if (cell['column']['id'] == "monday" && cell['value'] == "assigned"){
        return <td id="last-cell-route" > <button className="route" style={{width: 165}} onClick={() => printDocument("M", 0, props.weekArr, props.personalData.site, route)}>Monday</button> </td>
    }
    else if (cell['column']['id'] == "tuesday" && cell['value'] == "assigned"){
        return <td id="last-cell-route" > <button className="route" style={{width: 165}} onClick={() => printDocument("T", 1, props.weekArr, props.personalData.site, route)}>Tuesday</button> </td>
    }
    else if (cell['column']['id'] == "wednesday" && cell['value'] == "assigned"){
        return <td id="last-cell-route" > <button className="route" style={{width: 165}} onClick={() => printDocument("W", 2, props.weekArr, props.personalData.site, route)}>Wednesday</button> </td>
    }
    else if (cell['column']['id'] == "thursday" && cell['value'] == "assigned"){
        return <td id="last-cell-route" > <button className="route" style={{width: 165}} onClick={() => printDocument("Th", 3, props.weekArr, props.personalData.site, route)}>Thursday</button> </td>
    }
    else if (cell['column']['id'] == "friday" && cell['value'] == "assigned"){
        return <td id="last-cell-route" > <button className="route" style={{width: 165}} onClick={() => printDocument("F", 4, props.weekArr, props.personalData.site, route)}>Friday</button> </td>
    }
    else {
        return <td id="last-cell-route" {...cell.getCellProps()}> {"-"} </td>
    }
  }

export default Table;