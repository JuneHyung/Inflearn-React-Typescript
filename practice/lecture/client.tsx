const React = require('react');
const ReactDOM = require('react-dom');

// const GuGuDan = require('./GuGuDan');
// const WordRelay = require('./WordRelay');
// const NumberBaseball = require('./NumberBaseball');
// const ResponseCheck = require('./ResponseCheck');
// const RSP = require('./RSP');
// const Lotto = require('./Lotto');
// const TicTacToe = require('./tictactoe/TicTacToe.jsx');
// const MineSearch = require('./mineSearch/MineSearch.jsx');
// const Games = require('./react-router/Games.tsx');

import {Provider} from 'react-redux';
import store from './redux/store';
// const App = require('./redux/AppClass.tsx');
const App = require('./redux/App.tsx');



// ReactDOM.render(<GuGuDan />, document.querySelector('#root'))
// ReactDOM.render(<WordRelay />, document.querySelector('#root'))
// ReactDOM.render(<NumberBaseball />, document.querySelector('#root'))
// ReactDOM.render(<RSP />, document.querySelector('#root'))
// ReactDOM.render(<Lotto />, document.querySelector('#root'))
// ReactDOM.render(<TicTacToe />, document.querySelector('#root'))
// ReactDOM.render(<MineSearch />, document.querySelector('#root'))
// ReactDOM.render(<Games />, document.querySelector('#root'))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#root')
)