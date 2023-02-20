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

export {
   LoadingSvg,
   LoadingSkeleton,
};