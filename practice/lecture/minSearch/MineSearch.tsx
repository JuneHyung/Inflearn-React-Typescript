import * as React from 'react';
import {useEffect, useReducer, useMemo, createContext, Dispatch} from 'react';
import Form from './Form';
import { CLICK_MINE, FLAG_CELL, INCREMENT_TIMER, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, ReducerActions, START_GAME } from './actions';
import Table from './Table';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 물음표인데 지뢰
  FLAG_MINE: -5, // 깃발인데 지뢰
  CLICKED_MINE: -6, // 클릭했는데 지뢰
  OPENED: 0, // 0이상이면 opened
}
export type Codes = typeof CODE[keyof typeof CODE];
interface ReducerState{
  tableData: number[][],
  data: {
    row: number,
    cell: number,
    mine: number
  },
  timer: number,
  result: string,
  halted: boolean,
  openedCount: number
}

const initialState: ReducerState = {
  tableData: [],
  data:{
    row: 0,
    cell: 0,
    mine: 0
  },  
  timer: 0,
  result: '',
  halted: false,
  openedCount: 0
}

const plantMine = (row:number, cell:number, mine:number) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill(undefined)
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData:number[] = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    // 지뢰 심기
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  return data;
};


// reducer

const reducer = (state=initialState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        data: { row: action.row, cell: action.cell, mine: action.mine },
        tableData: plantMine(action.row, action.cell, action.mine),
        openedCount: 0,
        timer: 0,
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      // tableData[action.row] = [...state.tableData[action.row]];
      // tableData[action.row][action.cell] = CODE.OPENED;
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked: string[] = [];
      let openedCount = 0;
      const checkedAround = (row: number, cell: number) => {
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
          return;
        }
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        }
        if (checked.includes(`${row},${cell}`)) {
          return;
        } else {
          checked.push(`${row},${cell}`);
        }

        

        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
        // 주변칸들의 지뢰 개수를 검사
        if (tableData[row - 1]) {
          // 윗 줄
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
        }
        around = around.concat(tableData[row][cell - 1], tableData[row][cell + 1]);
        if (tableData[row + 1]) {
          // 아랫 줄
          around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
        }
        const count = around.filter(function (v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        }).length;

        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              // 있는 칸들만
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkedAround(n[0], n[1]);
              }
            });
          }
        }
        if (tableData[row][cell] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
          openedCount += 1;
        }
        tableData[row][cell] = count;
      };
      checkedAround(action.row, action.cell);
      let halted = false;
      let result = "";
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
        halted = true;
        result = `승리하셨습니다. 경과 시간 : ${state.timer}초`;
      }

      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.MINE ? CODE.FLAG_MINE : CODE.FLAG;

      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.MINE ? CODE.QUESTION_MINE : CODE.QUESTION;
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = tableData[action.row][action.cell] === CODE.QUESTION_MINE ? CODE.MINE : CODE.NORMAL;

      return {
        ...state,
        tableData,
      };
    }

    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
    default:
      return state;
  }
}

interface Context {
  tableData: number[][],
  halted:boolean,
  dispatch: Dispatch<ReducerActions>
}
// context
export const TableContext = createContext<Context>({
  tableData: [],
  halted: true,
  dispatch: ()=>{}
});

const MineSearch = () =>{
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;
  const value = useMemo(() => ({ tableData, halted, dispatch }), [tableData, halted]);

  useEffect(() => {
    let timer: number;
    if (halted===false) {
      timer = window.setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table></Table>
      <div>{result}</div>
    </TableContext.Provider>
  );
}
export default MineSearch;