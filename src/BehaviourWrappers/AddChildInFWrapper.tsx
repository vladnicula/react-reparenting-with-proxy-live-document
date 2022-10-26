import { mutate } from "proxy-live-document";
import { AppState } from "../AppState";

export const AddChildInFWrapper = () => {
  return (
    <button
      onClick={() => {
        console.log(
          mutate(AppState, (state) => {
            state["F"].childrenIds = ["F1"];
            state["F1"] = {
              parentId: "F",
              id: "F1",
              childrenIds: []
            };
          })
        );
      }}
    >
      Add node In F
    </button>
  );
};
