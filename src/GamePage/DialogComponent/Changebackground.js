import React, { useState } from "react";
import { backgroundImageFun } from "../../redux/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import air from "../../assets/air.png";
import { useMediaQuery } from "react-responsive";

const Changebackground = ({ setOpenCustomDialogBox,handleClose }) => {
  const backgroundImage_url = useSelector(
    (state) => state.aviator.backgroundImage_url
  );

  const isMediumScreen = useMediaQuery({ minWidth: 800 });
  const [isPreviewEnabel, setIspreviewEnable] = useState(false);
  const [imageUrl, setImageUrl] = useState(backgroundImage_url);
  const dispatch = useDispatch();
  const bg_array = [
    {
      id: 1,
      url: "https://res.cloudinary.com/do7kimovl/image/upload/v1708942322/bg_meqawa.jpg",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/do7kimovl/image/upload/v1708942320/cloud_bek5vh.png",
    },
    {
      id: 3,
      url: "https://res.cloudinary.com/do7kimovl/image/upload/v1708942319/cloud1_rjniks.jpg",
    },
    {
      id: 4,
      url: "https://res.cloudinary.com/do7kimovl/image/upload/v1708942319/cloud4_uazfvy.jpg",
    },
    {
      id: 5,
      url: "https://res.cloudinary.com/do7kimovl/image/upload/v1708942319/cloud2_gffdmv.jpg",
    },
    {
      id: 6,
      url: "https://res.cloudinary.com/do7kimovl/image/upload/v1708942319/cloud5_kwar8w.jpg",
    },
    {
      id: 7,
      url: "https://res.cloudinary.com/do7kimovl/image/upload/v1709114502/circle_dafpdo.svg",
    },
  ];
  
  return (
    <>
      <div
        className="moved parentdiv relative lg:h-[250px] h-[200px] w-[99.8%] overflow-hidden  rounded-lg py-8  mt-1 border-[1px] border-white border-opacity-20"
        // style={{ backgroundImage: `url(${backgroundImage_url})`, backgroundSize: 'cover',height:"250px",zIndex: 0, transform: 'translateZ(-10px)'}}
      >
        <img
          src={imageUrl}
          className=" !z-0 absolute  top-0 left-0 object-cover lg:h-[250px] h-[200px] w-[99.8%] bgimagedynamic"
        />

        {isMediumScreen && isPreviewEnabel ? (
          <svg
            width="100%"
            height="150%"
            xmlns="http://www.w3.org/2000/svg"
            className="z-10 absolute"
          >
            <path
              d={`
          M-40 215 
          C199 200, 190 200, 810 28
          L800 400 
          L-40 400 
          Z
        `}
              fill="rgba(112,9,25, 0.6)"
              // stroke="#BC0319"
              stroke-width="3"
              stroke-dasharray="1000 0"
            />
          </svg>
        ) : (
          isPreviewEnabel && (
            <svg
              width="100%"
              height="150%"
              xmlns="http://www.w3.org/2000/svg"
              className="z-10 absolute"
            >
              <path
                d={`
          M-10 185 
          C50 100, 50 190, 190 20
          L200 200 
          L-40 200 
          Z
        `}
                fill="rgba(112,9,25, 0.6)"
                // stroke="#BC0319"
                stroke-width="3"
                stroke-dasharray="1000 0"
              />
            </svg>
          )
        )}
        {isPreviewEnabel && (
          <img
            src={air}
            className="absolute lg:top-[8px] top-[32px] lg:left-[800px] left-[185px] lg:w-[120px] w-[40px] lg:h-[60px]  h-[20px] text-[#BC0319] "
          />
        )}
      </div>
      <div className="flex gap-3 flex-wrap mt-5">
        {bg_array?.map((i, index) => {
          return (
            <img
              key={index}
              src={i.url}
              
                className="bg-gray-500 cursor-pointer lg:h-[100px] lg:w-[100px] h-[50px] w-[50px] border-[2px] border-blue-800 rounded-md"
              onClick={() => {
                setImageUrl(i?.url);
              }}
            />
          );
        })}

        <div className="flex justify-end w-full gap-2">
          <Button
            variant="contained"
            onClick={() => {
              dispatch(backgroundImageFun(imageUrl));
              localStorage.setItem("bg_image", imageUrl);
              setOpenCustomDialogBox(false);
              handleClose()
            }}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            onClick={() => setIspreviewEnable(!isPreviewEnabel)}
          >
            {!isPreviewEnabel ? "Preview" : "Remove"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Changebackground;
