import { useContext, useRef, useState, useEffect } from "react";

import { StateContext } from "./StateContext";
import { TrackerData } from "./tracker";

export function useTracking(id: string) {
  const { tracker } = useContext(StateContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    tracker.update(id, ref.current);

    if (!("ResizeObserver" in globalThis)) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (ref.current) {
        tracker.updateAll();
        // tracker.update(id, ref.current);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.unobserve(ref.current!);
    };

    return () => {
      tracker.remove(id);
    };
  }, []);

  return ref;
}

export function useTracked(id: string): TrackerData | undefined {
  const { tracker } = useContext(StateContext);

  const [rect, setRect] = useState<TrackerData | undefined>();

  useEffect(() => {
    const listener = (data) => {
      setRect({ ...data });
    };

    tracker.listen(id, listener);

    return () => {
      tracker.unlisten(id, listener);
    };
  }, [id]);

  return rect;
}
