import React, { memo, useMemo, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { auth, onAuthStateChanged } from "./asset/firebase/firebase-config";
import { setPlaying } from "./features/SettingPlay/settingPlay";
import { setUser } from "./features/User/userFeatures";
import { Siderleft, Header } from "./layout/Header";
import { BottomPlay } from "./layout/Bottom";
import RouterPage from "./router/RouterPage";
/*===========================================================*/
const App = memo(() => {
   const queueNowPlaySelector = useSelector((state) => state.queueNowPlay);
   const timeSelector = useSelector((state) => state.currentTimes);
   const settingSelector = useSelector((state) => state.setting);
   const loggedSelector = useSelector((state) => state.logged);
   const lyricsSelector = useSelector((state) => state.lyrics);
   const usersSelcetor = useSelector((state) => state.users);
   const theme = useSelector((state) => state.themetoggle);
   const dispatch = useDispatch();
   /*========================================================*/
   useLayoutEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if(!usersSelcetor.activeUser && user) {
            dispatch(setUser({
              displayName: user.displayName,
              photoURL: user.photoURL,
              email: user.email,
              uid: user.uid,
            }));
         };
      });
     // eslint-disable-next-line
   }, []);
   /*========================================================*/
   useEffect(() => {
      const keyboardShortcuts = (e) => {
         let isInput = false;
         document.querySelectorAll("input").forEach((e) => {
            if(e === document.activeElement) {
               isInput = true;
            };
         });
         if(isInput) return;
         // eslint-disable-next-line default-case
         if(e.keyCode === 32) {
           e.preventDefault();
           dispatch(setPlaying());
         } else if(e.keyCode === 39) {
           document.querySelector("#nextMusic").click();
         } else if(e.keyCode === 37) {
           document.querySelector("#prevMusic").click();
         } else if(e.keyCode === 74) {
           document.querySelector("#randomMusic").click();
         } else if(e.keyCode === 76) {
           document.querySelector("#loopMusic").click();
         };
      };
      document.addEventListener("keydown", keyboardShortcuts);
      return () => document.removeEventListener("keydown", keyboardShortcuts);
      // eslint-disable-next-line
   }, []);
   /*========================================================*/
   useMemo(() => {
      document.documentElement.setAttribute("data-theme", theme.dataTheme);
      if(theme.bgImg) {
         document.documentElement.classList.add("theme-bg-image");
      } else {
         document.documentElement.classList.remove("theme-bg-image");
      };
      if(theme.bgPlaying) {
         document.documentElement.classList.add("zma");
      } else {
         document.documentElement.classList.remove("zma");
      };
      if(theme.dataStyle) {
         const param = theme.dataStyle.map((e) => {
            return e;
         });
         document.documentElement.setAttribute("style", param.join(" ; "))
      } else {
         document.documentElement.removeAttribute("style")
      };
     // eslint-disable-next-line
   }, []);
   /*============ set localStorage =========================*/
   useMemo(() => {
      if(!JSON.parse(localStorage.getItem("queue_nowplay"))) {
         localStorage.setItem("queue_nowplay", JSON.stringify(queueNowPlaySelector));
      };
      if(!JSON.parse(localStorage.getItem("blackcat_logged"))) {
         localStorage.setItem("blackcat_logged", JSON.stringify(loggedSelector));
      };
      if(!JSON.parse(localStorage.getItem("blackcat_setting"))) {
         localStorage.setItem("blackcat_setting", JSON.stringify(settingSelector));
      };
      if(!JSON.parse(localStorage.getItem("blackcat_lyrics"))) {
         localStorage.setItem("blackcat_lyrics", JSON.stringify(lyricsSelector));
      };
      if(!JSON.parse(localStorage.getItem("blackcat_timeCurrent"))) {
         localStorage.setItem("blackcat_timeCurrent", JSON.stringify(timeSelector));
      };
     // eslint-disable-next-line
   }, []);
   /*============ Tải trang khi được truy cập ==============*/
   useEffect(() => {
      window.addEventListener("load", () => {
         document.querySelector(".preloader")?.remove();
      });
   }, []);
   /*========================================================*/
   return (
      <>
         <div className="preloader">
            <div className="loaders"></div>
         </div>         
         <div className={`main ${queueNowPlaySelector.currentEncodeId ? "" : "hide-bottom"}`} style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}>
            <Header/>
            <Siderleft/>
            <BottomPlay/>
            <RouterPage/>
            <ToastContainer
               position="top-center"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               limit={5}
            />
         </div>
      </>
   );
});

export default App;