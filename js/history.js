import { state } from "./state.js";

const history = [];
let index = -1;

export function pushHistory() {
  history.splice(index + 1);
  history.push(JSON.stringify(state));
  index++;
}

export function undo() {
  if (index <= 0) return;
  index--;
  Object.assign(state, JSON.parse(history[index]));
}

export function redo() {
  if (index >= history.length - 1) return;
  index++;
  Object.assign(state, JSON.parse(history[index]));
}
