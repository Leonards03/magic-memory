import { Card } from "../types"
import "./SingleCard.css"

export interface CardProps extends Card {
  flipped: boolean
  disabled: boolean
  handleChoice: (card: Card) => void
}

const SingleCard = ({
  id,
  src,
  matched,
  flipped,
  disabled,
  handleChoice,
}: CardProps) => {
  const handleClick = () => {
    // stop handling clicks if card is disabled
    if (!disabled) handleChoice({ id, src, matched })
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard
