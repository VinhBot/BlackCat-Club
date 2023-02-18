import { NavLink, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { scrollTop } from "../asset/data/functions";

const HistoryPage = () => {
   useEffect(() => {
      scrollTop()
   }, []);
   const project = [
     { name: "Bài Hát", path: "/history/song" },
     { name: "PLAYLIST", path: "/history/playlist" },
     { name: "MV", path: "/history/video" },
   ];
   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-header mb-[30px]">
            <h3>Phát Gần Đây</h3>
            <nav className="main_mv-header_navbar">
              {project.map(({ name, path }, EventID) => (
                 <NavLink key={EventID} className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")} to={path}>
                   {name}
                 </NavLink>
              ))}
            </nav>
         </div>
         <div className="main_mv-container ">
            <Outlet/>
         </div>
      </div>
   );
};

export default HistoryPage;