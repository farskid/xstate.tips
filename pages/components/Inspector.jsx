import React from "react";
import { inspect } from "@xstate/inspect";

export function useInspector({ iframe }) {
  React.useEffect(() => {
    iframe &&
      inspect({
        url: "https://statecharts.io/inspect",
        iframe,
      });
  }, [iframe]);
}

export function Inspector({ children }) {
  // some hackery here because I can't call `inspect` on a module level since it depends on the `window` object
  // inspect needs to be called before all other machine code in order for it to work, so I tried to delay the rendering
  // of the children (which contain the machine) in order to ensure that `inspect` was invoked before the `useMachine` calls
  // Currently, it doesn't work, it still gets stuck on 'waiting for connection'
  const [iframe, setIframe] = React.useState(null);
  useInspector({ iframe });
  const activeRef = React.useCallback((node) => {
    if (node !== null) {
      return setIframe(node);
    }
  }, []);
  return (
    <>
      {iframe && children}
      <iframe
        style={{ width: "100%", height: 400, border: "none" }}
        ref={activeRef}
      ></iframe>
    </>
  );
}
