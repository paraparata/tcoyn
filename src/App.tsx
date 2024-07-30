import { useEffect, useMemo, useState } from "react";
import { Action, Title } from "./components";
import { useColorFromParams, useYColor } from "./hooks";
import { formatRgb, rgbToHex } from "./lib";
import "./App.css";

const Preview = ({
  setPreview,
}: {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { name, rgb } = useColorFromParams();
  useYColor(rgb);

  const color = useMemo(
    () => ({
      hex: `#${rgbToHex(rgb)}`,
      rgb: formatRgb(rgb),
    }),
    [rgb],
  );

  const onBack = () => {
    const url = new URL(location.href);
    url.searchParams.delete("n");
    history.pushState({}, "", url);
    setPreview(false);
  };

  return (
    <>
      <div className="rect" style={{ ["--rect" as string]: formatRgb(rgb) }}>
        <p className="text">
          <code>{color.hex}</code>
        </p>
        <p className="text">
          <code>{color.rgb}</code>
        </p>
      </div>
      <div className="desc">
        <p>{name}</p>
      </div>
      <footer>
        <button onClick={() => onBack()}>{`< Back`}</button>
      </footer>
    </>
  );
};

const Home = ({
  setPreview,
}: {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <>
    <Title />
    <Action setPreview={setPreview} />
  </>
);

function App() {
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const url = new URL(location.href);
    const name = url.searchParams.get("n");
    if (name) setPreview(true);
  }, []);

  return (
    <main>
      {!preview ? (
        <Home setPreview={setPreview} />
      ) : (
        <Preview setPreview={setPreview} />
      )}
    </main>
  );
}

export default App;
