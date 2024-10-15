import React, { useEffect } from "react";
import { useMediaQuery } from 'react-responsive';

const LayoutAviator = ({ component }) => {
  const isMediumScreen = useMediaQuery({ minWidth: 800 })
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div className="h-screen w-screen">
      {/* <div className="h-[5vh]">{isMediumScreen ?<Navigation />:<MobileNavigation/>}</div> */}
      <div className="h-[100vh] overflow-auto bg-[#1A1E25] lg:px-4 px-0">{component}</div>
    </div>
  );
};

export default LayoutAviator;
