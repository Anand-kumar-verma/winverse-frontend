import { Radio } from '@mui/material'
import React from 'react'
import noactivebets from "../../assets/noactivebets.PNG";

const FreeBets = () => {
  return (
    <div className="w-[400px]">
              <div className="flex items-center !text-white border-2 border-green-900 rounded-md w-full">
                <Radio checked size="small" />
                <p className="text-[12px]">Play with cash.</p>
              </div>
              <p className="pt-2 text-[12px]">ACTIVE FREE BETS</p>
              <div className="flex justify-center mt-4">
                <img src={noactivebets} />
              </div>
            </div>
  )
}

export default FreeBets
