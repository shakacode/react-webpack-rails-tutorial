export default function checkAuth(nextState, replace) {
  // Hard code this to demonstrate the effect
  const notAuthorized = true;
  if (notAuthorized) {
    replace({ pathname: '/', state: { redirectFrom: nextState.location.pathname } });
  }
}
