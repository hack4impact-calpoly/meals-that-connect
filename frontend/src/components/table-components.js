

import styled from 'styled-components'
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