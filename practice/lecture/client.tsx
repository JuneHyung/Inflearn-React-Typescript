const React = require('react');
const ReactDOM = require('react-dom');

// const GuGuDan = require('./GuGuDan');
// const WordRelay = require('./WordRelay');
// const NumberBaseball = require('./NumberBaseball');
// const ResponseCheck = require('./ResponseCheck');
// const RSP = require('./RSP');
// const Lotto = require('./Lotto');
const TicTacToe = require('./tictactoe/TicTacToe.jsx');


// ReactDOM.render(<GuGuDan />, document.querySelector('#root'))
// ReactDOM.render(<WordRelay />, document.querySelector('#root'))
// ReactDOM.render(<NumberBaseball />, document.querySelector('#root'))
// ReactDOM.render(<RSP />, document.querySelector('#root'))
// ReactDOM.render(<Lotto />, document.querySelector('#root'))
ReactDOM.render(<TicTacToe />, document.querySelector('#root'))