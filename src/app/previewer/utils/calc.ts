export function geometricScaling(iw: number, ih: number, cw: number, ch: number) {
  let sw = iw, sh = ih;

  if (iw > cw || ih > ch) {
    const radio = ih / iw;

    if (radio * cw > ch) {
      sw = ch / radio;
      sh = ch;
    } else {
      sw = cw;
      sh = radio * cw;
    }
  }

  return [sw, sh];
}

export function alignCenter(iw: number, ih: number, cw: number, ch: number) {
  let x = 0, y = 0;

  if (cw >= x) {
    x += (cw - iw) / 2;
  }

  if (ch >= y) {
    y += (ch - ih) / 2;
  }

  return [x, y];
}
