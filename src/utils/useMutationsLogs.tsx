import { useEffect } from "react";

export const useMutationsLogs = (id: string = "appRoot") => {
  useEffect(() => {
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById(id);

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        console.log(mutation);
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    return () => {
      observer.disconnect();
    };
  }, [id]);
};
