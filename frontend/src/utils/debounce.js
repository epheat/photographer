// https://egghead.io/lessons/javascript-build-lodash-debounce-from-scratch
// instead of pulling in lodash, just implement debounce
export const debounce = (fn, wait) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  }
}