---
title: Modal Editing with statecharts
description: Using statecharts to emulate modal text editors
author: Taylor Thompson
tags: Modal, Editing, Finite state machines, Statecharts, XState
---

## Intro to Modal Editing

My favorite development tool is the text editor, [Neovim](https://github.com/neovim/neovim). Part of the reason why I enjoy using Neovim so much is the concept of modal editing. Unlike other popular text editors and IDEs, Neovim employs the concepts of _modes_ to maximize the efficiency of the user and extend the functionality of the text editor.

Modal editing means that you are in one editing mode at a time. In the case of Neovim, this means that you are either in NORMAL, INSERT, VISUAL, VISUAL BLOCK, VISUAL LINE, COMMAND, or REPLACE mode. While in INSERT mode, you can insert text, while in NORMAL mode, all your keystrokes are commands. Since you can only be in one mode at a time, this is an excellent candidate for modeling with statecharts.

<iframe src="/modal-editing/demo.html"></iframe>


## Benefits of Message Passing

Message passing to communicate state updates is of the advantages to using a state machine to manage the modal editor. It allows use to attach an event listener to all strokes and pipe these events straight into the state machine:

```javascript
document.body.addEventListener("keyup", changeModes);
function changeModes(e) {
  e.preventDefault();
  modalService.send(e.key);
}
```

By passing messages to the state machine, we avoid logic branching altogether: no `if` or `switch` statements, no ternary operators, and perhaps most importantly, our actions are _deterministic_. Deterimism gives us confidence that we will never see our editor in a state that is not explicitly defined by our state machine, no matter how many actions we trigger, or in what order they are triggered.

## Readability
Being able to co-locate all of the state changing actions inside of the state machine also helps when determining which actions are modifying which pieces of state, rather than trying to find this information scattered across different files or different event handlers.
