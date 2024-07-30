import React, { useState } from "react";
import { useYColor } from "./hooks";
import { rgbToHex, strToRGB } from "./lib";

export const Title = () => {
  return (
    <h1 className="text" style={{ fontWeight: 400 }}>
      The <u>color</u>
      <br />
      <i>of</i> your <b>name</b>
    </h1>
  );
};

export const Action = ({
  setPreview,
}: {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState("");
  useYColor(strToRGB(name));

  const onPreview = () => {
    const url = new URL(location.href);
    url.searchParams.append("n", name);
    history.pushState({}, "", url);

    setPreview(true);
  };

  return (
    <>
      <input
        type="text"
        className="text"
        placeholder="John Malih"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <button className="text" disabled={!name} onClick={() => onPreview()}>
        Show <code>#{rgbToHex(strToRGB(name))}</code>
      </button>
      <div className="my-color"></div>
    </>
  );
};
