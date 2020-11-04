import React from "react";
import { GeneralObserver } from "./GeneralObserver";

export const CodeSandbox = ({ id }) => {
  return (
    <GeneralObserver>
      <iframe
        data-testid="codesandbox"
        title={`codeSandbox-${id}`}
        className="codesandbox-mdx-embed"
        src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&runonclick=1&view=preview`}
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        style={{
          width: "100%",
          height: "500px",
          border: 0,
          borderRadius: "4px",
          overflow: " hidden",
        }}
      />
    </GeneralObserver>
  );
};
