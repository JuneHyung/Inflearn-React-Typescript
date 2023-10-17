import * as React from "react";
import {Component} from "react";
interface InitState{
  first: number,
  second: number,
  value: string,
  result: string,
}

class GuGuDan extends Component<{}, InitState> {
  
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value, first, second, result } = this.state;

    // 정답 시 초기화
    if (parseInt(value) === first * second) {
      this.setState((prevState) => {
        return {
          result: "정답: " + prevState.value,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
        };
      });
      if(this.input) this.input.focus();
    } else {
      this.setState((prevState) => {
        return {
          result: "땡: " + '',
          value: "",
        };
      });
      if(this.input) this.input.focus();
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(()=>{ return {value: e.target.value} });
  };
  input: HTMLInputElement | null = null;

  onRefInput = (c: HTMLInputElement) => {
    this.input = c;
  };
  render(){
    return(
      <>
        <div>
          {this.state.first} 곱하기 {this.state.second}는?
        </div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            type="number"
            value={this.state.value}
            onChange={this.onChange}
          />
        </form>
        <div>{this.state.result}</div>
      </>
    )
  }
}

export default GuGuDan;
