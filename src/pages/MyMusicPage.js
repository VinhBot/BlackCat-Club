import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { database, doc, getDoc } from "../asset/firebase/firebase-config";

const MyMusicPage = memo(() => {
   const { pathname: id } = useLocation();
   const [docs, setDocs] = useState();
   const navigate = useNavigate();
   const users = useSelector((state) => state.users);
   const { activeUser, name, id: ids } = useSelector((state) => state.users);

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
         getDoc(doc(database, "users", ids)).then((value) => {
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
              {project.map(({ name, path }, EventID) => (
                <li key={EventID} className={`zm-navbar-item ${id === path ? "is-active" : ""}  `}>
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
});

export default MyMusicPage;