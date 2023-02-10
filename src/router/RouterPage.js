import { Route, Routes, useLocation } from "react-router-dom";
import React, { memo, useEffect, useRef } from "react";
import AlbumPage from "../pages/AlbumPage"
import ArtistPage from "../pages/ArtistPage"
import HomePage from "../pages/HomePage"
import HubPage from "../pages/HubPage"
import MvPage from "../pages/MvPage"
import MyMusicPage from "../pages/MyMusicPage"
import NewFeedPage from "../pages/NewFeedPage"
import NotFound from "../pages/NotFound"
import RadioPage from "../pages/RadioPage"
import SearchPage from "../pages/SearchPage"
import Top100Page from "../pages/Top100Page"
import ZingChartPage from "../pages/ZingChartPage"
import NewMusicPage from "../pages/NewMusicPage"
import MvPageList from "../components/MVpage/MvPageList"
import NewFeedPageChidlen from "../components/Followpage/NewFeedPageChidlen"
import MyMusicAll from "../components/MyMusicPage/MyMusicAll"
import MyMusicSong from "../components/MyMusicPage/MyMusicSong"
import MyMusicPlayList from "../components/MyMusicPage/MyMusicPlayList"
import MyMusicArtis from "../components/MyMusicPage/MyMusicArtis"
import ArtistALl from "../components/ArtistPage/ArtistALl"
import ArtistSong from "../components/ArtistPage/ArtistSong"
import ArtistAlbum from "../components/ArtistPage/ArtistAlbum"
import ArtistMv from "../components/ArtistPage/ArtistMv"
import ArtistSingle from "../components/ArtistPage/ArtistSingle"
import HubDetailPage from "../components/HubPage/HubDetailPage"
import SearchPageAll from "../components/SearchPage/SearchPageAll"
import SearchPageArtist from "../components/SearchPage/SearchPageArtist"
import SearchPageMv from "../components/SearchPage/SearchPageMv"
import SearchPageSong from "../components/SearchPage/SearchPageSong"
import SearchPagePlaylist from "../components/SearchPage/SearchPagePlaylist"
import VideoPopUp from "../pages/VideoPopUp"
import HistoryPage from "../pages/HistoryPage"
import HistroryPlayList from "../components/HistoryPage/HistroryPlayList"
import HistoryVideo from "../components/HistoryPage/HistoryVideo"
import HistorySong from "../components/HistoryPage/HistorySong"
import AuthenticationPage from "../pages/AuthenticationPage"
import MyInfoPage from "../components/MyMusicPage/MyInfoPage"

const RouterPage = memo(() => {
   const mainPageRef = useRef();
   const location = useLocation();
   useEffect(() => {
      mainPageRef.current.addEventListener("scroll", function(e) {
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
               {/* */}
               <Route path="/history/" element={<HistoryPage/>}>
                  <Route index path="playlist" element={<HistroryPlayList/>}/>
                  <Route path="video" element={<HistoryVideo/>}/>
                  <Route path="song" element={<HistorySong/>}/>
               </Route>
               {/*  */}
               <Route path="/video-clip/:id" element={<VideoPopUp/>}/>
               <Route path="/album/:id" element={<AlbumPage/>}/>
               {/*  */}
               <Route path="*" element={<NotFound/>}/>
            </Routes>
         </div>
      </div>
   );
});

export default RouterPage;