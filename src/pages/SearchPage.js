import React from "react"
import { Outlet, useLocation, useParams } from "react-router"
import { Link } from "react-router-dom"

const SearchPage = () => {
   const { id } = useParams()
   let ids = id.replace(/\s/g, "%20")
   let location = useLocation()
   const project = [
     { name: "TẤT CẢ", path: `/tim-kiem/tatca/${ids}`, path2: "/tim-kiem/tatca/" },
     { name: "BÀI HÁT", path: `/tim-kiem/baihat/${ids}`, path2: "/tim-kiem/baihat/" },
     { name: "PLAYLIST/ALBUM", path: `/tim-kiem/playlist/${ids}`, path2: "/tim-kiem/playlist/" },
     { name: "NGHỆ SĨ/OA", path: `/tim-kiem/artist/${ids}`, path2: "/tim-kiem/artist/" },
     { name: "MV", path: `/tim-kiem/video/${ids}`, path2: "/tim-kiem/video/" },
   ];
   return (
      <div className="main_mv main-page-item active">
         <div className="main_search main_mv-header mb-[30px]">
            <h3 className="!inline-block">Kết Quả Tìm Kiếm</h3>
            <nav className="main_mv-header_navbar">
              {project.map(({ name, path, path2 }, index) => (
                <Link className={`main_mv-header-item ${location.pathname.indexOf(path2) >= 0 ? "active" : ""}`} to={path}>
                  {name}
                </Link>
              ))}
            </nav>
         </div>
         <div className="main_mv-container ">
            <Outlet/>
         </div>
      </div>
   );
};

export default SearchPage;