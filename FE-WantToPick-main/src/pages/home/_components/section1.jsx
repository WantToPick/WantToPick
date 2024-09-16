import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

export default function Section1() {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            navigation
            pagination={{
                clickable: true,
                dynamicBullets: true, // 슬라이드 위치 표현하는 점 추가
            }}
            modules={[Pagination, Autoplay]}
        >
            {/* 첫 번째 슬라이드 */}
            <SwiperSlide>
                <Slide1 />
            </SwiperSlide>

            {/* 두 번째 슬라이드 */}
            <SwiperSlide>
                <Slide2 />
            </SwiperSlide>

            {/* 세 번째 슬라이드 */}
            <SwiperSlide>
                <Slide3 />
            </SwiperSlide>

            {/* 네 번째 슬라이드 */}
            <SwiperSlide>
                <Slide4 />
            </SwiperSlide>
        </Swiper>
    );
}
