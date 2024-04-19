import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./components/Card.tsx";
import { CardType, RawGame } from "./Types.ts";
import Congrats from "./Congrats.tsx";
import Loader from "./components/Loader.tsx";
import Button from "./components/Button.tsx";
import ButtonBar from "./components/ButtonBar.tsx";
import resolvePositions from "./utils/resolvePositions.ts";
import loadGame from "./utils/loadGame.ts";

const Game = () => {
  const { slug } = useParams();

  const [board, setBoard] = useState<CardType[] | undefined>();
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [tries, setTries] = useState(0);
  const [success, setSuccess] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const loadBoard = useCallback(({ board, resolvedCards }: RawGame) => {
    const foundAll = !board.includes("?");

    if (foundAll) {
      setTimeout(() => {
        setSuccess(true);
      }, 3000)
    } else {
      setBoard(
        board.map((cardSlug: string) => ({
          slug: cardSlug,
          resolved: cardSlug !== "?",
          image: resolvedCards.find((card) => card.slug === cardSlug)?.image,
          revealed: false,
        })),
      );
    }
  }, []);

  useEffect(() => {
    if (slug) {
      setRevealedCards([]);
      setTries(0);
      setSuccess(false);

      loadGame(slug).then(rawGame => {
        if (rawGame) {
          loadBoard(rawGame)
        }
      })
    }
  }, [loadBoard, slug]);

  const reset = useCallback(
    () => setTimeout(() => setRevealedCards([]), 1000),
    [],
  );

  const onCardCLick = useCallback(
    (position: number) => {
      if (revealedCards.length < 2) {
        setRevealedCards((positions) => [...positions, position]);
      }
    },
    [revealedCards.length],
  );

  const revealSolution = useCallback(() => {
    setSolutionRevealed(revealed => !revealed)
  }, [])

  useEffect(() => {
    if (slug && revealedCards.length === 2) {
      setTries((count) => count + 1);

      resolvePositions(slug, revealedCards).then((rawGame) => {
        if (rawGame) {
          loadBoard(rawGame)
        }
        reset();
      });
    }
  }, [revealedCards, reset, slug, loadBoard]);

  if (success) {
    return <Congrats />
  }

  if (!board || !slug) {
    return <Loader size="L" />
  }

  return (
    <div className="board">
      <h2>Tries: {tries}</h2>
      <div>
        {
          board.map((card, index) => (
            <Card
              key={`${slug}-${index}`}
              gameSlug={slug}
              slug={card.slug}
              position={index}
              onClick={() => onCardCLick(index)}
              revealed={revealedCards.includes(index)}
              resolved={solutionRevealed || card.resolved}
            />
          ))
        }
      </div>
      <ButtonBar>
        <Button onClick={revealSolution}>Reveal solution</Button>
      </ButtonBar>
    </div>
  );
};

export default Game;
