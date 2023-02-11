import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { memo } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";


const imgBgViewFull = [
   "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/c/0/5/3c05c10ae36f6361f9af0874bb7c4851.jpg",
   "https://top10tayninh.com/wp-content/uploads/2022/10/hinh-nen-phong-canh-anime-1.jpg",
   "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-nen-anime-phong-canh-dep-nhat.jpg",
   "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/38-1.png",
   "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/05/Anh-Anime-phong-canh-4k.jpg?ssl=1",
];

const BgSwiperFull = () => {
   return (
      <div className="image-effect ">
         <Swiper
            effect={"fade"}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 8800, disableOnInteraction: false }}
            className="mySwiper"
            loop={true}
            speed={1200}
         >
            {imgBgViewFull && imgBgViewFull.map((e, index) => (
                  <SwiperSlide key={index}>
                     <li>
                        <img src={e} alt="bgc"/>
                     </li>
                  </SwiperSlide>
             ))}
         </Swiper>
      </div>
   )
}

export default memo(BgSwiperFull);