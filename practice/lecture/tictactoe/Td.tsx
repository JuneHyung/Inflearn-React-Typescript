import * as React from 'react';
import {Dispatch, FC, useCallback} from 'react';
import { CLICK_CELL } from './TicTacToe';
interface Props{
  rowIndex: number;
  cellIndex: number;
  dispatch: Dispatch<any>;
  cellData: string;
  children: string;

}
const Td:FC<Props> = ({ rowIndex, cellIndex, dispatch, cellData }) =>{
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
}
export default Td;