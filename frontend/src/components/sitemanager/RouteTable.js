import React, { useState } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import env from "react-dotenv"

const FOOD_DAYS = "foodDays"
const FROZEN_DAYS = "frozenDay"
const BOOL_CELL_WIDTH = 65

const Styles = styled.div`
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
     padding: 0.5rem;
     text-align: center;
     border-bottom: 1px solid black;
     border-right: 1px solid black;
     font-size: 20px;

     :last-child {
       border-right: 0;
     }
   }
   th {
     background: #D4D4D4;
     color: black;
     fontWeight: bold;
   }
 }
`

const EditableCell = (cellProperties, foodOrFrozen, day, width) => {
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

  const updateCheckbox = async (clientID) => {
    setSelected(!selected);
    const accessor = cellProperties["column"]["id"];
    const header = cellProperties["column"]["Header"];
    const key = accessor.slice(0, accessor.length - header.length);
    const data = cellProperties["row"]["original"][key];
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

  /*
    check if value is a boolean
    if true then make input type checkbox and check it if boolean is also true
    if not boolean then normal input
  */
  if (value === true || value === false)
  {
    return (
      <span><input type="checkbox" style={{width: width - 1.25}} checked={selected} onChange={e => updateCheckbox(cellProperties["clientID"])} /></span>
    )
  }
  else
  {
    return (
        <span><input style={{width: width - 1.25}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase(e.target.value, cellProperties["value"], cellProperties["clientID"])}/></span>
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
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
      },
      { Header: 'Last Name',
      accessor: 'lastName',
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100) 
      },
      { Header: 'Address',
      accessor: 'address',
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 400)
      },
      { Header: 'M',
      accessor: 'foodDaysM',
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "M", BOOL_CELL_WIDTH)
      },
      { Header: 'T',
      accessor: 'foodDaysT',
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "T", BOOL_CELL_WIDTH)
      },
      { Header: 'W',
      accessor: 'foodDaysW',
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "W", BOOL_CELL_WIDTH)
      },
      { Header: 'Th',
      accessor: 'foodDaysTh',
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "Th", BOOL_CELL_WIDTH)
      },
      { Header: 'F',
      accessor: 'foodDaysF',
      Cell: (cellProperties) => EditableCell(cellProperties, FOOD_DAYS, "F", BOOL_CELL_WIDTH)
      },
      ],},
    {
    Header: 'Frozen Days',
    columns: [
      { Header: 'Frozen',
      accessor: 'frozenNumber',
      Cell: (cellProperties) => EditableCell(cellProperties, null, null, 65)
      },
      { Header: 'M',
        accessor: 'frozenDaysM',
        Cell: (cellProperties) => EditableCell(cellProperties, FROZEN_DAYS, "M", BOOL_CELL_WIDTH)
        },
      { Header: 'T',
        accessor: 'frozenDaysT',
        Cell: (cellProperties) => EditableCell(cellProperties, FROZEN_DAYS, "T", BOOL_CELL_WIDTH)
        },
      { Header: 'W',
        accessor: 'frozenDaysW',
        Cell: (cellProperties) => EditableCell(cellProperties, FROZEN_DAYS, "W", BOOL_CELL_WIDTH)
        },
      { Header: 'Th',
        accessor: 'frozenDaysTh',
        Cell: (cellProperties) => EditableCell(cellProperties, FROZEN_DAYS, "Th", BOOL_CELL_WIDTH)
        },
      { Header: 'F',
        accessor: 'frozenDaysF',
        Cell: (cellProperties) => EditableCell(cellProperties, FROZEN_DAYS, "F", BOOL_CELL_WIDTH)
      },],},
    {
    Header: 'Phone',
    accessor: 'phoneNumber',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'Emergency Contact',
    accessor: 'emergencyContact',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'E. Contact Phone',
    accessor: 'emergencyPhone',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'No Milk',
    accessor: 'noMilk',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'Num. of Meals',
    accessor: 'mealNumber',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'Special Instructions',
    accessor: 'specialInstructions',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'C2 Client',
    accessor: 'clientC2',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'N/E',
    accessor: 'NE',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    },
    {
    Header: 'Email Address',
    accessor: 'email',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 400)
    },
    {
    Header: 'Holiday Frozen',
    accessor: 'holidayFrozen',
    Cell: (cellProperties) => EditableCell(cellProperties, null, null, 100)
    }
    ],
    []
  )

  const data = React.useMemo(() => props.data, [])

  return (
  <Styles>
    <Table columns={columns} data={data}/>
  </Styles>
  )
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow} = useTable({
    columns,
    data,
    })

  // Render the UI for your table
  return (
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
              return <td>{cell.render('Cell', {value: cell["value"], original: row["original"], clientID: row["original"]["_id"], key: cell["column"]["id"]})}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default RouteTable;
