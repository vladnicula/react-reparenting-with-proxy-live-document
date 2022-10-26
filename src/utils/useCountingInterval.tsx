import { useState, useEffect } from "react";

export const useCountingInterval = () => {
  const [count, setCount] = useState(0);

  // Logs the component lificycle.
  console.log("-- rendering the child", count);
  useEffect(() => {
    const to = setInterval(() => {
      console.log("-- upadinting timer in the child");
      setCount((c) => ++c);
    }, 10000);
    // The component is mounted only one time.
    console.log("---- mounting the child");
    return () => {
      // The component is never unmounted during reparenting.
      console.log("------ unmounting the child");
      clearInterval(to);
    };
  }, []);

  return count;
};
