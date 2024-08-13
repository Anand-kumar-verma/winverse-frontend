import React, { useState, useEffect } from "react";
import { TimerFn } from "../../services/apiCallings";
import { useQuery } from "react-query";

const CountdownTimer = ({ targetDate }) => {
  const [date, setDate] = useState(new Date(targetDate));

  useEffect(() => {
    setDate(new Date(targetDate));
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  function calculateTimeLeft(targetDate) {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  return (
    <div>
      {/* <h1 className='text-white'>{date.toDateString()}</h1> */}
      <div className="text-white  flex justify-start gap-5">
        {timeLeft && (
          <span>
            <span className="">{timeLeft.days}d</span> -{" "}
            <span className="">{timeLeft.hours}h</span> -{" "}
            <span className="">{timeLeft.minutes}m</span> -{" "}
            <span className="">{timeLeft.seconds}s</span>
          </span>
        )}
      </div>
    </div>
  );
};

const CustomDate = () => {
  const { data } = useQuery(["timer_date"], () => TimerFn(), {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
  const Club = data?.data?.data?.club || 0;
  const targetDate = data?.data?.data?.date || 0;
  const targetDateObj = targetDate ? new Date(targetDate) : new Date();
  return (
    <div className="App">
      <CountdownTimer targetDate={targetDateObj} />
      <p className="text-white text-sm">
        Remaining time to Achieve this :{" "}
        <span className="font-bold">{Club}</span>
      </p>
    </div>
  );
};

export default CustomDate;
