// WORKING WITH THE DOM
// *********************************
const terminal = document.getElementById("terminal");
const input = document.getElementsByTagName("input")[0];
const terminalText = terminal.getElementsByTagName("span")[0];
const showmode = document.getElementById("showmode");
const text = document.getElementById("text");
const col = document.getElementById("col");
const TEXT_CURSOR = textContent => `<span id="cursor">${textContent}</span>`;
let cursor;

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
        entry: ["getCursorElement", "applyNormalModeStyles"],
        on: {
          INSERT: "insert",
          VISUAL: "visual",
          REPLACE: "replace",
          CURSOR_LEFT: {
            target: ".",
            actions: ["moveLeft", "getCursorElement", "updateCursorPosition"],
            internal: true
          },
          CURSOR_RIGHT: {
            target: ".",
            actions: ["moveRight", "getCursorElement", "updateCursorPosition"],
            internal: true
          },
          EOL: {
            target: ".",
            actions: ["endOfLine", "getCursorElement", "updateCursorPosition"],
            internal: true
          },
          SOL: {
            target: ".",
            actions: [
              "startOfLine",
              "getCursorElement",
              "updateCursorPosition"
            ],
            internal: true
          }
        }
      },
      visual: {
        entry: "applyVisualModeStyles",
        on: { NORMAL: "normal" }
      },
      insert: {
        entry: ["getCursorElement", "applyInsertModeStyles"],
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
      saveText: assign(({ cursorPointer, textContent, textLength }, e) => {
        let updatedContent;
        let updatedCursorPointer;
        if (cursorPointer !== undefined && cursorPointer !== textLength) {
          updatedContent = textContent
            .slice(0, cursorPointer)
            .concat(e.data)
            .concat(textContent.slice(cursorPointer));
        } else {
          updatedContent = textContent.concat(e.data);
        }
        if (e.data == null) {
          updatedContent = textContent.slice(0, textLength - 1);
          updatedCursorPointer =
            cursorPointer !== undefined ? cursorPointer - 1 : undefined;
        } else {
          updatedCursorPointer =
            cursorPointer !== undefined ? cursorPointer + 1 : undefined;
        }
        return {
          textContent: updatedContent,
          textLength: updatedContent.length,
          cursorPointer: updatedCursorPointer
        };
      }),
      updateBuffer: ctx => {
        terminalText.textContent = ctx.textContent;
        col.innerText = `1,${ctx.cursorPointer || ctx.textLength || 0}`;
      },
      moveLeft: assign(({ cursorPointer, textLength }) => {
        if (cursorPointer !== undefined) {
          return { cursorPointer: cursorPointer === 0 ? 0 : cursorPointer - 1 };
        }
        return { cursorPointer: textLength - 1 };
      }),
      moveRight: assign(({ cursorPointer, textLength }) => {
        if (cursorPointer !== undefined) {
          return {
            cursorPointer:
              cursorPointer === textLength ? textLength : cursorPointer + 1
          };
        }
        return { cursorPointer: textLength };
      }),
      endOfLine: assign(({ textLength }) => ({
        cursorPointer: textLength
      })),
      startOfLine: assign(() => ({
        cursorPointer: 0
      })),
      getCursorElement: () => {
        cursor = document.getElementById("cursor");
      },
      updateCursorPosition: ({ textContent, cursorPointer, textLength }) => {
        const getInnerText = () => {
          if (cursorPointer !== undefined) {
            return cursorPointer;
          } else if (textLength !== undefined) {
            return textLength;
          }
          return 0;
        };
        col.innerText = `1,${getInnerText()}`;
        text.innerHTML = textContent
          .slice(0, cursorPointer)
          .concat(
            TEXT_CURSOR(textContent.slice(cursorPointer, cursorPointer + 1))
          )
          .concat(textContent.slice(cursorPointer + 1));
      },
      applyInsertModeStyles: () => {
        showmode.textContent = "-- INSERT --";
        cursor.style.width = "1.5px";
      },
      applyReplaceModeStyles: () => {
        showmode.textContent = "-- REPLACE --";
      },
      applyNormalModeStyles: ({ textContent, cursorPointer, textLength }) => {
        col.innerText = `1,${cursorPointer || textLength || 0}`;
        const innerText = content => (cursorPointer > 0 ? content : "");
        text.innerHTML = textContent
          .slice(0, cursorPointer || textLength)
          .concat(
            TEXT_CURSOR(
              innerText(textContent.slice(cursorPointer, cursorPointer + 1))
            )
          )
          .concat(innerText(textContent.slice(cursorPointer + 1)));
        showmode.textContent = "";
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
      modalService.send({ type: "UPDATE_TEXT", data: e.data });
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
    case "a": {
      modalService.send(["CURSOR_RIGHT", "INSERT"]);
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
    case "$": {
      modalService.send("EOL");
      break;
    }
    case "0": {
      modalService.send("SOL");
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
