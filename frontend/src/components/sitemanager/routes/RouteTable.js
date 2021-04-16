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
      <input readonly="readonly" type={inputType} style={{width: width, boxShadow: 'none'}} checked={selected} onChange={e => updateCheckbox(cellProperties["clientID"])} />
    )
  }
  else
  {
    return (
        <input readonly="readonly" type={inputType} style={{width: width, height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(e.target.value, cellProperties["value"], cellProperties["clientID"])}/>
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
    {
    Header: 'Expand for Contact Info ->',
    accessor: 'expand',
    Cell: () => (<div style={{width: 120}}></div>)
    },
    {
    Header: 'Phone',
    accessor: 'phoneNumber',
    width: 150,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 150, "number")
    },
    {
    Header: 'Emergency Contact',
    accessor: 'emergencyContact',
    width: REG_CELL_WIDTH,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
    },
    {
    Header: 'E. Contact Phone',
    accessor: 'emergencyPhone',
    width: 150,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 150, "number")
    },
    {
    Header: 'No Milk',
    accessor: 'noMilk',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "checkbox")
    },
    {
    Header: 'Num. of Meals',
    accessor: 'mealNumber',
    width: REG_CELL_WIDTH,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
    },
    {
    Header: 'Special Instructions',
    accessor: 'specialInstructions',
    width: 400,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 400, "text")
    },
    {
    Header: 'C2 Client',
    accessor: 'clientC2',
    width: REG_CELL_WIDTH,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "checkbox")
    },
    {
    Header: 'N/E',
    accessor: 'NE',
    width: REG_CELL_WIDTH,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
    },
    {
    Header: 'Email Address',
    accessor: 'email',
    width: 400,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 400, "email")
    },
    {
    Header: 'Holiday Frozen',
    accessor: 'holidayFrozen',
    width: REG_CELL_WIDTH,
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "checkbox")
    }
    ],
    []
  )
  console.log(props.showModal)

  return (
  <Styles height={CELL_HEIGHT}>
    <DraggableTable columns={columns} data={props.data} setData={props.setData} route={props.routenum} showModal={props.showModal}/>
  </Styles>
  )
}

export default RouteTable;
