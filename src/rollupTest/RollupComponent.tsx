import React, { useState } from "react";
import InnerComponentDefault from "./components/InnerComponentDefault";
import { InnerComponentNamed } from "./components/InnerComponentNamed";
import "../style/main.scss";
import ComplicatedLogicComponent from "./components/ComplicatedLogicComponent";

export const RollupComponent = () => {
  const [myState, setMyState] = useState(123);

  return (
    <div>
      <h1>I'm packed with Rollup</h1>
      <h2>My state is: {myState}</h2>
      <button onClick={() => setMyState(myState + 1)}>Click me</button>
      <p> This uses all components together</p>
      <InnerComponentDefault />
      <InnerComponentNamed />
      <ComplicatedLogicComponent prop1="b" prop3={myState} prop4={() => console.log("asd")} />
    </div>
  );
};
