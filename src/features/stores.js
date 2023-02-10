import { configureStore } from "@reduxjs/toolkit";
import Lyrics from "./Lyrics/Lyrics";
import users from "./User/userFeatures";
import logged from "./Logged/loggedFeatures";
import setting from "./SettingPlay/settingPlay";
import formSearch from "./formSearch/formSearch";
import setTextBtn from "./MvState/MvStateFeatures";
import toggleRight from "./toggleRight/toggleRight";
import themeToggle from "./setTheme/themeSetFeatures";
import setOpenMainMv from "./ToggleMainMv/toggleMainMv";
import queueNowPlay from "./QueueFeatures/QueueFeatures";
import currentTimes from "./QueueFeatures/SetTimeCurrent";
import toggleOpenMain from "./openMainFull/openMainFullFeatures";

export const store = configureStore({
   reducer: {
      formsearch: formSearch,
      themetoggle: themeToggle,
      toggleright: toggleRight,
      setTextBtn: setTextBtn,
      setOpenMainMv: setOpenMainMv,
      toggleOpenMain: toggleOpenMain,
      queueNowPlay: queueNowPlay,
      logged: logged,
      setting: setting,
      lyrics: Lyrics,
      currentTimes: currentTimes,
      users: users,
   },
});