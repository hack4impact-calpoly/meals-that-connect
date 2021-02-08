import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout } from 'react-table'

const Styles = styled.div`
 table {
   margin-top: 100px;
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

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

const VolunteerOverviewData = () => {
    const columns = React.useMemo(
        () => [
        {
        Header: 'Volunteer Overview',
        columns: [
            { Header: 'First Name',
            accessor: 'firstName'
            },
            { Header: 'Last Name',
            accessor: 'lastName' 
            },
            { Header: 'Org.',
            accessor: 'org',
            width: 100
            },
            { Header: 'Phone',
            accessor: 'phoneNumber',
            },
            { Header: 'Email',
            accessor: 'email',
            },
            { Header: 'Using Digital System?',
            accessor: 'digitalSystem',
            width: 100
            },
            { Header: 'M',
            accessor: 'monday',
            width: 70
            },
            { Header: 'T',
            accessor: 'tuesday',
            width: 70
            },
            { Header: 'W',
            accessor: 'wednesday',
            width: 70
            },
            { Header: 'Th',
            accessor: 'thursday',
            width: 70
            },
            { Header: 'F',
            accessor: 'friday',
            width: 70
            },
            { Header: 'Volunteer Certificate Signed?',
            accessor: 'completedOrientation',
            width: 130
            },
            { Header: 'Role',
            accessor: 'role',
            width: 130
            },
            { Header: 'Notes',
            accessor: 'notes',
            },
            
        ],},
        
        ],
        []
    )
    const volunteerData = [
      {
        firstName: "josh",
        lastName: "crodescu",
        email: "joshcodrescu@email.com",
        password: "jcpassword",
        org: "SLO",
        phoneNumber: "123-456-7890",
        notes: "first person",
        digitalSystem: false,
        completedOrientation: true,
        role: "driver",
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: false
      }
    ]

    
  const [data, setData] = React.useState(() => volunteerData)
  const [originalData] = React.useState(data)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  console.log(data)

  return (
  <Styles>
    <VolunteerOverviewTable columns={columns} data={data} updateMyData={updateMyData}/>
  </Styles>
  )
}

function VolunteerOverviewTable({ columns, data, updateMyData }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 10,
      width: 200,
      maxWidth: 300,
      Cell: EditableCell
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow} = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData
    },
    useBlockLayout
    )

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
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerOverviewData;
