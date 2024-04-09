import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const Welcome = () => {
    const navigate = useNavigate()

    const createGame = useCallback(async () => {
        const res = await fetch("/api/games", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "level": "hard"
            })
        })

        const json = await res.json()
        const slug = json.slug;
        if (slug) {
            navigate(`/games/${slug}`)
        }
    }, [navigate])

    return <div>
        <button onClick={() => createGame()}>Launch new game</button>
    </div>
}

export default Welcome