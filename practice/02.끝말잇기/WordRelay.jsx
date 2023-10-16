const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("준형");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      // uncontrolled input으로 쓸 경우.
      // e.target.children.word.value = '' 
      inputEl.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputEl.current.focus();
    }
  };

  const onChangeInput = (e) =>{
    setValue(e.target.value)
  }

  return (
    <>
      <div>{word}</div>
        <form onSubmit={onSubmitForm}>
          <lebel htmlFor="wordInput">글자를 입력하세요.</lebel>
          <input id="wordInput" className="wordInput" ref={inputEl} value={value} onChange={onChangeInput} />
          <button>입력!</button>
        </form>
        <div>{result}</div>
    </>
  )
};

// class WordRelay extends Component{
//   state={
//     word: '준형',
//     value: '',
//     result: '',
//   };

//   onSubmitForm =(e)=> {
//     e.preventDefault();
//     if(this.state.word[this.state.word.length-1] === this.state.value[0]){
//       this.setState({
//         result: '딩동댕',
//         word: value,
//         value: '',
//       })
//       this.input.focus();
//     }else{
//       this.setState({
//         result: '떙',
//         value: '',
//       })
//     }
//   }
//   onChangeInput = (e) => {
//     this.setState({value: e.target.value});
//   }
//   render(){
//     return (
//     <>
//       <div>{this.state.word}</div>
//       <form onSubmit={this.onSubmitForm}>
//         <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//         <button>입력!</button>
//       </form>
//       <div>{this.state.result}</div>
//     </>
//     )
//   }
// }

module.exports = WordRelay;
