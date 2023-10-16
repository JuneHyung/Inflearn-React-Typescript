import React, {useRef, useState} from "react";
import Try from "./Try";

function getNumbers() {
  // 숫자 4개를 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i), 1))[0];
    arr.push(chosen);
  }
  return arr;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setResult('홈런!');
      setTries((prevTries)=>{
        return [...prevTries.tries, { try: value, result: "홈런" }]
      })
      alert("게임을 다시 시작합니다!");
      setValue('');
      setAnswer(getNumbers());
      setTries([])
      inputEl.current.focus();
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join("")} 이였습니다!`)
        alert("게임을 다시 시작합니다!");
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
          setValue('');
          setTries((prevTries)=>{
            return [...prevTries.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }]
          })
          inputEl.current.focus();
        }
      }
    }
  };
  onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput}></input>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((el, i) => {
          return <Try key={`${i + 1}차 시도 : `} tryInfo={el} index={i} />;
        })}
      </ul>
    </>
  );
};
export default NumberBaseball;
