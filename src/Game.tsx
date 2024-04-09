import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card.tsx";
import { CardType, RawGame } from "./Types.ts";

const Game = () => {
  const { slug } = useParams();

  const [board, setBoard] = useState<CardType[] | undefined>();
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [tries, setTries] = useState(0);

  const loadBoard = useCallback(({ board, resolvedCards }: RawGame) => {
    setBoard(
      board.map((cardSlug: string) => ({
        slug: cardSlug,
        resolved: cardSlug !== "?",
        image: resolvedCards.find((card) => card.slug === cardSlug)?.image,
        revealed: false,
      })),
    );
  }, []);

  useEffect(() => {
    if (slug) {
      fetch(`/api/games/${slug}`).then((res) => {
        res.json().then(loadBoard);
      });
    }
  }, [loadBoard, slug]);

  const reset = useCallback(
    () => setTimeout(() => setRevealedCards([]), 1000),
    [],
  );

  const onCardCLick = useCallback((position: number) => {
    if(revealedCards.length< 2) {
      setRevealedCards((positions) => [...positions, position]);
    }
  }, [revealedCards.length]);

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

  return (
    <>
      <div>{tries} tries</div>
      <div>
        {board && slug
          ? board.map((card, index) => (
              <Card
                key={index}
                gameSlug={slug}
                slug={card.slug}
                position={index}
                onClick={() => onCardCLick(index)}
                revealed={revealedCards.includes(index)}
                resolved={card.resolved}
              />
            ))
          : "Loading..."}
      </div>
    </>
  );
};

export default Game;
