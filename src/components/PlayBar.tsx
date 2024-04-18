import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Loader from "./Loader.tsx";
import Button from "./Button.tsx";
import "./PlayBar.css"

const PlayBar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createGame = useCallback(
    async (level: "easy" | "hard") => {
      setLoading(true);
      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level,
        }),
      });

      const json = await res.json();
      const slug = json.slug;
      if (slug) {
        setLoading(false);
        navigate(`/games/${slug}`);
      }
    },
    [navigate],
  );

  return loading ? (
    <>
      <h2>We'going to play</h2>
      <Loader />
    </>
  ) : (
    <div className="button-bar">
      <Button onClick={() => createGame("easy")}>👶 Play easy</Button>
      <Button onClick={() => createGame("hard")}>🦸 Play hard</Button>
    </div>
  );
};

export default PlayBar;
