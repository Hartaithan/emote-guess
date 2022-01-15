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
      console.log("variants", variants);
      setVariants(variants);
      setGuess(guessPretendent);
    }
  }

  return (
    <div className="App">
      {guess ? (
        <>
          <img src={`${CDN}/${guess.emote.id}/3x`} alt={guess.emote.code} />
          <div>
            {variants.map((variant: any) => (
              <button>{variant.emote.code}</button>
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
