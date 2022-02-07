import React from "react";
import axios from "axios";

const API = "https://api.betterttv.net/3/emotes";
const CDN = "https://cdn.betterttv.net/emote";

function App() {
  const [emotes, setEmotes] = React.useState([]);
  const [guess, setGuess] = React.useState<any>(null);
  const [variants, setVariants] = React.useState<any>(null);
  const [points, setPoints] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [emoteLoading, setEmoteLoading] = React.useState(true);
  let alreadyPicked: any = [];

  React.useEffect(() => {
    axios
      .get(`${API}/shared/trending?offset=0&limit=100`)
      .then(({ data }) => {
        setEmotes(data);
        pickGuess(data);
      })
      .catch((e) => console.error(e));
  }, []); // eslint-disable-line

  function getRandNum(max: number) {
    return Math.floor(Math.random() * max);
  }

  function shuffleArray(array: any) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function pickGuess(emotes: any) {
    const randomIndex = getRandNum(emotes.length);
    const guessPretendent = emotes[randomIndex];
    let variants = [];
    if (!alreadyPicked.includes(guessPretendent)) {
      alreadyPicked.push(guessPretendent);
      variants.push(guessPretendent);
      while (variants.length < 4) {
        const variantPretendent = emotes[getRandNum(emotes.length)];
        if (!variants.includes(variantPretendent)) {
          variants.push(variantPretendent);
        }
      }
      setVariants(shuffleArray(variants));
      setGuess(guessPretendent);
    }
    setLoading(false);
  }

  function guessVariant(code: string) {
    setEmoteLoading(true);
    setLoading(true);
    if (guess.emote.code === code) {
      console.info("RIGHT!");
      setPoints(points + 1);
    } else {
      console.info("WRONG!");
    }
    pickGuess(emotes);
  }

  return (
    <div className="App">
      <p className="points">{points}</p>
      {isLoading ? (
        <p className="loading">Loading</p>
      ) : (
        <>
          <img
            className="emote"
            onLoad={() => setEmoteLoading(false)}
            style={{ opacity: emoteLoading ? "0" : "1" }}
            src={`${CDN}/${guess.emote.id}/3x`}
            alt={guess.emote.code}
          />
          <div className="variants__wrapper">
            {variants.map((variant: any) => (
              <button
                className="variants__item"
                onClick={() => guessVariant(variant.emote.code)}
                key={variant.emote.code}
              >
                {variant.emote.code}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
