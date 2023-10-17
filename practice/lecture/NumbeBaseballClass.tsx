import React, {Component, createRef} from 'react';
import Try from './Try';
import {TryInfo} from './Types';

function getNumbers() {
  // 숫자 4개를 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const arr = [];
  for(let i=0;i<4;i+=1){
    const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
}

interface State{
  result: string;
  value: string;
  answer: number[];
  tries: TryInfo[];
}

class NumberBaseball extends Component<{}, State> {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if(this.state.value=== this.state.answer.join('')){
      this.setState({
        result: '홈런!',
        tries: [...this.state.tries, {try: this.state.value, result: '홈런'}],
      })
      alert('게임을 다시 시작합니다!');
        this.setState({
          value:'',
          answer: getNumbers(),
          tries: [],
        });
    }
    else{
      const answerArray = this.state.value.split('').map((v)=>parseInt(v));
      let strike = 0;
      let ball = 0;
      if(this.state.tries.length >=9){
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join('')} 이였습니다!`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value:'',
          answer: getNumbers(),
          tries: [],
        });
      }else{
        for(let i=0;i<4;i+=1){
          if(answerArray[i] === this.state.answer[i]){
            strike+=1;
          }else if(this.state.answer.includes(answerArray[i])){
            ball+=1;
          }
          this.setState({
            tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]
          })
        }
      }
    }
  };
  onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    })
  };
  
  inputRef = createRef<HTMLInputElement>();
  // onInputRef = (c) =>{this.input= c;}

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput}></input>
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((el, i) => {
            return (
              <Try key={`${i+1}차 시도 : `} tryInfo={el} />
            );
          })}
        </ul>
      </>
    );
  }
}
export default NumberBaseball