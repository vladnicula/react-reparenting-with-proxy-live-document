import { useState, useCallback } from "react";
import { createReparentableSpace } from "react-reparenting";
import { Child } from "./Child";

import { useMutationsLogs } from "./utils/useMutationsLogs";

// Create a Reparentable space.
const { Reparentable, sendReparentableChild } = createReparentableSpace();

export default function App() {
  useMutationsLogs();
  // The current parent of the child.
  const [parent, setParent] = useState("A");

  const changeParent = useCallback(() => {
    const newParent = parent === "A" ? "B" : "A";
    // sendReparentableChild(parent, newParent, 0, 0);
    console.log(`sendReparentableChild`, parent, newParent);
    sendReparentableChild(parent, newParent, 0, 0);
    // setParent((parent) => {
    //   const newParent = parent === "A" ? "B" : "A";
    //   // The "send" method will also transfer the child DOM node.
    //   // (You can disable this feature, and transfer it manually).
    //   // send(parent, newParent, 0, 0) means that the first child of
    //   // "parent" will become the first child of "newParent" (0 is the index).
    //   // Try removing the send method and check what has changed in the console.
    //   sendReparentableChild(parent, newParent, 0, 0);
    //   // Return the new parent.
    //   return newParent;
    // });
  }, [parent]);

  return (
    <div className="app" id="appRoot">
      {/* Main */}
      <div className="main">
        {/* Parent A */}
        <div className="parent">
          <Reparentable id="A">
            {parent === "A" ? <Child key={"1"} /> : null}
          </Reparentable>
          {/* {parent === "A" ? <Child key={"1"} /> : null} */}
        </div>
        {/* Parent B */}
        <div className="parent">
          <Reparentable id="B">
            {parent !== "A" ? <Child key={"1"} /> : null}
          </Reparentable>
          {/* {parent !== "A" ? <Child key={"1"} /> : null} */}
        </div>
      </div>
      {/* Button */}
      <button className="button" onClick={changeParent}>
        Change parent
      </button>
    </div>
  );
}
