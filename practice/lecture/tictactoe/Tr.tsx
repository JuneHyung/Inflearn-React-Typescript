import * as React from 'react';
import { Dispatch, FC, useMemo } from "react";
import Td from "./Td";

interface Props{
  rowData: string[],
  rowIndex: number,
  dispatch: Dispatch<any>,
}
const Tr: FC<Props> = ({rowData, rowIndex, dispatch}) =>{
  return (
    <tr>
      {Array(rowData.length).fill(null).map((td, i) => (
        <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
      ))}
    </tr>
  )
}

export default Tr;