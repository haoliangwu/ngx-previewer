// https://stackoverflow.com/a/29881817/7532588
export function getBlockElementRect(el: HTMLElement) {
  const computedStyle = getComputedStyle(el);

  let elementHeight = el.clientHeight;  // height with padding
  let elementWidth = el.clientWidth;   // width with padding

  elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
  elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

  return {
    width: elementWidth,
    height: elementHeight
  };
}
