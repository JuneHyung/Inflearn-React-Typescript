import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
function getWinNumbers() {
  // 숫자 7개를 미리 뽑는 함수
  console.log("getWinNumbers");
  const candidate = Array.fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(()=>getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(()=>{
    console.log('useEffect')
    for(let i=0;i<winNumbers.length-1;i++){
      timeouts.current[i] = setTimeout(()=>{
        setWinBalls((prevBalls)=>[...prevBalls.winBalls, winNumbers[i]])
      }, (i+1)*1000)
    }
    timeouts.current[6] = setTimeout(()=>{ // 보너스
      setBonus(winNumbers[6]);
      setRedo(true)
    }, 7000)
    return () =>{
      timeouts.current.forEach((v)=>clearTimeout(v))
    }
  },[]) // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount와 compoentnDidUpdate 둘 다 수행

  const onClickRedo = useCallback(() => {
    // 처음 상태로 초기화
    // console.log('onClickRedo')
    setWinNumbers(getWinNumbers())
    setWinBalls([])
    setBonus(null)
    setRedo(false)
    timeouts.current = [];
  },[winNumbers]);
  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
