// WORKING WITH THE DOM
// *********************************
const terminal = document.getElementById("terminal");
const input = document.getElementsByTagName("input")[0];
const cursor = document.getElementById("cursor");
const terminalText = terminal.getElementsByTagName("span")[0];
const showmode = document.getElementById("showmode");

// MACHINE SETUP
// *****************************
//
const { Machine, interpret, assign } = XState;

const modeMachine = Machine(
  {
    id: "input-mode",
    initial: "normal",
    context: {
      cursorPointer: undefined,
      textContent: "",
      textLength: undefined
    },
    states: {
      normal: {
        entry: "applyNormalModeStyles",
        on: {
          INSERT: "insert",
          VISUAL: "visual",
          REPLACE: "replace",
          CURSOR_LEFT: {
            target: ".",
            actions: ["moveLeft", "updateCursorPosition"],
            internal: true
          },
          CURSOR_RIGHT: {
            target: ".",
            actions: ["moveRight", "updateCursorPosition"],
            internal: true
          }
        }
      },
      visual: {
        entry: "applyVisualModeStyles",
        on: { NORMAL: "normal" }
      },
      insert: {
        entry: "applyInsertModeStyles",
        on: {
          NORMAL: "normal",
          UPDATE_TEXT: {
            target: ".",
            actions: ["saveText", "updateBuffer"]
          }
        }
      },
      replace: {
        entry: "applyReplaceModeStyles",
        on: { NORMAL: "normal" }
      }
    }
  },
  {
    actions: {
      saveText: assign((_, e) => ({
        textContent: e.data,
        textLength: e.data.length
      })),
      updateBuffer: ctx => {
        terminalText.textContent = ctx.textContent;
      },
      moveLeft: assign(({ cursorPointer, textLength }) => {
        if (cursorPointer !== undefined) {
          return { cursorPointer: cursorPointer === 0 ? 0 : cursorPointer - 1 };
        }
        return { cursorPointer: textLength - 1 };
      }),
      moveRight: assign(({ cursorPointer, textLength }) => {
        if (cursorPointer) {
          return {
            cursorPointer:
              cursorPointer === textLength ? textLength : cursorPointer + 1
          };
        }
        return { cursorPointer: 0 };
      }),
      updateCursorPosition: ({ textLength, cursorPointer }) => {
        const calculatedPosition = (textLength - cursorPointer) * -7;
        cursor.style.left = `${calculatedPosition}px`;
      },
      applyInsertModeStyles: () => {
        showmode.textContent = "-- INSERT --";
        cursor.style.width = "2.5px";
      },
      applyReplaceModeStyles: () => {
        showmode.textContent = "-- REPLACE --";
      },
      applyNormalModeStyles: () => {
        showmode.textContent = "";
        cursor.style.width = "7px";
      },
      applyVisualModeStyles: () => {
        showmode.textContent = "-- VISUAL --";
      }
    }
  }
);

// DEBUG UTILS
// *********************************
const debug = document.getElementById("debug");
function showStateDebug(s) {
  debug.textContent = JSON.stringify(s.value, 2, null);
}

// MACHINE STATE in UI
let state;
const modalService = interpret(modeMachine)
  .onTransition(s => {
    state = s.value;
    showStateDebug(s);
  })
  .start();

// XXX  Remove after dev
window.machine = modalService;

// Autofocus input
input.focus();

// HACK always keep invisible input focused
setInterval(() => {
  if (document.activeElement !== input) {
    input.focus();
  }
}, 100);

// Update the terminal value with the text typed in input
input.addEventListener(
  "input",
  e => {
    if (state === "insert") {
      modalService.send({ type: "UPDATE_TEXT", data: e.target.value });
    } else {
      // Do this so we don't have a delay between typing the input and showing the value.
      // Also so that we don't add things to the input that get suddenly appened after entering insert mode
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
    }
  },
  false
);

document.body.addEventListener("keyup", changeModes);
function changeModes(e) {
  e.preventDefault();
  if (state === "normal") {
    handleNormalModeInput(e.key);
  } else {
    if (e.key === "Escape") modalService.send("NORMAL");
  }
}

function handleNormalModeInput(key) {
  switch (key) {
    case "i": {
      modalService.send("INSERT");
      break;
    }
    case "v": {
      modalService.send("VISUAL");
      break;
    }
    case "R": {
      modalService.send("REPLACE");
      break;
    }
    case "h": {
      modalService.send("CURSOR_LEFT");
      break;
    }
    case "j": {
      break;
    }
    case "k": {
      break;
    }
    case "l": {
      modalService.send("CURSOR_RIGHT");
      break;
    }
    default:
      break;
  }
}
