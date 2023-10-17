import * as React from 'react';
import {useState, useRef, useCallback} from 'react';
import Try from './Try';
import { TryInfo } from './Types';
const getNumbers = () =>{
  const candidates  = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i=0;i<4;i+=1){ // 랜덤 숫자 4개 중복없이.
    const chosen = candidates.splice(Math.floor(Math.random()*(9-i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () =>{
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [tries, setTries] = useState<TryInfo[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  const onSubmitForm = useCallback<(e: React.FormEvent)=>void>((e)=>{
    e.preventDefault();
    const input = inputEl.current;
    if (value === answer.join("")) {
      setResult('홈런!');
      setTries((prevTries: any)=>{
        return [...prevTries.tries, { try: value, result: "홈런" }]
      })
      alert("게임을 다시 시작합니다!");
      setValue('');
      setAnswer(getNumbers());
      setTries([])
      if(input) input.focus();
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
        if(input){
          input.focus();
        }
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
          setValue('');
          setTries((prevTries: any)=>{
            return [...prevTries.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }]
          })
          if(input) input.focus();
        }
      }
    }
  },[])
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input 
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          type="text" />
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v,i)=>{
          <Try key={`${i}차 시도 : ${v.try}`} tryInfo={v}/>
        })}
      </ul>
    </>
  )
}

export default NumberBaseball;