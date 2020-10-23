import * as React from 'react'
import { useMachine } from "@xstate/react";
import { MachineViz } from "../components/xstate-viz/src/MachineViz";

export const StandaloneViz = ({machine}) => {
    const [,send,service] = useMachine(machine, { devtools: true });
    const [viz, setViz] = React.useState();
    React.useEffect(() => {
        setViz(<MachineViz machine={machine} state={service.state} onEventTap={(e) => send(e.eventType)} />)
    }, [])
    return viz || null;
}