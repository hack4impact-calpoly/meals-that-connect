

import React from 'react';
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import env from "react-dotenv"

const DND_ITEM_TYPE = 'client'


export const Styles = styled.div`
table {
  margin: 0px 20px 50px 0px;
  border-spacing: 0;
  border: 1px solid black;
  font-family: 'Mulish', sans-serif;
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  th,
  td {
    height: ${props => props.height || "50px"};
    text-align: center;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    font-size: 20px;

    :last-child {
      border-right: 0;
    }
  }
  th {
    height: 40px;
    background: #D4D4D4;
    color: black;
    fontWeight: bold;
  }
}
`


export const DraggableTable = ({ columns, data, setData, route }) => {
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

        if (!route && (dragRecord.routeNumber != hoverRecord.routeNumber)) {
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
  
        if (route) {
          setData(newData, route)
        }
        else {
          setData(newData)
        }
  
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