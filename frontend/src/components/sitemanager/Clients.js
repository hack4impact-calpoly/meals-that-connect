import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import env from "react-dotenv"

const FOOD_DAYS = "foodDays";
const FROZEN_DAYS = "frozenDay";
const BOOL_CELL_WIDTH = 65;
const REG_CELL_WIDTH = 100;
const days = ["M", "T", "W", "Th", "F"];

const Styles = styled.div`
  width: 100%; 

  table {
    border-spacing: 0;
    width: 100%; 
    border: solid 2px #142850;

    tr {  
      :last-child {
        td {
          border-bottom: 0;  
        }
      }
    }

    th{
        background: #D4D4D4;
        color: black;
        border: solid 2px #142850;
        textAlign: column.textAlign;
        fontWeight: bold;
        minWidth: 80px;
        padding: 3px 20px;
        font-size: 20px;
    }
    td {
        padding: 3px 20px;
        border: solid 1px gray;
        background: white;
        overflow: auto;
        font-size: 18px;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const MyTable = ({ columns, data }) => {
    const [records, setRecords] = React.useState(data)

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
        data: records,
        columns,
        getRowId,
    })

    const moveRow = (dragIndex, hoverIndex) => {
        const dragRecord = records[dragIndex]
        setRecords(
            update(records, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRecord],
                ],
            })
        )
        let client1 = {
            ID: dragRecord.index,
            row: hoverIndex,
        }
        let client2 = {
            ID: records[hoverIndex].index,
            row: dragIndex,
        }
        console.log(client1)
        console.log(client2)
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
                                    style={{
                                        padding: '3px 20px',
                                        border: 'solid 1px gray',
                                        background: 'white',
                                        overflow: 'auto',
                                        fontSize: '18px'
                                    }}
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

const DND_ITEM_TYPE = 'client'

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
            moveRow(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
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
            <td style={{ width: '30px', padding: '3px 8px 3px 10px' }} ref={dragRef}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </td>
            {row.cells.map(cell => {
                return <td style={{ width: cell.width }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
        </tr>
    )
}

const EditableCell = (cellProperties, foodOrFrozen, day, width, inputType) => {
    console.log(cellProperties)
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
      console.log(cellProperties)
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
        <span><input type={inputType} style={{width: width - 1.25}} checked={selected} onChange={e => updateCheckbox(cellProperties["clientID"])} /></span>
      )
    }
    else
    {
      return (
          <span><input type={inputType} style={{width: width - 1.25}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(e.target.value, cellProperties["value"], cellProperties["clientID"])}/></span>
      )
    }
  
  }

//   {
//     Header: 'Client',
//     id: 'index',
//     width: '50px',
//     textAlign: 'center',
//     display: 'none',
//     Cell: row => (<div type="text" style={{ textAlign: 'center' }}>{row.row.index + 1}</div>)
// },

const Table = (props) => {
    const columns = React.useMemo(
        () => [
              {
                Header: 'Client',
                id: 'index',
                width: '50px',
                textAlign: 'center',
                display: 'none',
                Cell: row => (<div type="text" style={{ textAlign: 'center' }}>{row.row.index + 1}</div>)
            },
            {
                Header: 'First Name',
                accessor: 'firstName',
                textAlign: 'left',
                width: '150px',
                Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text")
            },
            { Header: 'Last Name',
            accessor: 'lastName',
            Cell: (cellProperties) => EditableCell(cellProperties, null, null, REG_CELL_WIDTH, "text") 
            },
          
            
        ],
        []
    )

    function editClient(ID) {
        const { history } = props;
        if (history) {
            history.push('/Client/' + ID);
        }
    }

    const data = React.useMemo(
        () => props.data, []
    )

    return (
        <Styles>
            <MyTable columns={columns} data={data} />
        </Styles>
    )
}

export default Table