import { memo, useState, useEffect } from "react";

export function Child() {
  // The state is manteined during reparenting.
  const [count, setCount] = useState(0);

  // Logs the component lificycle.
  console.log("-- rendering the child", count);
  useEffect(() => {
    setCount((c) => ++c);
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

  return (
    <div className="child">
      State: {count}
      <InnerChild />
    </div>
  );
}

const InnerChild = memo(() => {
  console.log("-- rendering the InnerChild");
  return null;
});
