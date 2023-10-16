import React, {useState, useReducer, useCallback, useEffect} from 'react';
import Table from './Table';

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: Array.from({length:3},()=>Array.from({length:3},()=>'')),
  recentCell: [-1, -1],
}
const reducer = (state, action)=>{
  switch(action.type){
    case SET_WINNER:
      // state.winner = action.winner; 직접 변경하면 안된다.
      return {
        ...state,
        winner: action.winner
      };// 불변성
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결가능.
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      }
    case CHANGE_TURN:
      return{
        ...state,
        turn: state.turn ==='O' ? 'X' : 'O'
      }
    case RESET_GAME:
      return {
        ...state,
        turn: 'O',
        tableData: Array.from({length:3},()=>Array.from({length:3},()=>'')),
        recentCell: [-1,-1]
      }
  }
}
const TicTacToe = () =>{
  const [state, dispatch] = useReducer(reducer, initialState);
  const {tableData, turn, winner, recentCell} = state;
  // const [winner, setWinner] = useState();
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState(Array.from({length:3},()=>Array.from({length:3},()=>'')));
  const onClickTable = useCallback(()=>{
    dispatch({type: 'SET_WINNER', winner: 'O'})
  },[]);

  useEffect(()=>{
    let win = false;
    const [row, cell] = recentCell;
    if(row<0) return;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대가선
      win = true;
    }

    if(win){ // 승리
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({type: RESET_GAME});
    }else{ // 무승부 검사
      let all = true;
      tableData.forEach((row)=>{
        row.forEach((cell)=>{
          if(!cell){ all = false; }
        })
      })

      if(all){
        dispatch({type: RESET_GAME});
      }else{
        dispatch({type: CHANGE_TURN});
      }
    }
  },[recentCell]);

  return (
    <>
      <Table tableData ={tableData} dispatch={dispatch}/>
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};

export default TicTacToe;