import React from 'react'
import { Styles, DraggableTable} from '../../table-components'
import { withRouter } from 'react-router-dom';
import Select from 'react-select'

const FOOD_DAYS = "foodDays";
const FROZEN_DAYS = "frozenDay";
const BOOL_CELL_WIDTH = 50;
const REG_CELL_WIDTH = 130;
const CELL_HEIGHT = 60;
const days = ["M", "T", "W", "Th", "F"];


const EditableCell = (cellProperties, foodOrFrozen, day, width, inputType) => {
  // We need to keep and update the state of the cell normally
  var useStateCall = 0;

  if (foodOrFrozen != null) {
    useStateCall = cellProperties["original"][foodOrFrozen][day];
  }
  else {
    useStateCall = cellProperties["value"];
  }
  console.log(cellProperties);
  var [value, setValue] = React.useState(useStateCall);
  var [selected, setSelected] = React.useState(value);


  const handleChange = (targetValue) => {
    setValue(targetValue);
  }

  const updateDatabase = async (newValue, originalValue, clientID) => {
    if (newValue !== originalValue)
    {
      const key = cellProperties["column"]["id"]
      const updateData = {
        id: clientID,
        key: key,
        data: newValue
      }

      await fetch(process.env.REACT_APP_SERVER_URL + 'clients/update-routes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateData)
      })
    }
  }

  const updateDatabaseDays = async (clientID) =>
  {
    const accessor = cellProperties["column"]["id"]; //foodDaysM
    const header = cellProperties["column"]["Header"]; //day (M/T/W/Th/F)
    const key = accessor.slice(0, accessor.length - header.length);
    const data = cellProperties["row"]["original"][key]; //{M: true, T: false}
    data[header] = !selected;

    const updateData = {
        id: clientID,
        key: key,
        data: data
      }
    await fetch(process.env.REACT_APP_SERVER_URL + 'clients/update-routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
  }

  const updateCheckbox = async (clientID) => {
    setSelected(!selected);
    if(days.includes(cellProperties["column"]["Header"]))
    {
      updateDatabaseDays(clientID)
    }
    else
    {
      updateDatabase(!selected, selected, clientID);
    }
  }
  
  const updateSelect = async (clientID, newVal) => {
    const updateData = {
        id: clientID,
        key: "frozenDay",
        data: newVal
      }
    await fetch(process.env.REACT_APP_SERVER_URL + 'clients/update-routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
  }

  /*
    check if value is a boolean
    if true then make input type checkbox and check it if boolean is also true
    if not boolean then normal input
  */
  if (value === true || value === false)
  {
    return (
      <input type={inputType} style={{width: width, boxShadow: 'none'}} checked={selected} onChange={() => updateCheckbox(cellProperties["clientID"])}/>
    )
  }
  else if (inputType === "dropdown") {
    if(value.length <= 0) {
      value = "None"
    }
  }
  else if (inputType=="dropdown1") {
    const options = [
      { value: 'Default', label: 'Default' },
      { value: 'M', label: 'M' },
      { value: 'T', label: 'T' },
      { value: 'W', label: 'W' },
      { value: 'Th', label: 'Th' },
      { value: 'F', label: 'F' }
    ]
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
        defaultValue={{value: value, label: value}} 
        onChange={e => updateSelect(cellProperties["clientID"], e.value)}/>
    )
  }
  else if (inputType=="dropdown2") {
    const options = [
      { value: '0', label: '0' },
      { value: '2', label: '2' },
      { value: '7', label: '7' }
    ]
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
      <Select options={options} styles={customStyles} defaultValue='O' placeholder="0"/>
    )
  }
  else
  {
    return (
        <input type={inputType} style={{width: width, height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(e.target.value, cellProperties["value"], cellProperties["clientID"])}/>
    )
  }
}
const RouteTable = (props) => {
  const columns = React.useMemo(
    () => [
    {
    Header: 'Route '+ props.routenum,
    columns: [
      { Header: 'First Name',
      accessor: 'firstName',
      width: REG_CELL_WIDTH,
      height: 70,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
      },
      { Header: 'Last Name',
      accessor: 'lastName',
      width: REG_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text") 
      },
      { Header: 'Address',
      accessor: 'address',
      width: 180,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 180, "text") 
      },
      { Header: 'M',
      accessor: 'foodDaysM',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "M", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'T',
      accessor: 'foodDaysT',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "T", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'W',
      accessor: 'foodDaysW',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "W", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'Th',
      accessor: 'foodDaysTh',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "Th", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'F',
      accessor: 'foodDaysF',
      width: BOOL_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "F", BOOL_CELL_WIDTH, "checkbox")
      },
      { Header: 'Frozen',
      accessor: 'frozenNumber',
      width: 80,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 80, "dropdown2")
      },
      { Header: 'Frozen Day',
      accessor: 'frozenDay',
      width: 120,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 120, "dropdown1")
      },
      ],},

    {
      Header: 'Additional Info',
      columns: [
      {
      Header: 'No Milk',
      accessor: 'noMilk',
      width: 80,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 80, "checkbox")
      },
      {
      Header: 'H. Frozen',
      accessor: 'holidayFrozen',
      width: 100,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100, "checkbox")
      },
      { Header: 'Edit Details',
        width: 120,
        Cell: row => (<div style={{textAlign: 'center'}} onClick={() => editClient(row.row.original)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg></div>)
      },
    ],},
    ],
    []
  )

  function editClient(id) {
    props.showModal(id)
  }  

  return (
  <Styles height={CELL_HEIGHT}>
    <DraggableTable columns={columns} data={props.data} setData={props.setData} route={props.routenum} showModal={props.showModal}/>
  </Styles>
  )
}

export default withRouter(RouteTable);
