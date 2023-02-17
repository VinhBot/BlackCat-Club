import React, { memo, useEffect } from "react";
import { 
  NewMusicEveryDayHomePage, NewReleaseHomePage, WantToHearHomePage, HistoryHomePage, SliderHomePage,
  Top100HomePage, NewMusicHomePage, RadioHomePage, ArtistSpotlight, WeekChartHomePage, FavoriteArtistHomePapge,
  NewMusicHomePage2, ButtonIconHomePage, EventHomePage
} from "../components/main";
import { scrollTop } from "../asset/data/functions";

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
      <EventHomePage/>
    </div>
  );
});

export default HomePage;