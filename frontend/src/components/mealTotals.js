import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'


const Styles = styled.div`
  margin-top: 250px;
  margin-left: 30px;
  width: 70%;
  table {
    border-spacing: 0;
    width: 100%; 
    border: solid 2px #142850;
    tr {  
      :last-child {
        td {
          border-bottom: 0;
          flex-direc  
        }
      }
    }
    th{
        background: aliceblue;
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

function MealTotals({ columns, data }) {
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
        {rows.map((row, i) => {
          console.log(row)
          console.log(i + "here")
          prepareRow(row)
          if (i%3 === 0) {

          let row1 = rows[i+1]
          let row2 = rows[i+2]
          prepareRow(row1)
          prepareRow(row2)
          return (
            <tr {...row.getRowProps()}>
            <tr>
              <td rowSpan={3}>{row.cells[0].render('Cell')}</td>
              <td>{row.cells[1].render('Cell')}</td>
            </tr>
            <tr><td>{row1.cells[1].render('Cell')}</td></tr>
            <tr><td>{row2.cells[1].render('Cell')}</td></tr>
            </tr>
          )
        }})}
      </tbody>
    </table>
  )
}

// {row.cells.map(cell => {
//   if (cell['value'] === " "){
    
//     return <td {...cell.getCellProps()} className="emptyCell">{cell.render('Cell')}</td>
//   }
//   else {
//     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//   }

function Table() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Meal Totals',
        columns: [
          {
            Header: 'Route',
            accessor: 'route'
          },
          {
            Header: ' ',
            accessor: 'info'
          }
        ]
      }
    ]
  )
  
  const routes = [
    {
      route : "1",
      info: "Frozen"
    },
    {
      route: "‎1",
      info: "White bag"
    },
    {
      route: "1",
      info: "# of Meals"
    },
    {
      route : "2",
      info: "Frozen"
    },
    {
      route: "‎2",
      info: "White bag"
    },
    {
      route: "2",
      info: "# of Meals"
    },

]

  const data = React.useMemo(() => routes, [])

  return (
    <Styles>
      <MealTotals columns={columns} data={data} />
    </Styles>
  )
}

export default Table;