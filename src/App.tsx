import { useState } from "react";
import "./App.css";

const initTiles = () => {
  const tiles = [...Array(136).keys()].map((n) => n % 34);
  shufTiles(tiles);
  return tiles;
};

const shufTiles = (tiles: number[]) => {
  for (let i = tiles.length - 1; i >= 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[r]] = [tiles[r], tiles[i]];
  }
};

const sortTiles = (tiles: number[]) => {
  return tiles
    .map((n) => (n < 7) ? n + 34 : n)
    .sort((a, b) => a - b)
    .map((n) => (n > 33) ? n - 34 : n);
};

function App() {
  let tiles = initTiles();
  const [hands, setHands] = useState<number[]>([]);

  const refreshHands = () => {
    tiles = initTiles();
    setHands(sortTiles(tiles.slice(0, 14)));
  };

  return (
    <>
      <h1>何切る?</h1>
      <div className="hands">
        {hands.map((hand, i) => (
          <img
            key={i}
            src={`/png/U+${(0x1F000 + hand).toString(16).toUpperCase()}.png`}
            className="hand"
          />
        ))}
      </div>
      <div className="buttons">
        <button className="button" onClick={refreshHands}>
          配牌（リセット）
        </button>
      </div>
    </>
  );
}

export default App;
