import React, { FC, useState, useEffect } from "react";

interface ComplicatedLogicComponentProps {
  prop1?: "a" | "b" | "c" | "d";
  prop2?: string;
  prop3?: number;
  prop4?: () => void;
}
const ComplicatedLogicComponent: FC<ComplicatedLogicComponentProps> = ({ prop1 = "b", prop2, prop3, prop4 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Complicated Logic Component</h1>
      <p>Prop1: {prop1}</p>
      <p>Prop2: {prop2}</p>
      <p>Prop3: {prop3}</p>
      <button onClick={prop4}>click</button>
      <p>State: {count}</p>
    </div>
  );
};

export default ComplicatedLogicComponent;
