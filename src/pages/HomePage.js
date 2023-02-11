import React, { memo, useEffect } from "react";
// import { motion } from "framer-motion"
import SliderHomePage from "../components/SliderHome/SliderHomePage";
import HistoryHomePage from "../components/HomePage/HistoryHomePage";
import WantToHearHomePage from "../components/SliderHome/WantToHearHomePage";
import NewReleaseHomePage from "../components/SliderHome/NewReleaseHomePage";
import NewMusicEveryDayHomePage from "../components/SliderHome/NewMusicEveryDayHomePage";
import Top100HomePage from "../components/SliderHome/Top100HomePage";
// import XoneCornerHomePage from "../components/SliderHome/XoneCornerHomePage";
import FavoriteArtistHomePapge from "../components/SliderHome/FavoriteArtistHomePapge";
import WeekChartHomePage from "../components/SliderHome/WeekChartHomePage";
import ArtistSpotlight from "../components/SliderHome/ArtistSpotlight";
import RadioHomePage from "../components/SliderHome/RadioHomePage";
import NewMusicHomePage from "../components/SliderHome/NewMusicHomePage";
import NewMusicHomePage2 from "../components/SliderHome/NewMusicHomePage2";
// import EventHomePage from "../components/SliderHome/EventHomePage";
// import ChartHomePage from "../components/SliderHome/ChartHomePage";
import ButtonIconHomePage from "../components/SliderHome/ButtonIconHomePage";
import { scrollTop } from "../asset/data/functions"

const HomePage = memo(() => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div>
      <SliderHomePage/>
      <ButtonIconHomePage/>
      <HistoryHomePage/>
      <WantToHearHomePage/>
      <NewReleaseHomePage/>
      <NewMusicEveryDayHomePage/>
      <FavoriteArtistHomePapge/>
      <WeekChartHomePage/>
      <ArtistSpotlight/>
      <Top100HomePage/>
      <NewMusicHomePage/>
      <NewMusicHomePage2/>
      <RadioHomePage/>
    </div>
  );
});

export default HomePage;