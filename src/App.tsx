import { PointerEvent, useState } from 'react'
import './App.scss'

const initTiles = () => {
  const tiles = [...Array(136).keys()].map((n) => n % 34)
  // shuffle tiles
  for (let i = tiles.length - 1; i >= 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    ;[tiles[i], tiles[r]] = [tiles[r], tiles[i]]
  }
  return tiles
}

const sort = (tiles: number[]) => {
  return tiles
    .map((n) => n < 7 ? n + 34 : n)
    .sort((a, b) => a - b)
    .map((n) => n > 33 ? n - 34 : n)
}

const getImageUrl = (hand: number) => {
  const fileName = `U+${(0x1F000 + hand).toString(16).toUpperCase()}.png`
  return `${import.meta.env.BASE_URL}images/${fileName}`
}

let deck: number[]

function App() {
  const [hands, setHands] = useState<number[]>([])
  const [selected, setSelected] = useState(-1)
  const [drawn, setDrawn] = useState(false)

  const getHandClass = (idx: number) => {
    const classList = ['hand']
    if (idx === selected) {
      classList.push('selected')
    }
    if (drawn && idx === hands.length - 1) {
      classList.push('draw')
    }
    return classList.join(' ')
  }

  const handClicked = (e: PointerEvent<HTMLImageElement>) => {
    // console.log(e);
    if (!(e.target instanceof HTMLImageElement)) {
      return
    }
    const idx = parseInt(e.target.id.replace('hand_', ''), 10)
    if (idx === selected) {
      if (deck.length < 1) {
        window.alert('山に牌がありません')
        reloadHands()
        return
      }
      setSelected(-1)
      setHands(() => {
        let arr = [...hands]
        arr.splice(idx, 1)
        arr = sort(arr)
        arr.push(deck.shift()!)
        return arr
      })
      setDrawn(true)
    } else {
      setSelected(idx)
    }
  }

  const reloadHands = () => {
    setDrawn(false)
    setSelected(-1)
    deck = initTiles()
    setHands(sort(deck.splice(0, 14)))
  }

  return (
    <>
      <h1>何切る?</h1>
      <div id='hands'>
        {hands.map((hand, i) => (
          <div key={i} className={getHandClass(i)}>
            <img
              src={getImageUrl(hand)}
              id={`hand_${i}`}
              className='hand-img'
              onClick={handClicked}
            />
          </div>
        ))}
      </div>
      <div className='buttons'>
        <button className='reset' onClick={reloadHands}>
          配牌（リセット）
        </button>
      </div>
    </>
  )
}

export default App
