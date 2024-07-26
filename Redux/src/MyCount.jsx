import React from "react";
import { useAppSelector } from "./redux/hooks";

const MyCount = () => {
  const count = useAppSelector((s) => s.counter);

  return (
    <div>
      <h1>MyCount: {count}</h1>
    </div>
  );
};

export default MyCount;
