import React, { FC, memo, useContext } from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';
interface Props{
  rowIndex: number
}
const Tr: FC<Props> = memo(({rowIndex}) =>{
  const {tableData} = useContext(TableContext);
  return(
    <tr>
      {tableData[0] && Array(tableData[0].length).fill(null).map((td, i) =>
        <Td key={i} rowIndex={rowIndex} cellIndex={i}/>
      )}
    </tr>
  )
});

export default Tr;