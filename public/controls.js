// Keep long presses and simultaneous movement/jump inside the game controls.
export function bindGameControls(root, game) {
  const abort = new AbortController();
  const states = [];
  const prevent = event => { if (event.cancelable) event.preventDefault(); };
  for (const type of ['touchstart', 'touchmove', 'touchend', 'contextmenu', 'selectstart', 'dblclick']) {
    root.addEventListener(type, prevent, {passive: false, signal: abort.signal});
  }
  for (const button of root.querySelectorAll('[data-key]')) {
    const key = button.dataset.key;
    const state = {pointers: new Set(), pulse: null, pressedAt: 0};
    states.push({button, key, state});
    const stop = () => {
      clearTimeout(state.pulse);
      state.pulse = null;
      game.input(key, false);
      button.classList.remove('pressed');
    };
    button.addEventListener('pointerdown', event => {
      prevent(event);
      if (game.paused || game.finished || (event.pointerType === 'mouse' && event.button !== 0)) return;
      clearTimeout(state.pulse); state.pulse = null;
      state.pressedAt = performance.now();
      state.pointers.add(event.pointerId);
      button.setPointerCapture(event.pointerId);
      game.input(key, true);
      button.classList.add('pressed');
    }, {signal: abort.signal});
    const release = event => {
      prevent(event);
      if (!state.pointers.delete(event.pointerId) || state.pointers.size) return;
      const quickMouseClick = event.type === 'pointerup' && event.pointerType === 'mouse' && performance.now() - state.pressedAt < 190;
      if (quickMouseClick && (key === 'left' || key === 'right')) {
        state.pulse = setTimeout(stop, 300);
      } else {
        stop();
        if (quickMouseClick && key === 'action' && game.index === 2) game.mouseUse();
      }
    };
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) button.addEventListener(type, release, {signal: abort.signal});
  }
  return () => {
    abort.abort();
    for (const {button, key, state} of states) {
      clearTimeout(state.pulse);
      state.pointers.clear();
      game.input(key, false);
      button.classList.remove('pressed');
    }
  };
}
