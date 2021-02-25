// import log from "ololog";
import React from "react";
import { interpret } from "xstate";
import { toDirectedGraph } from "@xstate/graph";

class Grid {
  rows = [];
  width = 0;
  height = 0;

  chars = {
    active: ["┌", "─", "┒", "┃", "┛", "━", "┕", "│"],
    inactive: ["┌", "─", "┐", "│", "┘", "─", "└", "│"],
    root: ["┌", "╌", "┐", "╎", "┘", "╌", "└", "╎"],
  };

  constructor({ matcher }) {
    this.matcher = matcher;
  }

  setSize(width, height) {
    this.rows = Array.from(Array(height)).map(() =>
      Array.from(Array(width)).map(() => ({ char: " ", node: undefined }))
    );
  }

  insert(char, col, row, node) {
    if (this.rows[row] === undefined) this.rows[row] = [];
    this.rows[row][col] = { char, node };
  }

  drawRect(x, y, width, height, style, node) {
    let i;
    const chars = this.chars[style];
    this.insert(chars[0], x, y, node);
    this.insert(chars[2], x + width, y, node);
    this.insert(chars[4], x + width, y + height, node);
    this.insert(chars[6], x, y + height, node);
    for (i = 1; i < width; i++) {
      this.insert(chars[1], x + i, y, node);
      this.insert(chars[5], x + i, y + height, node);
    }
    for (i = 1; i < height; i++) {
      this.insert(chars[7], x, y + i, node);
      this.insert(chars[3], x + width, y + i, node);
    }
  }

  drawText(text, x, y, node) {
    for (let i = 0; i < text.length; i++) {
      this.insert(text[i], x + i, y, node);
    }
  }

  drawNode(node) {
    const { x, y, width, height, type, state, name } = node;
    const style =
      type === "root" ? "root" : state.active ? "active" : "inactive";
    if (node.hasChildren) {
      this.drawRect(x, y, width, height, style, node);
      this.insert(" ", x + 1, y, node);
      this.insert(" ", x + name.length + 2, y, node);
      this.drawText(name, x + 2, y, node);
    } else {
      this.drawText(name, x, y, node);
    }

    for (let child of node.children) {
      this.drawNode(child);
    }
  }

  render() {
    return this.rows
      .map((row) =>
        row
          .map((cell) =>
            cell
              ? this.matcher(cell.node?.state.id)
                ? `<span style="opacity: 1; color: #9d64ca">${cell.char}</span>`
                : `<span style="opacity: 0.5;">${cell.char}</span>`
              : " "
          )
          .join("")
      )
      .join("\n");
  }

  init(node) {
    node.moveTo(0, 0);
    this.setSize(node.width, node.height);
    this.drawNode(node);
    this.render();
  }
}

class TNode {
  x = 0;
  y = 0;

  constructor(state, parent) {
    this.state = state;
    this.name = state.name || state.key;
    this.parent = parent;
    this.children = Object.values(state.states).map((s) => new TNode(s, this));
  }

  get maxX() {
    return this.x + this.width;
  }

  get maxY() {
    return this.y + this.height;
  }

  get width() {
    if (!this.hasChildren) {
      return this.name.length;
    }

    let cx = Math.max(
      this.x + this.name.length + 5,
      ...this.children.map((c) => c.maxX)
    );

    if (this.children.find((c) => c.type === "branch")) cx++;

    cx++;

    return cx - this.x;
  }

  get height() {
    if (!this.hasChildren) {
      return 1;
    }

    let cy = Math.max(...this.children.map((c) => c.maxY));
    if (cy > this.y + 2) cy++;

    return cy - this.y;
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  get type() {
    if (!this.parent) return "root";
    if (this.children.length === 0) return "leaf";
    return "branch";
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;

    let cw = 0;
    let ch = 0;
    let sy = 1;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      child.moveTo(x + 2 + cw, y + sy);

      ch = Math.max(ch, child.height + (child.type === "leaf" ? 0 : 1));

      if (cw < 32) {
        cw += child.width + (child.type === "leaf" ? 1 : 2);
      } else {
        cw = 0;
        sy += ch;
      }
    }
  }
}

const styles = {
  container: {
    backgroundColor: "#222",
    padding: ".25rem .5rem .5rem",
    transition: "all 200ms ease",
  },
  stateContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 250px",
    gap: "0 1rem",
  },
  fieldset: {
    position: "relative",
    border: "dashed rgba(255,255,255,0.1)",
  },
  pre: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    border: "0 none",
    background: "inherit",
    whiteSpace: "pre",
  },
  legend: {
    padding: "0 .5rem",
    color: "rgba(255,2555,255,.5)",
  },
  buttons: {
    backgroundColor: "rgb(53,89,119,42%)",
    color: "#fff",
    border: "0 none",
    padding: ".5rem",
    cursor: "pointer",
    display: "block",
    width: "100%",
  },
};

export class VizRenderer extends React.Component {
  constructor(...args) {
    super(...args);

    let service = interpret(this.props.machine).start();
    let machine = this.props.machine;

    this.service = service;
    this.serviceRef;
    console.log("diagraph", toDirectedGraph(this.props.machine));
    this.grid = new Grid({
      matcher: function (key = "") {
        const keyWithoutMachineId = key.replace(`${machine.id}.`, "");
        return service.state.matches(keyWithoutMachineId);
      },
    });

    this.state = {
      serviceState: { name: "todoMachine", stateTree: this.props.machine },
      eventType: null, // set along with eventsMode=data
      eventsMode: "events", // events|data
    };
  }
  componentDidMount() {
    this.serviceRef = this.service.subscribe((state, ctx) => {
      // get service updates
      console.log(this.service);
      this.setState({
        serviceState: { name: "todoMachine", stateTree: this.service.machine },
      });
    });
  }
  componentWillUnmount() {
    this.serviceRef.unsubscribe();
  }

  getEventMetadata(evt) {
    return this.service.machine.config.events[evt];
  }

  render() {
    const { serviceState } = this.state;
    const tree = new TNode(serviceState.stateTree);
    this.grid.init(tree);

    return (
      <div style={styles.container}>
        <div style={styles.stateContainer}>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>State Tree</legend>
            <pre
              style={styles.pre}
              dangerouslySetInnerHTML={{
                __html: this.grid.render(),
              }}
            >
              {/* {this.grid.render()} */}
            </pre>
          </fieldset>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Events</legend>

            {/* Data mode */}
            {this.state.eventsMode === "data" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const metadata = this.getEventMetadata(this.state.eventType);
                  // 2, 3,4
                  const data = metadata.properties.required.reduce(
                    (total, current) => {
                      return { ...total, [current]: e.target[current]?.value };
                    },
                    {}
                  );
                  // const data = metadata.properties.required.map(
                  //   (item) => e.target[item]?.value
                  // );
                  console.log(data);

                  Object.keys(data).forEach((key) => {
                    const type = metadata[key]?.type;
                    console.log(key, type);
                    if (type) {
                      switch (type) {
                        case "string[]":
                          data[key] = data[key].split(",").map((x) => x.trim());
                        default:
                      }
                    }
                  });

                  console.log(data);

                  this.service.send({ type: this.state.eventType, data });
                  this.setState({ eventType: null, eventsMode: "events" });
                }}
              >
                {this.getEventMetadata(
                  this.state.eventType
                ).properties.required.map((item) => (
                  <div>
                    <label htmlFor={item}>{item}</label>
                    <input type="text" name={item} />
                  </div>
                ))}
                <button type="submit">Send</button>
              </form>
            )}

            {/* Events Mode */}
            {this.state.eventsMode === "events" &&
              this.service.state.nextEvents.map((evt, ix) => (
                <p key={ix}>
                  <button
                    style={styles.buttons}
                    onClick={() => {
                      const metdata = this.getEventMetadata(evt);
                      if (metdata?.properties?.required) {
                        this.setState({ eventsMode: "data", eventType: evt });
                      } else {
                        this.service.send(evt);
                      }
                    }}
                  >
                    {evt.toLowerCase()}
                  </button>
                </p>
              ))}
          </fieldset>
        </div>
        {/* {this.state.error && <pre>{this.state.error}</pre>} */}
      </div>
    );
  }
}

export class Viz extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(err, errInfo) {
    console.log("caught error", errInfo);
    this.setState({ error: err });
  }

  render() {
    console.log(this.props, this.state);
    return this.state.error ? (
      <pre>{this.state.error}</pre>
    ) : (
      <VizRenderer {...this.props} />
    );
  }
}
