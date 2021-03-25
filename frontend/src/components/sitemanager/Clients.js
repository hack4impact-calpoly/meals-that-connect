import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import { Styles } from '../table-components'
import env from "react-dotenv"

const FOOD_DAYS = "foodDays";
const FROZEN_DAYS = "frozenDay";
const BOOL_CELL_WIDTH = 65;
const REG_CELL_WIDTH = 130;
const CELL_HEIGHT = 70;
const days = ["M", "T", "W", "Th", "F"];
const DND_ITEM_TYPE = 'client'

const MyTable = ({ columns, data, setData }) => {
    console.log(data)

    const getRowId = React.useCallback(row => {
        return row.index
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        data: data,
        columns,
        getRowId,
    },
    )

    const moveRow = (dragIndex, hoverIndex) => {
        const dragRecord = data[dragIndex]
        const hoverRecord = data[hoverIndex]

        if (dragRecord.routeNumber != hoverRecord.routeNumber) {
            return false
        }

        
        let clients = [
            {
            id: dragRecord._id,
            name: dragRecord.firstName,
            index: hoverIndex,
            },
            {
            id: hoverRecord._id,
            name: hoverRecord.firstName,
            index: dragIndex
            }
        ]

        let newData = update(data, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRecord],
            ],
        })

        fetch(env.backendURL + 'clients/update-client-routes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clients)
        })

        setData(newData)
        dragIndex = hoverIndex
        return true
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th></th>
                            {headerGroup.headers.map(column => (
                                <th style={{ width: column.width, textAlign: column.textAlign }} {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, index) =>
                            prepareRow(row) || (
                                <Row
                                    index={index}
                                    row={row}
                                    moveRow={moveRow}
                                    {...row.getRowProps()}
                                />
                            )
                    )}
                </tbody>
            </table>
        </DndProvider>
    )
}

const Row = ({ row, index, moveRow }) => {
    const dropRef = React.useRef(null)
    const dragRef = React.useRef(null)

    const [, drop] = useDrop({
        accept: DND_ITEM_TYPE,
        hover(item, monitor) {
            if (!dropRef.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = dropRef.current.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            if (moveRow(dragIndex, hoverIndex)) {
                item.index = hoverIndex
            }
        }
    })

    const [{ isDragging }, drag, preview] = useDrag({
        type: DND_ITEM_TYPE, 
        item: { index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    preview(drop(dropRef))
    drag(dragRef)

    return (
        <tr ref={dropRef} style={{ opacity }}>
            <td style={{ width: '40px', padding: '10px' }} ref={dragRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </td>
            
            {row.cells.map(cell => {
              return <td>{cell.render('Cell', {value: cell["value"], original: row["original"], clientID: row["original"]["_id"], key: cell["column"]["id"]})}</td>
            })}
        </tr>
    )
}

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
            const updateData = {
              id: clientID,
              key: key,
              data: newValue
            }

            if (key == "routeNumber") {
                console.log(cellProperties)
                let index = cellProperties["row"]['index']
                let newData = cellProperties["data"]
                newData[index]['routeNumber'] = newValue
                console.log("Resetting index for row: " + index)
                setData(newData)
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
          { Header: 'First Name',
          accessor: 'firstName',
          width: REG_CELL_WIDTH,
          height: 70,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text", setData)
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          width: REG_CELL_WIDTH,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text", setData) 
          },
          { Header: 'Route',
          accessor: 'routeNumber',
          width: 80,
          Cell: (cellProperties) => EditableCell(cellProperties, null, null, 80, "text") 
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
          { Header: 'More Details',
            width: '120px',
            Cell: row => (<div style={{textAlign: 'center'}} onClick={() => editClient(row.row.original)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg></div>)
          },
        ],
        []
      )

    function editClient(client) {
        console.log("Editing client")
        console.log(client)
        const { history } = props;
        if (history) {
            history.push('/Client/' + client);
        }
    }

    const data = React.useMemo(
        () => props.data, []
    )

    return (
        <Styles>
            <MyTable columns={columns} data={props.data} setData={props.setData}/>
        </Styles>
    )
}

export default Table