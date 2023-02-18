import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getNewSongRelease } from "../asset/api/path"
import { LoadingSvg, ItemChartList } from "../components/main";
import { setPlay, setReady } from "../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../features/QueueFeatures/QueueFeatures"
const NewMusicPage = () => {
   const { data, status } = getNewSongRelease();
   const [datas, setData] = useState([]);
   const dispatch = useDispatch();
   useEffect(() => {
      if (data) {
         setData(data.data.items);
      };
   }, [status]);
   if (datas.length === 0) return <LoadingSvg/>
   let indexItem = -1;
   return (
      <div className="main_topchart songnew">
         <div className="container_zing-chart">
            <div className="zing-chart_top">
               <div className="cursor-pointer zing-chartBtn">
                  <p className="">Mới Phát Hành</p>
                  <span
                     onClick={async () => {
                        dispatch(setReady(false))
                        dispatch(setPlay(false))
                        await dispatch(fetchPlayList("ZDB6EB9C"))
                        dispatch(setPlay(true))
                     }}
                     className="material-icons-round"
                  >
                     {" "}
                     play_circle
                  </span>
               </div>
            </div>
            <div className="zing-chart_bottom">
               <div className="zing-chart_list ">
                  {datas && datas.length > 0 && datas.map((e, index) => {
                        if (e.streamingStatus === 1) {
                           indexItem++
                        };
                        return (
                           <ItemChartList
                              indexNotVip={indexItem}
                              idAlbum="ZDB6EB9C"
                              index={index}
                              item={e}
                              key={uuidv4()}
                           />
                        );
                     })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default NewMusicPage
