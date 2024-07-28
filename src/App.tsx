import { useState } from "react";
import { formatRgb, rgbToHex, strToRGB } from "./lib";
import "./App.css";

const Title = ({ hidden }: { hidden: boolean }) => {
  if (hidden) return null;

  return (
    <h1 className="text" style={{ fontWeight: 400 }}>
      The <u>color</u>
      <br />
      <i>of</i> your <b>name</b>
    </h1>
  );
};

const MyColor = ({ name }: { name: string }) => (
  <div
    className="my-color"
    style={{ ["--ycolor" as string]: formatRgb(strToRGB(name)) }}
  >
    <div className="desc">
      <p className="text">{name}</p>
      <p className="text">
        <code>#{rgbToHex(strToRGB(name))}</code>
      </p>
      <p className="text">
        <code>{formatRgb(strToRGB(name))}</code>
      </p>
    </div>
  </div>
);

function App() {
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(false);

  return (
    <div className="container">
      <header className="text">
        <span>
          t<u>c</u>
          <b>n</b>
        </span>
      </header>
      <Title hidden={preview} />
      {!preview && (
        <div className="action">
          <input
            type="text"
            placeholder="zal"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <button onClick={() => setPreview((prev) => !prev)}>W</button>
        </div>
      )}
      <MyColor name={name} />
    </div>
  );
}

export default App;
