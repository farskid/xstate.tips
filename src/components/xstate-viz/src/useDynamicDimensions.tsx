import * as React from "react";

export function useDynamicDimensions(
  foElem: React.MutableRefObject<SVGForeignObjectElement>,
  ref: React.MutableRefObject<HTMLDivElement>,
  svgElem: React.MutableRefObject<SVGSVGElement>
) {
  const [parentWidth, setParentWidth] = React.useState(1);

  React.useEffect(() => {
    setParentWidth(ref.current.getBoundingClientRect().width);
    function widthObserver() {
      setParentWidth(ref.current.getBoundingClientRect().width);
    }
    window.addEventListener("resize", widthObserver);
    return () => {
      window.removeEventListener("resize", widthObserver);
    };
  }, [ref.current]);

  // set width of foreignObject to the width of rendered viz and 500 at minimum
  React.useEffect(() => {
    if (ref.current && foElem.current) {
      foElem.current.style.width = `${Math.max(
        Math.max(parentWidth - 40, 460)
      )}px`;
    }
  }, [foElem.current, ref.current, parentWidth]);

  // set heightog the svg to the height of the rendered machine (This will be set right after foreignObject witdth is set from the effect above)
  React.useEffect(() => {
    if (foElem.current && svgElem.current && ref.current) {
      const machine = foElem.current.querySelector(`[data-xviz="machine"]`);
      const edges = ref.current.querySelector(`[data-xviz="edges"]`);
      if (machine) {
        svgElem.current.style.height = `${
          machine.getBoundingClientRect().height
        }px`;
        svgElem.current.style.width = `${
          edges.getBoundingClientRect().width + 15 // 15px guessed threshold for overflowed event arrows
        }px`;
      }
    }
  }, [foElem.current, svgElem.current, ref.current, parentWidth]);
}
