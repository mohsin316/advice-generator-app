// styles
import "./App.css";

// imports
import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";

// images
import dividerMobile from "./assets/pattern-divider-mobile.svg";
import dividerDesktop from "./assets/pattern-divider-desktop.svg";
import dice from "./assets/icon-dice.svg";

function App() {
  const [generate, setGenerate] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAdvice = async () => {
      const res = await fetch(
        "https://api.adviceslip.com/advice?q=" + Math.random()
      );
      const json = await res.json();
      setData(json.slip);
    };

    getAdvice();
  }, [generate]);

  return (
    <>
      <m.main layout>
        <m.h1>Advice {data && data.id}</m.h1>
        {data && <m.p>{data.advice}</m.p>}
        <m.div className="play-pause">
          <picture>
            <source srcSet={dividerDesktop} media="(min-width: 550px)" />
            <img src={dividerMobile} alt="divider" />
          </picture>
        </m.div>
        <m.button
          whileTap={{ scale: 0.8 }}
          style={{ x: -27, y: -30 }}
          onClick={() => setGenerate(!generate)}
          className="dice"
        >
          <img src={dice} alt="dice" />
          <span className="sr-only">dice</span>
        </m.button>
      </m.main>
    </>
  );
}

export default App;
