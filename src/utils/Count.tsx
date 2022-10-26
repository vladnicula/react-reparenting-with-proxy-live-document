import { useState } from "react";

export const Count = () => {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => {
        setCount((c) => ++c);
      }}
    >
      {count}
    </button>
  );
};
