import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

const Welcome = () => {
    const navigate = useNavigate()

    const createGame = useCallback(async (level: "easy" | "hard") => {
        const res = await fetch("/api/games", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                level
            })
        })

        const json = await res.json()
        const slug = json.slug;
        if (slug) {
            navigate(`/games/${slug}`)
        }
    }, [navigate])

    return <div className="welcome">
        <button onClick={() => createGame("easy")}>👶 Play easy</button>
        <button onClick={() => createGame("hard")}>🦸 Play hard</button>
    </div>
}

export default Welcome