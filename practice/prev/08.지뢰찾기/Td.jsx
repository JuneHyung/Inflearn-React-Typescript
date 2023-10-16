import React, { memo, useCallback, useContext } from "react";
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from "./MineSearch";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return { background: "#444", color: "#fff" };
    case CODE.OPENED:
      return { background: "#FFF" };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return { background: "red" };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return { background: "yellow" };
    default:
      return { background: "#FFF" };
  }
};
const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICKED_MINE:
      return "펑";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "❗";
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return "❓";
    default:
      return code || '';
  }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const onClickTd = useCallback(() => {
    if(halted){return;}
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED: // 이미 연칸은 효과X
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL: // 보통 칸은
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:return;
    }
  },[tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback((e)=>{
    if(halted){return;}
    e.preventDefault();
    switch(tableData[rowIndex][cellIndex]){
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex})
        break;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex})
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex})
        return;
      default:return;
    }
  },[tableData[rowIndex][cellIndex], halted])

  // return useMemo(()=>(
  //     <td 
  //       style={getTdStyle(tableData[rowIndex][cellIndex])} 
  //       onClick={onClickTd}
  //       onContextMenu={onRightClickTd}
  //     >
  //       {getTdText(tableData[rowIndex][cellIndex])}
  //     </td>
  //   )
  // , [tableData[rowIndex][cellIndex]])
  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});

const RealTd = memo(({onClickTd, onRightClickTd, data}) =>{
  return (
    <td 
      style={getTdStyle(data)} 
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(data)}
    </td>
  )
})

export default Td;
