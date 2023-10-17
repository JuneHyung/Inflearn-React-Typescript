import * as React from 'react';
import {Component, createRef} from 'react';

interface State {
  state: 'waiting' | 'now' | 'ready',
  message: string,
  result: number[],
}
class ResponseCheckClass extends Component<{}, State> {
  state: State = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  }
  timeout: number | null = null;
  startTime: number | null = null;
  endTime: number | null = null;

 
  onReset = () =>{
    this.setState({result:[]})
  }
  renderAverage=()=>{
    const {result} = this.state;
    return result.length===0 
    ? null 
    : <>
      <div>평균 시간 : {result.reduce((a,c)=>a+c) / result.length}ms</div>
      <button onClick={this.onReset}>리셋</button>
    </>
  }
  onClickScreen = () =>{
    const {state} = this.state;
    if (state === 'waiting') {
      this.timeout = window.setTimeout(()=>{
        this.setState({
          state: 'now',
          message: '지금 클릭'
        });
        this.startTime = new Date().getTime();
      },Math.floor(Math.random() * 1000) + 2000)
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.'
      })
      
    } else if (state === 'ready') { // 성급하게 클릭
      if(this.timeout){
        clearTimeout(this.timeout);
      }
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
      })
    } else if (state === 'now') { // 반응속도 체크
      this.endTime = new Date().getTime();
      this.setState((prevState)=>{
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime! - this.startTime!],
        }
      })
    }
  };

  render(){
    return (
        <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    )
  }
}
export default ResponseCheckClass;