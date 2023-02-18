import { NavLink, Outlet } from "react-router-dom";

const MvPage = () => {
   const project = [
     { name: "Việt Nam", path: "/mv/IWZ9Z08I" },
     { name: "US-UK", path: "/mv/IWZ9Z08O" },
     { name: "KPOP", path: "/mv/IWZ9Z08W" },
     { name: "HÒA TẤu", path: "/mv/IWZ9Z086", id: "navHoaTau" },
   ];
   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-header mb-[30px]">
            <h3>MV</h3>
            <nav className="main_mv-header_navbar">
              {project.map(({ name, path, id }, EventID) => (
                  <NavLink key={EventID} className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")} to={path} id={id}>
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

export default MvPage;
//  border-bottom: 2px solid var(--purple-primary);