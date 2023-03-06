import React, { useEffect, useState } from "react"
import CharHomeItem from "../components/Selection/CharHomeItem"
import { useGetHomeChart } from "../asset/api/path"
import ChartList from "../components/TopChartPage/ChartList"
import WeekList from "../components/TopChartPage/WeekList"
import { LoadingSvg }from "../components/loading/LoadingSvg"
import { useDispatch } from "react-redux"
import { setPlay, setReady } from "../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../features/QueueFeatures/QueueFeatures"
const ZingChartPage = () => {
   const { data, status } = useGetHomeChart();
   const [datas, setData] = useState([]);
   const dispatch = useDispatch();
   useEffect(() => {
      if(data) {
         setData(data.data);
      };
      // eslint-disable-next-line
   }, [status]);
   const rank1 = datas?.RTChart?.items[0].title;
   const rank2 = datas?.RTChart?.items[1].title;
   const rank3 = datas?.RTChart?.items[2].title;
   try {
      if (datas.length === 0) return <LoadingSvg/>
      return (
         <div className="main_topchart  main-page-item ">
            <div className="container_zing-chart">
               <div className="container_zing-chart-pos">
                  <div className="zing-chart_top">
                     <div className="cursor-pointer zing-chartBtn">
                        <p className="">Top Chart</p>
                        <span
                           onClick={async () => {
                              dispatch(setReady(false))
                              dispatch(setPlay(false))
                              await dispatch(fetchPlayList("ZO68OC68"))
                              dispatch(setPlay(true))
                           }}
                           className="material-icons-round"
                        >
                           {" "}
                           play_circle
                        </span>
                     </div>
                  </div>

                  <div className="row zing-chart_bottom">
                     <div className="col l-12 m-12 c-12">
                        <div className="zing-chart_right">
                           <div className="zing-chart_right-top">
                              <div className="zing-chart_right-top_item">
                                 <div className="zing-chart_right-top_box" />
                                 <p>{rank1}</p>
                              </div>
                              <div className="zing-chart_right-top_item">
                                 <div className="zing-chart_right-top_box" />
                                 <p>{rank2}</p>
                              </div>
                              <div className="zing-chart_right-top_item">
                                 <div className="zing-chart_right-top_box" />
                                 <p>{rank3}</p>
                              </div>
                           </div>

                           <CharHomeItem id="myChart2"/>
                        </div>
                     </div>
                     <ChartList data={datas}/>
                  </div>
               </div>
            </div>
            <WeekList data={datas.weekChart}/>
         </div>
      );
      // eslint-disable-next-line no-unreachable
   } catch(error) {
      return
   };
};

export default ZingChartPage;
