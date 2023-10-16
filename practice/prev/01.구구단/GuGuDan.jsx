const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () =>{
  const [first, setFirst] = useState(Math.ceil(Math.random()*9))
  const [second, setSecond] = useState(Math.ceil(Math.random()*9))
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const inputEl = useRef(null);
  const onChangeInput = (e) =>{
    setValue(e.target.value);
  }
  const onSubmitForm = (e) => {
    e.preventDefault();
    // 구구단 로직
    if (parseInt(this.state.value) ===this.state.first * this.state.second) {
      setResult((prevResult)=> {return `정답 : ${prevResult}`})
      setFirst(Math.ceil(Math.random()*9))
      setSecond(Math.ceil(Math.random()*9))
      setValue('');
      this.inputEl.current.focus();
    } else {
      setResult(`땡`)
      setValue('');
      this.inputEl.current.focus();
    }

  }
  return (
    <>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} onChange={onChangeInput} value={value}/>
        <button>입력</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
}

module.exports = GuGuDan;