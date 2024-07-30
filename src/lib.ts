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

export const getLuminance = (rgb: number[]) => {
  rgb = rgb.map((clr) => clr / 255);
  for (let x = 0; x < rgb.length; x++) {
    rgb[x] =
      rgb[x] <= 0.03928 ? rgb[x] / 12.92 : ((rgb[x] + 0.055) / 1.055) ** 2.4;
  }
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};

export const isBgBrighter = (rgb: number[]) => {
  const relativeLuminance = getLuminance(rgb);
  const chooseBlack = (relativeLuminance + 0.05) / 0.05;
  const chooseWhite = 1.05 / (relativeLuminance + 0.05);
  return chooseBlack > chooseWhite;
};
export const chooseForeground = (rgb: number[]) => {
  return isBgBrighter(rgb) ? [0, 0, 0] : [255, 255, 255];
};
