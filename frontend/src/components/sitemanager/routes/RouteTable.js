import React from 'react'
import { Styles, DraggableTable} from '../../table-components'
import { withRouter } from 'react-router-dom';
import Select from 'react-select'

const FOOD_DAYS = "foodDays";
const BOOL_CELL_WIDTH = 50;
const REG_CELL_WIDTH = 130;
const CELL_HEIGHT = 60;
const days = ["M", "T", "W", "Th", "F"];

function add_week(dt){
  return new Date(dt.setDate(dt.getDate() + 7));      
}


const EditableCell = (props, cellProperties, key, day, width, inputType) => {

    var route = cellProperties.row.original.routeNumber
    var value = cellProperties["original"][key];
    var index = cellProperties.row.index;
    if (key === "foodDays") {
        value = value[day]
    }

    // Disable editing for previous weeks
    let currDate = new Date()
    let nextMonday = add_week(new Date(props.mondayDate))
    let enabled = (localStorage.getItem("userType") === "site-manager") && (nextMonday > currDate)

    /*
        Check if value is a boolean, If it is, show a checkbox and
        Update the props array with the new checked value
    */
    if (value === true || value === false)
    {
      //checkboxes
        return (
            <input type={inputType} disabled={!enabled} style={{width: width, boxShadow: 'none'}} checked={value} onChange={(e) => props.handleBoolChange(route, key, e.target.checked, day, index)}/>
        )
    }
    /*
        Check if input is a dropdown, If it is, show a dropdown and
        Update the props array with the new selected value
    */
    else if (inputType === "dropdown") {
        let options;
        if (key ==="frozenNumber") {
            options = [
                { value: '0', label: '0' },
                { value: '2', label: '2' },
                { value: '7', label: '7' }
            ]
        }

        else if (key ==="frozenDay") {
            options = [
                { value: 'M', label: 'M' },
                { value: 'T', label: 'T' },
                { value: 'W', label: 'W' },
                { value: 'Th', label: 'Th' },
                { value: 'F', label: 'F' }
            ]
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
        // isOption currently giving errors, 
        return (
        <Select 
            isDisabled={!enabled}
            options={options} 
            styles={customStyles} 
            placeholder="Select" 
            defaultValue={{value: value, label: value}} 
            onChange={e => props.handleSelect(route, key, e.value, index)}/>
        )
    }

  // Doesn't come into this else statement. Needed if you have an input text box
  // The current route table only has editable checkboxs and dropdowns
  // Add method: onBlur={e => updateDatabase(e.target.value, cellProperties["value"], cellProperties["clientID"])}
  else
  {
    return (
        <input type={inputType} disabled={!enabled} style={{width: width, height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => props.handleChange(props, key, e.target.value, index)} />
    )
  }
}

 

const RouteTable = (props) => {
  let columns = [
    {
    Header: 'Route '+ props.routenum,
    columns: [
      { Header: 'Name',
      width: REG_CELL_WIDTH,
      height: 180,
      Cell: row => <div style={{width: 180}}>{row.row.original.firstName + " " + row.row.original.lastName}</div>
      },
      { Header: 'Address',
      accessor: 'address',
      width: 200,
      Cell: row => <div style={{padding: '0px 3px'}}>{row.row.original.address}</div>
      },
      { Header: 'M',
      accessor: 'foodDaysM',
      width: BOOL_CELL_WIDTH,
      Cell: (row) => EditableCell(props, row, FOOD_DAYS, "M", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'T',
      accessor: 'foodDaysT',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(props, cellProperties, FOOD_DAYS, "T", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'W',
      accessor: 'foodDaysW',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(props, cellProperties, FOOD_DAYS, "W", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'Th',
      accessor: 'foodDaysTh',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(props, cellProperties, FOOD_DAYS, "Th", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'F',
      accessor: 'foodDaysF',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(props, cellProperties, FOOD_DAYS, "F", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'Frozen',
      accessor: 'frozenNumber',
      width: 80,
      Cell: (cellProperties) => EditableCell(props, cellProperties, "frozenNumber", null, 80, "dropdown")
      },
      { Header: 'Frozen Day',
      accessor: 'frozenDay',
      width: 120,
      Cell: (cellProperties) => EditableCell(props, cellProperties, "frozenDay", null, 120, "dropdown")
      },
      ],},

    {
      Header: 'Additional Info',
      columns: [
      {
      Header: 'No Milk',
      accessor: 'noMilk',
      width: 80,
      Cell: (cellProperties) => EditableCell(props, cellProperties, "noMilk", null, 80, "checkbox")
      },
      {
      Header: 'H. Frozen',
      accessor: 'holidayFrozen',
      width: 100,
      Cell: (cellProperties) => EditableCell(props, cellProperties, "holidayFrozen", null, 100, "checkbox")
      },
    ],},
  ]

  if (localStorage.getItem("userType") === "site-manager") {
    let editBtn =
      { Header: 'Edit Details',
        width: 120,
        Cell: row => (<div style={{textAlign: 'center'}} onClick={() => editClient(row.row.original)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg></div>) 
      }
    columns[1]['columns'].push(editBtn)
  }

  function editClient(client) {
    props.showModal(client)
  }  

  return (
  <Styles height={CELL_HEIGHT}>
    <DraggableTable columns={columns} data={props.data} setData={props.setData} route={props.routenum} showModal={props.showModal}/> 
  </Styles>
  )
}

export default withRouter(RouteTable);
