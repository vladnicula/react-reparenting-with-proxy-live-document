import { select } from "proxy-live-document";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createReparentableSpace } from "react-reparenting";

import { AppState } from "./AppState";

const { Reparentable, sendReparentableChild } = createReparentableSpace();

const useChildrenIdsSelection = (
  store: typeof AppState,
  templateId: string
) => {
  const [childrenIds, setChildrenIds] = useState(store[templateId].childrenIds);

  useEffect(() => {
    const unsub = select(
      store,
      [`${templateId}/childrenIds`],
      (state, patches) => {
        return true;
      }
    ).observe(() => {
      setChildrenIds([...store[templateId].childrenIds]);
    });

    return () => {
      unsub();
    };
  });

  return childrenIds;
};

export const useSmartReparentingPerComponent = (
  store: typeof AppState,
  templateId: string
) => {
  // console.log(`store[store[templateId].parentId]`, {
  //   templateId,
  //   [`"store[${templateId}].parentId"`]: store[templateId].parentId,
  //   [`"store[store[${templateId}].parentId]"`]: store[store[templateId].parentId]
  // });
  // in the real world we figure out the position
  // when the reparenting happens, not like how we do it now
  const currentParentInfo = useRef({
    id: store[templateId].parentId,
    position:
      store[templateId].parentId === null
        ? null
        : store[store[templateId].parentId].childrenIds.indexOf(templateId)
  });

  useEffect(() => {
    select(store, [`${templateId}/parentId`], (state, patches) => {
      const movePatch = patches.filter(
        (p) => p.pathArray[1] === "parentId" && p.op === "replace"
      )[0];

      const addPatch = patches.filter(
        (p) => p.pathArray[1] === "parentId" && p.op === "add"
      )[0];
      console.log("targetPatch", movePatch, addPatch);
      return [movePatch, addPatch];
    }).observe(([movePatch, addPatch]) => {
      console.log("should change parent", movePatch, addPatch);
      const {
        id: oldParentID,
        position: oldPosition
      } = currentParentInfo.current;
      // is root
      if (!oldPosition || !oldParentID) {
        return;
      }

      const newParentId = movePatch.value as string;
      const newPosition = store[newParentId].childrenIds.indexOf(templateId);
      sendReparentableChild(
        `ps-${oldParentID}`,
        `ps-${newParentId}`,
        oldPosition,
        newPosition
      );

      currentParentInfo.current = {
        id: newParentId,
        position: newPosition
      };

      console.log(
        `sendReparentableChild`,
        `ps-${oldParentID}`,
        `ps-${newParentId}`,
        oldPosition,
        newPosition
      );
    });
  }, [templateId, store]);
};

const ContextTest = createContext<{ contextKey: string } | null>(null);

export const ComponentInstance = (props: {
  templateId: string;
  parentValue?: number;
}) => {
  const { templateId } = props;
  console.log("Running the render function for", templateId);
  useSmartReparentingPerComponent(AppState, templateId);
  const ctx = useContext(ContextTest);
  const childrenIds = useChildrenIdsSelection(AppState, templateId);

  // if (templateId === "G") {
  //   for (let i = 0; i <= 10000; i += 1) {}
  //   console.log("for (let i = 0; i <= 10000; i += 1) {}");
  // }

  useEffect(() => {
    console.log("mount", templateId);
    return () => {
      console.log("unmount", templateId);
    };
  }, [templateId]);

  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        margin: "16px"
      }}
    >
      <p>
        <button
          onClick={() => {
            setCount((c) => ++c);
          }}
        >
          {count}
        </button>
        <br />
        Instance for {props.templateId} children: {childrenIds.length}
        <br />
        Test context access: contextKey: {ctx?.contextKey ?? "no key"}
        <br />
        Value coming from parent {props.parentValue ?? "no value"}
        <br />
        {/* {templateId === "G" ? <YoutubeEmbed embedId="7WWMm0yoQUU" /> : null} */}
      </p>
      <ContextTest.Provider value={{ contextKey: `key from ${templateId}` }}>
        <Reparentable id={`ps-${props.templateId}`}>
          {childrenIds.map((childId) => {
            return (
              <ComponentInstance
                parentValue={count + (props.parentValue ?? 0)}
                key={childId}
                templateId={childId}
              />
            );
          })}
        </Reparentable>
      </ContextTest.Provider>
    </div>
  );
};
