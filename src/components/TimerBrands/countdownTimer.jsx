import React from 'react';
import { useCountdown } from './useCountdown';

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div id="timer" className="m-auto">
      {/* <div>
        <p>{days}</p>
        <span>{'DAYS'}</span>
      </div> */}
      <div>
        <p>{hours}</p>
        <span>{'HRS'}</span>
      </div>
      <div>
        <p>{minutes}</p>
        <span>{'MIN'}</span>
      </div>
      <div>
        <p>{seconds}</p>
        <span>{'SEC'}</span>
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);


  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
}


export default CountdownTimer;
