import React from 'react';
import {useState, useEffect, useRef} from 'react';

function padNumber (num, length){
    return String(num).padStart(length,'0');
};

function Timer(props) {
    const tempMin = props.min ? parseInt(props.min) : 0;
    const tempSec = props.sec ? parseInt(props.sec) : 0;
    const initialTime = useRef(tempMin * 60 + tempSec);
    const interval = useRef(null);
  
    const [min, setMin] = useState(padNumber(tempMin, 2));
    const [sec, setSec] = useState(padNumber(tempSec, 2));
    const [isActive, setIsActive] = useState(false);

    function toggle() {
      setIsActive(!isActive);
    }


    useEffect(() => {
      if (isActive) {
        interval.current = setTimeout(() => {
          initialTime.current -= 1;
          setSec(padNumber(initialTime.current % 60, 2));
          setMin(padNumber(parseInt((initialTime.current / 60) % 60), 2));
        }, 1000);
      } else if(!isActive && min !== 0 && sec !== 0) {
      return () => clearInterval(interval.current);
      }

      return ()=> clearInterval(interval.current)
    }, [isActive, min, sec]);


    useEffect(() => {
        if (initialTime.current <=0) {
          alert('Finish!')
          clearInterval(interval.current);
        }
      }, [sec]);

    return (
        <div className="timer">
          
          <h3>You have...</h3>
          <h2>
            {min} : {sec}
          </h2>
          <button onClick={toggle}>
            {isActive ?  'Pause' : 'Start'}
          </button>
        </div>
      );
}








export default Timer