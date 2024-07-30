import { useEffect, useMemo } from "react";
import { chooseForeground, formatRgb, isBgBrighter, strToRGB } from "./lib";

export const useYColor = (rgb: number[]) => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    root.style.setProperty("--ycolor", formatRgb(rgb));
    root.style.setProperty("--fg", formatRgb(chooseForeground(rgb)));
    root.style.setProperty(
      "--blend",
      isBgBrighter(rgb) ? "hard-light" : "difference",
    );
  }, [rgb]);
};

export const useColorFromParams = () => {
  const url = new URL(location.href);
  const name = url.searchParams.get("n") || "";
  const rgb = useMemo(() => strToRGB(decodeURI(name)), [name]);
  return { name, rgb };
};
