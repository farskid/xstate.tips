import * as React from "react";
import { useMachine } from "@xstate/react";
import { MachineViz } from "../components/xstate-viz/src/MachineViz";

export const StandaloneViz = ({ machine, onUpdate = () => {} }) => {
  const [, send, service] = useMachine(machine, { devtools: true });
  React.useEffect(() => {
    onUpdate({ service, state: service.state });
    service.onTransition((state) => {
      onUpdate({ service, state });
    });
  }, [service]);
  return (
    <MachineViz
      machine={machine}
      state={service.state}
      onEventTap={(e) => send(e.eventType)}
    />
  );
};
