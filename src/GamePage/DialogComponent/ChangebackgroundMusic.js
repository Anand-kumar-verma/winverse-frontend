import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Button, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { backgroundMusicFun } from "../../redux/slices/counterSlice";

const ChangebackgroundMusic = ({setOpenCustomDialogBox,handleClose}) => {
  const audioRefMusic = useRef(null);
  const audioRefMusic1 = useRef(null);
  const [music_url, setMusic_url] = useState("");
  const [music_url1, setMusic_url1] = useState("");
  const dispatch =  useDispatch()
  const bg_array = [
    {
      id: 1,
      url: "https://res.cloudinary.com/do7kimovl/video/upload/v1709024467/backgroundmusic_ucsmui.mp3",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/do7kimovl/video/upload/v1709029785/bg_music_iiovsn.mp3",
    },
  ];

  const handlePlayMusic1 = () => {
    if (audioRefMusic?.current) {
      try {
        if (audioRefMusic?.current?.paused) {
          audioRefMusic?.current?.play();
        } else {
          audioRefMusic?.current?.pause();
        }
      } catch (error) {
        // Handle any errors during play
        console.error("Error during play:", error);
      }
    }
  };
  const handlePlayMusic2 = () => {
    if (audioRefMusic1?.current) {
      try {
        if (audioRefMusic1?.current?.paused) {
          audioRefMusic1?.current?.play();
        } else {
          audioRefMusic1?.current?.pause();
        }
      } catch (error) {
        // Handle any errors during play
        console.error("Error during play:", error);
      }
    }
  };


  return (
    <div>
      <audio ref={audioRefMusic} hidden>
        <source
          src={
            "https://res.cloudinary.com/do7kimovl/video/upload/v1709024467/backgroundmusic_ucsmui.mp3"
          }
          type="audio/mp3"
        />
      </audio>
      <audio ref={audioRefMusic1} hidden>
        <source
          src={
            "https://res.cloudinary.com/do7kimovl/video/upload/v1709029785/bg_music_iiovsn.mp3"
          }
          type="audio/mp3"
        />
      </audio>

{/* // music 1 */}
      <div
            className="rounded-lg mt-2 py-2 px-4 flex justify-between items-center lg:w-[300px] bg-gray-800"
          >
            <p className="flex gap-1 items-center">
              <IconButton className="!bg-white !p-0">
                {"1" !== music_url ? (
                  <PlayCircleIcon
                    className="cursor-pointer"
                    onClick={() =>{
                        handlePlayMusic1()
                        setMusic_url("1")
                        }}
                  />
                ) : (
                  <PauseCircleFilledIcon
                    className="cursor-pointer"
                    onClick={() => {
                        handlePlayMusic1()
                        setMusic_url("")
                        }}
                  />
                )}
              </IconButton>
              <span>Music 1</span>
            </p>

            <Button
             onClick={() => {
              dispatch(backgroundMusicFun("https://res.cloudinary.com/do7kimovl/video/upload/v1709024467/backgroundmusic_ucsmui.mp3"));
              localStorage.setItem("bg_music", "https://res.cloudinary.com/do7kimovl/video/upload/v1709024467/backgroundmusic_ucsmui.mp3");
              setOpenCustomDialogBox(false);
              handleClose()
            }}
             variant="contained" className="!py-1">
              Apply
            </Button>
          </div>

          {/* // music 2 */}
          <div
            className="rounded-lg mt-2 py-2 px-4 flex justify-between items-center lg:w-[300px] bg-gray-800"
          >
            <p className="flex gap-1 items-center">
              <IconButton className="!bg-white !p-0">
                {"2" !== music_url1 ? (
                  <PlayCircleIcon
                    className="cursor-pointer"
                    onClick={() =>{
                        handlePlayMusic2()
                        setMusic_url1("2")
                        }}
                  />
                ) : (
                  <PauseCircleFilledIcon
                    className="cursor-pointer"
                    onClick={() => {
                        handlePlayMusic2()
                        setMusic_url1("")
                        }}
                  />
                )}
              </IconButton>
              <span>Music 2</span>
            </p>

            <Button 
             onClick={() => {
              dispatch(backgroundMusicFun("https://res.cloudinary.com/do7kimovl/video/upload/v1709029785/bg_music_iiovsn.mp3"));
              localStorage.setItem("bg_music", "https://res.cloudinary.com/do7kimovl/video/upload/v1709029785/bg_music_iiovsn.mp3");
              setOpenCustomDialogBox(false);
              handleClose()
            }}
            variant="contained" className="!py-1">
              Apply
            </Button>
          </div>
    </div>
  );
};

export default ChangebackgroundMusic;
