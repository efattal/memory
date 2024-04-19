import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Loader from "./Loader.tsx";
import Button from "./Button.tsx";
import ButtonBar from "./ButtonBar.tsx";
import getNewGameSlug from "../utils/getNewGameSlug.ts";

const PlayBar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>()

  const createGame = useCallback(
    async (level: "easy" | "hard") => {
      setLoading(true);
      try {
        const slug = await getNewGameSlug(level)
        if (slug) {
          navigate(`/games/${slug}`);
        }
      }
      catch (e: unknown) {
        console.log(e)
        if (e instanceof Error) {
          setError(e.message)
        }
      }
      setLoading(false);
    },
    [navigate],
  );

  if (loading) {
    return (
      <>
        <h2>We'going to play</h2>
        <Loader />
      </>)
  }

  if (error) {
    return (
      <p>😔 {error}</p>
    )
  }

  return (
    <ButtonBar>
      <Button onClick={() => createGame("easy")}>👶 Play easy</Button >
      <Button onClick={() => createGame("hard")}>🦸 Play hard</Button>
    </ButtonBar >
  );
};

export default PlayBar;
