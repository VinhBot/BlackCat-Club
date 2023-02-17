import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import React, { memo } from "react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import PlayListSelector from "../Selection/PlayListSelector";
import EventHomeItem from "../Selection/EventHomeItem";

const EventHomePage = memo(() => {
   const project = [
     {
       coverH: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IF_3hsuwkfKkV8r5jT4zeRgTmPD9Cmsnbg&usqp=CAU",
       title: "BlackCat-Club", 
       startTime: "5",
       label: "Minigame",
       subscribeText: "quan tâm",
       unsubscribeText: "Đã quan tâm", 
       totalFollow: "11",
       followers: [
         "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg",
         "https://top10quangbinh.vn/wp-content/uploads/2022/10/anh-gai-xinh-che-mat-2.jpg",
         "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-anh-meo-cute-1.jpg"
       ]
     }, {
       coverH: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IF_3hsuwkfKkV8r5jT4zeRgTmPD9Cmsnbg&usqp=CAU",
       title: "BlackCat-Club", 
       startTime: "3",
       label: "Sinh Nhật Sao",
       subscribeText: "chúc mừng",
       unsubscribeText: "Đã chúc mừng", 
       totalFollow: "11",
       followers: [
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJXEMo3Ao5QRaKnczjzT9iSzVKrbqPNsydGiPIo3NJS-isfA&s",
         "https://toigingiuvedep.vn/wp-content/uploads/2022/01/anh-meo-cute.jpg",
         "https://i.pinimg.com/originals/e4/7d/3c/e47d3cc028272905c14993deef6b68bf.jpg"
       ]
     }, {
       coverH: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IF_3hsuwkfKkV8r5jT4zeRgTmPD9Cmsnbg&usqp=CAU",
       title: "BlackCat-Club", 
       startTime: "3",
       label: "Phát Hành Bài Hát",
       subscribeText: "đăng ký",
       unsubscribeText: "Đã đăng ký", 
       totalFollow: "11",
       followers: [
         "https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg",
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJXEMo3Ao5QRaKnczjzT9iSzVKrbqPNsydGiPIo3NJS-isfA&s",
         "https://toigingiuvedep.vn/wp-content/uploads/2022/03/hinh-cute-meo.jpg"
       ]
     },
   ];
   const navigationPrevRef = React.useRef(null);
   const navigationNextRef = React.useRef(null);
   try {
      return (
         <PlayListSelector childrenOption={
           <div className="absolute mt-2  top-0 event-btn-arrow flex justify-center items-center gap-[10px]">
             <button ref={navigationPrevRef} type="button" className="cursor-pointer">
               <span className="material-icons-outlined">
                 <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
               </span>
             </button>
             <button ref={navigationNextRef} type="button" className="cursor-pointer">
               <span className="material-icons-outlined">
                 <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
               </span>
             </button>
           </div>
         } classAdd={"container-event"} title={"Sự kiện"}>
            {project && project.length > 0 && (
               <Swiper
                  modules={[Navigation, Pagination]}
                  loop={false}
                  slidesPerView={3}
                  pagination={{ dynamicBullets: true }}
                  navigation={{
                     prevEl: navigationPrevRef.current,
                     nextEl: navigationNextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                     swiper.params.navigation.prevEl = navigationPrevRef.current
                     swiper.params.navigation.nextEl = navigationNextRef.current
                  }}
                  speed={600}
                  allowTouchMove={false}
                  scrollbar={{ draggable: false }}
                  breakpoints={{
                     0: {
                        slidesPerView: 1,
                        allowTouchMove: true,
                        slidesPerGroup: 1,
                     },
                     700: {
                        slidesPerView: 2,
                        allowTouchMove: true,
                        slidesPerGroup: 2,
                     },
                     1024: {
                        slidesPerView: 3,
                        allowTouchMove: false,
                        slidesPerGroup: 3,
                     },
                  }}
              >
                {project && project.length > 0 && project.map((e, index) => (
                  <SwiperSlide key={index}>
                    <EventHomeItem key={index} className="col" item={e}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
         </PlayListSelector>
      );
   } catch(error) {
      console.log(error);
   };
});

export default EventHomePage;