export function withPayload(action, payload) {
  action.payload = payload;
  return action;
}
