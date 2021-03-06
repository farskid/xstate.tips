## Add new Tip

To add a new tip, create a new folder with a short name, all lowercase and separated by hyphens in `src/tips`. Inside that folder, create a `meta.js` and an `index.mdx` file.

`meta.js` will contain a named export as below, containing the metadata for the new tip:

```js
const meta = {
  title: "Title of the tip",
  description: "Description of the tip",
  pubDate: "Today's date, we will modify this to the date your PR gets merged",
  author: "Your name(s)",
};

module.exports.meta = meta;
```

> Keep in mind that it's important that the export remains as a commonJS module for technical limitations.

`index.mdx` will contain the content of your tip. Since it's an MDX file, you can import any React components in it or define variables and such, but for the tip to be rendered properly in the website, please include this bit of code at the beginning of this file:

```jsx
import { Tip } from "components/Tip";
import { meta } from "./meta";

export default ({ children }) => <Tip meta={meta}>{children}</Tip>;
```

## What is supported in the content

Full markdown support.

You can use embed components like `CodeSandbox` which renders a lazy loaded CodeSandbox embed.

```jsx
import { CodeSandbox } from "components/mdx-embed/Codesandbox";

<CodeSandbox id="fervent-morse-wxueq" />;
```

You can use the visualizer component that creates and initializes an interpreter for your statechart and render an interactive visualizer for the machine.

You can interact with the visualizer indirectly through a custom interface! use the `getService` prop on the `StandaloneViz` component to access the running interpreter for state updates and sending events.

```jsx
import { StandaloneViz } from "components/StandaloneViz";
import { Machine, assign } from "xstate";

<div>
  <button
    onClick={() => {
      sendEvent({ type: "FETCH" });
    }}
  >
    FETCH
  </button>
  <button
    onClick={() => {
      sendEvent({ type: "RESOLVE" });
    }}
  >
    RESOLVE
  </button>
  <button
    onClick={() => {
      sendEvent({ type: "REJECT" });
    }}
  >
    REJECT
  </button>
</div>;

export let sendEvent = () => {};

<StandaloneViz
  onUpdate={({ service }) => {
    sendEvent = service.send;
  }}
  machine={Machine({
    id: "fetch",
    initial: "idle",
    context: {
      retries: 0,
    },
    states: {
      idle: {
        on: {
          FETCH: "loading",
        },
      },
      loading: {
        on: {
          RESOLVE: "success",
          REJECT: "failure",
        },
      },
      success: {
        type: "final",
      },
      failure: {
        on: {
          RETRY: {
            target: "loading",
            actions: assign({
              retries: (context, event) => context.retries + 1,
            }),
          },
        },
      },
    },
  })}
/>;
```

You could even take it to the next level by dynamically rendering event triggers that are available in the current interpreter state and showing the current state.

```jsx
import { StandaloneViz } from "components/StandaloneViz";
import { Machine, assign } from "xstate";

export const Demo = () => {
  const [service, setService] = React.useState({ state: {} });
  const [nextEvents, setNextEvents] = React.useState([]);
  const [state, setState] = React.useState({ value: "" });
  return (
    <>
      <div>
        {nextEvents.map((evt, idx) => (
          <button
            key={idx}
            onClick={() => {
              service.send(evt);
            }}
          >
            {evt}
          </button>
        ))}
      </div>
      <p>Current state: {state.value}</p>
      <StandaloneViz
        onUpdate={({ service, state }) => {
          setService(service);
          setState(state);
          setNextEvents(state.nextEvents);
        }}
        machine={Machine({
          id: "fetch",
          initial: "idle",
          context: {
            retries: 0,
          },
          states: {
            idle: {
              on: {
                FETCH: "loading",
              },
            },
            loading: {
              on: {
                RESOLVE: "success",
                REJECT: "failure",
              },
            },
            success: {
              type: "final",
            },
            failure: {
              on: {
                RETRY: {
                  target: "loading",
                  actions: assign({
                    retries: (context, event) => context.retries + 1,
                  }),
                },
              },
            },
          },
        })}
      />
    </>
  );
};

<Demo />;
```
