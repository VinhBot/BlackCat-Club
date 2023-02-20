import { Route, Routes, useLocation } from "react-router-dom";
import React, { memo, useEffect, useRef } from "react";
import {
  MvPageList, NewFeedPageChidlen, MyMusicAll, MyMusicSong, MyMusicPlayList,
  MyMusicArtis, ArtistALl, ArtistSong, ArtistAlbum, ArtistMv, SearchPageSong,
  ArtistSingle, HubDetailPage, SearchPageAll, SearchPageArtist, SearchPageMv,
  SearchPagePlaylist, HistroryPlayList, HistoryVideo, HistorySong, MyInfoPage,
} from "../components/main";
import { 
  AlbumPage, ArtistPage, HomePage, HubPage, MvPage,
  MyMusicPage, NewFeedPage, NotFound, RadioPage, SearchPage,
  Top100Page, ZingChartPage, NewMusicPage, VideoPopUp, HistoryPage, AuthenticationPage
} from "../pages/main";

const RouterPage = memo(() => {
   const mainPageRef = useRef();
   const location = useLocation();
   useEffect(() => {
      mainPageRef.current.addEventListener("scroll", function() {
         if(mainPageRef.current.scrollTop > 30) {
            document.documentElement.classList.add("is-scroll");
         } else {
            document.documentElement.classList.remove("is-scroll");
         };
      });
   }, []);
   return (
      <div ref={mainPageRef} id="scrollableDiv" className="main-page">
         <div className="container">
            <Routes location={location} key={location.pathname}>
               {/* Phần trang cá nhân, giao diện người dùng */}
               <Route path="/mymusic/" element={<MyMusicPage />}>
                  <Route path="playlist" element={<MyMusicPlayList />}/>
                  <Route path="nghe-si" element={<MyMusicArtis />}/>
                  <Route path="song" element={<MyMusicSong />}/>
                  <Route path="info" element={<MyInfoPage />}/>
                  <Route index element={<MyMusicAll />}/>
               </Route>
               {/* phần đăng nhập, trang chủ */}
               <Route path="/auth" element={<AuthenticationPage />} />
               <Route index element={<HomePage />}/>
               <Route path="/" element={<HomePage />}/>
               <Route path="/zing-chart" element={<ZingChartPage />}/>
               <Route path="/radio" element={<RadioPage />}/>
               <Route path="newfeed/:nation" element={<NewFeedPage />}>
                  <Route path=":id" element={<NewFeedPageChidlen />}/>
               </Route>
               {/*  */}
               <Route path="/moi-phat-hanh" element={<NewMusicPage/>}/>
               <Route path="/hub/" element={<HubPage/>}/>
               <Route path="/hub/detail/:id" element={<HubDetailPage/>}/>
               <Route path="/top100" element={<Top100Page/>}/>
               {/*  */}
               <Route path="/mv" element={<MvPage/>}>
                  <Route path=":id" element={<MvPageList/>}/>
               </Route>
               {/* Phần tìm kiếm */}
               <Route path="/tim-kiem" element={<SearchPage/>}>
                  <Route path="tatca/:id" element={<SearchPageAll/>}/>
                  <Route path="baihat/:id" element={<SearchPageSong/>}/>
                  <Route path="artist/:id" element={<SearchPageArtist/>}/>
                  <Route path="video/:id" element={<SearchPageMv/>}/>
                  <Route path="playlist/:id" element={<SearchPagePlaylist/>}/>
               </Route>
               {/*  */}
               <Route path="/nghe-si/:name" element={<ArtistPage/>}>
                  <Route index element={<ArtistALl/>}/>
                  <Route path="song" element={<ArtistSong/>}/>
                  <Route path="album" element={<ArtistAlbum/>}/>
                  <Route path="mv" element={<ArtistMv/>}/>
                  <Route path="single" element={<ArtistSingle/>}/>
               </Route>
               {/*  */}
               <Route path="/history/" element={<HistoryPage/>}>
                  <Route index path="playlist" element={<HistroryPlayList/>}/>
                  <Route path="video" element={<HistoryVideo/>}/>
                  <Route path="song" element={<HistorySong/>}/>
               </Route>
               {/*  */}
               <Route path="/video-clip/:id" element={<VideoPopUp/>}/>
               <Route path="/album/:id" element={<AlbumPage/>}/>
               {/* Hiển thị nếu không thể tìm thấy trang yêu cầu */}
               <Route path="*" element={<NotFound/>}/>
            </Routes>
         </div>
      </div>
   );
});

export default RouterPage;