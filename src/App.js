import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Bird_HEIGH = 28;
const Bird_WIDTH = 33;
const Wall_HEIGHT = 600;
const Wall_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;

const OBJ_SPEED = 6;
const OBJ_GAP = 200;

// function App() {
const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(Wall_WIDTH);
  // const bottomObj= Wall_HEIGHT - OBJ_GAP - objHeight;
  const [score, setScore] = useState(0);
  useEffect(() => {
    let intVal;
    if (isStart && birdpos < Wall_HEIGHT - Bird_HEIGH) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(Wall_WIDTH);
      setObjHeight(Math.floor(Math.random() * (Wall_HEIGHT - OBJ_GAP)));
      if (isStart) setScore((score) => score + 1);
    }
  }, [isStart, objPos]);

  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= Wall_HEIGHT &&
      birdpos >=
        Wall_HEIGHT - (Wall_HEIGHT - OBJ_GAP - objHeight) - Bird_HEIGH;
   
        if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsStart(false);
      setBirspos(300);
      setScore(0);
    }
  }, [isStart, birdpos, objHeight, objPos]);
  const handler = () => {
    if (!isStart) setIsStart(true);
    else if (birdpos < Bird_HEIGH) setBirspos(0);
    else setBirspos((birdpos) => birdpos - 50);
  };
  return (
    <Home onClick={handler}>
      <span>Score: {score}</span>
      <Background height={Wall_HEIGHT} width={Wall_WIDTH}>
        {!isStart ? <Startboard>Click To Start</Startboard> : null}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />
        <Bird
          height={Bird_HEIGH}
          width={Bird_WIDTH}
          top={birdpos}
          left={100}
        />
        <Obj
          height={Wall_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={Wall_HEIGHT - (objHeight + (Wall_HEIGHT - OBJ_GAP - objHeight))}
          deg={0}
        />
      </Background>
    </Home>
  );
}

export default App;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-image: url("./images/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("./images/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("./images/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: relative;
  top: 40%;
  background-color: red;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -55px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

// const ScoreShow = styled.div`
//   text-align: center;
//   background: transparent;
// `;