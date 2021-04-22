import React from 'react'
import env from "react-dotenv"
import { Styles, DraggableTable} from '../../table-components'

const FOOD_DAYS = "foodDays";
const FROZEN_DAYS = "frozenDay";
const BOOL_CELL_WIDTH = 50;
const REG_CELL_WIDTH = 130;
const CELL_HEIGHT = 60;
const days = ["M", "T", "W", "Th", "F"];


const EditableCell = (cellProperties, foodOrFrozen, day, width, inputType) => {
  // We need to keep and update the state of the cell normally
  var useStateCall = 0;

  if (foodOrFrozen != null)
  {
    useStateCall = cellProperties["original"][foodOrFrozen][day];
  }
  else
  {
    useStateCall = cellProperties["value"];
  }

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

      await fetch(env.backendURL + 'clients/update-routes', {
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
    await fetch(env.backendURL + 'clients/update-routes', {
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

  /*
    check if value is a boolean
    if true then make input type checkbox and check it if boolean is also true
    if not boolean then normal input
  */
  if (value === true || value === false)
  {
    return (
      <input readonly="readonly" type={inputType} style={{width: width, boxShadow: 'none'}} checked={selected} />
    )
  }
  else
  {
    return (
        <input readonly="readonly" type={inputType} style={{width: width, height: CELL_HEIGHT, padding: '15px'}} value={value}/>
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
      width: 400,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 400, "text")
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
      ],},
    {
    Header: 'Frozen Days',
    columns: [
      { Header: 'Frozen',
      accessor: 'frozenNumber',
      width: 80,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 80, "number")
      },
      { Header: 'Frozen Day',
      accessor: 'frozenDay',
      widith: REG_CELL_WIDTH,
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
      },],},
    ],
    []
  )

  return (
  <Styles height={CELL_HEIGHT}>
    <DraggableTable columns={columns} data={props.data} setData={props.setData} route={props.routenum} showModal={props.showModal}/>
  </Styles>
  )
}

export default RouteTable;
