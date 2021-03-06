import React from 'react'
import { Styles, DraggableTable } from '../../table-components'
import { ColumnFilter } from '../columnFilter'
import DeleteCVPopup from '../DeleteCVPopup.js'

const FOOD_DAYS = "foodDays";
const FROZEN_DAYS = "frozenDay";
const BOOL_CELL_WIDTH = 65;
const REG_CELL_WIDTH = 130;
const CELL_HEIGHT = 70;
const days = ["M", "T", "W", "Th", "F"];

const Table = (props) => {
    let setData = props.setData

    const EditableCell = (cellProperties, foodOrFrozen, day, width, inputType) => {
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
        // setData()
        const updateDatabase = async (cell, newValue, originalValue, clientID) => {
          if (newValue !== originalValue)
          {

            const key = cellProperties["column"]["id"]

            if (key === "routeNumber" && newValue === "") {
              console.log("Updating route number")
              newValue = "-1"
            }

            const updateData = {
              id: clientID,
              key: key,
              data: newValue,
              token: localStorage.getItem("token")
            }

            if (key === "routeNumber") {
                let index = cellProperties["row"]['index']
                let newData = cellProperties["data"]
                newData[index]['routeNumber'] = newValue
                if (newValue === "") {
                  newData[index]['routeNumber'] = "-1"
                }
                console.log("Resetting index for row: " + index)
                setData(newData)
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
              data: data,
              token: localStorage.getItem("token")
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
            updateDatabase(cellProperties, !selected, selected, clientID);
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
            <input type={inputType} style={{width: width, boxShadow: 'none'}} checked={selected} onChange={e => updateCheckbox(cellProperties["clientID"])} />
          )
        }
        else
        {
          return (
            <input type={inputType} style={{width: width, height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(cellProperties, e.target.value, cellProperties["value"], cellProperties["clientID"])}/>
          )
        }
      
      }


    const columns = React.useMemo(
        () => [
          { Header: 'Wellsky ID',
          accessor: 'wellskyID',
          Filter: ColumnFilter,
          filter: true,
          width: REG_CELL_WIDTH,
          height: CELL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
          },
          { Header: 'First Name',
          accessor: 'firstName',
          Filter: ColumnFilter,
          filter: true,
          width: REG_CELL_WIDTH,
          height: CELL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          Filter: ColumnFilter,
          filter: true,
          width: REG_CELL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text") 
          },
          { Header: 'Route',
          id: 'routeNumber',
          filter: false,
          accessor: (row) => (row.routeNumber !== "-1") ? row.routeNumber: '',
          width: 80,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, 80, "text") 
          },
          { Header: 'Address',
          accessor: 'address',
          filter: false,
          width: 400,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, 400, "text")
          },
          { Header: 'M',
          accessor: 'foodDaysM',
          filter: false,
          width: BOOL_CELL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "M", BOOL_CELL_WIDTH, "checkbox")
          },
          { Header: 'T',
          accessor: 'foodDaysT',
          filter: false,
          width: BOOL_CELL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "T", BOOL_CELL_WIDTH, "checkbox")
          },
          { Header: 'W',
          accessor: 'foodDaysW',
          filter: false,
          width: BOOL_CELL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "W", BOOL_CELL_WIDTH, "checkbox")
          },
          { Header: 'Th',
          accessor: 'foodDaysTh',
          filter: false,
          width: BOOL_CELL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "Th", BOOL_CELL_WIDTH, "checkbox")
          },
          { Header: 'F',
          accessor: 'foodDaysF',
          filter: false,
          width: BOOL_CELL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "F", BOOL_CELL_WIDTH, "checkbox")
          },
          { Header: 'More Details',
            width: 100,
            Cell: row => (<div style={{textAlign: 'center', width: 100, cursor: 'pointer'}} onClick={() => editClient(row.row.original)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg></div>)
          },
          { Header: 'Remove Client',
          width: 100,
          Cell: row => (<DeleteCVPopup person={row.row.original} type={"client"}/>)
          },
        ],
        []
      )

      function editClient(id) {
        console.log("Editing client")
        props.showModal(id)
      } 
    
    const data = React.useMemo(
        () => props.data, []
    )

    return (
        <Styles height="70px">
            <DraggableTable columns={columns} data={props.data} setData={props.setData} showModal={props.showModal}/>
        </Styles>
    )
}

export default Table