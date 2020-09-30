import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { ExamplesLayout } from "../components/ExamplesLayout";
import { getAllExamples } from "../api/example";
import { MachineViz } from "../components/src/MachineViz";

const machine = createMachine({
  initial: "a",
  states: { a: { on: { MOVE: "b" } }, b: { on: { MOVE: "a" } } },
});

const L = ({ examples }) => {
  const [current, send, service] = useMachine(machine, { devtools: true });
  //   React.useEffect(() => {
  //     window.service = service;
  //   }, [service]);
  return (
    <ExamplesLayout examples={examples}>
      <h1>Here's a button, click it!</h1>
      <button onClick={() => ({ currentState: send("MOVE") })}>Move</button>
      <p>state: {current.value}</p>
      <div style={{ position: "relative", height: 200, width: "100%" }}>
        <MachineViz machine={machine} state={machine.initialState} />
      </div>
    </ExamplesLayout>
  );
};

export const getStaticProps = async () => {
  const examples = getAllExamples();
  return { props: { examples } };
};

export default L;
