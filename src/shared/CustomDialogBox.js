import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { gray } from "./color";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialogBox = ({
  openCustomDialogBox,
  setOpenCustomDialogBox,
  component,
  title,
}) => {
  const [open, setOpen] = React.useState(openCustomDialogBox);

  const handleClose = () => {
    //   setOpen(false);
    setOpenCustomDialogBox(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{ className: `!max-w-[1000px] ${gray}` }}
    >
      <div className="flex justify-between p-2 items-center bg-black gap-5">
        <p className="text-white text-[12px]">{title}</p>
        <RxCross2 className="!text-white cursor-pointer" onClick={()=>setOpenCustomDialogBox(false)}/>
      </div>
      <DialogContent className="!text-white">{component}</DialogContent>
    </Dialog>
  );
};

export default CustomDialogBox;
