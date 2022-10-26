import { ComponentInstance } from "./ComponentInstance";
import { AddChildInFWrapper } from "./BehaviourWrappers/AddChildInFWrapper";
import { ChangeHierarchyWrapper } from "./BehaviourWrappers/ChangeHierarchyWrapper";
import { useMutationsLogs } from "./utils/useMutationsLogs";
import { AppState } from "./AppState";
import { useEffect, useRef } from "react";
import { select } from "proxy-live-document";

export const useSmartReparenting = (store: typeof AppState) => {
  const currentParent = useRef();

  useEffect(() => {
    select(store, [`*/parentId`], (state, patches) => {
      console.log(state, patches);
      const parentIdChanges = patches.filter(
        (p) => p.pathArray[1] === "parentId" && p.op === "replace"
      );
      return parentIdChanges;
    }).observe((parentIdChanges) => {
      console.log(`parentIdChanges`, parentIdChanges);
      parentIdChanges.forEach((patch) => {
        console.log(
          "reparent",
          patch.pathArray[0],
          "from",
          patch.old,
          "to",
          patch.value
        );
        const newPosition = AppState[patch.value as string].childrenIds.indexOf(
          patch.pathArray[0]
        );
        console.log("should insert at position", newPosition);
      });
    });
  });
};

export default function App() {
  useMutationsLogs("appRoot");
  // useSmartReparenting(AppState);

  return (
    <div id="appRoot">
      <ChangeHierarchyWrapper />
      <AddChildInFWrapper />
      <ComponentInstance templateId="root" />
    </div>
  );
}
