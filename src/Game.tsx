import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./components/Card.tsx";
import { CardType, RawGame } from "./Types.ts";
import Congrats from "./Congrats.tsx";
import Loader from "./components/Loader.tsx";
import Button from "./components/Button.tsx";

const Game = () => {
  const { slug } = useParams();

  const [board, setBoard] = useState<CardType[] | undefined>();
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [tries, setTries] = useState(0);
  const [success, setSuccess] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const loadBoard = useCallback(({ board, resolvedCards }: RawGame) => {
    const foundAll = !board.includes("?");
    setSuccess(foundAll);

    if (!foundAll) {
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

      fetch(`/api/games/${slug}`).then((res) => {
        res.json().then(loadBoard);
      });
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

  const revealSolution= useCallback(() => {
      setSolutionRevealed(true)
  }, [])

  useEffect(() => {
    if (revealedCards.length === 2) {
      setTries((count) => count + 1);
      fetch(`/api/games/${slug}/resolve`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ positions: revealedCards }),
      }).then((res) => {
        if (res.ok) {
          res.json().then(loadBoard);
        }
        reset();
      });
    }
  }, [revealedCards, reset, slug, loadBoard]);

  return success ? (
    <Congrats />
  ) : (
    <div className="board">
      <h2>Tries: {tries}</h2>
      <div>
        {board && slug ? (
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
        ) : (
          <Loader size="L" />
        )}
      </div>
      <div className="button-bar">
        <Button onClick={() => revealSolution()}>Reveal solution</Button>
      </div>
    </div>
  );
};

export default Game;
