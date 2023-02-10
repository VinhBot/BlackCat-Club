import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { database } from "../asset/firebase/firebase-config";

const MyMusicPage = () => {
   const { pathname: id } = useLocation();
   const users = useSelector((state) => state.users);

   const navigate = useNavigate();
   const { activeUser, name, id: ids } = useSelector((state) => state.users);
   const [docs, setDocs] = useState();

   const project = [
     { name: "TỔNG QUAN", path: "/mymusic/" },
     { name: "BÀI HÁT", path: "/mymusic/song" },
     { name: "PLAYLIST", path: "/mymusic/playlist" },
     { name: "NGHỆ SĨ", path: "/mymusic/nghe-si" },
     { name: "Thông tin", path: "/mymusic/info" },
   ];

   useEffect(() => {
      if (!activeUser) {
         navigate("/auth");
      };
   }, []);

   useEffect(() => {
      if(activeUser) {
         const docRef = doc(database, "users", ids);
         getDoc(docRef).then((value) => {
            setDocs(value.data());
         });
      };
   }, []);
   
   return (
      <div className="main_personal text-white">
         <div className="personal_user">
            <div className="personal_user-img w-[60px] h-[60px] shadow-sm border border-dashed ">
               <figure>
                  <img className="object-cover h-[60px]" src={users.imgUrl ? users.imgUrl : "https://avatar.talk.zdn.vn/default"} alt="" />
               </figure>
            </div>
            <h3>{name || "BlackCat"}</h3>
         </div>

         <div className="flex items-center min-h-[52px] my-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
              {project.map(({ name, path }, index) => (
                <li key={index} className={`zm-navbar-item ${id === path ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to={path}>{name}</Link>
                  </div>
                </li>
              ))}
            </ul>
         </div>
         <Outlet context={{ docs }}/>
      </div>
   );
};

export default memo(MyMusicPage);