import { mutate } from "proxy-live-document";
import { AppState } from "../AppState";

export const ChangeHierarchyWrapper = () => {
  return (
    <button
      onClick={() => {
        console.log(
          mutate(AppState, (state) => {
            state["A"].childrenIds = ["D"];
            state["B"].childrenIds = ["C"];
            state["D"].parentId = "A";
          })
        );
      }}
    >
      Change hierarchy
    </button>
  );
};
