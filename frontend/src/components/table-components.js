

import styled from 'styled-components'
import React from 'react'
import env from "react-dotenv"

const FOOD_DAYS = "foodDays";
const FROZEN_DAYS = "frozenDay";
const BOOL_CELL_WIDTH = 50;
const REG_CELL_WIDTH = 100;
const CELL_HEIGHT = 70;
const days = ["M", "T", "W", "Th", "F"];


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
    height: 70px;
    text-align: center;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    font-size: 20px;

    :last-child {
      border-right: 0;
    }
  }
  th {
    padding: 1.0rem;
    background: #D4D4D4;
    color: black;
    fontWeight: bold;
  }
}
`



