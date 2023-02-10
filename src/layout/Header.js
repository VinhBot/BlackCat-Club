import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { memo } from "react";
import NavLinkArow from "../components/Navbar/NavLinkArow";
import HeaderRight from "../components/Navbar/HeaderRight";
import ItemLogin from "../components/Navbar/ItemLogin";
import NavForm from "../components/Navbar/NavForm";
import useWindowSize from "../hook/useResizeHook";
import useToggle from "../hook/useToggleHook";
/*========================================================*/
const Home2 = ({ size, colors }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={colors} strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>);
const Siderleft = memo(() => {
   const navigate = useNavigate();
   const { width } = useWindowSize();
   const { pathname } = useLocation();
   const [isToggle, setIsToggle] = useToggle(false);
   const activeUser = useSelector((state) => state.users.activeUser);
   const project_1 = [
     { name: "Top Chart", title: "#topchart", icons: "icon  ic-24-ChartTab", path: "/zing-chart" },
     { name: "Radio", title: "Radio", icons: "icon  ic-24-RadioTab", path: "/radio" },
     { name: "Theo Dõi", title: "Theo Dõi", icons: "icon  ic-24-FeedTab", path: "/newfeed/Viet-Nam/IWZ9Z08I" },
   ];
   const project_2 = [
     { name: "Nhạc mới", title: "Nhạc mới", icons: "icon  ic-24-NewReleaseTab", path: "moi-phat-hanh" },
     { name: "Thể Loại", title: "Thể Loại", icons: "icon  ic-24-GenreTab", path: "hub" },
     { name: "Top 100", title: "#Top100", icons: "icon  ic-24-Top100Tab", path: "top100" },
     { name: "MV", title: "MV", icons: "icon  ic-24-MVTab", path: "mv/IWZ9Z08I" },
   ];
   let mymusic = pathname.indexOf("mymusic");
   return (
      <aside className={`sider-navbar ${width <= 1225 && !isToggle ? "navbar-left-actice" : width <= 1225 && isToggle && "navbar-exanded-active"} `}>
         <div className="sider">
            <Link to={"/"} id="logo-sider" className="sider_brand-item">
               <div className="sider_brand-item-img">
                  <img src="/avatarMain.png" alt="logo-dat-mp3" />
               </div>
               <p className="sider_brand-item-text">
                  BlackCat {/*<span>MP3</span>*/}
               </p>
            </Link>
         </div>
         <div className="sider_menu sider_menu-c">
            <ul className="sider_menu-list">
               <div
                  onClick={() => {
                     if(!activeUser) {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm("Bạn cần đăng nhập") === true) {
                           navigate("/auth");
                        } else return;
                     } else {
                        navigate("/mymusic/");
                     }
                  }}
                  to="/mymusic/" title="Cá nhân" className={`sider_menu-item sider_menu-item-acitve ${mymusic > 0 ? "sider_active" : ""} `}
               >
                  <div>
                     <i className="icon  ic-24-LibraryTab"></i>
                     <span className="sider_menu-item-title">Cá Nhân</span>
                  </div>
               </div>
               <NavLink to="/" className={({ isActive }) => isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "} title="Trang Chủ">
                  <div>
                     <Home2 size="27" colors="blueviolet"/>
                     <span className="sider_menu-item-title">Trang Chủ</span>
                  </div>
               </NavLink>
               {project_1.map((item, index) => (
                  <NavLink key={index} to={item.path} className={({ isActive }) => isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "} title={item.title}>
                     <div className="cursor-pointer">
                        <i className={item.icons}/>
                        <span className="sider_menu-item-title"> {item.name}</span>
                     </div>
                  </NavLink>
               ))}
            </ul>
         </div>
         <div className="sider_divide" />
         <div className="sider_menu sider_menu-bottom">
            <ul className="sider_menu-list">
              {project_2.map((item, index) => (       
                <NavLink to={item.path} className={({ isActive }) => isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "} title={item.title}>
                  <div className="cursor-pointer">
                     <i className={item.icons}/>
                     <span className="sider_menu-item-title">{item.name}</span>
                  </div>
                </NavLink>
              ))}               
            </ul>
         </div>
         {!activeUser && (
            <div className="sider_vip !pt-0 !pb-0 ">
               <div className="sider_vip-main">
                  <p>Đăng nhập để khám phá playlist dành riêng cho bạn</p>
                  <button onClick={() => navigate("/auth")}>
                     Đăng Nhập
                  </button>
               </div>
            </div>
         )}
         {activeUser && <div className="sider_divide" />}

         <NavLink to="history/playlist" className={({ isActive }) => isActive ? "slider-history sider_menu-item sider_menu-item-acitve sider_active !mb-[2rem] !mt-[.6rem]" : "sider_menu-item sider_menu-item-acitve slider-history !mt-[.6rem] !mb-[2rem]"} title="Nhạc mới">
            <div className="cursor-pointer">
               <i className="icon">
                  <img src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg" alt="" />
               </i>
               <span className="sider_menu-item-title font-normal">Gần đây</span>
            </div>
         </NavLink>

         <button onClick={setIsToggle} className="sider-navbar-exanded">
            <span className="material-icons-outlined navbar-exanded-btn-left"> navigate_next </span>
            <span className="material-icons-outlined navbar-exanded-btn-right"> navigate_before </span>
         </button>
      </aside>
   );
});
/*========================================================*/
const Header = memo(() => {
   return (
      <header className="header">
         <div className="header_content">
            <div className="header_content-btn-user-c">
               <ItemLogin isTitle={false}/>
            </div>
            <div className="header_content-left">
               <NavLinkArow/>
               <NavForm/>
            </div>
            <HeaderRight/>
         </div>
      </header>
   );
});

export { Header, Siderleft };