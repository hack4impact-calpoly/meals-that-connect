import React from 'react'

export const ColumnFilter = ({ column }) => {
    const {filterValue, setFilter } = column
    return (
        <span>
            <input
                placeholder="Search"
                value={filterValue || ''}
                onChange={(e) => setFilter(e.target.value)}
                style={{background: '#FFFFFF', margin: "5px 0px 0px 0px"}}
            />
        </span>
    )
}
