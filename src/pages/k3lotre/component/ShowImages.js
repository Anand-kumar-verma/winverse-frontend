import { Box } from "@mui/material";
import React, { useState } from "react";
import p2 from "../../../assets/images/n1o.png";
import p3 from "../../../assets/images/n2.png";
import p4 from "../../../assets/images/n3.png";
import p5 from "../../../assets/images/n4.png";
import p1 from "../../../assets/images/no.png";
import { useSocket } from "../../../shared/socket/SocketContext";

const ShowImages = () => {
  const socket = useSocket()
  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Timer()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const [i, setI] = useState([0, 1, 2, 3, 4]);
  const image_arary = [
    p1,
    p2,
    p3,
    p4,
    p5,
  ];
  const Timer = () => {
    const interval = setInterval(() => {
      setI(Math.floor(Math.random() * image_arary.length));
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  }



  const [image, setImage] = useState([1, 2, 3, 4, 5]);
  const image_data = [
    p5,
    p3,
    p1,
    p2,
    p4,
  ];
  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Timer1()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const Timer1 = () => {
    const interval = setInterval(() => {
      setImage(Math.floor(Math.random() * image_data.length));
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  }
  const [images, setImages] = useState([1, 2, 3, 4, 5]);
  const image_scroll = [
    p3,
    p4,
    p2,
    p5,
    p1,
  ];

  React.useEffect(() => {
    const handleThreeMin = (threemin) => {
      if (threemin === 0) Timer2()
    };

    socket.on("onemintrx", handleThreeMin);

    return () => {
      socket.off("onemintrx", handleThreeMin);
    };
  }, []);
  const Timer2 = () => {
    const interval = setInterval(() => {
      setImages(Math.floor(Math.random() * image_scroll.length));
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  }
  return (
    <>
      {/* <div className="!-mb-14">
        <div className=" bg-[#00b977] text-[#00b977] w-10 h-14 relative top-14 left-3 " style={{
          clipPath: "polygon(41% 40%, 0 25%, 0 57%)"
        }}>
          f
        </div>
      </div> */}
      <div className="border-8 border-[#00b977] !h-32 my-4  p-1 rounded-lg !overflow-hidden bg-[#00b977] " >
        <div className="grid grid-cols-3 " >
          <div className="flex flex-col gap-1 justify-start" >
            <Box
              component="img"
              className="w-100  bg-black p-2  border-8  border-green-800"
              src={image_arary[i] || p1} alt={`image-${i}`}

            ></Box>
            <Box
              component="img"
              src={image_arary[i]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_arary[i]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_arary[i]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_arary[i]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box></div>
          <div className="flex flex-col gap-1 justify-start" style={{ height: '100px' }} >  <Box
            component="img"
            className="w-100 bg-black p-2   border-8 border-green-800"
            src={image_data[image] || p4} alt={`image-${i}`}
          ></Box>
            <Box
              component="img"
              src={image_data[image]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_data[image]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_data[image]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_data[image]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box></div>
          <div className="flex flex-col gap-1 justify-start" style={{ height: '100px' }}>  <Box
            component="img"
            className="w-100  bg-black p-2  border-8 border-green-800"
            src={image_scroll[images] || p3} alt={`image-${i}`}
          ></Box>
            <Box
              component="img"
              src={image_scroll[images]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_scroll[images]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_scroll[images]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box>
            <Box
              component="img"
              src={image_scroll[images]} alt={`image-${i}`}
              className="w-20 m-2 "
            ></Box></div>

        </div>
      </div>
      {/* <div className="">
        <div className=" bg-[#00b977] text-[#00b977] w-5 h-8 relative bottom-[95px] right-[-92%] !-mb-10 " style={{
          clipPath: "polygon(100% 18%, 0 44%, 100% 77%)"
        }}>
          fhgfhghfg
        </div>
      </div> */}
    </>
  );
};

export default ShowImages;




