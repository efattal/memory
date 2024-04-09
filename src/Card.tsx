import { CardType } from "./Types.ts";
import { useEffect, useState } from "react";

type CardProps = CardType & {
  gameSlug: string;
  position: number;
  onClick: VoidFunction;
};

const Card = ({
  gameSlug,
  position,
  slug: _slug,
  image: _imageUri,
  revealed,
  resolved = false,
  onClick,
}: CardProps) => {
  const [loading, setLoading] = useState(false);

  const [slug, setSlug] = useState<string | undefined>(_slug);
  const [imageURI, setImageURI] = useState<string | undefined>(_imageUri);

  useEffect(() => {
    if ((revealed || resolved) && !imageURI) {
      setLoading(true);

      fetch(`/api/games/${gameSlug}/${position}`).then((res) => {
        res.json().then((json) => {
          setSlug(json.slug);
          setImageURI(json.image);
          setLoading(false);
        });
      });
    }
  }, [gameSlug, revealed, imageURI, position, resolved]);

  return (
    <div className={`card ${revealed || resolved ? "revealed" : ""} ${resolved ? "resolved" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div
          className="card-back"
          style={{
            ...(imageURI && {
              backgroundImage: `url("https://ima.ghostspirit.net${imageURI}")`,
            }),
          }}
        >{loading && "..."}</div>
        <div className="card-front">Memo</div>
      </div>
    </div>
  );
};

export default Card;
