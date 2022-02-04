import { useEffect, useState } from "react"
import "./App.css"
import SingleCard from "./components/SingleCard"
import { Card } from "./types"

const cardImages: Card[] = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState<Card[] | []>([])
  const [turns, setTurns] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(false)
  // choice states
  const [choiceOne, setChoiceOne] = useState<Card | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)

  // choice handler
  const handleChoice = (card: Card) => {
    if (card.matched) {
      alert("You already matched this card!")
      return
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    // If user selected two cards, check if they match
    if (choiceOne && choiceTwo) {
      // disabled another selection
      setDisabled(true)
      // if cards match, set the selected card matched to true
      if (
        choiceOne?.src === choiceTwo?.src &&
        choiceOne?.id !== choiceTwo?.id
      ) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            return card.src === choiceOne?.src
              ? { ...card, matched: true }
              : card
          })
        )
        resetTurns()
      } else {
        setTimeout(() => resetTurns(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // initialize cards
  useEffect(() => {
    shuffleCards()
    console.log("initial shuffling")
  }, [])

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards: Card[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    // refreshing states
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            handleChoice={handleChoice}
            {...card}
            flipped={
              card.matched ||
              card?.id === choiceOne?.id ||
              card?.id === choiceTwo?.id
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
