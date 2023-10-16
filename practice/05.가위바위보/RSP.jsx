import React, { useState } from "react";
import useInterval from "./useInterval";
// 실행 순서
// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔때 -> shouldComponentUpdate (true인 경우) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 => componentWillUnmount -> 소멸

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => v[1] === imgCoord)[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  // const interval = useRef();

  // useEffect(()=>{ // componentDidMount, componentUpdate 역할(1대1 대응은 아니라 비슷하게 역할)
  //   interval.current = setInterval(changeHand(),100);
  //   return () =>{ // componentWillUnmount 역할
  //     clearInterval(interval.current);
  //   }
  // }, [imgCoord]);
  const [isRunning, setIsRunning] = useState(true);

  const changeHand = () => {
    // const {imgCoord} = this.state;
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  useInterval(changeHand, isRunning ? 100 : null);

  const onClickBtn = (choice) => () => {
    if (isRunning) {
      // clearInterval(interval.current);
      setIsRunning(false);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비겼습니다!");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼습니다!");
        setScore((prevState) => prevState.score + 1);
      } else {
        setResult("졌습니다!");
        setScore((prevState) => prevState.score - 1);
      }
      setTimeout(() => {
        // interval.current = setInterval(changeHand, 100);
        setIsRunning(true);
      }, 1000);
    }
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
