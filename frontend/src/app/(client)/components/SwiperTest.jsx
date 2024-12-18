'use client'

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SwiperTest = () => {
    return (
        <div>
             <Swiper
        fadeEffect={{ crossFade: true }}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        style={{
          "--swiper-pagination-color": "#FF1C0A",
          "--swiper-pagination-bullet-inactive-color": "#313030",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "5px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide className='bg-red-400'>
            <div className='w-[700px] h-[500px]'></div>
        </SwiperSlide>
        <SwiperSlide className='bg-red-400'>
            <div className='w-[700px] h-[500px]'></div>
        </SwiperSlide>
        <SwiperSlide className='bg-red-400'>
            <div className='w-[700px] h-[500px]'></div>
        </SwiperSlide>
        <SwiperSlide className='bg-red-400'>
            <div className='w-[700px] h-[500px]'></div>
        </SwiperSlide>
      </Swiper>
        </div>
    )
}

export default SwiperTest