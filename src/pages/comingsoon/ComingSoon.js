

import React, { useState, useEffect } from 'react';
import backbtn from "../../assets/images/backBtn.png";
import { NavLink } from 'react-router-dom';


const ComingSoon = () => {
  const [countdown, setCountdown] = useState('');

  const targetDate = new Date('sep 1, 2024 00:00:00').getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const countdownText = `${days}d - ${hours}h - ${minutes}m - ${seconds}s`;
      setCountdown(countdownText);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown('EXPIRED');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    
    
      <div className="coming-soon-container">
     
      <div className="background"></div>
     
      <div className="content">
      <NavLink to="/">
      <img src={backbtn} alt=''  className='mx-5 pb-10' />
        </NavLink>
      
        <h1 className="heading ">Get Ready!</h1>
        <p className="subheading">Our amazing new games is launching soon.</p>
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

export default ComingSoon;
