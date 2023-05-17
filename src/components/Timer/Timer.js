import { useTimer } from 'react-timer-hook';
  
function Test() {
    const time = new Date();

    const {
      seconds,
      minutes,
      start,
    } = useTimer({ expiryTimestamp: time.setSeconds(time.getSeconds() + 300), onExpire: () => console.warn('onExpire called') });
  

    return (
        <div style={{textAlign: 'center'}}>  
          <div >
           <span>{minutes}</span>:<span>{seconds}</span> <button onClick={start}>Resend</button>
          </div>
        </div>
      );
    }

    export default Test