import { Box } from "@mui/material";
import React, { useState } from "react";
import pr0 from "../../../assets/images/n0-30bd92d1.png";
import pr1 from "../../../assets/images/n1-dfccbff5.png";
import pr2 from "../../../assets/images/n2-c2913607.png";
import pr3 from "../../../assets/images/n3-f92c313f.png";
import pr4 from "../../../assets/images/n4-cb84933b.png";
import pr5 from "../../../assets/images/n5-49d0e9c5.png";
import pr6 from "../../../assets/images/n6-a56e0b9a.png";
import pr7 from "../../../assets/images/n7-5961a17f.png";
import pr8 from "../../../assets/images/n8-d4d951a4.png";
import pr9 from "../../../assets/images/n9-a20f6f42 (1).png";
import b from "../../../assets/images/b.png";
import a from "../../../assets/images/a.png";
import c from "../../../assets/images/c.png";
import d from "../../../assets/images/d.png";
import e from "../../../assets/images/e.png";
import f from "../../../assets/images/f.png";
import g from "../../../assets/images/g.png";
import h from "../../../assets/images/h.png";
import i from "../../../assets/images/i.png";
import j from "../../../assets/images/j.png";
import k from "../../../assets/images/k.png";
import l from "../../../assets/images/l.png";
import m from "../../../assets/images/m.png";
import n from "../../../assets/images/n.png";
import o from "../../../assets/images/o.png";
import p from "../../../assets/images/p.png";
import q from "../../../assets/images/q.png";
import r from "../../../assets/images/r.png";
import s from "../../../assets/images/s.png";
import t from "../../../assets/images/t.png";
import u from "../../../assets/images/u.png";
import v from "../../../assets/images/v.png";
import w from "../../../assets/images/w.png";
import x from "../../../assets/images/x.png";
import y from "../../../assets/images/y.png";
import z from "../../../assets/images/z.png";
import { useSelector } from "react-redux";
import { changeImagesTRX } from "../../../shared/nodeSchedular";
const ShowImages = () => {
  const [return_image_index, setReturn_index] = useState([1, 2, 3, 4, 5]);

  const image_array_of_image = [
    pr0,
    pr1,
    pr2,
    pr3,
    pr4,
    pr5,
    pr6,
    pr7,
    pr8,
    pr9,
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
  ];

  const trx_game_image_index = useSelector(
    (state) => state.aviator.trx_game_image_index
  );

  React.useEffect(() => {
    const result = changeImagesTRX(trx_game_image_index);
    setReturn_index(result);
  }, [trx_game_image_index]);

  return (
    <>
      <div className="grid grid-cols-5 gap-4  mt-10 mb-2">
        <Box
          component="img"
          className=""
          src={image_array_of_image[return_image_index[0]]}
        ></Box>
        <Box
          component="img"
          src={image_array_of_image[return_image_index[1]]}
        ></Box>
        <Box
          component="img"
          src={image_array_of_image[return_image_index[2]]}
        ></Box>
        <Box
          component="img"
          src={image_array_of_image[return_image_index[3]]}
        ></Box>
        <Box
          component="img"
          src={image_array_of_image[return_image_index[4]]}
        ></Box>
      </div>
    </>
  );
};

export default ShowImages;
