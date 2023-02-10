import React, { memo } from "react"
import BottomPlayer from "./BottomPlayer"
import BottomRight from "./BottomRight"
import { useSelector } from "react-redux"
import ViewPlayMusicMain from "../../components/ViewPlayMusicFull/ViewPlayMusicMain"

const BottomPlay = memo(() => {
   const isOpen = useSelector((state) => state.toggleOpenMain.isOpen);
   const isOpenClass = useSelector((state) => state.toggleOpenMain.isOpenClass);
   return (
      <div className={`playing-bar ${isOpenClass ? "active" : ""}`}>
         <BottomPlayer/>
         <BottomRight/>
         {isOpen && <ViewPlayMusicMain/>}
      </div>
   );
});

export default BottomPlay;