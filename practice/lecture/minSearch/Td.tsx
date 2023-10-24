import React, { FC, memo, useCallback, useContext } from "react";
import { CLICK_MINE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, clickMine, flagMine, normalizeCell, openCell, questionCell } from "./actions";
import { CODE,Codes, TableContext } from "./MineSearch";

const getTdStyle = (code: Codes) => {
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
const getTdText = (code: Codes) => {
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

interface Props{
  rowIndex:number,
  cellIndex: number
}

const Td:FC<Props> = memo(({ rowIndex, cellIndex }) => {
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
        dispatch(openCell(rowIndex, cellIndex));
        return;
      case CODE.MINE:
        dispatch(clickMine(rowIndex, cellIndex));
        return;
      default:return;
    }
  },[tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback((e: React.MouseEvent)=>{
    if(halted){return;}
    e.preventDefault();
    switch(tableData[rowIndex][cellIndex]){
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch(flagMine(rowIndex, cellIndex))
        break;
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch(questionCell(rowIndex, cellIndex))
        return;
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch(normalizeCell(rowIndex, cellIndex))
        return;
      default:return;
    }
  },[tableData[rowIndex][cellIndex], halted])

  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />;
});


interface RealTdProps{
  onClickTd: ()=>void;
  onRightClickTd: (e: React.MouseEvent)=>void;
  data: number;
}

const RealTd:FC<RealTdProps> = memo(({onClickTd, onRightClickTd, data}) =>{
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
