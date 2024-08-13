import React, { useState, useEffect } from 'react';
import backbtn from "../../assets/images/backBtn.png";
import { NavLink } from 'react-router-dom';

const Soon = () => {
  const [countdown, setCountdown] = useState('');

  // Calculate target date as 3 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(0, 0, 0, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown('EXPIRED');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownText = `${days}d - ${hours}h - ${minutes}m - ${seconds}s`;
        setCountdown(countdownText);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="coming-soon-container">
      <div className="background"></div>
      <div className="content">
        <NavLink to="/">
          <img src={backbtn} alt='' className='mx-5 pb-10' />
        </NavLink>
        <h1 className="heading">Get Ready!</h1>
        <p className="subheading">Our amazing new game is launching soon.</p>
        {countdown && (
          <div className="countdown-box">
            <p className="countdown-text">Launching in:</p>
            <div className="timers">{countdown}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Soon;
