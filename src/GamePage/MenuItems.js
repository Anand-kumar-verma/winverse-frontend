import { Switch } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { AiOutlineSound } from "react-icons/ai";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { CiMusicNote1 } from "react-icons/ci";
import { FaNotesMedical } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineRefresh, MdStarBorder } from "react-icons/md";
import { SiRelianceindustrieslimited } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { isEnableMusicFun, isEnableSoundFun } from "../redux/slices/counterSlice";
import FreeBets from "./DialogComponent/FreeBets";
import GameLimits from "./DialogComponent/GameLimits";
import MybetHistory from "./DialogComponent/MybetHistory";
import { gray } from "./color";
import Changebackground from "./DialogComponent/Changebackground";
import { PiSelectionBackground } from "react-icons/pi";
import ChangebackgroundMusic from "./DialogComponent/ChangebackgroundMusic";
import CustomDialogBox from "../shared/CustomDialogBox";

export default function AccountMenu({ anchorEl, setAnchorEl }) {
  const dispatch = useDispatch()
  const [openCustomDialogBox, setOpenCustomDialogBox] = React.useState(false);
  const [typeOfDialogBox, setTypeOfDialogBox] = React.useState("");
  const isEnableMusic = useSelector(state=>state.aviator.isEnableMusic);
  const isEnableSound = useSelector(state=>state.aviator.isEnableSound);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
     
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        //    onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            bgcolor: "#151617",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",

              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          className={`!rounded-lg !text-white !text-sm !flex !justify-between !gap-32 !bg-[#2C2D30]`}
        >
          <p className="flex items-center ">
            <Avatar />
          </p>
          <p className="flex items-center gap-1 bg-black rounded-full px-3 py-1 cursor-pointer">
            <IoPersonOutline className="!text-sm" />
            <div className="flex flex-col leading-3">
              <span className="text-[10px]">Change</span>
              <span className="text-[10px]">Avatar</span>
            </div>
          </p>
        </MenuItem>

        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
        >
          <p className="flex items-center gap-2">
            <AiOutlineSound /> <span>Sound</span>
          </p>
          <p>
            <Switch checked={isEnableSound} size="small" className="!text-blue-800" onClick={()=>dispatch(isEnableSoundFun())} />
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />
        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
        >
          <p className="flex items-center gap-2">
            <CiMusicNote1 /> <span>Music</span>
          </p>
          <p>
            <Switch checked={isEnableMusic} size="small" onClick={()=>dispatch(isEnableMusicFun())}/>
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />

        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
          onClick={() => {
            setOpenCustomDialogBox(true);
            setTypeOfDialogBox("Free Bets");
          }}
        >
          <p className="flex items-center gap-2">
            <MdStarBorder /> <span>Free Bets</span>
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />
        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
          onClick={() => {
            setOpenCustomDialogBox(true);
            setTypeOfDialogBox("Change Background");
            // handleClose()
          }}
        >
          <p className="flex items-center gap-2">
            <PiSelectionBackground /> <span>Change Background</span>
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />
        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
          onClick={() => {
            setOpenCustomDialogBox(true);
            setTypeOfDialogBox("Change Music");
            // handleClose()
          }}
        >
          <p className="flex items-center gap-2">
            <PiSelectionBackground /> <span>Change Music</span>
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />

        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
        >
          <p className="flex items-center gap-2">
            <BiSolidBadgeCheck /> <span>Provably Fair Settings</span>
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />

        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
        >
          <p className="flex items-center gap-2">
            <FaNotesMedical /> <span>Game Rules</span>
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />

        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
          onClick={() => {
            setOpenCustomDialogBox(true);
            setTypeOfDialogBox("My Bet History");
          }}
        >
          <p className="flex items-center gap-2">
            <MdOutlineRefresh /> <span>My Best History</span>
          </p>
        </MenuItem>
        <Divider className="!bg-gray-500 !p-0" />

        <MenuItem
          className={`${gray} !text-white !text-sm !flex !justify-between`}
          onClick={() => {
            setOpenCustomDialogBox(true);
            setTypeOfDialogBox("Game Limits");
          }}
        >
          <p className="flex items-center gap-2">
            <SiRelianceindustrieslimited /> <span>Game Limits</span>
          </p>
        </MenuItem>
      </Menu>

      {openCustomDialogBox && (
        <CustomDialogBox
          openCustomDialogBox={openCustomDialogBox}
          setOpenCustomDialogBox={setOpenCustomDialogBox}
          component={
            (typeOfDialogBox === "Free Bets" && <FreeBets />) ||
            (typeOfDialogBox === "Game Limits" && <GameLimits />) ||
            (typeOfDialogBox === "My Bet History" && <MybetHistory />) ||
            (typeOfDialogBox === "Change Background" && <Changebackground setOpenCustomDialogBox={setOpenCustomDialogBox} handleClose={handleClose}/>) ||
            (typeOfDialogBox === "Change Music" && <ChangebackgroundMusic setOpenCustomDialogBox={setOpenCustomDialogBox} handleClose={handleClose}/>)
          }
          title={
            (typeOfDialogBox === "Free Bets" && "FREE BETS MANAGEMENT") ||
            (typeOfDialogBox === "Game Limits" && "GAME LIMITS") ||
            (typeOfDialogBox === "My Bet History" && "MY BET HISTORY") || 
            (typeOfDialogBox === "Change Background" && "CHOOSE BACKGROUND") ||
            (typeOfDialogBox === "Change Music" && "CHOOSE MUSIC")
          }
        />
      )}
    </>
  );
}
