import React, { memo } from "react";

const LoadingSvg = memo(({ isLoadMore }) => {
   return (
      <div className={`loading ${isLoadMore ? "relative mt-5" : "absolute"}`}>
        <span className="loader"/>
      </div>
   );
});

const LoadingSkeleton = ({ className }) => {
   return <div className={`skeleton ${className}`} />
};

const LoadingImage = memo(({ isLoadMore, image }) => {
  const loadingData = [
    { path: "https://i.pinimg.com/originals/e8/0e/0d/e80e0dd3e9f3fea6eff0599dcc8334e5.gif" },
    { path: "https://images.pexels.com/photos/14819864/pexels-photo-14819864.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { path: "https://images.pexels.com/photos/14819864/pexels-photo-14819864.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  ];
  return (
    <div className={`loading ${isLoadMore ? "relative mt-5" : "absolute"}`}>
      <img style={{ width: "50px" }} src={loadingData[image].path} alt="" />
    </div>
  );
});

export {
   LoadingSvg,
   LoadingSkeleton,
   LoadingImage,
};