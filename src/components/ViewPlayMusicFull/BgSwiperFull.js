import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { memo } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";


const imgBgViewFull = [
   "https://top10tayninh.com/wp-content/uploads/2022/10/hinh-nen-phong-canh-anime-1.jpg",
   "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-nen-anime-phong-canh-dep-nhat.jpg",
   "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/38-1.png",
   "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/05/Anh-Anime-phong-canh-4k.jpg?ssl=1",
   "https://img2.thuthuatphanmem.vn/uploads/2018/11/17/phong-canh-dep-trong-anime_112651330.jpg",
   "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/Download-wallpaper-1920x1080-girl-twilight-clouds-anime-full-hd-hdtv-fhd-1080p-hd-background.png",
   "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/hinh-nen-may-tinh-anime/hinh-nen-phong-canh-anime-1.jpg?1670642844644",
   "https://khoinguonsangtao.vn/wp-content/uploads/2021/10/background-anime.jpg",
   "https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/endless-takeout.png",
   "https://animestore.vn/wp-content/uploads/2022/10/hinh-nen-phong-anh-anime-cho-may-tinh_041751623_thumb.jpg",
   "https://vanhoadoisong.vn/wp-content/uploads/2022/05/100-hinh-nen-anh-phong-canh-anime-dep-full-hd-may-tinh-dien-thoai-01.jpg",
   "https://anhnenchat.com/wp-content/uploads/2021/07/canh-dep-anime-chat-luong-nhat-ma-ban-nen-xem-ngay-tai-day-1-1060x570.jpg",
];

const BgSwiperFull = memo(() => {
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
   );
});

export default BgSwiperFull;