import * as React from "react";
import { useMachine } from "@xstate/react";
import { MachineViz } from "../components/xstate-viz/src/MachineViz";
import styled from "styled-components";

const Container = styled.div`
  margin: 1em auto;
  overflow: auto;
  padding: var(--xviz-sp);
`;

export const StandaloneViz = ({ machine, onUpdate = () => {} }) => {
  const [, send, service] = useMachine(machine, { devtools: true });
  React.useEffect(() => {
    onUpdate({ service, state: service.state });
    service.onTransition((state) => {
      onUpdate({ service, state });
    });
  }, [service]);
  return (
    <Container className="standalone-viz">
      <MachineViz
        machine={machine}
        state={service.state}
        onEventTap={(e) => send(e.eventType)}
      />
    </Container>
  );
};
