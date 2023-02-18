import React, { useState, useLayoutEffect } from "react";
import { Outlet, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ArtistInfoTop, LoadingSvg } from "../components/main";
import { scrollTop } from "../asset/data/functions";
import { tmdAPI } from "../asset/api/path";
const ArtistPageStyles = styled.div`
   .avatar {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      overflow: hidden;
   }
   .content-detail {
      max-height: 70px;
      overflow-y: auto;
      font-size: 14px;
      line-height: 1.64;
      margin-bottom: 10px;
      span {
         display: inline-block;
         color: var(--text-item-hover);
         font-size: 12px;
         font-weight: 700;
         line-height: 1.92;
         cursor: pointer;
      }
   }
   .artist-name {
      color: var(--text-primary);
      font-size: 40px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.08px;
      margin-bottom: 5px;
   }
`

const ArtistPage = () => {
   const { name } = useParams();
   const [datas, setData] = useState([]);
   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getArtistPage(name));
      setData(data?.data?.data);
   };
   const project = [
     { _name: "TỔNG QUAN", _path: `/nghe-si/${name}/` },
     { _name: "BÀI HÁT", _path: `/nghe-si/${name}/song` },
     { _name: "SINGLE & EP", _path: `/nghe-si/${name}/single` },
     { _name: "ALBUM", _path: `/nghe-si/${name}/album` },
     { _name: "MV", _path: `/nghe-si/${name}/mv` },
   ];
   useLayoutEffect(() => {
      scrollTop();
      fetchData();
   }, []);
   if(datas?.length === 0) {
     return <LoadingSvg/>
   };
   return (
      <ArtistPageStyles className=" mt-5 ">
         <ArtistInfoTop data={datas}/>
         <div className="flex items-center min-h-[52px] mb-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
              {project.map(({_name, _path}, EventID) => (
                <NavLink key={EventID} to={_path} className={({ isActive }) => (isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}>
                  <div className="navbar-link">
                     <span>{_name}</span>
                  </div>
                </NavLink>
              ))}                                                    
            </ul>
         </div>
         <Outlet context={datas} />
      </ArtistPageStyles>
   );
};

export default ArtistPage;