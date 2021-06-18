export default function preventDoubleTap(func, doublePressDelay = 300) {
  let canPressWrapped = true;

  return (...args) => {
    if (canPressWrapped) {
      canPressWrapped = false;
      func(...args);

      setTimeout(() => {
        canPressWrapped = true;
      }, doublePressDelay);
    }
  };
}
