import React, { memo } from "react"
import { useState } from "react"
import ItemChartList from "./ItemChartList"

const ChartList = memo(({ data }) => {
   const [numRender, setNumRender] = useState(10);
   const datas = data?.RTChart.items.slice(0, numRender);
   return (
      <div className="col l-12 m-12 c-12 ">
         <div className="zing-chart_list">
            {datas && datas.length > 0 && datas.map((e, index) => (
               <ItemChartList                        
                 indexNotVip={index}
                 idAlbum={"ZO68OC68"}
                 item={e}
                 index={index}
                 key={e.encodeId}
                />
            ))}
         </div>
         <div className="zing-chart_item-bottom">
            {numRender === 10 && (
               <button onClick={() => setNumRender(100)} className="zing-chart_btn">
                  Xem Top 100
               </button>
            )}
         </div>
      </div>
   )
})

export default ChartList