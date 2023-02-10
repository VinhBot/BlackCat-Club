import React from "react";
import ItemSetting from "./ItemSetting";
import ItemLogin from "./ItemLogin";
import ItemThemes from "./ItemThemes";

const HeaderRight = () => {
   return (
      <div className="header_content-right">
         <ItemThemes />
         <ItemSetting />
         <ItemLogin />
      </div>
   )
}

export default HeaderRight
