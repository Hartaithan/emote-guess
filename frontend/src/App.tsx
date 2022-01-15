import React from "react";
import axios from "axios";

const API = "https://api.betterttv.net/3/emotes";
const CDN = "https://cdn.betterttv.net/emote";

function App() {
  const [emotes, setEmotes] = React.useState([]);
  const [guess, setGuess] = React.useState<any>(null);
  const [variants, setVariants] = React.useState<any>(null);
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

  // React.useEffect(() => {
  //   console.log(guess);
  // }, [guess]);

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
      setVariants(variants);
      setGuess(guessPretendent);
    }
  }

  function guessVariant(code: string) {
    if (guess.emote.code === code) {
      console.info("RIGHT!");
    } else {
      console.info("WRONG!");
    }
    pickGuess(emotes);
  }

  return (
    <div className="App">
      {guess ? (
        <>
          <img src={`${CDN}/${guess.emote.id}/3x`} alt={guess.emote.code} />
          <div>
            {variants.map((variant: any) => (
              <button onClick={() => guessVariant(variant.emote.code)}>
                {variant.emote.code}
              </button>
            ))}
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default App;
