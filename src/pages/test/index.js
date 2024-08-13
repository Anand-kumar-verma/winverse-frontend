import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Mousewheel, Pagination } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="!bg-red-600">Slide 1</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 2</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 3</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 4</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 5</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 6</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 7</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 8</SwiperSlide>
        <SwiperSlide className="!bg-red-600">Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
