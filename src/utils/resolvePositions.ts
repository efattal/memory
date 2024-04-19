import { RawGame } from "../Types";

const resolvePositions = async (slug: string, positions: number[]): Promise<RawGame | undefined> => {
    const res = await fetch(`/api/games/${slug}/resolve`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ positions }),
    })

    if (res.ok) {
        return res.json();
    }

}

export default resolvePositions