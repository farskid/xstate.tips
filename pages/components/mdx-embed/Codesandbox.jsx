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

// <iframe src="https://codesandbox.io/embed/kind-shadow-njidw?fontsize=14&hidenavigation=1&theme=light"
//      style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
//      title="kind-shadow-njidw"
//      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
//      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
//    ></iframe>
