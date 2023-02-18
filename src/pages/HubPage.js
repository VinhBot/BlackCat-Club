import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getHubHome } from "../asset/api/path";
import { GenreHub, LoadingSvg, NationsHub, MoodHub } from "../components/main";
const HubStyles = styled.div`
   width: 100%;
   border-radius: 4px;
   position: relative;
   overflow: hidden;
   color: var(--text-primary);
`;
const HubPage = () => {
   const [datas, setData] = useState([]);
   const { data, status } = getHubHome();
   const navigate = useNavigate();
   useEffect(() => {
      if (data) {
         setData(data.data);
      };
   }, [status]);
   const linkVip = datas.banners[0].link;
   const selectoNation = datas?.nations;
   const selectoGenre = datas?.genre;
   const selectoMood = datas?.topic;
   if (datas.length === 0) return <LoadingSvg/>
   return (
      <HubStyles className=" transition-all">
         <div>
            <figure onClick={() => navigate(`/hub/detail/${linkVip.slice(linkVip?.lastIndexOf("/") + 1, linkVip?.lastIndexOf("."))}`)} className="cursor-pointer image banner-image is-48x48 !rounded-xl overflow-hidden">
               <img src={datas?.banners[0].cover} alt="" />
            </figure>
         </div>
         {/* Tâm trạng và Hành Động */}
         <MoodHub data={selectoMood}/>
         {/* Quốc gia  */}
         <NationsHub data={selectoNation}/>
         {/* Genre */}
         <GenreHub data={selectoGenre}/>
      </HubStyles>
   )
}

export default HubPage;