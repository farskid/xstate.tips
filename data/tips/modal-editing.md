---
title: Modal editing with statecharts
description: Using statecharts to emulate modal text editors
author: Taylor Thompson
tags: Modal, Editing, Finite state machines, Statecharts, XState
---

```js
// MACHINE SETUP
// *****************************
//
const { Machine, interpret } = XState;
const modeMachine = Machine({
  id: "input-mode",
  initial: "normal",
  states: {
    normal: {
      on: { INSERT: "insert", VISUAL: "visual", REPLACE: "replace" }
    },
    visual: {
      on: { NORMAL: "normal" }
    },
    insert: {
      on: { NORMAL: "normal" }
    },
    replace: {
      on: { NORMAL: "normal" }
    }
  }
});

const debug = document.getElementById("debug");
const modalService = interpret(modeMachine)
  .onTransition(showStateDebug)
  .start();

// DEBUG UTILS
// *********************************
function showStateDebug(s) {
  debug.textContent = JSON.stringify(s.value, 2, null);
}
window.service = modalService;

// WORKING WITH THE DOM
// *********************************
const terminal = document.getElementById("terminal");
const input = document.getElementsByTagName("input")[0];
const cursor = document.getElementById("cursor");
const terminalText = terminal.getElementsByTagName("span")[0];
const showmode = document.getElementById("showmode");

// MACHINE STATE in UI
let state = modalService.state.value;

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
      terminalText.textContent = e.target.value;
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
  switch (state) {
    case "normal": {
      switch (e.key) {
        case "i": {
          state = modalService.send("INSERT").value;
          showmode.textContent = "-- INSERT --";
          cursor.style.width = "2.5px";
          break;
        }
        case "v": {
          state = modalService.send("VISUAL").value;
          showmode.textContent = "-- VISUAL --";
          break;
        }
        case "R": {
          state = modalService.send("REPLACE").value;
          showmode.textContent = "-- REPLACE --";
          break;
        }
        default:
          break;
      }
    }
    case "insert": {
      if (e.key === "Escape") {
        state = modalService.send("NORMAL").value;
        showmode.textContent = "";
        cursor.style.width = "5px";
      }
      break;
    }
    case "visual": {
      if (e.key === "Escape") {
        state = modalService.send("NORMAL").value;
        showmode.textContent = "";
      }
      break;
    }
    case "replace": {
      if (e.key === "Escape") {
        state = modalService.send("NORMAL").value;
        showmode.textContent = "";
      }
      break;
    }
    default:
      break;
  }
}
```
