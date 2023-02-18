import React, { memo, useState, useEffect, useCallback, useLayoutEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import { useSelector, useDispatch } from "react-redux";
import lodash from "lodash";
import { 
  setDraggItemActive,
  setDraggUpdateList, 
  setListSongShuffle, 
  setNextSong, 
  setDraggItemActiveShuffle, 
  setDraggUpdateListShuffle, 
  setNextSongShuffle, 
  fetchPlayList 
} from "../features/QueueFeatures/QueueFeatures";
import { 
  ViewPlayMusicMain,
  ItemRighPlayer,
  BottomControlsRight,
  BottomControlsCenter,
  BottomControlLeft, 
  CloclAlarm, RemoveList, 
} from "../components/main"
import {
  setPlay,
  setReady
} from "../features/SettingPlay/settingPlay";
/*========================================================*/
const BottomPlayer = memo(() => {
   return (
      <div className="playing-bar-main">
         <div className="player_controls-main">
            <BottomControlLeft/>
            <BottomControlsCenter/>
            <BottomControlsRight/>
         </div>
      </div>
   );
});
/*========================================================*/
const BottomRight = memo(() => {
   const reorder = (list, startIndex, endIndex) => {
     const result = Array.from(list);
     const [removed] = result.splice(startIndex, 1);
     result.splice(endIndex, 0, removed);
     return result;
   };
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong);
   const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId);
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent);
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId);
   const recentSongs = useSelector((state) => state.logged.recentSongs);
   const listSong = useSelector((state) => state.queueNowPlay.listSong);
   const isToggle = useSelector((state) => state.toggleright);
   const { isRandom } = useSelector((state) => state.setting);
   const [toggleSilde, setToggleSilde] = useState(false);
   const [items, setItems] = useState([]);
   const dispatch = useDispatch();
   useLayoutEffect(() => {
      setItems(listSong);
   }, [listSong]);
   useLayoutEffect(() => {
      if(isRandom && listSong.length > 0) {
         let arrNext = listSong.filter((e) => e.encodeId !== infoSongCurrent.encodeId)
         let arrShuffle = [infoSongCurrent, ...lodash.shuffle(arrNext)]
         dispatch(setListSongShuffle(arrShuffle))
         setItems(arrShuffle);
      };
      if(!isRandom) {
         const indexCurrentSongActive = listSong.indexOf(infoSongCurrent);
         setItems(listSong);
         dispatch(setNextSong(indexCurrentSongActive));
      };
   }, [isRandom, playlistEncodeId]);
   useEffect(() => {
      let node = document.querySelector(`div[data-rbd-draggable-id='${currentEncodeId}']`);
      if (!node) return;
      setTimeout(() => scrollIntoView(node, {
        block: "center",
        behavior: "smooth",
        scrollMode: "if-needed",
      }), 200);
   }, [currentEncodeId, isRandom, playlistEncodeId, toggleSilde]);
   const onDragEnd = useCallback((result) => {
         const { destination, source } = result;
         if(!destination) return;
         const reorderedItems = reorder(items, source.index, destination.index);
         let indexActive = reorderedItems.find((e) => e.encodeId === currentEncodeId);
         if (!isRandom) {
            if (source.index === currentIndexSong) {
               dispatch(setDraggItemActive(destination.index));
            };
            setItems(reorderedItems);
            dispatch(setNextSong(reorderedItems.indexOf(indexActive)));
            dispatch(setDraggUpdateList(reorderedItems));
         };
         if (isRandom) {
            if (source.index === currentIndexSong) {
               dispatch(setDraggItemActiveShuffle(destination.index));
            };
            setItems(reorderedItems);
            dispatch(setNextSongShuffle(reorderedItems.indexOf(indexActive)));
            dispatch(setDraggUpdateListShuffle(reorderedItems));
         };
   }, [items, currentEncodeId, isRandom]);
   return (
      <div className={`player_queue ${isToggle ? "player_queue-is_active" : ""}`}>
         <div className="player_queue-main">
            <div className="player_queue-header gap-1">
               <div className="queue_list-history">
                  <div onClick={() => setToggleSilde(false)} className={`queue_list ${!toggleSilde && "queue_active-top"}`}>
                     Danh sách phát
                  </div>
                  <div onClick={() => setToggleSilde(true)} className={`queue_histrory ${toggleSilde && "queue_active-top"}`}>
                     Nghe gần đây
                  </div>
               </div>
               <div className="queue_list-btn">
                  <CloclAlarm/>
                  <RemoveList/>
               </div>
            </div>
            <div className="player_queue-container  ">
               {!toggleSilde && currentEncodeId && (
                  <DragDropContext onDragEnd={onDragEnd}>
                     <Droppable droppableId="droppable">
                        {(provoied) => {
                           return (
                              <ul className="player_queue-listmusic" {...provoied.droppableProps} ref={provoied.innerRef}>
                                 {items && items?.length > 0 && items?.map((e, index) => {
                                       let lastIndex = false
                                       if (index + 1 === items.length) {
                                          lastIndex = true
                                       };
                                       return (
                                          <ItemRighPlayer lastIndex={lastIndex} key={e.encodeId || e.id} index={index} data={e}/>
                                       );
                                    })}
                              </ul>
                           )
                        }}
                     </Droppable>
                  </DragDropContext>
               )}

               {toggleSilde && currentEncodeId && (
                  <ul className="player_queue-listmusic">
                     {recentSongs && recentSongs?.length > 0 && recentSongs?.map((e, index) => {
                           return (
                              <ItemRighPlayer
                                 setToggleSilde={setToggleSilde}
                                 items={items}
                                 key={e.encodeId || e.id}
                                 index={index}
                                 isHistory={true}
                                 data={e}
                              />
                           )
                        })}
                  </ul>
               )}

               {!currentEncodeId && (
                  <ul className="player_queue-listmusic">
                     <div className="empty">
                        <div className="empty-img" />
                     </div>
                     <div className="empty-queue">
                        <div className="content">Khám phá thêm các bài hát mới của BlackCat-Club(MP3)</div>
                        <button
                           onClick={async() => {
                              dispatch(setReady(false))
                              dispatch(setPlay(false))
                              await dispatch(fetchPlayList("ZO68OC68"))
                              dispatch(setPlay(true))
                           }}
                           className="empty-queue-btn"
                        >
                           <span className="material-symbols-outlined">play_arrow</span>
                           <span>Phát nhạc mới phát hành</span>
                        </button>
                     </div>
                  </ul>
               )}
            </div>
         </div>
      </div>
   )
});
/*========================================================*/
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

export { BottomPlay };