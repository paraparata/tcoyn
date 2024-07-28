export const strToRGB = (s: string) => {
  const chars = s.toLowerCase().split(" ").join("");
  const n = chars.length;
  let three = ["", "", ""];

  if (n === 1) three = [chars[0], "", ""];
  if (n === 2) three = [chars[0], chars[1], ""];
  else
    three = [
      chars.slice(0, Math.ceil(n / 3)),
      chars.slice(Math.ceil(n / 3), Math.ceil((n * 2) / 3)),
      chars.slice(Math.ceil((n * 2) / 3), n),
    ];

  const rgb = [255, 255, 255];
  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = three[i]
      ? three[i].split("").reduce((acc, c) => {
          acc += c ? c.codePointAt(0) || 255 : 255;
          return acc;
        }, 0) % 256
      : 255;
  }
  return rgb;
};

export const formatRgb = (rgb: number[]) => `rgb(${rgb.join(",")})`;

export const rgbToHex = (rgb: number[]) =>
  rgb.reduce((acc, c) => {
    acc += Math.abs(c).toString(16);
    return acc;
  }, "");
