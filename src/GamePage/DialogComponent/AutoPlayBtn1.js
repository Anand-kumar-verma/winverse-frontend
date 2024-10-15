import React from "react";
import { Switch } from "@mui/material";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useFormik } from "formik";

const AutoPlayBtn1 = () => {
  const initialValues = {
    isCashDecrease: false,
    isCashDecrease_value: 0,
  };

  const autoplayfk = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      console.log(autoplayfk.values);
    },
  });

  const text_gray_dark = "!text-gray-200";
  const text_gray_light = "!text-[#5c6062d9]";
  const background = "!bg-[#2C2D30]";
  return (
    <div className="!w-[400px] !bg-black ">
      <div
        className={`flex  flex-col items-center w-full rounded-md ${background} gap-2 py-2`}
      >
        <p className="text-[12px]">Number of Rounds.</p>
        <div className="flex lg:gap-3 gap-1">
          {[10, 20, 50, 100]?.map((i) => {
            return (
              <p
                key={i}
                className="rounded-full bg-black  !text-[#5c6062d9] text-[10px] px-3 py-1 cursor-pointer"
              >
                {i}
              </p>
            );
          })}
        </div>
      </div>
      {/* // cash decrease by one */}
      <div
        className={`!p-3 !mt-2 flex items-center justify-center w-full rounded-md ${background} gap-2`}
      >
        <div className="w-full h-auto flex justify-between">
          <p className="flex items-center gap-1">
            <Switch
              size="small"
              checked={autoplayfk?.values?.isCashDecrease === true}
              onClick={() =>
                autoplayfk.setFieldValue(
                  "isCashDecrease",
                  !autoplayfk?.values.isCashDecrease
                )
              }
            />
            <p
              className={`text-[10px] ${
                autoplayfk?.values.isCashDecrease
                  ? text_gray_dark
                  : text_gray_light
              }`}
            >
              Stop if cash decreases by
            </p>
          </p>
          <div className="flex items-center gap-1">
            <div
              className={`flex gap-2 items-center bg-black justify-evenly rounded-full  py-1  lg:py-0 lg:px-0`}
            >
              <CiCircleMinus
                className={`cursor-pointer text-2xl ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                }`}
                onClick={() =>
                  autoplayfk?.values?.isCashDecrease &&
                  autoplayfk.setFieldValue(
                    "isCashDecrease_value",
                    autoplayfk?.values.isCashDecrease_value - 1 < 0
                      ? autoplayfk?.values.isCashDecrease_value
                      : autoplayfk?.values.isCashDecrease_value - 1
                  )
                }
              />
              <p
                className={`text-[10px] ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                } text-[15px] font-bold lg:py-0 `}
              >
                {autoplayfk?.values.isCashDecrease_value?.toFixed(2)}
              </p>
              <CiCirclePlus
                className={`cursor-pointer text-2xl ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                }`}
                onClick={() =>
                  autoplayfk?.values?.isCashDecrease &&
                  autoplayfk.setFieldValue(
                    "isCashDecrease_value",
                    autoplayfk?.values.isCashDecrease_value + 1
                  )
                }
              />
            </div>
            <p
              className={` ${
                autoplayfk?.values.isCashDecrease
                  ? text_gray_dark
                  : text_gray_light
              } text-[12px]`}
            >
              INR
            </p>
          </div>
        </div>
      </div>
      {/* // cash increses  by one */}
      <div
        className={`!p-3 !mt-2 flex items-center justify-center w-full rounded-md ${background} gap-2`}
      >
        <div className="w-full h-auto flex justify-between">
          <p className="flex items-center gap-1">
            <Switch
              size="small"
              checked={autoplayfk?.values?.isCashDecrease === true}
              onClick={() =>
                autoplayfk.setFieldValue(
                  "isCashDecrease",
                  !autoplayfk?.values.isCashDecrease
                )
              }
            />
            <p
              className={`text-[10px] ${
                autoplayfk?.values.isCashDecrease
                  ? text_gray_dark
                  : text_gray_light
              }`}
            >
              Stop if cash increases by
            </p>
          </p>
          <div className="flex items-center gap-1">
            <div
              className={`flex gap-2 items-center bg-black justify-evenly rounded-full  py-1  lg:py-0 lg:px-0`}
            >
              <CiCircleMinus
                className={`cursor-pointer text-2xl ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                }`}
                onClick={() =>
                  autoplayfk?.values?.isCashDecrease &&
                  autoplayfk.setFieldValue(
                    "isCashDecrease_value",
                    autoplayfk?.values.isCashDecrease_value - 1 < 0
                      ? autoplayfk?.values.isCashDecrease_value
                      : autoplayfk?.values.isCashDecrease_value - 1
                  )
                }
              />
              <p
                className={`text-[10px] ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                } text-[15px] font-bold lg:py-0 `}
              >
                {autoplayfk?.values.isCashDecrease_value?.toFixed(2)}
              </p>
              <CiCirclePlus
                className={`cursor-pointer text-2xl ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                }`}
                onClick={() =>
                  autoplayfk?.values?.isCashDecrease &&
                  autoplayfk.setFieldValue(
                    "isCashDecrease_value",
                    autoplayfk?.values.isCashDecrease_value + 1
                  )
                }
              />
            </div>
            <p
              className={` ${
                autoplayfk?.values.isCashDecrease
                  ? text_gray_dark
                  : text_gray_light
              } text-[12px]`}
            >
              INR
            </p>
          </div>
        </div>
      </div>
      {/* // single with exceeds */}
      <div
        className={`!p-3 !mt-2 flex items-center justify-center w-full rounded-md ${background} gap-2`}
      >
        <div className="w-full h-auto flex justify-between">
          <p className="flex items-center gap-1">
            <Switch
              size="small"
              checked={autoplayfk?.values?.isCashDecrease === true}
              onClick={() =>
                autoplayfk.setFieldValue(
                  "isCashDecrease",
                  !autoplayfk?.values.isCashDecrease
                )
              }
            />
            <p
              className={`text-[10px] ${
                autoplayfk?.values.isCashDecrease
                  ? text_gray_dark
                  : text_gray_light
              }`}
            >
              Stop if single win exceeds
            </p>
          </p>
          <div className="flex items-center gap-1">
            <div
              className={`flex gap-2 items-center bg-black justify-evenly rounded-full  py-1  lg:py-0 lg:px-0`}
            >
              <CiCircleMinus
                className={`cursor-pointer text-2xl ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                }`}
                onClick={() =>
                  autoplayfk?.values?.isCashDecrease &&
                  autoplayfk.setFieldValue(
                    "isCashDecrease_value",
                    autoplayfk?.values.isCashDecrease_value - 1 < 0
                      ? autoplayfk?.values.isCashDecrease_value
                      : autoplayfk?.values.isCashDecrease_value - 1
                  )
                }
              />
              <p
                className={`text-[10px] ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                } text-[15px] font-bold lg:py-0 `}
              >
                {autoplayfk?.values.isCashDecrease_value?.toFixed(2)}
              </p>
              <CiCirclePlus
                className={`cursor-pointer text-2xl ${
                  autoplayfk?.values.isCashDecrease
                    ? text_gray_dark
                    : text_gray_light
                }`}
                onClick={() =>
                  autoplayfk?.values?.isCashDecrease &&
                  autoplayfk.setFieldValue(
                    "isCashDecrease_value",
                    autoplayfk?.values.isCashDecrease_value + 1
                  )
                }
              />
            </div>
            <p
              className={` ${
                autoplayfk?.values.isCashDecrease
                  ? text_gray_dark
                  : text_gray_light
              } text-[12px]`}
            >
              INR
            </p>
          </div>
        </div>
      </div>

      {/* /// buttons */}
      <div
        className={`!p-3 !mt-5 flex items-center justify-center w-full rounded-md ${background} gap-2`}
      >
        <div className="w-full h-auto flex justify-center gap-3">
          <p className="flex justify-center items-center">
            <span className="text-[12px] cursor-pointer bg-[#D07206] border-[1px] border-white rounded-full px-4 py-1">
              Reset
            </span>
          </p>
          <p className="flex justify-center items-center">
            <span className="text-[12px] cursor-pointer bg-[#28A909] border-[1px] border-white rounded-full lg:px-8 px-3 lg:py-2 py-1 font-bold">
              Start
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoPlayBtn1;
