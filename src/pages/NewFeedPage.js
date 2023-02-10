import React from "react";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";

const NewFeedPage = () => {
   const { nation } = useParams()
   const project = [
     { name: "Việt Nam", nations: "Viet-Nam", path: "/newfeed/Viet-Nam/IWZ9Z08I" },
     { name: "US-UK", nations: "Au-My", path: "/newfeed/Au-My/IWZ9Z08O" },
     { name: "K-POP", nations: "Han-Quoc", path: "/newfeed/Han-Quoc/IWZ9Z08W" },
     { name: "Hoa Ngữ", nations: "Hoa-Ngu", path: "/newfeed/Hoa-Ngu/IWZ9Z08U" },
   ];
   return (
      <div>
         <div className="flex items-center min-h-[52px] my-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
              {project.map(({ name, nations, path }, index) => (
                <li key={index} className={`zm-navbar-item ${nation === nations ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to={path} className="">{name}</Link>
                  </div>
                </li>
              ))}
            </ul>
         </div>
         <Outlet/>
      </div>
   );
};
export default NewFeedPage;